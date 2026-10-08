import { getLocale, getTranslations } from "next-intl/server";
import { BellOff, ExternalLink } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@/i18n/navigation";
import Pagination from "@/shared/components/pagination";
import {
  SENT_NOTIFICATION_TYPES,
  SentNotification,
  SentNotificationsResponse,
} from "@/shared/lib/types/notifications/sent-notification";
import { formatRiyadhDateTime } from "@/shared/lib/utils/riyadh-time";

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

const TYPE_STYLES: Record<string, string> = {
  order_update:      "bg-blue-50 text-blue-600",
  driver_assigned:   "bg-indigo-50 text-indigo-600",
  bags_delivered:    "bg-teal-50 text-teal-600",
  delivery_complete: "bg-green-50 text-green-600",
  payment_success:   "bg-emerald-50 text-emerald-600",
  payment_failed:    "bg-red-50 text-red-600",
  promo_offer:       "bg-purple-50 text-purple-600",
  delay_alert:       "bg-orange-50 text-orange-600",
  driver_alert:      "bg-amber-50 text-amber-600",
  new_order:         "bg-cyan-50 text-cyan-600",
  system:            "bg-slate-100 text-slate-600",
};

const COLUMNS = [
  "recipient",
  "role",
  "type",
  "title",
  "body",
  "sentAt",
  "status",
  "remaining",
  "order",
] as const;

// a row whose time is up is about to be deleted by the server — don't show it
function withTimeLeft(items: SentNotification[]) {
  const now = Date.now();
  return items
    .map((item) => ({ item, msLeft: new Date(item.expiresAt).getTime() - now }))
    .filter(({ msLeft }) => msLeft > 0);
}

interface Props {
  response: Promise<SentNotificationsResponse>;
  page: number;
}

export default async function SentNotificationsTable({ response, page }: Props) {
  const t = await getTranslations("SentNotifications");
  const locale = await getLocale();
  const isArabic = locale === "ar";

  const { data, pagination, retentionDays } = await response;

  const rows = withTimeLeft(data ?? []);

  function remainingLabel(msLeft: number) {
    // rounded to the nearest unit, so a notification sent a minute ago reads
    // as the full retention ("7 days") instead of one short
    if (msLeft >= DAY_MS) {
      return t("remainingDays", { count: Math.round(msLeft / DAY_MS) });
    }
    if (msLeft >= HOUR_MS) {
      return t("remainingHours", { count: Math.min(Math.round(msLeft / HOUR_MS), 23) });
    }
    return t("remainingLessThanHour");
  }

  if (!rows.length) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center">
          <BellOff className="w-8 h-8 text-gray-300" />
        </div>
        <p className="text-gray-400 text-sm">{t("empty", { days: retentionDays })}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-5 flex flex-col gap-4">
      <p className="text-sm text-gray-500">
        {t("total")}:{" "}
        <span className="font-semibold text-[#000709]">{pagination.total}</span>
      </p>

      <div className="overflow-x-auto">
        <Table className="min-w-[1150px]">
          <TableHeader>
            <TableRow className="h-15">
              {COLUMNS.map((column) => (
                <TableHead
                  key={column}
                  className="text-center font-semibold text-[#6A7282]"
                >
                  {t(`table.${column}`)}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map(({ item, msLeft }) => {
              const title = isArabic
                ? item.titleAr || item.title
                : item.title || item.titleAr;
              const body = isArabic
                ? item.bodyAr || item.body
                : item.body || item.bodyAr;
              const knownType = SENT_NOTIFICATION_TYPES.find(
                (known) => known === item.type,
              );
              const orderId =
                typeof item.data?.orderId === "string" ? item.data.orderId : null;

              return (
                <TableRow
                  key={item._id}
                  className="hover:bg-gray-50 h-20 text-[#000709] border-b border-gray-100"
                >
                  <TableCell className="text-center whitespace-nowrap">
                    {item.recipient ? (
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="font-medium">
                          {item.recipient.name || "-"}
                        </span>
                        {item.recipient.phone && (
                          <span className="text-xs text-gray-500" dir="ltr">
                            {item.recipient.phone}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400">{t("deletedAccount")}</span>
                    )}
                  </TableCell>

                  <TableCell className="text-center whitespace-nowrap">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        item.recipientRole === "driver"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-teal-50 text-teal-600"
                      }`}
                    >
                      {t(item.recipientRole === "driver" ? "role.driver" : "role.client")}
                    </span>
                  </TableCell>

                  <TableCell className="text-center whitespace-nowrap">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        TYPE_STYLES[item.type] ?? "bg-gray-50 text-gray-500"
                      }`}
                    >
                      {t(`types.${knownType ?? "other"}`)}
                    </span>
                  </TableCell>

                  <TableCell className="text-center font-medium max-w-[200px] whitespace-normal">
                    {title}
                  </TableCell>

                  <TableCell className="text-center text-gray-600 max-w-[320px] whitespace-normal">
                    <span className="line-clamp-2" title={body}>
                      {body}
                    </span>
                  </TableCell>

                  <TableCell className="text-center text-gray-600 whitespace-nowrap">
                    {formatRiyadhDateTime(item.createdAt, locale) ?? "-"}
                  </TableCell>

                  <TableCell className="text-center whitespace-nowrap">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        item.isRead
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {t(item.isRead ? "read" : "unread")}
                    </span>
                  </TableCell>

                  <TableCell
                    className={`text-center whitespace-nowrap ${
                      msLeft < DAY_MS ? "text-orange-600 font-medium" : "text-gray-600"
                    }`}
                  >
                    {remainingLabel(msLeft)}
                  </TableCell>

                  <TableCell className="text-center">
                    {orderId ? (
                      <Link
                        href={`/orders?orderId=${encodeURIComponent(orderId)}`}
                        aria-label={t("openOrder")}
                        title={t("openOrder")}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full text-[#0C6175] hover:bg-teal-50"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {pagination.pages > 1 && (
        <Pagination currentPage={page} totalPages={pagination.pages} />
      )}
    </div>
  );
}

import { getTranslations } from "next-intl/server";
import { getNotifications } from "@/shared/lib/services/notifications/get-notifications";
import { Bell } from "lucide-react";
import { Notification } from "@/shared/lib/types/notifications/notification";
import Pagination from "@/shared/components/pagination";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const TYPE_STYLES: Record<string, string> = {
  new_order:              "bg-teal-50 text-teal-600",
  express_order:          "bg-purple-50 text-purple-600",
  delivery_due_no_driver: "bg-red-50 text-red-600",
  overdue_unassigned:     "bg-orange-50 text-orange-600",
  order_update:           "bg-blue-50 text-blue-600",
  driver_alert:           "bg-amber-50 text-amber-600",
};

const TYPE_LABEL_KEY: Record<string, string> = {
  new_order:              "typeNewOrder",
  express_order:          "typeExpressOrder",
  delivery_due_no_driver: "typeDeliveryDueNoDriver",
  overdue_unassigned:     "typeOverdueUnassigned",
  order_update:           "typeOrderUpdate",
  driver_alert:           "typeDriverAlert",
};

function NotificationCard({
  notification,
  t,
}: {
  notification: Notification;
  t: (key: string) => string;
}) {
  return (
    <div className="bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm flex items-start gap-4">
      {/* Icon */}
      <div className="w-10 h-10 shrink-0 rounded-xl bg-[#0C6175]/10 flex items-center justify-center mt-0.5">
        <Bell className="w-5 h-5 text-[#0C6175]" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div className="space-y-0.5">
            <p className="font-semibold text-[#000709] text-sm">
              {notification.titleAr}
            </p>
            <p className="text-xs text-gray-400">{notification.title}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
            {/* Type badge */}
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                TYPE_STYLES[notification.type] ?? "bg-gray-50 text-gray-500"
              }`}
            >
              {t(TYPE_LABEL_KEY[notification.type] ?? "typeOrderUpdate")}
            </span>
            {/* Read badge */}
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                notification.isRead
                  ? "bg-green-50 text-green-600"
                  : "bg-orange-50 text-orange-500"
              }`}
            >
              {notification.isRead ? t("read") : t("unread")}
            </span>
          </div>
        </div>

        {/* Body */}
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          {notification.bodyAr}
        </p>
        <p className="text-xs text-gray-400 mt-1 leading-relaxed" dir="ltr">
          {notification.body}
        </p>

        {/* Order number tag */}
        {notification.data?.orderNumber && (
          <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 font-mono" dir="ltr">
            #{notification.data.orderNumber}
          </span>
        )}

        {/* Footer */}
        <div className="flex justify-end mt-3">
          <span className="text-xs text-gray-400">
            {formatDate(notification.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}

const LIMIT = 20;

export default async function NotificationsList({ page = 1 }: { page?: number }) {
  const t = await getTranslations("Notifications.list");
  const { data: notifications, pagination } = await getNotifications({
    page,
    limit: LIMIT,
  });

  if (!notifications?.length) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center">
          <Bell className="w-8 h-8 text-gray-300" />
        </div>
        <p className="text-gray-400 text-sm">{t("empty")}</p>
      </div>
    );
  }

  const totalPages = Math.ceil(pagination.total / LIMIT);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-gray-500">
          {t("total")}:{" "}
          <span className="font-semibold text-[#000709]">{pagination.total}</span>
        </p>
      </div>

      {notifications.map((notification) => (
        <NotificationCard
          key={notification._id}
          notification={notification}
          t={t}
        />
      ))}

      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} />
      )}
    </div>
  );
}

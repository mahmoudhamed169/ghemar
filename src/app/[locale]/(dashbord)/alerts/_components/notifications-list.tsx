import { getTranslations } from "next-intl/server";
import { getNotifications } from "@/shared/lib/services/notifications/get-notifications";
import { Bell, Truck, User } from "lucide-react";
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
  order_update: "bg-blue-50 text-blue-600",
  driver_alert: "bg-amber-50 text-amber-600",
};

function NotificationCard({
  notification,
  t,
}: {
  notification: Notification;
  t: (key: string) => string;
}) {
  const isDriver = notification.recipientModel === "Driver";

  return (
    <div className="bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm flex items-start gap-4">
      {/* Icon */}
      <div
        className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center mt-0.5 ${
          isDriver ? "bg-purple-50" : "bg-[#0C6175]/10"
        }`}
      >
        {isDriver ? (
          <Truck className="w-5 h-5 text-purple-500" />
        ) : (
          <Bell className="w-5 h-5 text-[#0C6175]" />
        )}
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
              {t(
                notification.type === "order_update"
                  ? "typeOrderUpdate"
                  : "typeDriverAlert",
              )}
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

        {/* Order status tag */}
        {notification.data?.status && (
          <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 font-mono">
            {notification.data.status}
          </span>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                isDriver
                  ? "bg-purple-50 text-purple-600"
                  : "bg-teal-50 text-teal-600"
              }`}
            >
              {isDriver ? (
                <Truck className="w-3 h-3" />
              ) : (
                <User className="w-3 h-3" />
              )}
              {isDriver ? t("recipientDriver") : t("recipientUser")}
            </span>
            <span className="font-medium text-gray-600">
              {notification.recipient.name ?? notification.recipient.phone}
            </span>
            {notification.recipient.name && (
              <>
                <span>·</span>
                <span>{notification.recipient.phone}</span>
              </>
            )}
          </div>
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
      {/* Total */}
      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-gray-500">
          {t("total")}:{" "}
          <span className="font-semibold text-[#000709]">
            {pagination.total}
          </span>
        </p>
      </div>

      {/* Cards */}
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

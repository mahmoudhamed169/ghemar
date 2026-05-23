import { getTranslations } from "next-intl/server";
import { getNotifications } from "@/shared/lib/services/notifications/get-notifications";
import { Bell, CheckCircle2 } from "lucide-react";
import { Notification } from "@/shared/lib/types/notifications/notification";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

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

          <div className="flex items-center gap-2 shrink-0">
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

        {/* Footer */}
        <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span className="font-medium text-gray-600">
              {notification.recipient.name}
            </span>
            <span>·</span>
            <span>{notification.recipient.phone}</span>
          </div>
          <span className="text-xs text-gray-400">
            {formatDate(notification.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default async function NotificationsList() {
  const t = await getTranslations("Notifications.list");
  const { data: notifications, pagination } = await getNotifications();

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
        <div className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
          <CheckCircle2 className="w-3.5 h-3.5" />
          {t("delivered")}
        </div>
      </div>

      {/* Cards */}
      {notifications.map((notification) => (
        <NotificationCard
          key={notification._id}
          notification={notification}
          t={t}
        />
      ))}
    </div>
  );
}

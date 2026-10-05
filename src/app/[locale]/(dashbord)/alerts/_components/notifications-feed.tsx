"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Bell, CheckCheck } from "lucide-react";
import { toast } from "sonner";
import { Notification } from "@/shared/lib/types/notifications/notification";
import { formatRiyadhDateTime } from "@/shared/lib/utils/riyadh-time";
import { useRealtimeNotifications } from "@/shared/providers/components/realtime-notifications-provider";

const TYPE_STYLES: Record<string, string> = {
  new_order:              "bg-teal-50 text-teal-600",
  express_order:          "bg-purple-50 text-purple-600",
  delivery_due_no_driver: "bg-red-50 text-red-600",
  overdue_unassigned:     "bg-orange-50 text-orange-600",
  order_update:           "bg-blue-50 text-blue-600",
  driver_alert:           "bg-amber-50 text-amber-600",
  system:                 "bg-slate-100 text-slate-600",
};

const TYPE_LABEL_KEY: Record<string, string> = {
  new_order:              "typeNewOrder",
  express_order:          "typeExpressOrder",
  delivery_due_no_driver: "typeDeliveryDueNoDriver",
  overdue_unassigned:     "typeOverdueUnassigned",
  order_update:           "typeOrderUpdate",
  driver_alert:           "typeDriverAlert",
  system:                 "typeSystem",
};

function NotificationCard({
  notification,
  unread,
  onRead,
}: {
  notification: Notification;
  unread: boolean;
  onRead: () => void;
}) {
  const t = useTranslations("Notifications.list");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const title = isArabic
    ? notification.titleAr || notification.title
    : notification.title || notification.titleAr;
  const body = isArabic
    ? notification.bodyAr || notification.body
    : notification.body || notification.bodyAr;

  return (
    <div
      onClick={unread ? onRead : undefined}
      className={`bg-white rounded-2xl px-5 py-4 border shadow-sm flex items-start gap-4 ${
        unread ? "border-[#0C6175]/40 cursor-pointer" : "border-gray-100"
      }`}
    >
      {/* Icon */}
      <div className="w-10 h-10 shrink-0 rounded-xl bg-[#0C6175]/10 flex items-center justify-center mt-0.5">
        <Bell className="w-5 h-5 text-[#0C6175]" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <p className="font-semibold text-[#000709] text-sm flex items-center gap-2">
            {unread && (
              <span
                className="w-2 h-2 shrink-0 rounded-full bg-[#F5A623]"
                title={t("unread")}
              />
            )}
            {title}
          </p>

          <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
            {/* Type badge */}
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                TYPE_STYLES[notification.type] ?? "bg-gray-50 text-gray-500"
              }`}
            >
              {t(TYPE_LABEL_KEY[notification.type] ?? "typeOther")}
            </span>
          </div>
        </div>

        {/* Body */}
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">{body}</p>

        {/* Order number tag */}
        {notification.data?.orderNumber && (
          <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 font-mono" dir="ltr">
            #{notification.data.orderNumber}
          </span>
        )}

        {/* Footer */}
        <div className="flex justify-end mt-3">
          <span className="text-xs text-gray-400">
            {formatRiyadhDateTime(notification.createdAt, locale) ?? ""}
          </span>
        </div>
      </div>
    </div>
  );
}

interface NotificationsFeedProps {
  notifications: Notification[];
  total: number;
  page: number;
}

export default function NotificationsFeed({
  notifications,
  total,
  page,
}: NotificationsFeedProps) {
  const t = useTranslations("Notifications.list");
  const router = useRouter();
  const { liveNotifications, unreadCount, isUnread, markRead, markAllRead } =
    useRealtimeNotifications();

  // live notifications go on top of the first page, unless the server list already has them
  const fetchedIds = new Set(notifications.map((notification) => notification._id));
  const fresh = liveNotifications.filter(
    (notification) => !fetchedIds.has(notification._id),
  );
  const items = page === 1 ? [...fresh, ...notifications] : notifications;

  async function handleMarkAllRead() {
    try {
      await markAllRead(items.map((notification) => notification._id));
      router.refresh();
    } catch {
      toast.error(t("markAllReadError"));
    }
  }

  if (!items.length) {
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
    <>
      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-gray-500">
          {t("total")}:{" "}
          <span className="font-semibold text-[#000709]">{total + fresh.length}</span>
        </p>

        {(unreadCount > 0 || items.some(isUnread)) && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-1.5 text-sm text-[#0C6175] hover:underline"
          >
            <CheckCheck className="w-4 h-4" />
            {t("markAllRead")}
          </button>
        )}
      </div>

      {items.map((notification) => (
        <NotificationCard
          key={notification._id}
          notification={notification}
          unread={isUnread(notification)}
          onRead={() => markRead(notification)}
        />
      ))}
    </>
  );
}

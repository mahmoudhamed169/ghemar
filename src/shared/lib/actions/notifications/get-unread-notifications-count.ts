"use server";

import { getNotifications } from "../../services/notifications/get-notifications";
import { isStoredNotificationId } from "../../utils/notification-id";

// The API has no unread-count endpoint, so count unread items in the latest page.
export async function getUnreadNotificationsCountAction(): Promise<number> {
  const { data } = await getNotifications({ page: 1, limit: 50 });

  return (data ?? []).filter(
    (notification) => !notification.isRead && isStoredNotificationId(notification._id),
  ).length;
}

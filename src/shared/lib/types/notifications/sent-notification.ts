// Log of the notifications sent to clients' and drivers' phones. The server
// deletes each one 7 days after it was sent, so the list only covers that window.

export type SentRecipientRole = "client" | "driver";

export const SENT_NOTIFICATION_TYPES = [
  "order_update",
  "driver_assigned",
  "bags_delivered",
  "delivery_complete",
  "payment_success",
  "payment_failed",
  "promo_offer",
  "delay_alert",
  "driver_alert",
  "new_order",
  "system",
] as const;

export type SentNotificationType =
  | (typeof SENT_NOTIFICATION_TYPES)[number]
  // the backend may add new types — the UI falls back to a default label
  | (string & {});

export interface SentNotificationRecipient {
  _id: string;
  name: string | null;
  phone: string | null;
}

export interface SentNotification {
  _id: string;
  recipientRole: SentRecipientRole;
  /** null when the account was deleted after the notification was sent */
  recipient: SentNotificationRecipient | null;
  type: SentNotificationType;
  title: string;
  titleAr: string;
  body: string;
  bodyAr: string;
  data?: { orderId?: string } & Record<string, unknown>;
  isRead: boolean;
  createdAt: string;
  /** createdAt + retention — when the server deletes it */
  expiresAt: string;
}

export interface SentNotificationsParams {
  page?: number;
  limit?: number;
  recipientRole?: SentRecipientRole;
  type?: string;
  search?: string;
  recipientId?: string;
  orderId?: string;
}

export interface SentNotificationsResponse {
  success: boolean;
  message: string;
  data: SentNotification[];
  pagination: { page: number; limit: number; total: number; pages: number };
  retentionDays: number;
  retentionHours: number;
}

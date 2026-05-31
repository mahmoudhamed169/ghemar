export type RecipientRole = "client" | "driver" | "admin" | "all";
export type NotificationType = "system" | "order" | "promo";

export interface NotificationRecipient {
  _id: string;
  phone: string;
  name: string;
}

export interface Notification {
  _id: string;
  recipient: NotificationRecipient;
  recipientModel: string;
  type: NotificationType;
  title: string;
  titleAr: string;
  body: string;
  bodyAr: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface NotificationPagination {
  page: string;
  limit: string;
  total: number;
}

export interface NotificationsResponse {
  success: boolean;
  message: string;
  data: Notification[];
  pagination: NotificationPagination;
}

export interface CreateNotificationBody {
  recipientId: string;
  recipientRole: RecipientRole;
  title: string;
  titleAr: string;
  body: string;
  bodyAr: string;
  type: NotificationType;
  data?: Record<string, unknown>;
}

export interface CreateNotificationResponse {
  success: boolean;
  message: string;
  data: Notification;
}

export type RecipientRole = "client" | "driver" | "admin" | "all";
export type NotificationType = "order_update" | "driver_alert";
export type RecipientModel = "User" | "Driver";

export interface NotificationRecipient {
  _id: string;
  phone: string;
  name?: string;
}

export interface NotificationData {
  orderId?: string;
  status?: string;
}

export interface Notification {
  _id: string;
  recipient: NotificationRecipient;
  recipientModel: RecipientModel;
  type: NotificationType;
  title: string;
  titleAr: string;
  body: string;
  bodyAr: string;
  data?: NotificationData;
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

export type CreateNotificationType = "system" | "promo" | "order_update" | "driver_alert";

export interface CreateNotificationBody {
  recipientId: string;
  recipientRole: RecipientRole;
  title: string;
  titleAr: string;
  body: string;
  bodyAr: string;
  type: CreateNotificationType;
  data?: Record<string, unknown>;
}

export interface CreateNotificationResponse {
  success: boolean;
  message: string;
  data: Notification;
}

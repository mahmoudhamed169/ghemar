export type RecipientRole = "client" | "driver" | "admin" | "all";
export type NotificationType =
  | "new_order"
  | "express_order"
  | "delivery_due_no_driver"
  | "overdue_unassigned"
  | "order_update"
  | "driver_alert";

export interface NotificationData {
  orderId?: string;
  orderNumber?: string;
  status?: string;
}

export interface Notification {
  _id: string;
  type: NotificationType;
  title: string;
  titleAr: string;
  body: string;
  bodyAr: string;
  data?: NotificationData;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationPagination {
  page: number;
  limit: number;
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

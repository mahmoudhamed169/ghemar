// Admin notifications of type "order_update" are told apart by data.event.

/** about an order's delivery slot */
export const DELIVERY_EVENTS = [
  "delivery_time_chosen",
  "delivery_due_soon",
  "delivery_due",
] as const;

/** automatic assignment is on but no driver was available — needs a manual one */
export const AUTO_ASSIGN_FAILED_EVENT = "auto_assign_failed";

export function isDeliveryEvent(event?: string) {
  return !!event && (DELIVERY_EVENTS as readonly string[]).includes(event);
}

/** clicking one of these opens its order */
export function opensOrder(event?: string) {
  return isDeliveryEvent(event) || event === AUTO_ASSIGN_FAILED_EVENT;
}

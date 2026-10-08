// Admin notifications about an order's delivery slot (type "order_update",
// told apart by data.event).
export const DELIVERY_EVENTS = [
  "delivery_time_chosen",
  "delivery_due_soon",
  "delivery_due",
] as const;

export function isDeliveryEvent(event?: string) {
  return !!event && (DELIVERY_EVENTS as readonly string[]).includes(event);
}

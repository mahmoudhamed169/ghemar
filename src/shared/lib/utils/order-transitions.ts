import { OrderStatus, OrderType } from "../types/orders/order";

const STATIC_TRANSITIONS: Partial<Record<OrderStatus, OrderStatus[]>> = {
  pending:                         ["confirmed", "cancelled"],
  confirmed:                       ["driver_assigned", "awaiting_payment", "cancelled"],
  awaiting_payment:                ["confirmed", "cancelled"],

  // Laundry pickup flow
  driver_on_way_to_pickup:         ["driver_arrived_at_pickup"],
  driver_arrived_at_pickup:        ["picked_up_from_customer"],
  picked_up_from_customer:         ["on_way_to_laundry"],
  on_way_to_laundry:               ["delivered_to_laundry"],
  delivered_to_laundry:            ["at_laundry"],
  at_laundry:                      ["ready_for_return"],
  ready_for_return:                ["driver_on_way_to_laundry_pickup"],
  driver_on_way_to_laundry_pickup: ["picked_from_laundry"],
  picked_from_laundry:             ["on_way_to_customer"],
  on_way_to_customer:              ["driver_arrived_at_customer"],
  driver_arrived_at_customer:      ["delivered_to_customer"],
  delivered_to_customer:           ["completed", "problem_reported"],

  // Package delivery flow
  driver_preparing_bags:           ["driver_on_way_to_customer"],
  driver_on_way_to_customer:       ["bags_delivered_and_linked"],
  bags_delivered_and_linked:       ["first_bag_collected"],
  first_bag_collected:             ["completed", "problem_reported"],

  // Terminals — لا انتقال
  completed:                       [],
  cancelled:                       [],
  problem_reported:                [],
};

const DRIVER_ASSIGNED_NEXT: Record<OrderType, OrderStatus[]> = {
  laundry_pickup:   ["driver_on_way_to_pickup"],
  package_delivery: ["driver_preparing_bags"],
};

export function getNextStatuses(
  currentStatus: OrderStatus,
  orderType: OrderType,
): OrderStatus[] {
  if (currentStatus === "driver_assigned") {
    return DRIVER_ASSIGNED_NEXT[orderType] ?? [];
  }
  return STATIC_TRANSITIONS[currentStatus] ?? [];
}

export function isTerminalStatus(status: OrderStatus): boolean {
  return status === "completed" || status === "cancelled" || status === "problem_reported";
}

import { OrdersParams, OrderStatus } from "../../types/orders/order";
import { getOrders } from "./get-orders";

export type OrdersStatsFilters = Omit<OrdersParams, "page" | "limit" | "status">;

export interface OrdersStats {
  total: number;
  active: number;
  completed: number;
  problem: number;
}

/**
 * There is no orders stats endpoint yet, so each figure is the real
 * `pagination.total` of GET /api/admin/orders for one status (limit=1),
 * using the same filters as the table. "Active" is everything that is not
 * in a terminal status (completed / cancelled / problem_reported).
 */
export async function getOrdersStats(filters: OrdersStatsFilters): Promise<OrdersStats> {
  const count = (status?: OrderStatus) =>
    getOrders({ ...filters, status, page: 1, limit: 1 }).then((r) => r.pagination.total);

  const [total, completed, cancelled, problem] = await Promise.all([
    count(),
    count("completed"),
    count("cancelled"),
    count("problem_reported"),
  ]);

  return {
    total,
    active: Math.max(total - completed - cancelled - problem, 0),
    completed,
    problem,
  };
}

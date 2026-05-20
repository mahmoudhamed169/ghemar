import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getTranslations } from "next-intl/server";
import OrderPriorityBadge from "./order-priority-badge";
import OrderStatusBadge from "./order-status-badge";
import OrderStatusToggle from "./order-status-toggle";
import OrderActions from "./order-actions";
import { getOrders } from "@/shared/lib/services/orders/get-orders";
import { Order, OrderStatus } from "@/shared/lib/types/orders/order";
import OrderSortAction from "./order-sort-action";

interface Props {
  page: number;
  search?: string;
  status?: OrderStatus;
  isNewClient?: boolean;
  isExpressWash?: boolean;
}

export default async function OrdersTableBody({
  page,
  search,
  status,
  isNewClient,
  isExpressWash,
}: Props) {
  const [{ data: orders }, t] = await Promise.all([
    getOrders({ page, search, status, isNewClient, isExpressWash }),
    getTranslations("orders.table"),
  ]);

  if (!orders.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={7}
            className="text-center text-gray-400 py-12 text-sm"
          >
            {t("no_orders")}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {orders.map((order: Order, index: number) => (
        <TableRow
          key={order._id}
          className="hover:bg-gray-50 h-20 text-[#000709] border-b border-gray-100"
        >
          <TableCell className="text-center text-sm text-gray-500">
            {(page - 1) * 20 + index + 1}
          </TableCell>
          <TableCell className="text-center font-medium text-sm">
            {order.orderNumber}
          </TableCell>
          <TableCell className="text-center font-medium">
            {order.driver?.name ?? t("no_driver")}
          </TableCell>
          <TableCell className="text-center">
            <OrderPriorityBadge priority={order.isExpressWash} />
          </TableCell>
          <TableCell className="text-center">
            <OrderStatusBadge status={order.status} />
          </TableCell>
          <TableCell className="text-center">
            <OrderStatusToggle
              currentStatus={order.status}
              orderId={order._id}
            />
          </TableCell>

          <TableCell className="text-center">
            <OrderSortAction orderId={order._id} />
          </TableCell>
          <TableCell className="text-center">
            <OrderActions order={order} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

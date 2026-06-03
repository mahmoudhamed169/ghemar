import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getTranslations } from "next-intl/server";
import OrderPriorityBadge from "./order-priority-badge";
import OrderStatusBadge from "./order-status-badge";
import OrderStatusChanger from "./order-status-changer";
import OrderActions from "./order-actions";
import { Order } from "@/shared/lib/types/orders/order";
import OrderSortAction from "./order-sort-action";

interface Props {
  orders: Order[];
  page: number;
}

export default async function OrdersTableBody({ orders, page }: Props) {
  const t = await getTranslations("orders.table");

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
            <OrderStatusChanger
              orderId={order._id}
              currentStatus={order.status}
              orderType={order.orderType}
              isSorted={order.sortedItems.length > 0}
            />
          </TableCell>

          <TableCell className="text-center">
            <OrderSortAction
              orderId={order._id}
              isSorted={order.sortedItems.length > 0}
              status={order.status}
            />
          </TableCell>

          <TableCell className="text-center">
            <OrderActions order={order} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

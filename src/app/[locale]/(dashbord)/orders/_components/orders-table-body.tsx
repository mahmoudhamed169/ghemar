import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getTranslations, getLocale } from "next-intl/server";
import { ShoppingBag } from "lucide-react";

function formatDate(dateStr: string, locale: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(locale === "ar" ? "ar-SA" : "en-GB", {
    day: "numeric",
    month: "short",
  });
}
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
  const locale = await getLocale();

  if (!orders.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={9}
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
            <div className="flex items-center justify-center gap-1.5">
              {order.orderNumber}
              {order.hasBagsDifference && (
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-sm px-2 py-1 rounded-full font-bold shrink-0">
                  <ShoppingBag className="w-4 h-4" />
                  {order.bagsDifferenceCount}
                </span>
              )}
            </div>
          </TableCell>

          <TableCell className="text-center text-sm">
            {order.pickup?.scheduledDate ? (
              <div className="flex flex-col items-center leading-tight">
                <span>{formatDate(order.pickup.scheduledDate, locale)}</span>
                <span className="text-gray-400 text-xs">{order.pickup.scheduledTime}</span>
              </div>
            ) : (
              <span className="text-gray-300">—</span>
            )}
          </TableCell>

          <TableCell className="text-center text-sm">
            {order.delivery?.scheduledDate ? (
              <div className="flex flex-col items-center leading-tight">
                <span>{formatDate(order.delivery.scheduledDate, locale)}</span>
                <span className="text-gray-400 text-xs">{order.delivery.scheduledTime}</span>
              </div>
            ) : (
              <span className="text-gray-300">—</span>
            )}
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

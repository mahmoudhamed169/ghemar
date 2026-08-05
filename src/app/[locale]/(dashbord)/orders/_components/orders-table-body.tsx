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

function formatTime(timeStr: string, locale: string) {
  if (!timeStr) return null;
  if (/^\d{2}:\d{2}/.test(timeStr)) return timeStr.slice(0, 5);
  const d = new Date(timeStr);
  if (isNaN(d.getTime())) return timeStr;
  return d.toLocaleTimeString(locale === "ar" ? "ar-SA" : "en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: locale === "ar",
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
            colSpan={10}
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

          {/* Pickup: actualPickupTime → done; estimatedPickupTime → pending */}
          <TableCell className="text-center">
            {order.actualPickupTime ? (
              <div className="flex flex-col items-center leading-tight gap-0.5">
                <span className="text-lg font-semibold text-emerald-700">{formatDate(order.actualPickupTime, locale)}</span>
                <span className="text-emerald-500 text-base font-medium">{formatTime(order.actualPickupTime, locale)}</span>
              </div>
            ) : order.estimatedPickupTime ? (
              <div className="flex flex-col items-center leading-tight gap-0.5">
                <span className="text-lg font-semibold text-gray-600">{formatDate(order.estimatedPickupTime, locale)}</span>
                <span className="text-gray-400 text-base font-medium">{formatTime(order.estimatedPickupTime, locale)}</span>
              </div>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-600 border border-amber-200 whitespace-nowrap">
                {t("no_pickup_date")}
              </span>
            )}
          </TableCell>

          {/* Delivery: scheduledDate from chosen slot */}
          <TableCell className="text-center">
            {order.delivery?.scheduledDate ? (
              <div className="flex flex-col items-center leading-tight gap-0.5">
                <span className="text-lg font-semibold text-gray-800">{formatDate(order.delivery.scheduledDate, locale)}</span>
                {order.chosenDeliverySlot && (
                  <span className="text-gray-400 text-base font-medium">
                    {formatTime(order.chosenDeliverySlot.start, locale)} – {formatTime(order.chosenDeliverySlot.end, locale)}
                  </span>
                )}
              </div>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-50 text-slate-500 border border-slate-200 whitespace-nowrap">
                {t("no_delivery_date")}
              </span>
            )}
          </TableCell>

          <TableCell className="text-center text-sm">
            {order.branchId?.nameAr || order.branchId?.name || <span className="text-gray-300">—</span>}
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

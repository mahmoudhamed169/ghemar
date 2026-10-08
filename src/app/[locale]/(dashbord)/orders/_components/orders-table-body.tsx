import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getTranslations, getLocale } from "next-intl/server";
import { ShoppingBag } from "lucide-react";
import { formatRiyadhDate, formatRiyadhTime } from "@/shared/lib/utils/riyadh-time";

function formatDate(dateStr: string, locale: string) {
  return formatRiyadhDate(dateStr, locale, { day: "numeric", month: "short" }) ?? dateStr;
}

function formatTime(timeStr: string, locale: string) {
  if (!timeStr) return null;
  // plain "HH:mm" values are already local slot times
  if (/^\d{2}:\d{2}/.test(timeStr)) return timeStr.slice(0, 5);
  return formatRiyadhTime(timeStr, locale) ?? timeStr;
}
import OrderPriorityBadge from "./order-priority-badge";
import OrderStatusBadge from "./order-status-badge";
import OrderStatusChanger from "./order-status-changer";
import OrderActions from "./order-actions";
import { Order } from "@/shared/lib/types/orders/order";
import OrderSortAction from "./order-sort-action";
import {
  DeliverySlotText,
  DeliveryStateBadge,
  OrderDeliveryRow,
  SetDeliveryTimeButton,
} from "./order-delivery-state";

interface Props {
  orders: Order[];
  /** rows before this page: (page - 1) * pageSize */
  offset: number;
}

export default async function OrdersTableBody({ orders, offset }: Props) {
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
      {orders.map((order: Order, index: number) => {
        const district = order.pickup?.address?.area || order.delivery?.address?.area;
        // only what the delivery widgets need crosses to the client
        const deliveryOrder = {
          _id: order._id,
          deliveryState: order.deliveryState,
          chosenDeliverySlot: order.chosenDeliverySlot,
          canSetDeliveryTime: order.canSetDeliveryTime,
        };
        return (
        <OrderDeliveryRow key={order._id} order={deliveryOrder}>
          <TableCell className="text-center text-sm text-gray-500">
            {offset + index + 1}
          </TableCell>

          <TableCell className="text-center font-medium text-sm">
            <div className="flex flex-col items-center gap-1">
              <span
                className="max-w-44 truncate text-sm font-semibold text-[#000709]"
                title={order.client?.name || undefined}
              >
                {order.client?.name || t("no_value")}
              </span>
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-xs text-gray-500" dir="ltr">
                  {order.orderNumber}
                </span>
                {order.hasBagsDifference && (
                  <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-bold shrink-0">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    {order.bagsDifferenceCount}
                  </span>
                )}
              </div>
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

          {/* Delivery: the chosen slot, its live state and the admin's set/edit action */}
          <TableCell className="text-center">
            <div className="flex flex-col items-center gap-1.5">
              {order.chosenDeliverySlot ? (
                <DeliverySlotText slot={order.chosenDeliverySlot} />
              ) : order.deliveryState === "not_chosen" ? null : order.delivery?.scheduledDate ? (
                <div className="flex flex-col items-center leading-tight gap-0.5">
                  <span className="text-lg font-semibold text-gray-800">{formatDate(order.delivery.scheduledDate, locale)}</span>
                  <span className="text-gray-400 text-sm">{t("slot_not_set")}</span>
                </div>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-50 text-slate-500 border border-slate-200 whitespace-nowrap">
                  {t("no_delivery_date")}
                </span>
              )}
              <DeliveryStateBadge order={deliveryOrder} />
              <SetDeliveryTimeButton order={deliveryOrder} />
            </div>
          </TableCell>

          <TableCell className="text-center text-sm">
            <div className="flex flex-col items-center gap-0.5">
              <span>
                {order.branchId?.nameAr || order.branchId?.name || (
                  <span className="text-gray-300">{t("no_value")}</span>
                )}
              </span>
              <span
                className="max-w-40 truncate text-xs text-gray-400"
                title={district || undefined}
              >
                {district || t("no_value")}
              </span>
            </div>
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
              isSorted={(order.sortedItems?.length ?? 0) > 0}
            />
          </TableCell>

          <TableCell className="text-center">
            <OrderSortAction
              orderId={order._id}
              isSorted={(order.sortedItems?.length ?? 0) > 0}
              status={order.status}
            />
          </TableCell>

          <TableCell className="text-center">
            <OrderActions order={order} />
          </TableCell>
        </OrderDeliveryRow>
        );
      })}
    </TableBody>
  );
}

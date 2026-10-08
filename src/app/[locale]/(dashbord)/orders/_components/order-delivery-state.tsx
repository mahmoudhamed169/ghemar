"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CalendarClock } from "lucide-react";
import { TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Order } from "@/shared/lib/types/orders/order";
import { useDeliveryClock } from "@/shared/lib/hooks/orders/use-delivery-clock";
import { minutesUntil, resolveDeliveryState } from "@/shared/lib/utils/delivery-state";
import { formatRiyadhDate, formatRiyadhTimeRange } from "@/shared/lib/utils/riyadh-time";
import SetDeliveryTimeDialog from "./set-delivery-time-dialog";

type DeliveryOrder = Pick<
  Order,
  "_id" | "deliveryState" | "chosenDeliverySlot" | "canSetDeliveryTime"
>;

/** the API state, moved forward as the slot gets closer (shared 30s clock) */
function useLiveDeliveryState(order: DeliveryOrder) {
  const now = useDeliveryClock();
  const slotStart = order.chosenDeliverySlot?.start;
  const state =
    now === null
      ? (order.deliveryState ?? null)
      : resolveDeliveryState(order.deliveryState, slotStart, now);
  const minutesLeft =
    state === "due_soon" && slotStart && now !== null ? minutesUntil(slotStart, now) : null;
  return { state, minutesLeft };
}

// a light tint plus a thin line on the leading edge; hover stays visible on top
const ROW_TINT: Record<string, string> = {
  due_soon: "bg-amber-400/10 hover:bg-amber-400/20 border-s-amber-400",
  due: "bg-emerald-500/10 hover:bg-emerald-500/20 border-s-emerald-500",
};

/** an orders-table row, tinted while its delivery slot is close or reached */
export function OrderDeliveryRow({
  order,
  children,
}: {
  order: DeliveryOrder;
  children: React.ReactNode;
}) {
  const { state } = useLiveDeliveryState(order);

  return (
    <TableRow
      className={cn(
        "hover:bg-gray-50 h-20 text-[#000709] border-b border-gray-100",
        // "!" keeps the edge line on the last row, where the table drops row borders
        "border-s-[3px]! border-s-transparent transition-colors duration-300",
        state && ROW_TINT[state],
      )}
    >
      {children}
    </TableRow>
  );
}

/** text badge for the delivery state — the tint never carries the meaning alone */
export function DeliveryStateBadge({ order }: { order: DeliveryOrder }) {
  const t = useTranslations("orders.delivery_time");
  const { state, minutesLeft } = useLiveDeliveryState(order);

  if (state === "due_soon") {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 whitespace-nowrap tabular-nums">
        {minutesLeft === null ? t("due_soon") : t("minutes_left", { count: minutesLeft })}
      </span>
    );
  }
  if (state === "due") {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 whitespace-nowrap">
        {t("due")}
      </span>
    );
  }
  if (state === "not_chosen") {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 whitespace-nowrap">
        {t("not_chosen")}
      </span>
    );
  }
  return null;
}

/** "Thursday 9 Oct" + "4:00 pm – 6:00 pm" + who chose it */
export function DeliverySlotText({
  slot,
  className,
}: {
  slot: NonNullable<Order["chosenDeliverySlot"]>;
  className?: string;
}) {
  const t = useTranslations("orders.delivery_time");
  const locale = useLocale();

  return (
    <div className={cn("flex flex-col items-center leading-tight gap-0.5", className)}>
      <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
        {formatRiyadhDate(slot.start, locale, {
          weekday: "long",
          day: "numeric",
          month: "short",
        })}
      </span>
      <span className="text-sm text-gray-500 font-medium whitespace-nowrap">
        {formatRiyadhTimeRange(slot.start, slot.end, locale)}
      </span>
      <span className="text-[11px] text-gray-400 whitespace-nowrap">
        {t(slot.chosenBy === "admin" ? "chosen_by_admin" : "chosen_by_client")}
      </span>
    </div>
  );
}

/** "set" / "edit delivery time" — renders nothing unless the admin is allowed to */
export function SetDeliveryTimeButton({
  order,
  className,
}: {
  order: DeliveryOrder;
  className?: string;
}) {
  const t = useTranslations("orders.delivery_time");
  const [open, setOpen] = useState(false);

  if (!order.canSetDeliveryTime) return null;

  // only a slot an admin set can be edited; a client's choice is never offered
  const adminSlot =
    order.chosenDeliverySlot?.chosenBy === "admin" ? order.chosenDeliverySlot : undefined;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center gap-1 text-xs font-medium text-[#0C6175] hover:underline whitespace-nowrap",
          className,
        )}
      >
        <CalendarClock className="w-3.5 h-3.5" />
        {adminSlot ? t("edit") : t("set")}
      </button>
      <SetDeliveryTimeDialog
        orderId={order._id}
        currentSlot={adminSlot}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}

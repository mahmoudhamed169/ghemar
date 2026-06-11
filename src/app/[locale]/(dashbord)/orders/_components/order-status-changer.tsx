"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, Loader2, UserCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderStatus, OrderType } from "@/shared/lib/types/orders/order";
import {
  getNextStatuses,
  isTerminalStatus,
} from "@/shared/lib/utils/order-transitions";
import { useUpdateOrderStatus } from "@/shared/lib/hooks/orders/use-update-order-status";
import OrderStatusBadge from "./order-status-badge";
import AssignDriverDialog from "./assign-driver-dialog";

interface Props {
  orderId: string;
  currentStatus: OrderStatus;
  orderType: OrderType;
  isSorted: boolean;
}

export default function OrderStatusChanger({
  orderId,
  currentStatus,
  orderType,
  isSorted,
}: Props) {
  const t = useTranslations("orders.status");
  const [confirmedStatus, setConfirmedStatus] = useState(currentStatus);
  const [assignOpen, setAssignOpen] = useState(false);
  const { mutate: updateStatus, isPending } = useUpdateOrderStatus();

  useEffect(() => {
    setConfirmedStatus(currentStatus);
  }, [currentStatus]);

  const nextStatuses = getNextStatuses(confirmedStatus, orderType);
  const terminal = isTerminalStatus(confirmedStatus);

  if (terminal || nextStatuses.length === 0) {
    return <span className="text-gray-300 text-sm select-none">—</span>;
  }

  if (confirmedStatus === "ready_for_return") {
    return (
      <>
        <button
          onClick={() => setAssignOpen(true)}
          disabled={isPending}
          className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm text-gray-600 font-medium transition disabled:opacity-50"
        >
          <UserCheck className="w-3.5 h-3.5 shrink-0" />
          <span>تعيين سائق</span>
        </button>
        <AssignDriverDialog
          orderId={orderId}
          open={assignOpen}
          onOpenChange={setAssignOpen}
          onSuccess={() => setConfirmedStatus("driver_on_way_to_laundry_pickup")}
        />
      </>
    );
  }

  const handleSelect = (newStatus: OrderStatus) => {
    if (newStatus === "driver_assigned") {
      setAssignOpen(true);
      return;
    }
    if (confirmedStatus === "delivered_to_laundry" && !isSorted) return;

    updateStatus(
      { orderId, status: newStatus },
      {
        onSuccess: (result) => {
          if (result.success) setConfirmedStatus(newStatus);
        },
      },
    );
  };

  return (
    <>
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          <button
            disabled={isPending}
            className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm text-gray-600 font-medium transition disabled:opacity-50 max-w-45 truncate"
          >
            {isPending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
            ) : (
              <>
                <span className="truncate">{t(confirmedStatus)}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              </>
            )}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center" className="min-w-50 p-1.5">
          {nextStatuses.map((status) => {
            const blocked =
              status !== "driver_assigned" &&
              confirmedStatus === "delivered_to_laundry" &&
              !isSorted;

            return (
              <DropdownMenuItem
                key={status}
                disabled={blocked}
                onSelect={() => handleSelect(status)}
                className="cursor-pointer rounded-lg py-2 px-3 focus:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <OrderStatusBadge status={status} />
                {blocked && (
                  <span className="text-xs text-gray-400 mr-auto whitespace-nowrap">
                    يلزم الفرز أولاً
                  </span>
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* router.refresh() is handled inside useAssignDriver; only update local optimistic state here */}
      <AssignDriverDialog
        orderId={orderId}
        open={assignOpen}
        onOpenChange={setAssignOpen}
        onSuccess={() => setConfirmedStatus("driver_assigned")}
      />
    </>
  );
}

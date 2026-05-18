"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderStatus } from "@/shared/lib/types/orders/order";

const statusConfig: Record<OrderStatus, { label: string; color: string }> = {
  pending: { label: "قيد التعيين", color: "text-[#6B7280]" },
  driver_assigned: { label: "تم تعيين سائق", color: "text-[#1D4ED8]" },
  driver_on_way_to_pickup: { label: "قيد الاستلام", color: "text-[#B45309]" },
  picked_up_from_customer: { label: "تم الاستلام", color: "text-[#CA8A04]" },
  in_laundry: { label: "في المغسلة", color: "text-[#0C6175]" },
  driver_on_way_to_delivery: { label: "قيد التسليم", color: "text-[#7C3AED]" },
  delivered: { label: "المكتملة", color: "text-[#00C950]" },
  cancelled: { label: "الملغية", color: "text-[#DC2626]" },
};

const ALL_STATUSES = Object.keys(statusConfig) as OrderStatus[];

export default function OrderStatusToggle({
  currentStatus,
  orderId,
}: {
  currentStatus: OrderStatus;
  orderId: string;
}) {
  const handleChange = async (value: OrderStatus) => {
    // TODO: server action
    console.log(`Order ${orderId} status changed to: ${value}`);
  };

  return (
    <div className="flex justify-center items-center w-full">
      <Select
        defaultValue={currentStatus}
        onValueChange={handleChange}
        dir="rtl"
      >
        <SelectTrigger className="w-fit border-none shadow-none focus:ring-0 flex-row-reverse gap-1 hover:cursor-pointer">
          <SelectValue>
            <span
              className={`text-sm font-medium ${statusConfig[currentStatus].color}`}
            >
              {statusConfig[currentStatus].label}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="min-w-[180px] p-2" dir="rtl">
          {ALL_STATUSES.map((status) => (
            <SelectItem
              key={status}
              value={status}
              className="text-base py-3 px-4 cursor-pointer"
            >
              <span className={`font-medium ${statusConfig[status].color}`}>
                {statusConfig[status].label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { OrderStatus } from "@/shared/lib/types/orders/order";

const statusColors: Record<OrderStatus, string> = {
  pending: "text-[#6B7280]",
  driver_assigned: "text-[#1D4ED8]",
  driver_arrived_at_pickup: "text-[#F97316]",
  driver_on_way_to_pickup: "text-[#B45309]",
  picked_up_from_customer: "text-[#CA8A04]",
  in_laundry: "text-[#0C6175]",
  driver_on_way_to_delivery: "text-[#7C3AED]",
  delivered: "text-[#00C950]",
  cancelled: "text-[#DC2626]",
};

const ALL_STATUSES = Object.keys(statusColors) as OrderStatus[];

export default function OrderStatusToggle({
  currentStatus,
  orderId,
}: {
  currentStatus: OrderStatus;
  orderId: string;
}) {
  const t = useTranslations("orders.status");

  const handleChange = async (value: OrderStatus) => {
    // TODO: server action
    console.log(`Order ${orderId} status changed to: ${value}`);
  };

  const color = statusColors[currentStatus] ?? "text-gray-500";

  return (
    <div className="flex justify-center items-center w-full">
      <Select defaultValue={currentStatus} onValueChange={handleChange} dir="rtl">
        <SelectTrigger className="w-fit border-none shadow-none focus:ring-0 flex-row-reverse gap-1 hover:cursor-pointer">
          <SelectValue>
            <span className={`text-sm font-medium ${color}`}>
              {t(currentStatus)}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="min-w-[180px] p-2" dir="rtl">
          {ALL_STATUSES.map((status) => (
            <SelectItem key={status} value={status} className="text-base py-3 px-4 cursor-pointer">
              <span className={`font-medium ${statusColors[status]}`}>
                {t(status)}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
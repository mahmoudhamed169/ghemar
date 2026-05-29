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
  // Common
  pending:                          "text-[#6B7280]",
  confirmed:                        "text-[#1E40AF]",
  driver_assigned:                  "text-[#1D4ED8]",
  // Package delivery flow
  driver_preparing_bags:            "text-[#4338CA]",
  driver_on_way_to_customer:        "text-[#7C3AED]",
  bags_delivered_and_linked:        "text-[#0C6175]",
  first_bag_collected:              "text-[#0E7490]",
  // Normal laundry pickup flow
  driver_on_way_to_pickup:          "text-[#B45309]",
  driver_arrived_at_pickup:         "text-[#F97316]",
  picked_up_from_customer:          "text-[#CA8A04]",
  on_way_to_laundry:                "text-[#B45309]",
  delivered_to_laundry:             "text-[#4D7C0F]",
  at_laundry:                       "text-[#0C6175]",
  ready_for_return:                 "text-[#065F46]",
  driver_on_way_to_laundry_pickup:  "text-[#6D28D9]",
  picked_from_laundry:              "text-[#7C3AED]",
  on_way_to_customer:               "text-[#6D28D9]",
  driver_arrived_at_customer:       "text-[#BE185D]",
  delivered_to_customer:            "text-[#15803D]",
  // Terminal
  completed:                        "text-[#00C950]",
  cancelled:                        "text-[#DC2626]",
  problem_reported:                 "text-[#9F1239]",
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
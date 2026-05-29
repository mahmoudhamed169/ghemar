"use client";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/shared/lib/types/orders/order";

const STATUS_STYLES: Record<OrderStatus, string> = {
  // Common start
  pending: "bg-gray-100 text-[#6B7280] border-gray-200 hover:bg-gray-100",
  confirmed: "bg-blue-100 text-[#1E40AF] border-blue-300 hover:bg-blue-100",
  driver_assigned: "bg-blue-50 text-[#1D4ED8] border-blue-200 hover:bg-blue-50",
  awaiting_payment:
    "bg-yellow-50 text-[#B45309] border-yellow-200 hover:bg-yellow-50",

  // Package delivery flow
  driver_preparing_bags:
    "bg-indigo-50 text-[#4338CA] border-indigo-200 hover:bg-indigo-50",
  driver_on_way_to_customer:
    "bg-purple-50 text-[#7C3AED] border-purple-200 hover:bg-purple-50",
  bags_delivered_and_linked:
    "bg-teal-50 text-[#0C6175] border-teal-200 hover:bg-teal-50",
  first_bag_collected:
    "bg-cyan-50 text-[#0E7490] border-cyan-200 hover:bg-cyan-50",

  // Normal laundry pickup flow
  driver_on_way_to_pickup:
    "bg-orange-50 text-[#B45309] border-orange-200 hover:bg-orange-50",
  driver_arrived_at_pickup:
    "bg-orange-100 text-[#92400E] border-orange-300 hover:bg-orange-100",
  picked_up_from_customer:
    "bg-yellow-50 text-[#CA8A04] border-yellow-200 hover:bg-yellow-50",
  on_way_to_laundry:
    "bg-amber-50 text-[#B45309] border-amber-200 hover:bg-amber-50",
  delivered_to_laundry:
    "bg-lime-50 text-[#4D7C0F] border-lime-200 hover:bg-lime-50",
  at_laundry: "bg-teal-50 text-[#0C6175] border-teal-200 hover:bg-teal-50",
  ready_for_return:
    "bg-emerald-50 text-[#065F46] border-emerald-200 hover:bg-emerald-50",
  driver_on_way_to_laundry_pickup:
    "bg-violet-50 text-[#6D28D9] border-violet-200 hover:bg-violet-50",
  picked_from_laundry:
    "bg-purple-50 text-[#7C3AED] border-purple-200 hover:bg-purple-50",
  on_way_to_customer:
    "bg-purple-100 text-[#6D28D9] border-purple-300 hover:bg-purple-100",
  driver_arrived_at_customer:
    "bg-pink-50 text-[#BE185D] border-pink-200 hover:bg-pink-50",
  delivered_to_customer:
    "bg-green-50 text-[#15803D] border-green-200 hover:bg-green-50",

  // Terminal
  completed: "bg-green-100 text-[#00C950] border-green-300 hover:bg-green-100",
  cancelled: "bg-red-50 text-[#DC2626] border-red-200 hover:bg-red-50",
  problem_reported:
    "bg-rose-100 text-[#9F1239] border-rose-300 hover:bg-rose-100",
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const t = useTranslations("orders.status");

  return (
    <Badge
      variant="outline"
      className={`gap-1 px-3 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {t(status)}
    </Badge>
  );
}

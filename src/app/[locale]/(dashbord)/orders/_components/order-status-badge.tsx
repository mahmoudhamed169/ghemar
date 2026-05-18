"use client"
import { useTranslations } from "next-intl"
import { Badge } from "@/components/ui/badge"
import { OrderStatus } from "@/shared/lib/types/orders/order"

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending:                   "bg-gray-100 text-[#6B7280] border-gray-200 hover:bg-gray-100",
  driver_assigned:           "bg-blue-50 text-[#1D4ED8] border-blue-200 hover:bg-blue-50",
  driver_on_way_to_pickup:   "bg-orange-50 text-[#B45309] border-orange-200 hover:bg-orange-50",
  picked_up_from_customer:   "bg-yellow-50 text-[#CA8A04] border-yellow-200 hover:bg-yellow-50",
  in_laundry:                "bg-teal-50 text-[#0C6175] border-teal-200 hover:bg-teal-50",
  driver_on_way_to_delivery: "bg-purple-50 text-[#7C3AED] border-purple-200 hover:bg-purple-50",
  delivered:                 "bg-green-50 text-[#00C950] border-green-200 hover:bg-green-50",
  cancelled:                 "bg-red-50 text-[#DC2626] border-red-200 hover:bg-red-50",
}

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const t = useTranslations("orders.status")

  return (
    <Badge
      variant="outline"
      className={`gap-1 px-3 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {t(status)}
    </Badge>
  )
}
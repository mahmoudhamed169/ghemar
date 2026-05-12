// order-status-badge.tsx

import { Badge } from "@/components/ui/badge";

export type OrderStatus =
  | "قيد التعيين"
  | "قيد الاستلام"
  | "في المغسلة"
  | "قيد التسليم"
  | "المكتملة"
  | "الملغية";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const statusStyles: Record<OrderStatus, string> = {
  "قيد التعيين": "bg-gray-100 text-[#6B7280] border-gray-200 hover:bg-gray-100",
  "قيد الاستلام":
    "bg-orange-50 text-[#B45309] border-orange-200 hover:bg-orange-50",
  "في المغسلة": "bg-teal-50 text-[#0C6175] border-teal-200 hover:bg-teal-50",
  "قيد التسليم":
    "bg-purple-50 text-[#7C3AED] border-purple-200 hover:bg-purple-50",
  المكتملة: "bg-green-50 text-[#00C950] border-green-200 hover:bg-green-50",
  الملغية: "bg-red-50 text-[#DC2626] border-red-200 hover:bg-red-50",
};

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={`gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </Badge>
  );
}

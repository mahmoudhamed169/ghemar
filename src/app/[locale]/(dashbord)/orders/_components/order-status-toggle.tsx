"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type OrderStatus =
  | "قيد التعيين"
  | "قيد الاستلام"
  | "في المغسلة"
  | "قيد التسليم"
  | "المكتملة"
  | "الملغية";

const statuses: OrderStatus[] = [
  "قيد التعيين",
  "قيد الاستلام",
  "في المغسلة",
  "قيد التسليم",
  "المكتملة",
  "الملغية",
];

const statusColors: Record<OrderStatus, string> = {
  "قيد التعيين": "text-[#6B7280]", // رمادي  - لسه مش اتعين سايق
  "قيد الاستلام": "text-[#B45309]", // برتقالي - السايق في الطريق للعميل
  "في المغسلة": "text-[#0C6175]", // تيل     - الأوردر وصل المغسلة
  "قيد التسليم": "text-[#7C3AED]", // بنفسجي  - راجع للعميل
  المكتملة: "text-[#00C950]", // أخضر    - اتسلم وخلص
  الملغية: "text-[#DC2626]", // أحمر    - اتلغى
};

export default function OrderStatusToggle({
  currentStatus,
  orderId,
}: {
  currentStatus: OrderStatus;
  orderId: number;
}) {
  const handleChange = (value: OrderStatus) => {
    // TODO: call your API to update order status
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
              className={`text-sm font-medium ${statusColors[currentStatus]}`}
            >
              {currentStatus}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="min-w-[180px] p-2" dir="rtl">
          {statuses.map((status) => (
            <SelectItem
              key={status}
              value={status}
              className="text-base py-3 px-4 cursor-pointer"
            >
              <span className={`font-medium ${statusColors[status]}`}>
                {status}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

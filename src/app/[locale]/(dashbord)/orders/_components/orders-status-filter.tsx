"use client";

import { Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { type OrderStatus } from "./order-status-badge";

type FilterStatus = OrderStatus | "الكل";

const filters: FilterStatus[] = [
  "الكل",
  "قيد التعيين",
  "قيد الاستلام",
  "في المغسلة",
  "قيد التسليم",
  "المكتملة",
  "الملغية",
];

function OrdersStatusFilterInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const active = (searchParams.get("status") as FilterStatus) ?? "الكل";

  const handleSelect = (status: FilterStatus) => {
    const params = new URLSearchParams(searchParams.toString());
    if (status === "الكل") {
      params.delete("status");
    } else {
      params.set("status", status);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-1 bg-white rounded-xl p-1 h-15 w-full justify-between">
      {filters.map((status) => (
        <button
          key={status}
          onClick={() => handleSelect(status)}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap
            ${
              active === status
                ? "bg-[#0C6175] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700 hover:bg-white"
            }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
}

export default function OrdersStatusFilter() {
  return (
    <Suspense fallback={null}>
      <OrdersStatusFilterInner />
    </Suspense>
  );
}
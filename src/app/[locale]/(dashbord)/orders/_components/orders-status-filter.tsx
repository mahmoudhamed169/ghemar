"use client"
import { Suspense } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { OrderStatus } from "@/shared/lib/types/orders/order"

const STATUS_KEYS = [
  "all",
  "pending",
  "driver_assigned",
  "driver_on_way_to_pickup",
  "picked_up_from_customer",
  "in_laundry",
  "driver_on_way_to_delivery",
  "delivered",
  "cancelled",
] as const

function OrdersStatusFilterInner() {
  const t = useTranslations("orders.status")
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const activeValue = searchParams.get("status") ?? "all"

  const handleSelect = (value: OrderStatus | "all") => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "all") {
      params.delete("status")
    } else {
      params.set("status", value)
    }
    params.delete("page")
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1 bg-white rounded-xl p-1 w-full">
      {STATUS_KEYS.map((key) => (
        <button
          key={key}
          onClick={() => handleSelect(key as OrderStatus | "all")}
          className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 text-center
            ${
              activeValue === key
                ? "bg-[#0C6175] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
        >
          {t(key)}
        </button>
      ))}
    </div>
  )
}

export default function OrdersStatusFilter() {
  return (
    <Suspense fallback={null}>
      <OrdersStatusFilterInner />
    </Suspense>
  )
}
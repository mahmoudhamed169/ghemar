"use client"

import { Suspense, useState, useCallback } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { Info, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { OrderStatus } from "@/shared/lib/types/orders/order"
import OrderStatusBadge from "./order-status-badge"

// ─── Types ────────────────────────────────────────────────────────────────────

type GroupKey = "all" | "new" | "package" | "pickup" | "laundry" | "return" | "terminal"

interface Group {
  key: GroupKey
  label: string
  statuses: OrderStatus[]
}

interface FlowSection {
  label: string
  statuses: OrderStatus[]
}

// ─── Groups per variant ───────────────────────────────────────────────────────

const COMMON_NEW: Group = {
  key: "new",
  label: "جديد",
  statuses: ["pending", "confirmed", "awaiting_payment", "driver_assigned"],
}

const COMMON_TERMINAL: Group = {
  key: "terminal",
  label: "منتهي",
  statuses: ["completed", "cancelled", "problem_reported"],
}

const RETURN_STATUSES: OrderStatus[] = [
  "driver_on_way_to_laundry_pickup",
  "driver_arrived_at_laundry_pickup",
  "picked_from_laundry",
  "on_way_to_customer",
  "driver_arrived_at_customer",
  "delivered_to_customer",
]

const LAUNDRY_STATUSES: OrderStatus[] = [
  "on_way_to_laundry",
  "delivered_to_laundry",
  "at_laundry",
  "ready_for_return",
]

const COMMON_LAUNDRY: Group = {
  key: "laundry",
  label: "المغسلة",
  statuses: LAUNDRY_STATUSES,
}

const COMMON_RETURN: Group = {
  key: "return",
  label: "الإرجاع",
  statuses: RETURN_STATUSES,
}

const REGULAR_GROUPS: Group[] = [
  { key: "all", label: "الكل", statuses: [] },
  COMMON_NEW,
  {
    key: "laundry",
    label: "استلام وغسيل",
    statuses: [
      "driver_on_way_to_pickup",
      "driver_arrived_at_pickup",
      "picked_up_from_customer",
      ...LAUNDRY_STATUSES,
    ],
  },
  COMMON_RETURN,
  COMMON_TERMINAL,
]

const PACKAGE_GROUPS: Group[] = [
  { key: "all", label: "الكل", statuses: [] },
  COMMON_NEW,
  {
    key: "package",
    label: "تسليم الباكيج",
    statuses: [
      "driver_preparing_bags",
      "driver_on_way_to_customer",
      "bags_delivered_and_linked",
      "first_bag_collected",
    ],
  },
  COMMON_LAUNDRY,
  COMMON_RETURN,
  COMMON_TERMINAL,
]

// ─── Flow sections per variant ────────────────────────────────────────────────

const SHARED_LAUNDRY_SECTION: FlowSection = {
  label: "المغسلة",
  statuses: ["on_way_to_laundry", "delivered_to_laundry", "at_laundry", "ready_for_return"],
}

const SHARED_RETURN_SECTION: FlowSection = {
  label: "الإرجاع للعميل",
  statuses: [
    "driver_on_way_to_laundry_pickup",
    "driver_arrived_at_laundry_pickup",
    "picked_from_laundry",
    "on_way_to_customer",
    "driver_arrived_at_customer",
    "delivered_to_customer",
    "completed",
  ],
}

const NORMAL_FLOW_SECTIONS: FlowSection[] = [
  {
    label: "بداية الطلب",
    statuses: ["pending", "confirmed", "awaiting_payment", "driver_assigned"],
  },
  {
    label: "استلام الملابس من العميل",
    statuses: ["driver_on_way_to_pickup", "driver_arrived_at_pickup", "picked_up_from_customer"],
  },
  SHARED_LAUNDRY_SECTION,
  SHARED_RETURN_SECTION,
]

const PACKAGE_FLOW_SECTIONS: FlowSection[] = [
  {
    label: "بداية الطلب",
    statuses: ["pending", "confirmed", "awaiting_payment", "driver_assigned"],
  },
  {
    label: "تسليم الأكياس واستلام أول كيس",
    statuses: [
      "driver_preparing_bags",
      "driver_on_way_to_customer",
      "bags_delivered_and_linked",
      "first_bag_collected",
    ],
  },
  SHARED_LAUNDRY_SECTION,
  SHARED_RETURN_SECTION,
]

const UNIFIED_GROUPS: Group[] = [
  { key: "all", label: "الكل", statuses: [] },
  COMMON_NEW,
  {
    key: "package",
    label: "تسليم الأكياس",
    statuses: [
      "driver_preparing_bags",
      "driver_on_way_to_customer",
      "bags_delivered_and_linked",
      "first_bag_collected",
    ],
  },
  {
    key: "pickup",
    label: "استلام الملابس",
    statuses: [
      "driver_on_way_to_pickup",
      "driver_arrived_at_pickup",
      "picked_up_from_customer",
    ],
  },
  COMMON_LAUNDRY,
  COMMON_RETURN,
  COMMON_TERMINAL,
]

const UNIFIED_FLOW_SECTIONS: FlowSection[] = [
  {
    label: "بداية الطلب",
    statuses: ["pending", "confirmed", "awaiting_payment", "driver_assigned"],
  },
  {
    label: "تسليم الأكياس (طلبات الأكياس)",
    statuses: [
      "driver_preparing_bags",
      "driver_on_way_to_customer",
      "bags_delivered_and_linked",
      "first_bag_collected",
    ],
  },
  {
    label: "استلام الملابس من العميل (طلبات الغسيل)",
    statuses: ["driver_on_way_to_pickup", "driver_arrived_at_pickup", "picked_up_from_customer"],
  },
  SHARED_LAUNDRY_SECTION,
  SHARED_RETURN_SECTION,
]

// ─── Flow preview ─────────────────────────────────────────────────────────────

function FlowPreview({ sections }: { sections: FlowSection[] }) {
  let stepCounter = 0

  return (
    <div className="space-y-1">
      {sections.map((section, sectionIdx) => {
        const sectionStart = stepCounter
        stepCounter += section.statuses.length
        const isLast = sectionIdx === sections.length - 1

        return (
          <div key={section.label}>
            <div className="flex items-center gap-2 mb-2 mt-3">
              <span className="text-xs font-semibold text-red-500 tracking-wide">
                {section.label}
              </span>
              <div className="flex-1 h-px bg-red-100" />
            </div>

            <div className="flex flex-col">
              {section.statuses.map((status, idx) => {
                const step = sectionStart + idx + 1
                const isLastInSection = idx === section.statuses.length - 1
                const isVeryLast = isLast && isLastInSection

                return (
                  <div key={status} className="flex items-start gap-3">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-6 h-6 rounded-full bg-[#0C6175]/10 flex items-center justify-center text-xs text-[#0C6175] font-bold">
                        {step}
                      </div>
                      {!isVeryLast && (
                        <div
                          className={cn(
                            "w-px my-0.5",
                            isLastInSection ? "h-5 bg-red-200" : "h-5 bg-gray-200",
                          )}
                        />
                      )}
                    </div>
                    <div className="pb-1">
                      <OrderStatusBadge status={status} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      <div className="border-t border-dashed pt-3 mt-3 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-red-400 tracking-wide">حالات نهائية</span>
          <div className="flex-1 h-px bg-red-100" />
        </div>
        <p className="text-xs text-gray-400">تحدث في أي وقت خلال الرحلة</p>
        <div className="flex flex-wrap gap-2">
          <OrderStatusBadge status="cancelled" />
          <OrderStatusBadge status="problem_reported" />
        </div>
      </div>
    </div>
  )
}

// ─── Main filter ──────────────────────────────────────────────────────────────

function OrdersStatusFilterContent({ variant }: { variant: "regular" | "package" | "unified" }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const groups =
    variant === "unified"
      ? UNIFIED_GROUPS
      : variant === "regular"
        ? REGULAR_GROUPS
        : PACKAGE_GROUPS
  const flowSections =
    variant === "unified"
      ? UNIFIED_FLOW_SECTIONS
      : variant === "regular"
        ? NORMAL_FLOW_SECTIONS
        : PACKAGE_FLOW_SECTIONS

  const currentStatus = searchParams.get("status") ?? ""
  const initialGroup: GroupKey =
    groups.find((g) => g.statuses.includes(currentStatus as OrderStatus))?.key ?? "all"

  const [selectedGroup, setSelectedGroup] = useState<GroupKey>(initialGroup)

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (!value) params.delete(key)
      else params.set(key, value)
      params.delete("page")
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams],
  )

  const activeGroup = groups.find((g) => g.key === selectedGroup)!
  const showPills = selectedGroup !== "all"

  return (
    <div className="space-y-3">
      {/* Group tabs + preview button */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto flex-1">
          {groups.map((group) => {
            const isActive = selectedGroup === group.key
            return (
              <button
                key={group.key}
                onClick={() => {
                  setSelectedGroup(group.key)
                  if (group.key === "all") updateParam("status", null)
                  else if (!group.statuses.includes(currentStatus as OrderStatus))
                    updateParam("status", null)
                }}
                className={cn(
                  "px-3 py-2 text-sm rounded-lg border whitespace-nowrap transition-all shrink-0",
                  isActive
                    ? "bg-[#0C6175] text-white border-transparent"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50",
                )}
              >
                {group.label}
              </button>
            )
          })}
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <button className="shrink-0 flex items-center gap-1.5 px-3 py-2 text-sm text-[#0C6175] border border-[#0C6175]/30 rounded-lg hover:bg-[#0C6175]/5 transition-all whitespace-nowrap">
              <Info className="w-4 h-4" />
              تسلسل الحالات
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-100 max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>تسلسل حالات الطلب</DialogTitle>
            </DialogHeader>
            <FlowPreview sections={flowSections} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Status pills */}
      {showPills && (
        <div className="flex flex-wrap items-center gap-2">
          {activeGroup.statuses.map((status) => {
            const isSelected = currentStatus === status
            return (
              <button
                key={status}
                onClick={() => updateParam("status", isSelected ? null : status)}
                className={cn(
                  "rounded-full transition-all",
                  isSelected && "ring-2 ring-[#0C6175] ring-offset-1",
                )}
              >
                <OrderStatusBadge status={status} />
              </button>
            )
          })}
          {currentStatus && activeGroup.statuses.includes(currentStatus as OrderStatus) && (
            <button
              onClick={() => updateParam("status", null)}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-3 h-3" />
              إلغاء الفلتر
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default function OrdersStatusFilter({ variant }: { variant: "regular" | "package" | "unified" }) {
  return (
    <Suspense fallback={null}>
      <OrdersStatusFilterContent variant={variant} />
    </Suspense>
  )
}

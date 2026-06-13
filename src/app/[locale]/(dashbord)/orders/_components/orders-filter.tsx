"use client"
import { Suspense, useState, useRef, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { useTranslations } from "next-intl"

function OrdersFiltersInner() {
  const t = useTranslations("orders.filters")
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (!value) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
      params.delete("page")
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams],
  )

  const currentPriority = searchParams.get("isExpressWash") ?? "all"

  const [searchValue, setSearchValue] = useState(searchParams.get("search") ?? "")
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    clearTimeout(searchDebounceRef.current)
    searchDebounceRef.current = setTimeout(() => {
      updateParam("search", value || null)
    }, 400)
  }

  useEffect(() => {
    return () => clearTimeout(searchDebounceRef.current)
  }, [])

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
      <div className="relative flex-1">
        <Search
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          size={18}
        />
        <Input
          placeholder={t("search_placeholder")}
          value={searchValue}
          onChange={handleSearchChange}
          className="w-full bg-white h-12 sm:h-[55px] rounded-lg pr-10 border border-gray-200 shadow-sm"
        />
      </div>

      <div className="flex flex-row items-center gap-3 w-full sm:w-[300px] shrink-0">
        <p className="text-[#000709] font-medium text-[16px] sm:text-[18px] whitespace-nowrap">
          {t("priority_label")}
        </p>
        <Select
          value={currentPriority}
          onValueChange={(value) =>
            updateParam("isExpressWash", value === "all" ? null : value)
          }
        >
          <SelectTrigger className="flex-1 !h-[55px] bg-white border border-gray-200 rounded-lg shadow-sm px-3">
            <SelectValue placeholder={t("priority_all")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("priority_all")}</SelectItem>
            <SelectItem value="true">{t("priority_express")}</SelectItem>
            <SelectItem value="false">{t("priority_normal")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default function OrdersFilters() {
  return (
    <Suspense fallback={null}>
      <OrdersFiltersInner />
    </Suspense>
  )
}
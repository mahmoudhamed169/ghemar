"use client";
import { Suspense } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback } from "react";

function DriverFiltersInner() {
  const t = useTranslations("drivers.filters");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  const currentStatus = searchParams.get("status") ?? "all";

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
      <div className="relative flex-1">
        <Search
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          size={18}
        />
        <Input
          placeholder={t("search_placeholder")}
          defaultValue={searchParams.get("search") ?? ""}
          onChange={(e) => updateParam("search", e.target.value || null)}
          className="w-full bg-white h-12 sm:h-[55px] rounded-lg pr-10 border border-gray-200 shadow-sm"
        />
      </div>

      <div className="flex flex-row items-center gap-3 w-full sm:w-[340px] shrink-0">
        <p className="text-[#000709] font-medium text-[16px] sm:text-[18px] whitespace-nowrap">
          {t("status_label")}
        </p>
        <Select
          value={currentStatus}
          onValueChange={(value) =>
            updateParam("status", value === "all" ? null : value)
          }
        >
          <SelectTrigger className="flex-1 !h-[55px] bg-white border border-gray-200 rounded-lg shadow-sm text-right px-3">
            <SelectValue placeholder={t("status_all")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("status_all")}</SelectItem>
            <SelectItem value="active">{t("status_active")}</SelectItem>
            <SelectItem value="suspended">{t("status_suspended")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default function DriverFilters() {
  return (
    <Suspense fallback={null}>
      <DriverFiltersInner />
    </Suspense>
  );
}

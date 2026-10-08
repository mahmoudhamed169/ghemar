"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SENT_NOTIFICATION_TYPES } from "@/shared/lib/types/notifications/sent-notification";

function SentNotificationsFiltersInner() {
  const t = useTranslations("SentNotifications");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // any filter change goes back to the first page
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

  const currentRole = searchParams.get("recipientRole") ?? "all";
  const currentType = searchParams.get("type") ?? "all";

  const [searchValue, setSearchValue] = useState(searchParams.get("search") ?? "");
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      updateParam("search", value.trim() || null);
    }, 400);
  };

  useEffect(() => () => clearTimeout(searchDebounceRef.current), []);

  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 w-full">
      <div className="relative flex-1">
        <Search
          className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          size={18}
        />
        <Input
          placeholder={t("filters.search")}
          value={searchValue}
          onChange={handleSearchChange}
          className="w-full bg-white h-12 sm:h-[55px] rounded-lg ps-10 border border-gray-200 shadow-sm"
        />
      </div>

      <div className="flex flex-row items-center gap-3 w-full lg:w-[240px] shrink-0">
        <p className="text-[#000709] font-medium text-[16px] whitespace-nowrap">
          {t("filters.recipientLabel")}
        </p>
        <Select
          value={currentRole}
          onValueChange={(value) =>
            updateParam("recipientRole", value === "all" ? null : value)
          }
        >
          <SelectTrigger className="flex-1 !h-[55px] bg-white border border-gray-200 rounded-lg shadow-sm px-3">
            <SelectValue placeholder={t("filters.recipientAll")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filters.recipientAll")}</SelectItem>
            <SelectItem value="client">{t("role.client")}</SelectItem>
            <SelectItem value="driver">{t("role.driver")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-row items-center gap-3 w-full lg:w-[300px] shrink-0">
        <p className="text-[#000709] font-medium text-[16px] whitespace-nowrap">
          {t("filters.typeLabel")}
        </p>
        <Select
          value={currentType}
          onValueChange={(value) => updateParam("type", value === "all" ? null : value)}
        >
          <SelectTrigger className="flex-1 !h-[55px] bg-white border border-gray-200 rounded-lg shadow-sm px-3">
            <SelectValue placeholder={t("filters.typeAll")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filters.typeAll")}</SelectItem>
            {SENT_NOTIFICATION_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {t(`types.${type}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default function SentNotificationsFilters() {
  return (
    <Suspense fallback={null}>
      <SentNotificationsFiltersInner />
    </Suspense>
  );
}

"use client";

import { Suspense, useState, useRef, useEffect, useCallback } from "react";
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

function ZonesFiltersInner() {
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
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  const [searchValue, setSearchValue] = useState(searchParams.get("search") ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateParam("search", value || null);
    }, 400);
  };

  useEffect(() => () => clearTimeout(debounceRef.current), []);

  const currentStatus = searchParams.get("isActive") ?? "all";

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
      <div className="relative flex-1">
        <Search
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          size={18}
        />
        <Input
          placeholder="ابحث عن مدينة"
          value={searchValue}
          onChange={handleSearch}
          className="w-full bg-white h-12 sm:h-[55px] rounded-lg pr-10 text-right border border-gray-200 shadow-sm"
        />
      </div>

      <div className="flex flex-row items-center gap-3 w-full sm:w-[300px] shrink-0">
        <p className="text-[#000709] font-medium text-[16px] sm:text-[18px] whitespace-nowrap">
          فلتر حسب الحالة
        </p>
        <Select
          value={currentStatus}
          onValueChange={(value) =>
            updateParam("isActive", value === "all" ? null : value)
          }
        >
          <SelectTrigger className="flex-1 !h-[55px] bg-white border border-gray-200 rounded-lg shadow-sm px-3">
            <SelectValue placeholder="الكل" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">الكل</SelectItem>
            <SelectItem value="true">نشطة</SelectItem>
            <SelectItem value="false">موقوفة</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default function ZonesFilters() {
  return (
    <Suspense fallback={null}>
      <ZonesFiltersInner />
    </Suspense>
  );
}

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
import { City } from "@/shared/lib/types/zones/city";

interface BranchesFilterInnerProps {
  cities: City[];
}

function BranchesFilterInner({ cities }: BranchesFilterInnerProps) {
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

  const currentCityId = searchParams.get("cityId") ?? "all";
  const currentAreaCode = searchParams.get("areaCode") ?? "all";
  const currentStatus = searchParams.get("isActive") ?? "all";

  const selectedCity = cities.find((c) => c._id === currentCityId);
  const areaOptions = selectedCity?.areas ?? [];

  const handleCityChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("cityId");
    } else {
      params.set("cityId", value);
    }
    // reset areaCode when city changes
    params.delete("areaCode");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full flex-wrap">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <Search
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          size={18}
        />
        <Input
          placeholder="ابحث عن فرع"
          value={searchValue}
          onChange={handleSearch}
          className="w-full bg-white h-12 sm:h-[55px] rounded-lg pr-10 text-right border border-gray-200 shadow-sm"
        />
      </div>

      {/* City filter */}
      <Select value={currentCityId} onValueChange={handleCityChange}>
        <SelectTrigger className="w-full sm:w-[200px] h-12 sm:h-[55px] bg-white border border-gray-200 rounded-lg shadow-sm">
          <SelectValue placeholder="كل المدن" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">كل المدن</SelectItem>
          {cities.map((city) => (
            <SelectItem key={city._id} value={city._id}>
              {city.nameAr}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Area code filter — active only when city is selected */}
      <Select
        value={currentAreaCode}
        onValueChange={(v) => updateParam("areaCode", v === "all" ? null : v)}
        disabled={currentCityId === "all" || areaOptions.length === 0}
      >
        <SelectTrigger className="w-full sm:w-[200px] h-12 sm:h-[55px] bg-white border border-gray-200 rounded-lg shadow-sm">
          <SelectValue placeholder="كل المناطق" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">كل المناطق</SelectItem>
          {areaOptions.map((area) => (
            <SelectItem key={area.code} value={area.code}>
              {area.nameAr}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Status filter */}
      <Select
        value={currentStatus}
        onValueChange={(v) => updateParam("isActive", v === "all" ? null : v)}
      >
        <SelectTrigger className="w-full sm:w-[180px] h-12 sm:h-[55px] bg-white border border-gray-200 rounded-lg shadow-sm">
          <SelectValue placeholder="الكل" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">الكل</SelectItem>
          <SelectItem value="true">نشط</SelectItem>
          <SelectItem value="false">موقوف</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

interface BranchesFilterProps {
  cities: City[];
}

export default function BranchesFilter({ cities }: BranchesFilterProps) {
  return (
    <Suspense fallback={null}>
      <BranchesFilterInner cities={cities} />
    </Suspense>
  );
}

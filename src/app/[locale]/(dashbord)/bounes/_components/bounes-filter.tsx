"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BounesFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router],
  );

  const hasFilters = search || from || to;

  const handleClear = () => {
    router.replace(pathname);
  };

  return (
    <div className="flex flex-row items-center gap-4 w-full">
      {/* Search */}
      <div className="relative flex-1">
        <Search
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          size={18}
        />
        <Input
          placeholder="ابحث"
          value={search}
          onChange={(e) => updateParams({ search: e.target.value })}
          className="w-full bg-white h-[55px] rounded-xl pr-10 text-right border border-gray-200 shadow-sm"
        />
      </div>

      {/* Filter */}
      <div className="flex flex-row items-center gap-3 shrink-0">
        <p className="text-[#000709] font-medium text-[18px] whitespace-nowrap">
          فلتر حسب النقط
        </p>

        {/* From */}
        <Input
          type="number"
          placeholder="من"
          value={from}
          onChange={(e) => updateParams({ from: e.target.value })}
          className="w-[80px] h-[55px] bg-white rounded-xl text-center border border-gray-200 shadow-sm"
        />

        <span className="text-gray-400 text-sm">الى</span>

        {/* To */}
        <Input
          type="number"
          placeholder="الى"
          value={to}
          onChange={(e) => updateParams({ to: e.target.value })}
          className="w-[80px] h-[55px] bg-white rounded-xl text-center border border-gray-200 shadow-sm"
        />

        {/* Clear */}
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 gap-1 px-3 h-[55px] rounded-xl"
          >
            <X size={15} />
            مسح
          </Button>
        )}
      </div>
    </div>
  );
}

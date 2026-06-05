"use client";

import { Suspense, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

function BarcodeFiltersContent() {
  const t = useTranslations("Bags.filter");

  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();

  const type = searchParams.get("type") ?? "single";

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (!value || value === "all") params.delete(key);
        else params.set(key, value);
      });
      params.delete("page");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const TYPE_OPTIONS = [
    { value: "single",  label: t("single")  },
    { value: "package", label: t("package") },
  ];

  return (
    <div className="flex items-center h-11 w-fit border border-gray-200 rounded-lg bg-white overflow-hidden">
      {TYPE_OPTIONS.map((opt, idx, arr) => {
        const isActive = type === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => updateParams({ type: opt.value })}
            className={cn(
              "h-full px-4 text-xs font-medium transition-all whitespace-nowrap",
              idx !== arr.length - 1 && "border-l border-gray-200",
              isActive
                ? "bg-[#0C6175] text-white"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-50",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default function BarcodeFilters() {
  return (
    <Suspense fallback={null}>
      <BarcodeFiltersContent />
    </Suspense>
  );
}

"use client";

import { Suspense, useState, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Search, CalendarDays, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// ─── helpers ──────────────────────────────────────────────────────────────────

function parseLocalDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toIso(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const dateFormatter = new Intl.DateTimeFormat("ar-SA", {
  month: "long",
  year:  "numeric",
});

const DEFAULT_FROM = new Date(2026, 4, 1);
const DEFAULT_TO   = new Date(2026, 3, 1);

// ─── DatePickerButton ─────────────────────────────────────────────────────────

function DatePickerButton({
  date, open, onOpenChange, onSelect,
}: {
  date: Date;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSelect: (date: Date) => void;
}) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-gray-900 transition-colors whitespace-nowrap">
          <CalendarDays size={13} className="text-gray-400 shrink-0" />
          <span className="font-medium">{dateFormatter.format(date)}</span>
          <ChevronDown size={12} className="text-gray-400" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <CalendarComponent
          mode="single"
          selected={date}
          onSelect={(d) => { if (d) onSelect(d); onOpenChange(false); }}
        />
      </PopoverContent>
    </Popover>
  );
}

// ─── BarcodeFiltersContent ────────────────────────────────────────────────────

function BarcodeFiltersContent() {
  const t = useTranslations("Bags.filter");

  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();

  const from   = searchParams.get("from")   ? parseLocalDate(searchParams.get("from")!)   : DEFAULT_FROM;
  const to     = searchParams.get("to")     ? parseLocalDate(searchParams.get("to")!)     : DEFAULT_TO;
  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status") ?? "all";
  const type   = searchParams.get("type")   ?? "all";

  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen,   setToOpen]   = useState(false);

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (!value || value === "all") params.delete(key);
        else params.set(key, value);
      });
      // reset page on filter change
      params.delete("page");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const STATUS_TABS = [
    { value: "all",      label: t("tabs.all")      },
    { value: "active",   label: t("tabs.active")   },
    { value: "assigned", label: t("tabs.assigned") },
    { value: "inuse",    label: t("tabs.inuse")    },
    { value: "voucher",  label: t("tabs.voucher")  },
  ];

  const TYPE_OPTIONS = [
    { value: "all",     label: t("all")     },
    { value: "single",  label: t("single")  },
    { value: "package", label: t("package") },
  ];

  return (
    <div className="flex flex-col gap-2 w-full">

      {/* Row 1: Search + Date Range + Type */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full">

        {/* Search */}
        {/* <div className="relative flex-1 min-w-0">
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={16}
          />
          <Input
            placeholder={t("search")}
            defaultValue={search}
            onChange={(e) => updateParams({ search: e.target.value || null })}
            className="w-full bg-white h-[44px] rounded-lg pr-9 text-right border border-gray-200 text-sm"
          />
        </div> */}

        {/* Date Range */}
        {/* <div className="flex items-center gap-2 px-3 h-[44px] border border-gray-200 rounded-lg bg-white shrink-0 overflow-x-auto">
          <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">
            {t("dateRange")}
          </span>
          <Separator orientation="vertical" className="h-4" />
          <DatePickerButton
            date={from}
            open={fromOpen}
            onOpenChange={setFromOpen}
            onSelect={(d) => updateParams({ from: toIso(d) })}
          />
          <span className="text-xs text-gray-400 select-none">{t("to")}</span>
          <DatePickerButton
            date={to}
            open={toOpen}
            onOpenChange={setToOpen}
            onSelect={(d) => updateParams({ to: toIso(d) })}
          />
        </div> */}

        {/* Type Filter */}
        <div className="flex items-center h-[44px] border border-gray-200 rounded-lg bg-white shrink-0 overflow-hidden">
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

      </div>

      {/* Row 2: Status Tabs */}
      {/* <div className="flex items-center gap-1 border border-gray-200 rounded-lg bg-white h-[44px] px-1 w-full overflow-x-auto">
        {STATUS_TABS.map((tab) => {
          const isActive = status === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => updateParams({ status: tab.value })}
              className={cn(
                "flex-1 h-[34px] rounded-md text-xs font-medium transition-all whitespace-nowrap px-3",
                isActive
                  ? "bg-[#0C6175] text-white"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-100",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div> */}

    </div>
  );
}

// ─── export ───────────────────────────────────────────────────────────────────

export default function BarcodeFilters() {
  return (
    <Suspense fallback={null}>
      <BarcodeFiltersContent />
    </Suspense>
  );
}
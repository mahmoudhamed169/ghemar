"use client";

import { useState, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, CalendarDays, Printer, ChevronDown } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// ─── helpers ─────────────────────────────────────────────────────────────────

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

const monthYearFormatter = new Intl.DateTimeFormat("ar-SA", {
  month: "long",
  year: "numeric",
});

const formatDate = (date: Date) => monthYearFormatter.format(date);

const DEFAULT_FROM = new Date(2026, 4, 1);
const DEFAULT_TO = new Date(2026, 3, 1);

// ─── DatePickerButton ─────────────────────────────────────────────────────────

function DatePickerButton({
  date,
  open,
  onOpenChange,
  onSelect,
}: {
  date: Date;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSelect: (date: Date) => void;
}) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-gray-900 transition-colors">
          <CalendarDays size={14} className="text-gray-400 shrink-0" />
          <span className="font-medium">{formatDate(date)}</span>
          <ChevronDown size={13} className="text-gray-400" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <CalendarComponent
          mode="single"
          selected={date}
          onSelect={(d) => {
            if (d) onSelect(d);
            onOpenChange(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

// ─── ReportsFilters ───────────────────────────────────────────────────────────

export default function ReportsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const from = searchParams.get("from")
    ? parseLocalDate(searchParams.get("from")!)
    : DEFAULT_FROM;
  const to = searchParams.get("to")
    ? parseLocalDate(searchParams.get("to")!)
    : DEFAULT_TO;
  const search = searchParams.get("search") ?? "";

  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (!value) params.delete(key);
        else params.set(key, value);
      });
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  return (
    <div className="flex items-center gap-3 w-full">
      {/* Search */}
      <div className="relative flex-1">
        <Search
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          size={18}
        />
        <Input
          placeholder="ابحث"
          defaultValue={search}
          onChange={(e) => updateParams({ search: e.target.value })}
          className="w-full bg-white h-[55px] rounded-lg pr-10 text-right border border-gray-200 shadow-sm"
        />
      </div>

      {/* Date Range */}
      <div className="flex items-center gap-3 border border-gray-200 rounded-lg bg-white px-4 h-[55px] shrink-0">
        <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
          فلتر حسب المدة الزمنية
        </span>

        <Separator orientation="vertical" className="h-5" />

        <DatePickerButton
          date={from}
          open={fromOpen}
          onOpenChange={setFromOpen}
          onSelect={(d) => updateParams({ from: toIso(d) })}
        />

        <span className="text-xs text-gray-400 select-none">الى</span>

        <DatePickerButton
          date={to}
          open={toOpen}
          onOpenChange={setToOpen}
          onSelect={(d) => updateParams({ to: toIso(d) })}
        />
      </div>

      {/* Print */}
      <Button className="h-[55px] px-5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg gap-2 shrink-0">
        <Printer size={15} />
        طباعة
      </Button>
    </div>
  );
}

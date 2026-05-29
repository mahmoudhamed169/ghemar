"use client";

import { Suspense, useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { CalendarDays, ChevronDown, Printer, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

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

function DatePickerButton({
  date,
  label,
  open,
  onOpenChange,
  onSelect,
}: {
  date?: Date;
  label: string;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSelect: (date: Date) => void;
}) {
  const formatter = new Intl.DateTimeFormat("ar-SA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-gray-900 transition-colors whitespace-nowrap">
          <CalendarDays size={14} className="text-gray-400 shrink-0" />
          <span className="font-medium">{date ? formatter.format(date) : label}</span>
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
        />
      </PopoverContent>
    </Popover>
  );
}

function ReportsFiltersContent() {
  const t = useTranslations("Reports.filters");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const from = searchParams.get("from")
    ? parseLocalDate(searchParams.get("from")!)
    : undefined;
  const to = searchParams.get("to")
    ? parseLocalDate(searchParams.get("to")!)
    : undefined;
  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status") ?? "all";

  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

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

  return (
    <div className="flex flex-col gap-3 w-full lg:flex-row lg:items-center">
      <div className="relative min-w-0 flex-1">
        <Search
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          size={18}
        />
        <Input
          placeholder={t("search")}
          defaultValue={search}
          onChange={(e) => updateParams({ search: e.target.value || null })}
          className="w-full bg-white h-12 rounded-lg pr-10 text-right border border-gray-200 shadow-sm"
        />
      </div>

      <NativeSelect
        value={status}
        onChange={(e) => updateParams({ status: e.target.value })}
        className="w-full lg:w-48 bg-white"
      >
        <NativeSelectOption value="all">{t("all")}</NativeSelectOption>
        <NativeSelectOption value="completed">{t("completed")}</NativeSelectOption>
        <NativeSelectOption value="pending">{t("pending")}</NativeSelectOption>
      </NativeSelect>

      <div className="flex min-h-12 items-center gap-3 border border-gray-200 rounded-lg bg-white px-4 overflow-x-auto">
        <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
          {t("dateRange")}
        </span>
        <Separator orientation="vertical" className="h-5" />
        <DatePickerButton
          date={from}
          label={t("from")}
          open={fromOpen}
          onOpenChange={setFromOpen}
          onSelect={(d) => updateParams({ from: toIso(d) })}
        />
        <span className="text-xs text-gray-400 select-none">{t("to")}</span>
        <DatePickerButton
          date={to}
          label={t("to")}
          open={toOpen}
          onOpenChange={setToOpen}
          onSelect={(d) => updateParams({ to: toIso(d) })}
        />
      </div>

      <Button
        type="button"
        onClick={() => window.print()}
        className="h-12 px-5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg gap-2 shrink-0"
      >
        <Printer size={15} />
        {t("print")}
      </Button>
    </div>
  );
}

export default function ReportsFilters() {
  return (
    <Suspense fallback={null}>
      <ReportsFiltersContent />
    </Suspense>
  );
}

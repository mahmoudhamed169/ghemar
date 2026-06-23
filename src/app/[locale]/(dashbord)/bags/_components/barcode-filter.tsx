"use client";

import { Suspense, useCallback, useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Search, CalendarDays, ChevronDown, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
/* ─── helpers ─── */

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
  year: "numeric",
  month: "short",
  day: "numeric",
});

/* ─── DatePickerButton ─── */

function DatePickerButton({
  date,
  label,
  open,
  onOpenChange,
  onSelect,
  onClear,
}: {
  date?: Date;
  label: string;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSelect: (d: Date) => void;
  onClear?: () => void;
}) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1.5 h-10 px-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition whitespace-nowrap">
          <CalendarDays size={14} className="text-gray-400 shrink-0" />
          <span className={date ? "font-medium" : "text-gray-400"}>
            {date ? dateFormatter.format(date) : label}
          </span>
          <ChevronDown size={13} className="text-gray-400" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CalendarComponent
          mode="single"
          selected={date}
          onSelect={(d) => {
            if (d) onSelect(d);
            onOpenChange(false);
          }}
        />
        {date && onClear && (
          <div className="px-3 pb-3">
            <button
              onClick={() => { onClear(); onOpenChange(false); }}
              className="w-full text-xs text-red-400 hover:text-red-500 flex items-center justify-center gap-1 py-1"
            >
              <X size={12} /> مسح التاريخ
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

/* ─── main filter ─── */

const BAG_STATUSES = [
  "generated",
  "assigned",
  "in_use",
  "at_laundry",
  "voucher",
] as const;

function BarcodeFilterInner() {
  const t      = useTranslations("Bags.filter");
  const router      = useRouter();
  const pathname    = usePathname();
  const searchParams = useSearchParams();

  /* controlled states */
  const [searchVal,  setSearchVal]  = useState(searchParams.get("search")  ?? "");
  const [barcodeVal, setBarcodeVal] = useState(searchParams.get("barcode") ?? "");
  const [fromOpen,   setFromOpen]   = useState(false);
  const [toOpen,     setToOpen]     = useState(false);

  const searchTimer  = useRef<ReturnType<typeof setTimeout>>(undefined);
  const barcodeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const currentStatus = searchParams.get("status") ?? "all";
  const currentFrom = searchParams.get("from") ? parseLocalDate(searchParams.get("from")!) : undefined;
  const currentTo   = searchParams.get("to")   ? parseLocalDate(searchParams.get("to")!)   : undefined;

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (!value || value === "all") params.delete(key);
        else params.set(key, value);
      });
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  const handleSearch = (val: string) => {
    setSearchVal(val);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => updateParams({ search: val || null }), 400);
  };

  const handleBarcode = (val: string) => {
    setBarcodeVal(val);
    clearTimeout(barcodeTimer.current);
    barcodeTimer.current = setTimeout(() => updateParams({ barcode: val || null }), 400);
  };

  return (
    <div className="flex flex-wrap items-center gap-3" dir="rtl">
      {/* Search */}
      <div className="relative flex-1 min-w-[180px]">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        <Input
          value={searchVal}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="w-full h-10 pr-9 bg-white border border-gray-200 rounded-lg shadow-sm text-sm"
        />
      </div>

      {/* Barcode */}
      <div className="relative w-[160px]">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        <Input
          value={barcodeVal}
          onChange={(e) => handleBarcode(e.target.value)}
          placeholder={t("barcodePlaceholder")}
          dir="ltr"
          className="w-full h-10 pr-9 bg-white border border-gray-200 rounded-lg shadow-sm text-sm"
        />
      </div>

      {/* Status */}
      <Select
        value={currentStatus}
        onValueChange={(v) => updateParams({ status: v === "all" ? null : v })}
      >
        <SelectTrigger className="w-36 h-10 bg-white border border-gray-200 rounded-lg shadow-sm text-sm">
          <SelectValue placeholder={t("statusAll")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("statusAll")}</SelectItem>
          {BAG_STATUSES.map((s) => (
            <SelectItem key={s} value={s}>{t(`tabs.${s === "in_use" ? "inuse" : s === "at_laundry" ? "voucher" : s === "generated" ? "active" : s}`)}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Date from */}
      <DatePickerButton
        date={currentFrom}
        label={t("dateFrom")}
        open={fromOpen}
        onOpenChange={setFromOpen}
        onSelect={(d) => updateParams({ from: toIso(d) })}
        onClear={() => updateParams({ from: null })}
      />

      {/* Date to */}
      <DatePickerButton
        date={currentTo}
        label={t("dateTo")}
        open={toOpen}
        onOpenChange={setToOpen}
        onSelect={(d) => updateParams({ to: toIso(d) })}
        onClear={() => updateParams({ to: null })}
      />

    </div>
  );
}

export default function BarcodeFilter() {
  return (
    <Suspense fallback={null}>
      <BarcodeFilterInner />
    </Suspense>
  );
}

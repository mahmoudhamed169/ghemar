"use client";

import { Suspense, useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  CalendarDays,
  ChevronDown,
  FileSpreadsheet,
  Loader2,
  Printer,
  Search,
} from "lucide-react";
import * as XLSX from "xlsx";

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
import { Invoice } from "@/shared/lib/types/reports/invoice";
import { formatInvoiceDate, mapInvoiceToInvoiceData } from "./invoice-modal/invoice-data";

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

/* ─── fetch all invoices for the current filters ─── */

async function fetchAllInvoices(searchParams: URLSearchParams): Promise<Invoice[]> {
  const params = new URLSearchParams();
  const search = searchParams.get("search");
  const status = searchParams.get("status");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  if (search) params.set("search", search);
  if (status && status !== "all") params.set("status", status);
  if (from) params.set("from", from);
  if (to) params.set("to", to);

  const res = await fetch(`/api/invoices/export?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch invoices");
  const json = await res.json();
  return (json.data ?? []) as Invoice[];
}

/* ─── print all invoices as receipt documents ─── */

function buildInvoiceHtml(invoice: ReturnType<typeof mapInvoiceToInvoiceData>, isLast: boolean): string {
  const vat = ((invoice.baseAmount - invoice.discount) * invoice.vatPercent) / 100;

  const infoRows = [
    { label: "اسم العميل", value: invoice.clientName },
    { label: "رقم الطلب", value: String(invoice.orderNumber) },
    { label: "طريقة الدفع", value: invoice.driverName },
    { label: "تاريخ الخدمة", value: invoice.date },
  ]
    .map(
      ({ label, value }) => `
      <div style="border:1px dashed #9dd4df;border-radius:10px;padding:11px 16px;background:#f5fbfc;">
        <div style="font-size:10px;color:#0C6175;margin-bottom:5px;font-weight:600;">${label}</div>
        <div style="font-size:14px;font-weight:700;color:#000709;">${value}</div>
      </div>`,
    )
    .join("");

  return `
  <div style="
    font-family:'IBM Plex Sans Arabic',sans-serif;
    width:620px;margin:0 auto;
    background:#fff;color:#000709;
    border-radius:16px;overflow:hidden;
    border:1px solid #e5e7eb;
    ${!isLast ? "page-break-after:always;margin-bottom:40px;" : ""}
  ">
    <div style="background:#0C6175;padding:28px 36px;display:flex;justify-content:space-between;align-items:center;">
      <div>
        <div style="font-size:22px;font-weight:700;color:#fff;letter-spacing:1px;">غـمار</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.72);margin-top:3px;">خدمات الغسيل والتنظيف</div>
      </div>
      <div style="text-align:left;">
        <div style="font-size:30px;font-weight:700;color:#fff;">فاتورة</div>
        <div style="font-size:13px;color:rgba(255,255,255,0.72);margin-top:4px;">#${invoice.invoiceId}</div>
      </div>
    </div>
    <div style="height:4px;background:linear-gradient(90deg,#0C6175 0%,#4db8d4 50%,#0C6175 100%);"></div>
    <div style="background:#eaf6f9;padding:12px 36px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #c5e8ef;">
      <div style="display:flex;flex-direction:column;gap:3px;">
        <span style="font-size:10px;color:#0C6175;font-weight:600;">تاريخ الإصدار</span>
        <span style="font-size:13px;font-weight:700;color:#000709;">${invoice.date}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:3px;">
        <span style="font-size:10px;color:#0C6175;font-weight:600;">حالة الفاتورة</span>
        <span style="font-size:12px;font-weight:600;color:#065f46;background:#d1fae5;padding:2px 14px;border-radius:20px;">✓ مدفوعة</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:3px;">
        <span style="font-size:10px;color:#0C6175;font-weight:600;">رقم الطلب</span>
        <span style="font-size:13px;font-weight:700;color:#000709;">${invoice.orderNumber}</span>
      </div>
    </div>
    <div style="padding:28px 36px;">
      <div style="display:flex;align-items:center;gap:8px;font-size:11px;font-weight:700;color:#0C6175;letter-spacing:0.8px;margin-bottom:12px;">
        بيانات العميل
        <div style="flex:1;height:1px;background:#c5e8ef;"></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:24px;">${infoRows}</div>
      <div style="display:flex;align-items:center;gap:8px;font-size:11px;font-weight:700;color:#0C6175;letter-spacing:0.8px;margin-bottom:12px;">
        تفاصيل المبالغ
        <div style="flex:1;height:1px;background:#c5e8ef;"></div>
      </div>
      <div style="background:#f5fbfc;border-radius:12px;padding:16px 20px;border:1px solid #c5e8ef;">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px dashed #c5e8ef;font-size:13px;">
          <span style="color:#4a7a85;font-weight:500;">المبلغ الأساسي</span>
          <span style="font-weight:700;color:#000709;">﷼ ${invoice.baseAmount.toFixed(2)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px dashed #c5e8ef;font-size:13px;">
          <span style="color:#4a7a85;font-weight:500;">الخصم</span>
          <span style="font-weight:700;color:#c0392b;">− ﷼ ${invoice.discount}</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px dashed #c5e8ef;font-size:13px;">
          <span style="color:#4a7a85;font-weight:500;">ضريبة القيمة المضافة (%${invoice.vatPercent})</span>
          <span style="font-weight:700;color:#000709;">﷼ ${vat.toFixed(2)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px;padding:14px 20px;background:#0C6175;border-radius:10px;">
          <span style="font-size:22px;font-weight:700;color:#fff;">﷼ ${invoice.total}</span>
          <span style="font-size:14px;font-weight:600;color:rgba(255,255,255,0.85);">الإجمالي المستحق</span>
        </div>
      </div>
      <div style="margin-top:20px;background:#fffbf0;border:1px dashed #e6c84a;border-radius:10px;padding:12px 16px;">
        <div style="font-size:10px;color:#9b7f1a;font-weight:700;margin-bottom:4px;">ملاحظة</div>
        <div style="font-size:13px;color:#5a4510;font-weight:500;">شكراً لثقتكم بخدمات غمار — نسعى دائماً لتقديم أفضل تجربة غسيل</div>
      </div>
      <div style="margin-top:28px;padding-top:16px;border-top:1px solid #c5e8ef;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="font-size:13px;font-weight:700;color:#0C6175;">شكراً لتعاملكم معنا</div>
          <div style="font-size:11px;color:#4a7a85;margin-top:2px;">غمار — خدمات الغسيل المنزلي</div>
        </div>
        <div style="width:52px;height:52px;border-radius:50%;border:2px dashed #0C6175;display:flex;align-items:center;justify-content:center;">
          <span style="font-size:9px;color:#0C6175;font-weight:700;text-align:center;line-height:1.4;">مدفوع<br/>بالكامل</span>
        </div>
      </div>
    </div>
  </div>`;
}

function printAllInvoices(invoices: Invoice[]) {
  const invoiceLayouts = invoices
    .map((inv, i) =>
      buildInvoiceHtml(mapInvoiceToInvoiceData(inv, "ar"), i === invoices.length - 1),
    )
    .join("\n");

  const html = `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="utf-8"/>
  <title>فواتير غمار</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{background:#f5f5f5;padding:20px;font-family:'IBM Plex Sans Arabic',sans-serif;}
    @media print{body{background:#fff;padding:0;}}
  </style>
</head>
<body>
${invoiceLayouts}
<script>window.onload=()=>{window.print();}</script>
</body>
</html>`;

  const win = window.open("", "_blank", "width=800,height=900");
  if (win) {
    win.document.write(html);
    win.document.close();
  }
}

/* ─── Excel export ─── */

function exportToExcel(invoices: Invoice[]) {
  const rows = invoices.map((inv) => ({
    "رقم الفاتورة": inv._id,
    "اسم العميل": inv.user?.name ?? "-",
    "رقم الطلب": inv.orderId ?? "-",
    "الباقة": inv.packageId?.nameAr ?? inv.packageId?.name ?? "-",
    "تاريخ الإنشاء": formatInvoiceDate(inv.createdAt, "ar"),
    "المبلغ": inv.amount,
    "العملة": inv.currency,
    "الخصم": inv.discountAmount ?? 0,
    "الحالة": inv.status,
    "طريقة الدفع": inv.gateway ?? inv.method ?? "-",
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "الفواتير");

  const today = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(wb, `فواتير-غمار-${today}.xlsx`);
}

/* ─── DatePickerButton ─── */

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

/* ─── main filter content ─── */

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
  const [isPrinting, setIsPrinting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

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

  const handlePrint = async () => {
    setIsPrinting(true);
    try {
      const invoices = await fetchAllInvoices(searchParams);
      printAllInvoices(invoices);
    } catch (e) {
      console.error(e);
    } finally {
      setIsPrinting(false);
    }
  };

  const handleExcel = async () => {
    setIsExporting(true);
    try {
      const invoices = await fetchAllInvoices(searchParams);
      exportToExcel(invoices);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

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
        onClick={handlePrint}
        disabled={isPrinting || isExporting}
        className="h-12 px-5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg gap-2 shrink-0"
      >
        {isPrinting ? (
          <Loader2 size={15} className="animate-spin" />
        ) : (
          <Printer size={15} />
        )}
        {t("print")}
      </Button>

      <Button
        type="button"
        onClick={handleExcel}
        disabled={isPrinting || isExporting}
        className="h-12 px-5 bg-[#1D6F42] hover:bg-[#175a35] text-white rounded-lg gap-2 shrink-0"
      >
        {isExporting ? (
          <Loader2 size={15} className="animate-spin" />
        ) : (
          <FileSpreadsheet size={15} />
        )}
        {t("export_excel")}
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

import { Invoice } from "@/shared/lib/types/reports/invoice";
import type { InvoiceData } from "./invoice-modal";
import { formatRiyadhDate } from "@/shared/lib/utils/riyadh-time";

export function formatInvoiceDate(date?: string, locale = "ar") {
  // invoices keep Latin digits in Arabic, as before
  return formatRiyadhDate(date, locale === "ar" ? "ar-u-nu-latn" : locale) ?? "-";
}

/** money values always show two decimals: 174.29999999999998 → "174.30" */
export function formatAmount(value?: number | null) {
  return (Number(value) || 0).toFixed(2);
}

/** rounds to two decimals but keeps a number (for Excel cells) */
export function roundAmount(value?: number | null) {
  return Math.round((Number(value) || 0) * 100) / 100;
}

export function getInvoicePackageName(invoice: Invoice, locale = "ar") {
  if (!invoice.packageId) return "-";
  return locale === "ar"
    ? invoice.packageId.nameAr || invoice.packageId.name || "-"
    : invoice.packageId.name || invoice.packageId.nameAr || "-";
}

export function mapInvoiceToInvoiceData(
  invoice: Invoice,
  locale = "ar",
): InvoiceData {
  return {
    invoiceId: invoice._id,
    clientName: invoice.user?.name || "-",
    orderNumber: invoice.orderId || invoice.packageId?._id || "-",
    driverName: invoice.gateway || invoice.method || "-",
    date: formatInvoiceDate(invoice.createdAt, locale),
    baseAmount: invoice.amount,
    discount: invoice.discountAmount || 0,
    vatPercent: 0,
    total: invoice.amount,
    status: invoice.status,
    currency: invoice.currency,
    packageName: getInvoicePackageName(invoice, locale),
  };
}

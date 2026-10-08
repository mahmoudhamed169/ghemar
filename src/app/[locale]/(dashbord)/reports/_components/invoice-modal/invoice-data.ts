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
  // no package but tied to an order → the customer paid the urgent order fee
  if (!invoice.packageId && invoice.orderId) {
    return locale === "ar" ? "رسوم طلب مستعجل" : "Urgent order fee";
  }
  if (!invoice.packageId) return "-";
  return locale === "ar"
    ? invoice.packageId.nameAr || invoice.packageId.name || "-"
    : invoice.packageId.name || invoice.packageId.nameAr || "-";
}

/** orderId comes back either as a plain id or as a populated order object */
export function getInvoiceOrderNumber(invoice: Invoice) {
  const order = invoice.orderId;
  if (!order) return "";
  if (typeof order === "object") return String(order.orderNumber ?? order._id ?? "");
  return String(order);
}

export function mapInvoiceToInvoiceData(
  invoice: Invoice,
  locale = "ar",
): InvoiceData {
  return {
    invoiceId: invoice._id,
    clientName: invoice.user?.name || "-",
    orderNumber: getInvoiceOrderNumber(invoice) || invoice.packageId?._id || "-",
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

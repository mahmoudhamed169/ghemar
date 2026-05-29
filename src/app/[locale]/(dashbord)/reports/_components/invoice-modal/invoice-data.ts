import { Invoice } from "@/shared/lib/types/reports/invoice";
import type { InvoiceData } from "./invoice-modal";

export function formatInvoiceDate(date?: string, locale = "ar") {
  if (!date) return "-";

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
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

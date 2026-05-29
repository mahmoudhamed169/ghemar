"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

import InvoiceHeader from "./invoice-header";
import InvoiceInfoGrid from "./invoice-info-grid";
import InvoiceAmounts from "./invoice-amounts";
import InvoiceActions from "./invoice-actions";
import InvoicePrintLayout from "./invoice-print-layout";

export interface InvoiceData {
  invoiceId: string;
  clientName: string;
  orderNumber: number | string;
  driverName: string;
  date: string;
  baseAmount: number;
  discount: number;
  vatPercent: number;
  total: number;
  status?: string;
  currency?: string;
  packageName?: string;
}

interface InvoiceModalProps {
  invoice: InvoiceData;
  trigger: React.ReactNode;
  loading?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function InvoiceModal({
  invoice,
  trigger,
  loading = false,
  open,
  onOpenChange,
}: InvoiceModalProps) {
  const t = useTranslations("Reports.invoice");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-sm p-5 gap-5 rounded-2xl">
        <InvoiceHeader invoiceId={invoice.invoiceId} />
        {loading ? (
          <div className="text-sm text-gray-500 py-8 text-center">
            {t("loading")}
          </div>
        ) : null}
        <InvoiceInfoGrid
          clientName={invoice.clientName}
          orderNumber={invoice.orderNumber}
          driverName={invoice.driverName}
          date={invoice.date}
        />
        <InvoiceAmounts
          baseAmount={invoice.baseAmount}
          discount={invoice.discount}
          vatPercent={invoice.vatPercent}
          total={invoice.total}
        />
        <InvoiceActions invoiceId={invoice.invoiceId} invoice={invoice} />
        <InvoicePrintLayout invoice={invoice} />
      </DialogContent>
    </Dialog>
  );
}

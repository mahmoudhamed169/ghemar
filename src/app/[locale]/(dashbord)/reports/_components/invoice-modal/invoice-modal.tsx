"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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
}

interface InvoiceModalProps {
  invoice: InvoiceData;
  trigger: React.ReactNode;
}

export default function InvoiceModal({ invoice, trigger }: InvoiceModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-sm p-5 gap-5 rounded-2xl">
        <InvoiceHeader invoiceId={invoice.invoiceId} />
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

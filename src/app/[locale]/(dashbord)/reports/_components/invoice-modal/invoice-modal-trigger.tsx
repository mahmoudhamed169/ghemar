"use client";

import { Eye } from "lucide-react";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useInvoice } from "@/shared/lib/hooks/reports/use-invoice";
import InvoiceModal, { type InvoiceData } from "./invoice-modal";
import { mapInvoiceToInvoiceData } from "./invoice-data";

interface InvoiceModalTriggerProps {
  invoice: InvoiceData;
  invoiceId?: string;
}

export default function InvoiceModalTrigger({
  invoice,
  invoiceId,
}: InvoiceModalTriggerProps) {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("Reports.actions");
  const { data, isFetching } = useInvoice(invoiceId, open && Boolean(invoiceId));
  const modalInvoice = data?.data
    ? mapInvoiceToInvoiceData(data.data, locale)
    : invoice;

  return (
    <InvoiceModal
      invoice={modalInvoice}
      loading={isFetching && !data}
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-gray-600"
          title={t("viewInvoice")}
        >
          <Eye size={18} />
        </Button>
      }
    />
  );
}

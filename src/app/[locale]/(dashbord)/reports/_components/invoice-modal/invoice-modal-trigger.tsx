"use client";

import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import InvoiceModal, { type InvoiceData } from "./invoice-modal";

interface InvoiceModalTriggerProps {
  invoice: InvoiceData;
}

export default function InvoiceModalTrigger({ invoice }: InvoiceModalTriggerProps) {
  return (
    <InvoiceModal
      invoice={invoice}
      trigger={
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-gray-600"
        >
          <Eye size={18} />
        </Button>
      }
    />
  );
}
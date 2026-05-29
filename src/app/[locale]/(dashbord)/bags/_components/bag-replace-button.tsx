"use client";

import { useState } from "react";
import { Printer, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import BarcodePrintModal from "./barcode-print-modal";

interface BagReplaceButtonProps {
  bagId: string;
  barcode: string;
}

export default function BagReplaceButton({ bagId, barcode }: BagReplaceButtonProps) {
  const t = useTranslations("Bags.table");
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="gap-1.5 text-sm bg-[#0C6175] text-white border-none hover:bg-[#0C6175]/90"
      >
        <Printer size={14} />
        طباعة
      </Button>

      <BarcodePrintModal
        open={open}
        onClose={() => setOpen(false)}
        barcode={barcode}
      />
    </>
  );
}
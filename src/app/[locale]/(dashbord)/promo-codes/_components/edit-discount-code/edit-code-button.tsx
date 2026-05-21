"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PromoCode } from "@/shared/lib/types/promocode/promo-codes";
import EditCodeModal from "./edit-code-modal";


interface EditCodeButtonProps {
  promoCode: PromoCode;
}

export default function EditCodeButton({ promoCode }: EditCodeButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        className="w-8 h-8 text-gray-400 hover:text-[#0C6175] hover:bg-[#0C6175]/5 rounded-lg transition-colors"
      >
        <Pencil className="w-4 h-4" />
      </Button>

      <EditCodeModal open={open} onOpenChange={setOpen} promoCode={promoCode} />
    </>
  );
}

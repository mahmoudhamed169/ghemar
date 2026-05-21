"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import AddCodeModal from "./add-discount-code/add-code-modal";

export default function PromoCodeBtn() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("PromoCodes.header");

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="w-full sm:w-[288px] h-[48px] sm:h-[55px] bg-[#0C6175] text-white rounded-lg text-base sm:text-lg hover:bg-[#097188] cursor-pointer"
      >
        {t("addButton")}
      </Button>

      <AddCodeModal open={open} onOpenChange={setOpen} />
    </>
  );
}
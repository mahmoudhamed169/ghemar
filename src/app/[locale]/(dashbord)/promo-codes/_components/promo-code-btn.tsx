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
        className="bg-[#0C6175] text-white w-[288px] h-[55px] rounded-lg text-lg hover:bg-[#097188] hover:text-white cursor-pointer"
      >
        {t("addButton")}
      </Button>

      <AddCodeModal open={open} onOpenChange={setOpen} />
    </>
  );
}
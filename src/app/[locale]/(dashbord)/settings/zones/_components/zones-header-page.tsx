"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import CityModal from "./city-modal";

export default function ZonesHeaderPage() {
  const t = useTranslations("Zones.header");
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mt-1">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <Button
          onClick={() => setOpen(true)}
          className="bg-[#0C6175] text-white w-[288px] h-[55px] rounded-lg text-lg hover:bg-[#097188]"
        >
          {t("addButton")}
        </Button>
      </div>

      <CityModal open={open} onOpenChange={setOpen} />
    </>
  );
}

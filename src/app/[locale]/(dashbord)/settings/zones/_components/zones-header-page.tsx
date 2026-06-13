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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-1">
        <h1 className="text-2xl lg:text-3xl font-bold">{t("title")}</h1>
        <Button
          onClick={() => setOpen(true)}
          className="bg-[#0C6175] text-white w-full sm:w-[288px] h-12 sm:h-[55px] rounded-lg text-base sm:text-lg hover:bg-[#097188]"
        >
          {t("addButton")}
        </Button>
      </div>

      <CityModal open={open} onOpenChange={setOpen} />
    </>
  );
}

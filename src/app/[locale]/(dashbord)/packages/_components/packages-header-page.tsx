"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import PackageModal from "./package-modal/package-modal";
import PackageSuccessModal from "./package-modal/package-success-modal";

export default function PackagesHeaderPage() {
  const t = useTranslations("Packages");
  const [addOpen,     setAddOpen]     = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleAddSuccess = () => {
    setAddOpen(false);
    setSuccessOpen(true);
    setTimeout(() => setSuccessOpen(false), 2500);
  };

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#000709]">
          {t("header.title")}
        </h1>
        <Button
          onClick={() => setAddOpen(true)}
          className="w-full sm:w-[288px] h-[48px] sm:h-[55px] bg-[#0C6175] hover:bg-[#097188] text-white rounded-lg text-base sm:text-lg gap-2"
        >
          <Package className="w-5 h-5" />
          {t("header.addButton")}
        </Button>
      </div>

      <PackageModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSuccess={handleAddSuccess}
        mode="add"
      />

      <PackageSuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        mode="add"
      />
    </>
  );
}
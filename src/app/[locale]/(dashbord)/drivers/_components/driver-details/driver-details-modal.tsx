"use client";
import { useTranslations } from "next-intl";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import DriverDetailsLocation from "./driver-details-location";
import DriverDetailsInfo from "./driver-details-info";
import { Driver } from "@/shared/lib/types/drivers/driver";

interface DriverDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  driver: Driver;
}

export default function DriverDetailsModal({
  open,
  onOpenChange,
  driver,
}: DriverDetailsSheetProps) {
  const t = useTranslations("drivers.details");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full max-w-md p-0 flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center px-5 pt-6 pb-4 border-b shrink-0">
          <h1 className="text-xl font-bold text-[#000709]">
            {t("title")} {driver.name}
          </h1>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-5 py-4 flex flex-col gap-4">
          <DriverDetailsInfo driver={driver} />
          <DriverDetailsLocation driver={driver} />
        </div>

      </SheetContent>
    </Sheet>
  );
}
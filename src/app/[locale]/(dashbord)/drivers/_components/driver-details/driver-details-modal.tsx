"use client";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import DriverDetailsLocation from "./driver-details-location";
import DriverDetailsInfo from "./driver-details-info";
import { useDriver } from "@/shared/lib/hooks/drivers/use-driver";

interface DriverDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  driverId: string;
}

export default function DriverDetailsModal({
  open,
  onOpenChange,
  driverId,
}: DriverDetailsSheetProps) {
  const t = useTranslations("drivers.details");
  const { data, isLoading, isError } = useDriver(open ? driverId : null);
  const driver = data?.data;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full max-w-md p-0 flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center px-5 pt-6 pb-4 border-b shrink-0">
          <h1 className="text-xl font-bold text-[#000709]">
            {t("title")} {driver?.name ?? ""}
          </h1>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-5 py-4 flex flex-col gap-4">
          {isLoading && (
            <div className="flex items-center justify-center h-40 text-gray-400">
              <Loader2 className="animate-spin w-6 h-6" />
            </div>
          )}
          {isError && (
            <div className="text-center text-sm text-red-400 py-10">
              {t("load_error")}
            </div>
          )}
          {driver && (
            <>
              <DriverDetailsInfo driver={driver} />
              <DriverDetailsLocation driver={driver} />
            </>
          )}
        </div>

      </SheetContent>
    </Sheet>
  );
}

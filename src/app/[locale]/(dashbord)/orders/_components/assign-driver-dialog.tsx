// assign-driver-dialog.tsx
"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useDrivers } from "@/shared/lib/hooks/drivers/use-drivers";
import { useAssignDriver } from "@/shared/lib/hooks/use-assign-driver";

interface AssignDriverDialogProps {
  orderId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AssignDriverDialog({
  orderId,
  open,
  onOpenChange,
}: AssignDriverDialogProps) {
  const t = useTranslations("orders.assign_driver");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { drivers, isLoading } = useDrivers({ search });
  const { assign, isLoading: isAssigning } = useAssignDriver();

  const handleSave = async () => {
    if (!selectedId) return;
    const success = await assign(orderId, selectedId);
    if (success) onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-xl p-0 gap-5 overflow-hidden" dir="rtl">
        <DialogHeader className="px-5 pt-5 pb-4 border-b">
          <h2 className="text-lg font-bold text-[#000709] mt-4 flex justify-center items-center">
            {t("title")}
          </h2>
        </DialogHeader>

        {/* Search */}
        <div className="px-5 pt-4 pb-2">
          <div className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              dir="rtl"
              placeholder={t("search_placeholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-9 bg-gray-50 border-gray-200 focus-visible:ring-0"
            />
          </div>
        </div>

        {/* Drivers list */}
        <div className="px-5 pb-4 space-y-3 max-h-72 overflow-y-auto">
          {isLoading ? (
            <p className="text-center text-sm text-gray-400 py-6">
              جاري التحميل...
            </p>
          ) : drivers.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-6">
              {t("no_drivers")}
            </p>
          ) : (
            drivers.map((driver) => (
              <div
                key={driver._id}
                onClick={() => setSelectedId(driver._id)}
                className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 cursor-pointer transition-all"
              >
                <Checkbox
                  checked={selectedId === driver._id}
                  onCheckedChange={() => setSelectedId(driver._id)}
                  className="data-[state=checked]:bg-[#0C6175] data-[state=checked]:border-[#0C6175]"
                />
                <div className="flex-1 text-right mx-3 space-y-0.5">
                  <p className="text-sm font-semibold text-[#000709]">
                    {driver.name}
                  </p>
                  <p className="text-xs text-gray-400">{driver.phone}</p>
                  <p className="text-xs text-gray-400">
                    {t("driver_area")}: {driver.cityId.name}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    driver.status === "active"
                      ? "text-green-600 border-green-200 bg-green-50"
                      : "text-red-500 border-red-200 bg-red-50"
                  }
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current ml-1" />
                  {driver.status === "active"
                    ? t("status_active")
                    : t("status_suspended")}
                </Badge>
              </div>
            ))
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-5 py-4 border-t">
          <Button
            onClick={handleSave}
            disabled={!selectedId || isAssigning}
            className="flex-1 bg-[#0C6175] hover:bg-[#0a5363] text-white rounded-xl h-11"
          >
            {isAssigning ? "جاري الحفظ..." : t("save")}
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-xl h-11 border-gray-200 text-gray-700"
          >
            {t("cancel")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

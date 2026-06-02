"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  Pencil,
  ChevronDown,
  ChevronUp,
  User,
} from "lucide-react";
import { City, Area } from "@/shared/lib/types/zones/city";
import { useAreaDrivers } from "@/shared/lib/hooks/zones/use-area-drivers";
import AreaModal from "./area-modal";

interface CityDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  city: City;
  onEdit: () => void;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-sm font-medium text-[#000709]">{value}</span>
    </div>
  );
}

function AreaRow({
  area,
  cityId,
  t,
}: {
  area: Area;
  cityId: string;
  t: (key: string) => string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const { data, isLoading } = useAreaDrivers(area.code, expanded);
  const drivers = data?.data ?? [];

  return (
    <>
      <div className="bg-gray-50 rounded-xl overflow-hidden">
        {/* Area row */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#000709]">{area.nameAr}</p>
            <p className="text-xs text-gray-400">
              {area.name} · {area.code}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {area.deliveryAvailable ? (
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            ) : (
              <XCircle className="w-4 h-4 text-red-400" />
            )}

            <button
              onClick={() => setEditOpen(true)}
              className="w-7 h-7 rounded-lg bg-[#0C6175]/10 hover:bg-[#0C6175]/20 flex items-center justify-center transition"
            >
              <Pencil className="w-3.5 h-3.5 text-[#0C6175]" />
            </button>

            <button
              onClick={() => setExpanded((p) => !p)}
              className="w-7 h-7 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
            >
              {expanded ? (
                <ChevronUp className="w-3.5 h-3.5 text-gray-600" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Drivers section */}
        {expanded && (
          <div className="px-4 pb-3 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-500 mt-2 mb-2">
              {t("drivers")}
            </p>

            {isLoading ? (
              <div className="flex flex-col gap-1.5">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-8 rounded-lg bg-gray-200 animate-pulse"
                  />
                ))}
              </div>
            ) : !drivers.length ? (
              <p className="text-xs text-gray-400">{t("noDrivers")}</p>
            ) : (
              <div className="flex flex-col gap-1.5">
                {drivers.map((driver) => (
                  <div
                    key={driver._id}
                    className="flex items-center gap-2 bg-white rounded-lg px-3 py-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#0C6175]/10 flex items-center justify-center shrink-0">
                      <User className="w-3 h-3 text-[#0C6175]" />
                    </div>
                    <span className="text-sm font-medium text-[#000709]">
                      {driver.name}
                    </span>
                    <span className="text-xs text-gray-400 mr-auto" dir="ltr">
                      {driver.phone}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <AreaModal
        open={editOpen}
        onOpenChange={setEditOpen}
        cityId={cityId}
        initialData={area}
      />
    </>
  );
}

export default function CityDetailsModal({
  open,
  onOpenChange,
  city,
  onEdit,
}: CityDetailsModalProps) {
  const t = useTranslations("Zones.details");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-2xl p-8">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-[#000709] mt-2">
            {t("title")}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 max-h-[65vh] overflow-y-auto pr-1">
          {/* City Info */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <InfoRow label="الاسم (عربي)" value={city.nameAr} />
            <InfoRow label="الاسم (إنجليزي)" value={city.name} />
            <InfoRow label="الكود" value={city.code} />
            <InfoRow label="الدولة" value={city.country} />
            <InfoRow label="العملة" value={city.currency} />
            <InfoRow label="المنطقة الزمنية" value={city.timezone} />
            <InfoRow
              label={t("operatingHours")}
              value={`${city.operatingHours.open} — ${city.operatingHours.close}`}
            />
            <InfoRow
              label="وقت الاستعداد"
              value={`${city.minOrderLeadTimeHours} ساعة`}
            />
          </div>

          {/* Areas */}
          <div>
            <h3 className="text-sm font-semibold text-[#000709] mb-3">
              {t("areas")}
            </h3>
            {!city.areas?.length ? (
              <p className="text-sm text-gray-400 text-center py-4">
                {t("noAreas")}
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {city.areas.map((area) => (
                  <AreaRow
                    key={area.code}
                    area={area}
                    cityId={city._id}
                    t={t}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <Button
          onClick={onEdit}
          className="w-full h-11 mt-4 rounded-xl bg-[#0C6175] hover:bg-[#097188] text-white font-semibold"
        >
          {t("edit")}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

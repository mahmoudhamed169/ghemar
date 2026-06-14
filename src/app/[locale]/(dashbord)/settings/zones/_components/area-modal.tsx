"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Area, CreateAreaInput } from "@/shared/lib/types/zones/city";
import { useCreateArea, useUpdateArea } from "@/shared/lib/hooks/zones/use-area-mutations";

const InteractiveMap = dynamic(
  () => import("./zone-modal/ZoneMap"),
  { ssr: false, loading: () => <div className="w-full h-48 rounded-xl bg-gray-100 animate-pulse" /> },
);

interface AreaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cityId: string;
  initialData?: Area;
}

const INITIAL: CreateAreaInput = {
  name: "", nameAr: "", code: "",
  coordinates: { lat: 24.7136, lng: 46.6753 },
  coverageRadius: 5,
  deliveryAvailable: true, driverIds: [],
};

export default function AreaModal({ open, onOpenChange, cityId, initialData }: AreaModalProps) {
  const t = useTranslations("Zones.areaModal");
  const isEdit = !!initialData;
  const [form, setForm] = useState<CreateAreaInput>(INITIAL);

  const { mutate: createArea, isPending: creating } = useCreateArea();
  const { mutate: updateArea, isPending: updating } = useUpdateArea();
  const isPending = creating || updating;

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name, nameAr: initialData.nameAr,
        code: initialData.code,
        coordinates: initialData.coordinates ?? { lat: 24.7136, lng: 46.6753 },
        coverageRadius: initialData.coverageRadius ?? 5,
        deliveryAvailable: initialData.deliveryAvailable ?? true,
        driverIds: initialData.driverIds ?? [],
      });
    } else {
      setForm(INITIAL);
    }
  }, [initialData, open]);

  const set = (field: string, value: unknown) =>
    setForm((p) => ({ ...p, [field]: value }));

  const isValid = !!form.name && !!form.nameAr && !!form.code;

  const handleSave = () => {
    if (!isValid) return;
    if (isEdit && initialData?.code) {
      updateArea(
        { cityId, areaCode: initialData.code, ...form },
        { onSuccess: () => onOpenChange(false) },
      );
    } else {
      createArea(
        { cityId, ...form },
        { onSuccess: () => { setForm(INITIAL); onOpenChange(false); } },
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] rounded-2xl p-8">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-[#000709] mt-2">
            {isEdit ? t("editTitle") : t("addTitle")}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>{t("nameAr")} *</Label>
              <Input
                value={form.nameAr}
                onChange={(e) => set("nameAr", e.target.value)}
                className="h-11 bg-[#F5F5F5] border-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>{t("name")} *</Label>
              <Input
                value={form.name}
                dir="ltr"
                onChange={(e) => set("name", e.target.value)}
                className="h-11 bg-[#F5F5F5] border-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>{t("code")} *</Label>
              <Input
                value={form.code}
                dir="ltr"
                onChange={(e) => set("code", e.target.value.toUpperCase())}
                className="h-11 bg-[#F5F5F5] border-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>{t("coverageRadius")} (km)</Label>
              <Input
                type="number"
                min={1}
                value={form.coverageRadius}
                dir="ltr"
                onChange={(e) => set("coverageRadius", Number(e.target.value))}
                className="h-11 bg-[#F5F5F5] border-none"
              />
            </div>
          </div>

          {/* Interactive Map */}
          <InteractiveMap
            lat={form.coordinates.lat}
            lng={form.coordinates.lng}
            radius={form.coverageRadius * 1000}
            onPositionChange={(lat, lng) =>
              setForm((p) => ({ ...p, coordinates: { lat, lng } }))
            }
          />

          {/* Readonly coords display */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <Label className="text-xs text-gray-400">{t("lat")}</Label>
              <p className="text-sm font-mono text-[#000709] bg-gray-50 rounded-lg px-3 py-2">
                {form.coordinates.lat.toFixed(6)}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs text-gray-400">{t("lng")}</Label>
              <p className="text-sm font-mono text-[#000709] bg-gray-50 rounded-lg px-3 py-2">
                {form.coordinates.lng.toFixed(6)}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
            <Label className="text-sm font-medium text-[#000709]">
              {t("deliveryAvailable")}
            </Label>
            <Switch
              checked={form.deliveryAvailable}
              onCheckedChange={(v) => set("deliveryAvailable", v)}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <Button
            onClick={handleSave}
            disabled={isPending || !isValid}
            className="flex-1 h-11 bg-[#0C6175] hover:bg-[#097188] text-white rounded-xl"
          >
            {isPending ? t("saving") : t("save")}
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 h-11 rounded-xl"
          >
            {t("cancel")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

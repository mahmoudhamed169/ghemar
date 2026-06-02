"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { City, CreateCityInput } from "@/shared/lib/types/zones/city";
import { useCreateCity, useUpdateCity } from "@/shared/lib/hooks/zones/use-city-mutations";

interface CityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: City;
}

const INITIAL: CreateCityInput = {
  name: "", nameAr: "", code: "", country: "SA",
  timezone: "Asia/Riyadh", currency: "SAR",
  operatingHours: { open: "06:00", close: "23:00" },
  minOrderLeadTimeHours: 2, isActive: true,
};

export default function CityModal({ open, onOpenChange, initialData }: CityModalProps) {
  const t = useTranslations("Zones.cityModal");
  const isEdit = !!initialData;
  const [form, setForm] = useState<CreateCityInput>(INITIAL);

  const { mutate: createCity, isPending: creating } = useCreateCity();
  const { mutate: updateCity, isPending: updating } = useUpdateCity();
  const isPending = creating || updating;

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name, nameAr: initialData.nameAr,
        code: initialData.code, country: initialData.country,
        timezone: initialData.timezone, currency: initialData.currency,
        operatingHours: initialData.operatingHours,
        minOrderLeadTimeHours: initialData.minOrderLeadTimeHours,
        isActive: initialData.isActive,
      });
    } else {
      setForm(INITIAL);
    }
  }, [initialData, open]);

  const set = (field: string, value: unknown) =>
    setForm((p) => ({ ...p, [field]: value }));

  const setHours = (key: "open" | "close", value: string) =>
    setForm((p) => ({ ...p, operatingHours: { ...p.operatingHours, [key]: value } }));

  const isValid = !!form.name && !!form.nameAr && !!form.code;

  const handleSave = () => {
    if (!isValid) return;
    if (isEdit && initialData) {
      updateCity({ id: initialData._id, ...form }, { onSuccess: () => onOpenChange(false) });
    } else {
      createCity(form, { onSuccess: () => { setForm(INITIAL); onOpenChange(false); } });
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

        <div className="flex flex-col gap-4 max-h-[65vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>{t("nameAr")} *</Label>
              <Input value={form.nameAr} onChange={(e) => set("nameAr", e.target.value)} className="h-11 bg-[#F5F5F5] border-none" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>{t("name")} *</Label>
              <Input value={form.name} dir="ltr" onChange={(e) => set("name", e.target.value)} className="h-11 bg-[#F5F5F5] border-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>{t("code")} *</Label>
              <Input value={form.code} dir="ltr" onChange={(e) => set("code", e.target.value.toUpperCase())} className="h-11 bg-[#F5F5F5] border-none" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>{t("country")}</Label>
              <Input value={form.country} dir="ltr" onChange={(e) => set("country", e.target.value)} className="h-11 bg-[#F5F5F5] border-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>{t("timezone")}</Label>
              <Input value={form.timezone} dir="ltr" onChange={(e) => set("timezone", e.target.value)} className="h-11 bg-[#F5F5F5] border-none" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>{t("currency")}</Label>
              <Input value={form.currency} dir="ltr" onChange={(e) => set("currency", e.target.value)} className="h-11 bg-[#F5F5F5] border-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>{t("openTime")}</Label>
              <Input type="time" value={form.operatingHours.open} onChange={(e) => setHours("open", e.target.value)} className="h-11 bg-[#F5F5F5] border-none" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>{t("closeTime")}</Label>
              <Input type="time" value={form.operatingHours.close} onChange={(e) => setHours("close", e.target.value)} className="h-11 bg-[#F5F5F5] border-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>{t("minLeadTime")}</Label>
              <Input type="number" min={0} value={form.minOrderLeadTimeHours} onChange={(e) => set("minOrderLeadTimeHours", Number(e.target.value))} className="h-11 bg-[#F5F5F5] border-none" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>{t("isActive")}</Label>
              <div className="h-11 flex items-center">
                <Switch checked={form.isActive} onCheckedChange={(v) => set("isActive", v)} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <Button onClick={handleSave} disabled={isPending || !isValid} className="flex-1 h-11 bg-[#0C6175] hover:bg-[#097188] text-white rounded-xl">
            {isPending ? t("saving") : t("save")}
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 h-11 rounded-xl">
            {t("cancel")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AreasCheckboxGroup from "./areas-checkbox-group";
import { City, Area } from "@/shared/lib/types/cities/city";
import { VehicleType } from "@/shared/lib/types/drivers/driver";
import { useCreateDriver } from "@/shared/lib/hooks/drivers/use-create-driver";

const VEHICLE_TYPES: VehicleType[] = ["car", "motorcycle", "van"];

export default function AddDriverForm({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const t      = useTranslations("drivers.add");
  const locale = useLocale();

  const { mutate: createDriver, isPending } = useCreateDriver();

  const [cities,        setCities]        = useState<City[]>([]);
  const [selectedCity,  setSelectedCity]  = useState<City | null>(null);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState(false);

  const [form, setForm] = useState({
    name:         "",
    phone:        "",
    nationalId:   "",
    vehicleType:  "" as VehicleType | "",
    vehiclePlate: "",
    cityId:       "",
  });

  useEffect(() => {
    fetch("/api/cities")
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((res) => { setCities(res.data ?? []); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  const handleCityChange = (cityId: string) => {
    const city = cities.find((c) => c._id === cityId) ?? null;
    setSelectedCity(city);
    setSelectedAreas([]);
    setForm((f) => ({ ...f, cityId }));
  };

  const getCityName = (city: City) => locale === "ar" ? city.nameAr : city.name;
  const getAreaName = (area: Area) => locale === "ar" ? area.nameAr : area.name;

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.cityId || !form.vehicleType || !form.vehiclePlate || !form.nationalId) return;

    createDriver(
      {
        name:         form.name,
        phone:        form.phone,
        cityId:       form.cityId,
        vehicleType:  form.vehicleType,
        vehiclePlate: form.vehiclePlate,
        nationalId:   form.nationalId,
        assignedAreas: selectedAreas,
      },
      {
        onSuccess: (res) => {
          if (res.success) onSuccess();
        },
      },
    );
  };

  return (
    <div className="space-y-5">
      {/* Name */}
      <div className="space-y-2">
        <Label className="text-sm font-medium block">{t("name_label")}</Label>
        <Input
          placeholder={t("name_placeholder")}
          className="bg-gray-100 border-none h-12"
          dir="rtl"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label className="text-sm font-medium block">{t("phone_label")}</Label>
        <Input
          placeholder="+96251234567"
          className="bg-gray-100 border-none h-12"
          dir="ltr"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        />
      </div>

      {/* National ID */}
      <div className="space-y-2">
        <Label className="text-sm font-medium block">{t("national_id_label")}</Label>
        <Input
          placeholder={t("national_id_placeholder")}
          className="bg-gray-100 border-none h-12"
          dir="ltr"
          value={form.nationalId}
          onChange={(e) => setForm((f) => ({ ...f, nationalId: e.target.value }))}
        />
      </div>

      {/* Vehicle Type */}
      <div className="space-y-2">
        <Label className="text-sm font-medium block">{t("vehicle_type_label")}</Label>
        <Select onValueChange={(val) => setForm((f) => ({ ...f, vehicleType: val as VehicleType }))}>
          <SelectTrigger className="bg-gray-100 border-none h-12 w-full">
            <SelectValue placeholder={t("vehicle_type_placeholder")} />
          </SelectTrigger>
          <SelectContent>
            {VEHICLE_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {t(`vehicle_types.${type}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Vehicle Plate */}
      <div className="space-y-2">
        <Label className="text-sm font-medium block">{t("vehicle_plate_label")}</Label>
        <Input
          placeholder={t("vehicle_plate_placeholder")}
          className="bg-gray-100 border-none h-12"
          dir="ltr"
          value={form.vehiclePlate}
          onChange={(e) => setForm((f) => ({ ...f, vehiclePlate: e.target.value }))}
        />
      </div>

      {/* City */}
      <div className="space-y-2">
        <Label className="text-sm font-medium block">{t("city_label")}</Label>
        {loading ? (
          <div className="h-12 bg-gray-100 rounded-md animate-pulse" />
        ) : error ? (
          <p className="text-sm text-red-500">{t("cities_error")}</p>
        ) : (
          <Select onValueChange={handleCityChange}>
            <SelectTrigger className="bg-gray-100 border-none h-12 w-full">
              <SelectValue placeholder={t("city_placeholder")} />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city._id} value={city._id}>
                  {getCityName(city)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Areas */}
      {selectedCity && (
        <div className="space-y-3">
          <Label className="text-sm font-medium block">{t("areas_label")}</Label>
          <AreasCheckboxGroup
            areas={selectedCity.areas}
            getAreaName={getAreaName}
            selected={selectedAreas}
            onChange={setSelectedAreas}
          />
        </div>
      )}

      <Button
        onClick={handleSubmit}
        disabled={isPending}
        className="w-full h-12 bg-[#0C6175] hover:bg-[#097188] text-white text-lg rounded-xl mt-2"
      >
        {isPending ? t("loading") : t("confirm")}
      </Button>
    </div>
  );
}
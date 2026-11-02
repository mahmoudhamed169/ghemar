"use client";
import { clientFetch } from "@/shared/lib/utils/client-fetch";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
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
import BranchAreasRow from "./branch-areas-row";
import { City } from "@/shared/lib/types/cities/city";
import { Branch } from "@/shared/lib/types/branches/branch";
import { VehicleType, CreateDriverPayload } from "@/shared/lib/types/drivers/driver";
import { useCreateDriver } from "@/shared/lib/hooks/drivers/use-create-driver";

const VEHICLE_TYPES: VehicleType[] = ["car", "motorcycle", "van"];

interface BranchRow {
  branchId: string;
  assignedAreas: string[];
}

interface AddDriverFormProps {
  onSuccess: () => void;
}

export default function AddDriverForm({ onSuccess }: AddDriverFormProps) {
  const locale = useLocale();
  const t = useTranslations("drivers.add");

  const { mutate: createDriver, isPending } = useCreateDriver();

  const [cities, setCities]     = useState<City[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loadingCities, setLoadingCities]     = useState(true);
  const [loadingBranches, setLoadingBranches] = useState(true);
  const [cityError, setCityError]     = useState(false);
  const [branchError, setBranchError] = useState(false);
  const [branchRows, setBranchRows]   = useState<BranchRow[]>([]);

  const [form, setForm] = useState({
    name:         "",
    phone:        "",
    nationalId:   "",
    employeeId:   "",
    vehicleType:  "" as VehicleType | "",
    vehiclePlate: "",
    cityId:       "",
  });

  useEffect(() => {
    clientFetch("/api/cities")
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((res) => { setCities(res.data ?? []); setLoadingCities(false); })
      .catch(() => { setCityError(true); setLoadingCities(false); });

    clientFetch("/api/branches")
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((res) => { setBranches(res.data ?? []); setLoadingBranches(false); })
      .catch(() => { setBranchError(true); setLoadingBranches(false); });
  }, []);

  const getCityName = (city: City) => locale === "ar" ? city.nameAr : city.name;

  const addBranchRow = () =>
    setBranchRows((p) => [...p, { branchId: "", assignedAreas: [] }]);

  const removeBranchRow = (index: number) =>
    setBranchRows((p) => p.filter((_, i) => i !== index));

  const handleBranchChange = (index: number, branchId: string) =>
    setBranchRows((p) =>
      p.map((row, i) => i === index ? { branchId, assignedAreas: [] } : row),
    );

  const handleAreaToggle = (index: number, areaCode: string) =>
    setBranchRows((p) =>
      p.map((row, i) => {
        if (i !== index) return row;
        const areas = row.assignedAreas.includes(areaCode)
          ? row.assignedAreas.filter((a) => a !== areaCode)
          : [...row.assignedAreas, areaCode];
        return { ...row, assignedAreas: areas };
      }),
    );

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.cityId || !form.vehicleType || !form.vehiclePlate || !form.nationalId) return;

    const payload: CreateDriverPayload = {
      name:         form.name,
      phone:        form.phone,
      cityId:       form.cityId,
      vehicleType:  form.vehicleType,
      vehiclePlate: form.vehiclePlate,
      nationalId:   form.nationalId,
      employeeId:   form.employeeId,
      assignedAreas: [],
      branches: branchRows
        .filter((r) => r.branchId)
        .map((r) => ({ branchId: r.branchId, assignedAreas: r.assignedAreas })),
    };

    createDriver(payload, { onSuccess: (res) => { if (res.success) onSuccess(); } });
  };

  return (
    <div className="px-6 py-5 space-y-4" dir="rtl">
      {/* Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t("name_label")}</Label>
          <Input placeholder={t("name_placeholder")} className="bg-gray-100 border-none h-11"
            value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t("phone_label")}</Label>
          <Input placeholder="+96251234567" className="bg-gray-100 border-none h-11" dir="ltr"
            value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
        </div>
      </div>

      {/* National ID + Employee ID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t("national_id_label")}</Label>
          <Input placeholder={t("national_id_placeholder")} className="bg-gray-100 border-none h-11" dir="ltr"
            value={form.nationalId} onChange={(e) => setForm((f) => ({ ...f, nationalId: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t("employee_id_label")}</Label>
          <Input placeholder="DRV-123456" className="bg-gray-100 border-none h-11" dir="ltr"
            value={form.employeeId} onChange={(e) => setForm((f) => ({ ...f, employeeId: e.target.value }))} />
        </div>
      </div>

      {/* Vehicle Type + Vehicle Plate */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t("vehicle_type_label")}</Label>
          <Select onValueChange={(val) => setForm((f) => ({ ...f, vehicleType: val as VehicleType }))}>
            <SelectTrigger className="bg-gray-100 border-none h-11 w-full">
              <SelectValue placeholder={t("vehicle_type_placeholder")} />
            </SelectTrigger>
            <SelectContent>
              {VEHICLE_TYPES.map((type) => (
                <SelectItem key={type} value={type}>{t(`vehicle_types.${type}`)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t("vehicle_plate_label")}</Label>
          <Input placeholder={t("vehicle_plate_placeholder")} className="bg-gray-100 border-none h-11" dir="ltr"
            value={form.vehiclePlate} onChange={(e) => setForm((f) => ({ ...f, vehiclePlate: e.target.value }))} />
        </div>
      </div>

      {/* City */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">{t("city_label")}</Label>
        {loadingCities ? (
          <div className="h-11 bg-gray-100 rounded-md animate-pulse" />
        ) : cityError ? (
          <p className="text-sm text-red-500">{t("cities_error")}</p>
        ) : (
          <Select onValueChange={(cityId) => setForm((f) => ({ ...f, cityId }))}>
            <SelectTrigger className="bg-gray-100 border-none h-11 w-full">
              <SelectValue placeholder={t("city_placeholder")} />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city._id} value={city._id}>{getCityName(city)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Branches & Areas */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">{t("branches_and_areas_label")}</Label>
          <button type="button" onClick={addBranchRow}
            disabled={loadingBranches || branchError}
            className="flex items-center gap-1 text-sm text-[#0C6175] hover:underline disabled:opacity-40">
            <Plus className="w-4 h-4" />
            {t("add_branch_btn")}
          </button>
        </div>

        {loadingBranches && <div className="h-10 bg-gray-100 rounded-md animate-pulse" />}
        {branchError && <p className="text-sm text-red-500">{t("branches_error")}</p>}
        {!loadingBranches && !branchError && branchRows.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-2">{t("no_branches_added")}</p>
        )}

        {branchRows.map((row, index) => (
          <BranchAreasRow key={index} index={index} branches={branches}
            branchId={row.branchId} assignedAreas={row.assignedAreas}
            onBranchChange={(branchId) => handleBranchChange(index, branchId)}
            onAreaToggle={(areaCode) => handleAreaToggle(index, areaCode)}
            onRemove={() => removeBranchRow(index)} />
        ))}
      </div>

      <Button onClick={handleSubmit} disabled={isPending}
        className="w-full h-11 bg-[#0C6175] hover:bg-[#097188] text-white rounded-xl">
        {isPending ? t("loading") : t("confirm")}
      </Button>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
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
import BranchAreasRow from "../add-driver/branch-areas-row";
import { City } from "@/shared/lib/types/cities/city";
import { Branch } from "@/shared/lib/types/branches/branch";
import { Driver, VehicleType, UpdateDriverPayload } from "@/shared/lib/types/drivers/driver";
import { useUpdateDriver } from "@/shared/lib/hooks/drivers/use-update-driver";

const VEHICLE_TYPES: VehicleType[] = ["car", "motorcycle", "van"];

interface BranchRow {
  branchId: string;
  assignedAreas: string[];
}

interface EditDriverFormProps {
  driver: Driver;
  onSuccess: () => void;
}

export default function EditDriverForm({ driver, onSuccess }: EditDriverFormProps) {
  const locale = useLocale();
  const t = useTranslations("drivers.add");

  const { mutate: updateDriver, isPending } = useUpdateDriver();

  const [cities, setCities]     = useState<City[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loadingCities, setLoadingCities]     = useState(true);
  const [loadingBranches, setLoadingBranches] = useState(true);
  const [cityError, setCityError]     = useState(false);
  const [branchError, setBranchError] = useState(false);

  const [branchRows, setBranchRows] = useState<BranchRow[]>(
    driver.branches?.map((b) => ({ branchId: b.branchId, assignedAreas: b.assignedAreas })) ?? [],
  );

  const [form, setForm] = useState({
    name:         driver.name,
    phone:        driver.phone,
    nationalId:   driver.nationalId ?? "",
    employeeId:   driver.employeeId ?? "",
    vehicleType:  driver.vehicleType as VehicleType | "",
    vehiclePlate: driver.vehiclePlate,
    cityId:       typeof driver.cityId === "string" ? driver.cityId : driver.cityId._id,
  });

  useEffect(() => {
    fetch("/api/cities")
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((res) => { setCities(res.data ?? []); setLoadingCities(false); })
      .catch(() => { setCityError(true); setLoadingCities(false); });

    fetch("/api/branches")
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
    if (!form.name || !form.phone || !form.vehicleType) return;

    const payload: UpdateDriverPayload = {
      name:         form.name,
      phone:        form.phone,
      cityId:       form.cityId,
      vehicleType:  form.vehicleType as VehicleType,
      vehiclePlate: form.vehiclePlate,
      nationalId:   form.nationalId,
      employeeId:   form.employeeId,
      assignedAreas: [],
      branches: branchRows
        .filter((r) => r.branchId)
        .map((r) => ({ branchId: r.branchId, assignedAreas: r.assignedAreas })),
    };

    updateDriver(
      { id: driver._id, ...payload },
      { onSuccess: (res) => { if (res.success) onSuccess(); } },
    );
  };

  return (
    <div className="px-6 py-5 space-y-4" dir="rtl">
      {/* Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t("name_label")}</Label>
          <Input className="bg-gray-100 border-none h-11"
            value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t("phone_label")}</Label>
          <Input className="bg-gray-100 border-none h-11" dir="ltr"
            value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
        </div>
      </div>

      {/* National ID + Employee ID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t("national_id_label")}</Label>
          <Input className="bg-gray-100 border-none h-11" dir="ltr"
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
          <Select value={form.vehicleType}
            onValueChange={(val) => setForm((f) => ({ ...f, vehicleType: val as VehicleType }))}>
            <SelectTrigger className="bg-gray-100 border-none h-11 w-full">
              <SelectValue />
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
          <Input className="bg-gray-100 border-none h-11" dir="ltr"
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
          <Select value={form.cityId} onValueChange={(cityId) => setForm((f) => ({ ...f, cityId }))}>
            <SelectTrigger className="bg-gray-100 border-none h-11 w-full">
              <SelectValue />
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
        {isPending ? t("edit_loading") : t("edit_confirm")}
      </Button>
    </div>
  );
}

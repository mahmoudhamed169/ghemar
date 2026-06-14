"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import { Branch, BranchAreaInput, CreateBranchInput } from "@/shared/lib/types/branches/branch";
import { City } from "@/shared/lib/types/zones/city";
import { useCreateBranch, useUpdateBranch } from "@/shared/lib/hooks/branches/use-branch-mutations";

interface BranchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cities: City[];
  initialData?: Branch;
}

interface AreaRow {
  cityId: string;
  areaCode: string;
}

const EMPTY_AREA: AreaRow = { cityId: "", areaCode: "" };

const INITIAL_FORM: CreateBranchInput = {
  name: "",
  nameAr: "",
  code: "",
  areas: [],
};

export default function BranchModal({ open, onOpenChange, cities, initialData }: BranchModalProps) {
  const isEdit = !!initialData;
  const [form, setForm] = useState<CreateBranchInput>(INITIAL_FORM);
  const [areas, setAreas] = useState<AreaRow[]>([]);

  const { mutate: createBranch, isPending: creating } = useCreateBranch();
  const { mutate: updateBranch, isPending: updating } = useUpdateBranch();
  const isPending = creating || updating;

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        nameAr: initialData.nameAr,
        code: initialData.code,
        areas: [],
      });
      setAreas(
        initialData.areas.map((a) => ({
          cityId: a.cityId._id,
          areaCode: a.areaCode,
        })),
      );
    } else {
      setForm(INITIAL_FORM);
      setAreas([]);
    }
  }, [initialData, open]);

  const setField = (field: keyof Omit<CreateBranchInput, "areas">, value: string) =>
    setForm((p) => ({ ...p, [field]: value }));

  const addArea = () => setAreas((p) => [...p, { ...EMPTY_AREA }]);

  const removeArea = (index: number) =>
    setAreas((p) => p.filter((_, i) => i !== index));

  const updateArea = (index: number, key: keyof AreaRow, value: string) =>
    setAreas((p) =>
      p.map((row, i) => {
        if (i !== index) return row;
        if (key === "cityId") return { cityId: value, areaCode: "" };
        return { ...row, [key]: value };
      }),
    );

  const getAreasForCity = (cityId: string) =>
    cities.find((c) => c._id === cityId)?.areas ?? [];

  const isValid = !!form.name && !!form.nameAr && !!form.code;

  const buildPayload = (): CreateBranchInput => ({
    ...form,
    areas: areas
      .filter((a) => a.cityId && a.areaCode)
      .map((a): BranchAreaInput => ({ cityId: a.cityId, areaCode: a.areaCode })),
  });

  const handleSave = () => {
    if (!isValid) return;
    const payload = buildPayload();
    if (isEdit && initialData) {
      updateBranch({ id: initialData._id, ...payload }, { onSuccess: () => onOpenChange(false) });
    } else {
      createBranch(payload, {
        onSuccess: () => {
          setForm(INITIAL_FORM);
          setAreas([]);
          onOpenChange(false);
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px] rounded-2xl p-4 sm:p-8">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-[#000709] mt-2">
            {isEdit ? "تعديل الفرع" : "إضافة فرع جديد"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 max-h-[65vh] overflow-y-auto pr-1">
          {/* Name fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>الاسم بالعربي *</Label>
              <Input
                value={form.nameAr}
                onChange={(e) => setField("nameAr", e.target.value)}
                className="h-11 bg-[#F5F5F5] border-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>الاسم بالإنجليزي *</Label>
              <Input
                value={form.name}
                dir="ltr"
                onChange={(e) => setField("name", e.target.value)}
                className="h-11 bg-[#F5F5F5] border-none"
              />
            </div>
          </div>

          {/* Code */}
          <div className="flex flex-col gap-1.5">
            <Label>كود الفرع *</Label>
            <Input
              value={form.code}
              dir="ltr"
              onChange={(e) => setField("code", e.target.value.toUpperCase())}
              placeholder="مثال: RYD-NORTH"
              className="h-11 bg-[#F5F5F5] border-none"
            />
          </div>

          {/* Areas */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label>المناطق</Label>
              <button
                type="button"
                onClick={addArea}
                className="flex items-center gap-1 text-sm text-[#0C6175] hover:underline"
              >
                <Plus className="w-4 h-4" />
                إضافة منطقة
              </button>
            </div>

            {areas.length === 0 && (
              <p className="text-xs text-gray-400 text-center py-2">
                لم تُضف مناطق بعد
              </p>
            )}

            {areas.map((row, index) => {
              const cityAreas = getAreasForCity(row.cityId);
              return (
                <div key={index} className="flex items-center gap-2">
                  {/* City selector */}
                  <Select
                    value={row.cityId}
                    onValueChange={(v) => updateArea(index, "cityId", v)}
                  >
                    <SelectTrigger className="flex-1 h-10 bg-[#F5F5F5] border-none">
                      <SelectValue placeholder="اختر المدينة" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city._id} value={city._id}>
                          {city.nameAr}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Area code selector */}
                  <Select
                    value={row.areaCode}
                    onValueChange={(v) => updateArea(index, "areaCode", v)}
                    disabled={!row.cityId || cityAreas.length === 0}
                  >
                    <SelectTrigger className="flex-1 h-10 bg-[#F5F5F5] border-none">
                      <SelectValue placeholder="اختر المنطقة" />
                    </SelectTrigger>
                    <SelectContent>
                      {cityAreas.map((area) => (
                        <SelectItem key={area.code} value={area.code}>
                          {area.nameAr}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <button
                    type="button"
                    onClick={() => removeArea(index)}
                    className="p-2 text-red-400 hover:text-red-600 shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <Button
            onClick={handleSave}
            disabled={isPending || !isValid}
            className="flex-1 h-11 bg-[#0C6175] hover:bg-[#097188] text-white rounded-xl"
          >
            {isPending ? "جارٍ الحفظ..." : "حفظ"}
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 h-11 rounded-xl"
          >
            إلغاء
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

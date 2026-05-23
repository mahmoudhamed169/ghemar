"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Package } from "@/shared/lib/types/packages/package";
import {
  useCreatePackage,
  useUpdatePackage,
} from "@/shared/lib/hooks/packages/use-package-mutations";

interface PackageModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode: "add" | "edit";
  pkg?: Package;
}

interface FormState {
  name: string;
  nameAr: string;
  price: string;
  bagCount: string;
  expressWashCount: string;
}

const INITIAL: FormState = {
  name: "",
  nameAr: "",
  price: "",
  bagCount: "",
  expressWashCount: "",
};

export default function PackageModal({
  open,
  onClose,
  onSuccess,
  mode,
  pkg,
}: PackageModalProps) {
  const t = useTranslations("Packages.modal");
  const [form, setForm] = useState<FormState>(INITIAL);

  const { mutate: createPackage, isPending: isCreating } = useCreatePackage();
  const { mutate: updatePackage, isPending: isUpdating } = useUpdatePackage();
  const isPending = isCreating || isUpdating;

  useEffect(() => {
    if (mode === "edit" && pkg) {
      setForm({
        name:             pkg.name,
        nameAr:           pkg.nameAr,
        price:            String(pkg.price),
        bagCount:         String(pkg.bagCount),
        expressWashCount: String(pkg.expressWashCount),
      });
    } else {
      setForm(INITIAL);
    }
  }, [mode, pkg, open]);

  const handleChange = (field: keyof FormState, val: string) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  const isAddValid = !!(
    form.name.trim() &&
    form.nameAr.trim() &&
    form.price &&
    form.bagCount &&
    form.expressWashCount
  );

  const isEditValid = !!(form.name.trim() && form.nameAr.trim() && form.price);

  const isDirty =
    mode === "edit" && pkg
      ? form.name !== pkg.name ||
        form.nameAr !== pkg.nameAr ||
        Number(form.price) !== pkg.price
      : true;

  const isValid = mode === "add" ? isAddValid : isEditValid && isDirty;

  const handleSave = () => {
    if (mode === "add" && isAddValid) {
      createPackage(
        {
          name:             form.name.trim(),
          nameAr:           form.nameAr.trim(),
          price:            Number(form.price),
          bagCount:         Number(form.bagCount),
          expressWashCount: Number(form.expressWashCount),
          currency:         "SAR",
        },
        { onSuccess },
      );
    } else if (mode === "edit" && pkg && isEditValid) {
      updatePackage(
        {
          id: pkg._id,
          body: {
            name:   form.name.trim(),
            nameAr: form.nameAr.trim(),
            price:  Number(form.price),
          },
        },
        { onSuccess },
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] rounded-2xl p-8">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-[#000709] mt-2">
            {mode === "add" ? t("addTitle") : t("editTitle")}
          </DialogTitle>
          {mode === "edit" && pkg && (
            <p className="text-sm text-gray-400">{pkg.nameAr}</p>
          )}
        </DialogHeader>

        <div className="flex flex-col gap-5">
          {/* Name AR + EN */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-[#000709]">
                {t("nameAr")}
              </Label>
              <Input
                placeholder="تنظيف أساسي"
                value={form.nameAr}
                onChange={(e) => handleChange("nameAr", e.target.value)}
                className="h-11 bg-[#F5F5F5] border-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-[#000709]">
                {t("nameEn")}
              </Label>
              <Input
                placeholder="Basic Clean"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="h-11 bg-[#F5F5F5] border-none"
                dir="ltr"
              />
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-[#000709]">
              {t("price")} (SAR)
            </Label>
            <Input
              type="number"
              placeholder="99.99"
              value={form.price}
              min={0}
              onChange={(e) => handleChange("price", e.target.value)}
              className="h-11 bg-[#F5F5F5] border-none"
              dir="ltr"
            />
          </div>

          {/* Add only fields */}
          {mode === "add" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-[#000709]">
                  {t("bagCount")}
                </Label>
                <Input
                  type="number"
                  placeholder="5"
                  value={form.bagCount}
                  min={1}
                  onChange={(e) => handleChange("bagCount", e.target.value)}
                  className="h-11 bg-[#F5F5F5] border-none"
                  dir="ltr"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-[#000709]">
                  {t("expressWashCount")}
                </Label>
                <Input
                  type="number"
                  placeholder="1"
                  value={form.expressWashCount}
                  min={0}
                  onChange={(e) =>
                    handleChange("expressWashCount", e.target.value)
                  }
                  className="h-11 bg-[#F5F5F5] border-none"
                  dir="ltr"
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 mt-1">
            <Button
              onClick={handleSave}
              disabled={isPending || !isValid}
              className="flex-1 h-12 bg-[#0C6175] hover:bg-[#097188] disabled:opacity-50 text-white rounded-lg text-base font-medium"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t("saving")}
                </span>
              ) : (
                t("save")
              )}
            </Button>
            <Button
              onClick={onClose}
              disabled={isPending}
              variant="outline"
              className="flex-1 h-12 border border-[#0C6175] text-[#0C6175] bg-white hover:bg-[#0C6175]/5 rounded-lg text-base font-medium"
            >
              {t("cancel")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Package } from "@/shared/lib/types/packages/package";
import {
  useCreatePackage,
  useUpdatePackage,
} from "@/shared/lib/hooks/packages/use-package-mutations";
import PackageForm, {
  EMPTY_PACKAGE_FORM,
  PackageFormState,
  formToExtrasBody,
  getSavingsError,
  packageToFormState,
} from "./package-form";

interface PackageModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode: "add" | "edit";
  pkg?: Package;
}

export default function PackageModal({
  open,
  onClose,
  onSuccess,
  mode,
  pkg,
}: PackageModalProps) {
  const t = useTranslations("Packages.modal");
  const initialForm = () =>
    mode === "edit" && pkg ? packageToFormState(pkg) : EMPTY_PACKAGE_FORM;
  const [form, setForm] = useState<PackageFormState>(initialForm);

  // refill the form each time the modal opens or the package changes
  const [source, setSource] = useState({ open, mode, pkg });
  if (source.open !== open || source.mode !== mode || source.pkg !== pkg) {
    setSource({ open, mode, pkg });
    setForm(initialForm());
  }

  const { mutate: createPackage, isPending: isCreating } = useCreatePackage();
  const { mutate: updatePackage, isPending: isUpdating } = useUpdatePackage();
  const isPending = isCreating || isUpdating;

  const handleChange = (patch: Partial<PackageFormState>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const hasBaseFields = !!(form.name.trim() && form.nameAr.trim() && form.price);
  const hasValidExtras = getSavingsError(form) === null;

  const isAddValid = hasBaseFields && !!form.bagCount && hasValidExtras;
  const isEditValid = hasBaseFields && hasValidExtras;

  const isDirty =
    mode === "edit" && pkg
      ? JSON.stringify(form) !== JSON.stringify(packageToFormState(pkg))
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
          expressWashCount: 0,
          currency:         "SAR",
          ...formToExtrasBody(form),
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
            ...formToExtrasBody(form),
          },
        },
        { onSuccess },
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-[#000709] mt-2">
            {mode === "add" ? t("addTitle") : t("editTitle")}
          </DialogTitle>
          {mode === "edit" && pkg && (
            <p className="text-sm text-gray-400">{pkg.nameAr}</p>
          )}
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <PackageForm mode={mode} form={form} onChange={handleChange} />

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

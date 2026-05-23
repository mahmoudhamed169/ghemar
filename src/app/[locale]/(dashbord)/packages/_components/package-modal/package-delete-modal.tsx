"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDeletePackage } from "@/shared/lib/hooks/packages/use-package-mutations"
import { Package } from "@/shared/lib/types/packages/package";

interface PackageDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  pkg: Package;
}

export default function PackageDeleteModal({
  open,
  onClose,
  onConfirm,
  pkg,
}: PackageDeleteModalProps) {
  const t = useTranslations("Packages.deleteModal");
  const { mutate: deletePackage, isPending } = useDeletePackage();

  const handleConfirm = () => {
    deletePackage(pkg._id, { onSuccess: onConfirm });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] rounded-2xl p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
            <Trash2 className="w-7 h-7 text-red-500" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#000709]">{t("title")}</h2>
            <p className="text-sm text-gray-400">
              {t("message")}{" "}
              <span className="font-semibold text-[#000709]">{pkg.nameAr}</span>؟
            </p>
          </div>

          <div className="flex gap-3 w-full mt-2">
            <Button
              onClick={handleConfirm}
              disabled={isPending}
              className="flex-1 h-11 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t("deleting")}
                </span>
              ) : (
                t("confirm")
              )}
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isPending}
              className="flex-1 h-11 rounded-xl border-gray-200 text-gray-600"
            >
              {t("cancel")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
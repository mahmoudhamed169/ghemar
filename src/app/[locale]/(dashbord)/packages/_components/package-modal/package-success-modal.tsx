"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckCircle2, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface PackageSuccessModalProps {
  open: boolean;
  onClose: () => void;
  mode: "add" | "edit" | "delete";
}

export default function PackageSuccessModal({
  open,
  onClose,
  mode,
}: PackageSuccessModalProps) {
  const t = useTranslations("Packages.successModal");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[360px] rounded-2xl p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              mode === "delete" ? "bg-red-50" : "bg-green-50"
            }`}
          >
            {mode === "delete" ? (
              <Trash2 className="w-7 h-7 text-red-500" />
            ) : (
              <CheckCircle2 className="w-7 h-7 text-green-500" />
            )}
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#000709]">
              {mode === "add"
                ? t("addTitle")
                : mode === "edit"
                  ? t("editTitle")
                  : t("deleteTitle")}
            </h2>
            <p className="text-sm text-gray-400">
              {mode === "add"
                ? t("addMessage")
                : mode === "edit"
                  ? t("editMessage")
                  : t("deleteMessage")}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
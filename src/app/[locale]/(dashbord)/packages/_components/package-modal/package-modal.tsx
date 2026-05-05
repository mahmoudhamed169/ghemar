"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PackageForm, { PackageFormData } from "./package-form";

interface PackageModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode: "add" | "edit";
  initialData?: PackageFormData;
}

export default function PackageModal({
  open,
  onClose,
  onSuccess,
  mode,
  initialData,
}: PackageModalProps) {
  const handleSubmit = (data: PackageFormData) => {
    console.log(data);
    onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full rounded-2xl p-6" dir="rtl">
        <DialogHeader>
          <h1 className="text-2xl font-bold text-[#000709] my-5 ">
            {mode === "add" ? "أنشاء باقة جديدة" : "تعديل باقة"}
          </h1>
        </DialogHeader>
        <PackageForm initialData={initialData} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}

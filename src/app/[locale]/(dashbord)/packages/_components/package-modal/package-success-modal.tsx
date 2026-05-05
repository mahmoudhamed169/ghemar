"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

interface PackageSuccessModalProps {
  open: boolean;
  onClose: () => void;
  mode: "add" | "edit" | "delete";
}

const messages = {
  add: "تم إضافة الباقة بنجاح!",
  edit: "تم تعديل الباقة بنجاح!",
  delete: "تم حذف الباقة بنجاح!",
};

export default function PackageSuccessModal({
  open,
  onClose,
  mode,
}: PackageSuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xs w-full rounded-2xl p-8 flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <p className="text-lg font-semibold text-center">{messages[mode]}</p>
      </DialogContent>
    </Dialog>
  );
}

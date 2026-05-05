"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface PackageDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  packageName: string;
}

export default function PackageDeleteModal({
  open,
  onClose,
  onConfirm,
  packageName,
}: PackageDeleteModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-sm w-full rounded-2xl p-8 flex flex-col items-center gap-5"
        dir="rtl"
      >
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
          <Trash2 className="w-7 h-7 text-red-500" />
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-lg font-bold text-[#000709]">حذف الباقة</h2>
          <p className="text-sm text-gray-500">
            هل أنت متأكد أنك تريد حذف الباقة{" "}
            <span className="font-bold text-[#000709]">"{packageName}"</span>؟
            <br />
            لا يمكن التراجع عن هذا الإجراء.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 h-11 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            إلغاء
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 h-11 rounded-xl bg-red-500 hover:bg-red-600 text-white"
          >
            نعم، احذف
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

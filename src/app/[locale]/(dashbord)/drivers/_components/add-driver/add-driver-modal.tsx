"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AddDriverForm from "./add-driver-form";

export default function AddDriverModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full rounded-2xl p-6" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-right">
            اضافة سائق
          </DialogTitle>
        </DialogHeader>
        <AddDriverForm onClose={onClose} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
}
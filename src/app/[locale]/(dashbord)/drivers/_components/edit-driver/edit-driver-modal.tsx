"use client";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EditDriverForm from "./edit-driver-form";
import { Driver } from "@/shared/lib/types/drivers/driver";

interface EditDriverModalProps {
  open: boolean;
  onClose: () => void;
  driver: Driver;
}

export default function EditDriverModal({ open, onClose, driver }: EditDriverModalProps) {
  const t = useTranslations("drivers.add");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[540px] rounded-2xl p-0 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex-none px-6 pt-6 pb-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#000709]">{t("edit_modal_title")}</h2>
        </div>
        <div className="flex-1 overflow-y-auto min-h-0">
          <EditDriverForm driver={driver} onSuccess={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

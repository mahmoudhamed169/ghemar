"use client";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
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
  const t = useTranslations("drivers.add");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full rounded-2xl p-6">
        <DialogHeader>
          <h1 className="text-2xl font-bold text-[#000709] my-5">
            {t("modal_title")}
          </h1>
        </DialogHeader>
        <AddDriverForm onClose={onClose} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
}
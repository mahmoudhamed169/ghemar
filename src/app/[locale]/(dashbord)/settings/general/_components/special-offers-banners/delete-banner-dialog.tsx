"use client";

import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useDeleteBanner } from "@/shared/lib/hooks/settings/use-banner-mutations";

interface DeleteBannerDialogProps {
  bannerId: string | null;
  onOpenChange: (open: boolean) => void;
  onDeleted: (id: string) => void;
}

export default function DeleteBannerDialog({
  bannerId,
  onOpenChange,
  onDeleted,
}: DeleteBannerDialogProps) {
  const t = useTranslations("Settings.general.banners.deleteConfirm");
  const { mutate: deleteBanner, isPending } = useDeleteBanner();

  const handleConfirm = () => {
    if (!bannerId) return;
    deleteBanner(bannerId, {
      onSuccess: () => {
        onDeleted(bannerId);
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={!!bannerId} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] rounded-2xl p-8">
        <DialogHeader className="mb-2">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <DialogTitle className="text-xl font-bold text-[#000709]">
              {t("title")}
            </DialogTitle>
            <p className="text-sm text-gray-500">{t("description")}</p>
          </div>
        </DialogHeader>

        <div className="flex gap-3 mt-4">
          <Button
            onClick={handleConfirm}
            disabled={isPending}
            className="flex-1 h-11 bg-red-500 hover:bg-red-600 text-white rounded-xl"
          >
            {t("confirm")}
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 h-11 rounded-xl"
          >
            {t("cancel")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

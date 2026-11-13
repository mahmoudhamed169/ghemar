"use client";

import { useTranslations } from "next-intl";
import { Ban, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCancelOrder } from "@/shared/lib/hooks/orders/use-cancel-order";

interface CancelOrderDialogProps {
  orderId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CancelOrderDialog({
  orderId,
  open,
  onOpenChange,
}: CancelOrderDialogProps) {
  const t = useTranslations("orders.cancelConfirm");
  const { mutate: cancelOrder, isPending } = useCancelOrder();

  const handleConfirm = () => {
    cancelOrder(orderId, {
      onSuccess: (result) => {
        if (result.success) onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !isPending && onOpenChange(next)}>
      <DialogContent className="sm:max-w-[400px] rounded-2xl p-8">
        <DialogHeader className="mb-2">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
              <Ban className="w-6 h-6 text-red-500" />
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
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : t("confirm")}
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="flex-1 h-11 rounded-xl"
          >
            {t("cancel")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

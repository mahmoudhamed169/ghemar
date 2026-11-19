"use client";

import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PromoCode } from "@/shared/lib/types/promocode/promo-codes";
import { useDeletePromoCode } from "@/shared/lib/hooks/promocode/use-delete-promo-code";

export default function DeleteCodeButton({ promoCode }: { promoCode: PromoCode }) {
  const t = useTranslations("PromoCodes.deleteModal");
  const [open, setOpen] = useState(false);
  const { mutate: deletePromoCode, isPending } = useDeletePromoCode();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label={t("title")}
        title={t("title")}
        className="w-8 h-8 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </Button>

      <Dialog open={open} onOpenChange={(next) => !isPending && setOpen(next)}>
        <DialogContent className="sm:max-w-[400px] rounded-2xl p-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
              <Trash2 className="w-7 h-7 text-red-500" />
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-xl font-bold text-[#000709]">{t("title")}</DialogTitle>
              <p className="text-sm text-gray-500">
                {t("message")}{" "}
                <span className="font-semibold tracking-widest text-[#000709]" dir="ltr">
                  {promoCode.code}
                </span>
                ؟
              </p>
              <p className="text-xs text-gray-400">{t("note")}</p>
            </div>

            <div className="flex gap-3 w-full mt-2">
              <Button
                onClick={() => deletePromoCode(promoCode._id, { onSuccess: () => setOpen(false) })}
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
                onClick={() => setOpen(false)}
                disabled={isPending}
                className="flex-1 h-11 rounded-xl border-gray-200 text-gray-600"
              >
                {t("cancel")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

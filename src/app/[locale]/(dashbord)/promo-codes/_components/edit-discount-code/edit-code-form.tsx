"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { PromoCode } from "@/shared/lib/types/promocode/promo-codes";
import { useUpdatePromoCode } from "@/shared/lib/hooks/promocode/use-update-promo-code";


interface EditCodeFormProps {
  promoCode: PromoCode;
  onClose: () => void;
}

export default function EditCodeForm({
  promoCode,
  onClose,
}: EditCodeFormProps) {
  const t = useTranslations("PromoCodes.editForm");

  const [discountValue, setDiscountValue] = useState(
    String(promoCode.discountValue),
  );
  const [expiryDate, setExpiryDate] = useState(
    promoCode.expiryDate.split("T")[0],
  );

  const { mutate: updatePromoCode, isPending } = useUpdatePromoCode();

  const isValid = !!(discountValue && expiryDate);

  const isDirty =
    Number(discountValue) !== promoCode.discountValue ||
    expiryDate !== promoCode.expiryDate.split("T")[0];

  const handleSave = () => {
    if (!isValid || !isDirty) return;

    updatePromoCode(
      {
        id: promoCode._id,
        body: {
          discountValue: Number(discountValue),
          expiryDate: new Date(expiryDate).toISOString(),
        },
      },
      { onSuccess: () => onClose() },
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label className="text-sm font-medium text-[#000709]">
          {t("discountValue")}{" "}
          <span className="text-gray-400 font-normal">
            ({promoCode.discountType === "percentage" ? "%" : t("currency")})
          </span>
        </Label>
        <Input
          type="number"
          value={discountValue}
          min={1}
          max={promoCode.discountType === "percentage" ? 100 : undefined}
          onChange={(e) => setDiscountValue(e.target.value)}
          className="h-11 bg-[#F5F5F5] border-none"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-sm font-medium text-[#000709]">
          {t("expiryDate")}
        </Label>
        <Input
          type="date"
          value={expiryDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="h-11 bg-[#F5F5F5] border-none"
        />
      </div>

      <div className="flex gap-3 mt-1">
        <Button
          onClick={handleSave}
          disabled={isPending || !isValid || !isDirty}
          className="flex-1 h-12 bg-[#0C6175] hover:bg-[#097188] disabled:opacity-50 text-white rounded-lg text-base font-medium"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              {t("saving")}
            </span>
          ) : (
            t("save")
          )}
        </Button>

        <Button
          onClick={onClose}
          disabled={isPending}
          variant="outline"
          className="flex-1 h-12 border border-[#0C6175] text-[#0C6175] bg-white hover:bg-[#0C6175]/5 rounded-lg text-base font-medium"
        >
          {t("cancel")}
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Loader2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BagsAdjustmentType, CustomerDetail } from "@/shared/lib/types/customers";
import { useAdjustCustomerBags } from "@/shared/lib/hooks/customers/use-customer-bags";

const MIN_BAGS = 1;
const MAX_BAGS = 1000;

interface Props {
  customer: CustomerDetail;
  customerId: string;
  /** "deduct" can't take more than the customer's current balance */
  type: BagsAdjustmentType;
}

export default function CustomerAdjustBags({ customer, customerId, type }: Props) {
  const t = useTranslations("customers.details");
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState("");
  const [reason, setReason] = useState("");
  const [confirming, setConfirming] = useState(false);
  const { mutate: adjustBags, isPending } = useAdjustCustomerBags(customerId, type);

  const isDeduct = type === "deduct";
  const balance = customer.availableBags ?? 0;
  const maxBags = isDeduct ? Math.min(MAX_BAGS, balance) : MAX_BAGS;
  const nothingToDeduct = isDeduct && balance < MIN_BAGS;

  const countNumber = Number(count);
  const isValid =
    count.trim() !== "" &&
    Number.isInteger(countNumber) &&
    countNumber >= MIN_BAGS &&
    countNumber <= maxBags;

  const handleOpenChange = (next: boolean) => {
    if (isPending) return;
    setOpen(next);
    if (!next) {
      setCount("");
      setReason("");
      setConfirming(false);
    }
  };

  const handleCountChange = (value: string) => {
    // a deduction can't go past the balance — clamp instead of letting it through
    if (isDeduct && value.trim() !== "" && Number(value) > maxBags) {
      setCount(String(maxBags));
      return;
    }
    setCount(value);
  };

  const handleContinue = () => {
    if (!isValid) {
      toast.error(
        isDeduct ? t("deductCountInvalid", { max: maxBags }) : t("bagsCountInvalid"),
      );
      return;
    }
    setConfirming(true);
  };

  const handleConfirm = () => {
    const trimmedReason = reason.trim();

    adjustBags(
      { count: countNumber, ...(trimmedReason ? { reason: trimmedReason } : {}) },
      {
        onSuccess: (result) => {
          toast.success(
            result.message ?? t(isDeduct ? "deductBagsSuccess" : "addBagsSuccess"),
          );
          setOpen(false);
          setCount("");
          setReason("");
          setConfirming(false);
        },
        onError: (error) => {
          toast.error(error.message || t(isDeduct ? "deductBagsError" : "addBagsError"));
          setConfirming(false);
        },
      },
    );
  };

  return (
    <>
      {isDeduct ? (
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="h-9 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg text-sm gap-1.5"
        >
          <Minus className="w-4 h-4" />
          {t("deductBags")}
        </Button>
      ) : (
        <Button
          onClick={() => setOpen(true)}
          className="h-9 bg-[#0C6175] hover:bg-[#097188] text-white rounded-lg text-sm gap-1.5"
        >
          <Plus className="w-4 h-4" />
          {t("addBags")}
        </Button>
      )}

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[420px] rounded-2xl p-8" dir="rtl">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-xl font-bold text-[#000709] mt-2">
              {t(isDeduct ? "deductBagsTitle" : "addBagsTitle")}
            </DialogTitle>
          </DialogHeader>

          {isDeduct && (
            <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
              <span className="text-sm text-gray-500">{t("currentBalance")}</span>
              <span className="text-lg font-bold text-[#0C6175]">{balance}</span>
            </div>
          )}

          {confirming ? (
            <div className="flex flex-col gap-5">
              <p className="text-sm text-gray-600 leading-relaxed">
                {t(isDeduct ? "confirmDeductBagsText" : "confirmAddBagsText", {
                  count: countNumber,
                  name: customer.name ?? customer.phone,
                })}
              </p>
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleConfirm}
                  disabled={isPending}
                  className={`flex-1 h-11 text-white rounded-lg gap-2 ${
                    isDeduct
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-[#0C6175] hover:bg-[#097188]"
                  }`}
                >
                  {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isPending
                    ? t(isDeduct ? "deducting" : "adding")
                    : t(isDeduct ? "confirmDeductBags" : "confirmAddBags")}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setConfirming(false)}
                  disabled={isPending}
                  className="flex-1 h-11 rounded-lg"
                >
                  {t("back")}
                </Button>
              </div>
            </div>
          ) : nothingToDeduct ? (
            <div className="flex flex-col gap-5">
              <p className="text-sm text-gray-500 text-center py-2">
                {t("noBagsToDeduct")}
              </p>
              <Button
                variant="outline"
                onClick={() => handleOpenChange(false)}
                className="h-11 rounded-lg"
              >
                {t("cancel")}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium text-[#000709]">
                  {t("bagsCount")}
                </Label>
                <Input
                  type="number"
                  min={MIN_BAGS}
                  max={maxBags}
                  step={1}
                  value={count}
                  onChange={(e) => handleCountChange(e.target.value)}
                  dir="ltr"
                  autoFocus
                />
                <span className="text-xs text-gray-400">
                  {isDeduct ? t("deductCountHint", { max: maxBags }) : t("bagsCountHint")}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium text-[#000709]">
                  {t("bagsReason")}
                </Label>
                <Input
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder={t(isDeduct ? "deductReasonPlaceholder" : "bagsReasonPlaceholder")}
                />
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={handleContinue}
                  className="flex-1 h-11 bg-[#0C6175] hover:bg-[#097188] text-white rounded-lg"
                >
                  {t("continue")}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                  className="flex-1 h-11 rounded-lg"
                >
                  {t("cancel")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

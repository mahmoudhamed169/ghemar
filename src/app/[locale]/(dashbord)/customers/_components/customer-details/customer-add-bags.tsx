"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CustomerDetail } from "@/shared/lib/types/customers";
import { useAddCustomerBags } from "@/shared/lib/hooks/customers/use-customer-bags";

const MIN_BAGS = 1;
const MAX_BAGS = 1000;

interface Props {
  customer: CustomerDetail;
  customerId: string;
}

export default function CustomerAddBags({ customer, customerId }: Props) {
  const t = useTranslations("customers.details");
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState("");
  const [reason, setReason] = useState("");
  const [confirming, setConfirming] = useState(false);
  const { mutate: addBags, isPending } = useAddCustomerBags(customerId);

  const countNumber = Number(count);
  const isValid =
    count.trim() !== "" &&
    Number.isInteger(countNumber) &&
    countNumber >= MIN_BAGS &&
    countNumber <= MAX_BAGS;

  const handleOpenChange = (next: boolean) => {
    if (isPending) return;
    setOpen(next);
    if (!next) {
      setCount("");
      setReason("");
      setConfirming(false);
    }
  };

  const handleContinue = () => {
    if (!isValid) {
      toast.error(t("bagsCountInvalid"));
      return;
    }
    setConfirming(true);
  };

  const handleConfirm = () => {
    const trimmedReason = reason.trim();

    addBags(
      { count: countNumber, ...(trimmedReason ? { reason: trimmedReason } : {}) },
      {
        onSuccess: (result) => {
          toast.success(result.message ?? t("addBagsSuccess"));
          setOpen(false);
          setCount("");
          setReason("");
          setConfirming(false);
        },
        onError: (error) => {
          toast.error(error.message || t("addBagsError"));
          setConfirming(false);
        },
      },
    );
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="h-9 bg-[#0C6175] hover:bg-[#097188] text-white rounded-lg text-sm gap-1.5"
      >
        <Plus className="w-4 h-4" />
        {t("addBags")}
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[420px] rounded-2xl p-8" dir="rtl">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-xl font-bold text-[#000709] mt-2">
              {t("addBagsTitle")}
            </DialogTitle>
          </DialogHeader>

          {confirming ? (
            <div className="flex flex-col gap-5">
              <p className="text-sm text-gray-600 leading-relaxed">
                {t("confirmAddBagsText", {
                  count: countNumber,
                  name: customer.name ?? customer.phone,
                })}
              </p>
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleConfirm}
                  disabled={isPending}
                  className="flex-1 h-11 bg-[#0C6175] hover:bg-[#097188] text-white rounded-lg gap-2"
                >
                  {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isPending ? t("adding") : t("confirmAddBags")}
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
          ) : (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium text-[#000709]">
                  {t("bagsCount")}
                </Label>
                <Input
                  type="number"
                  min={MIN_BAGS}
                  max={MAX_BAGS}
                  step={1}
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  dir="ltr"
                  autoFocus
                />
                <span className="text-xs text-gray-400">{t("bagsCountHint")}</span>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium text-[#000709]">
                  {t("bagsReason")}
                </Label>
                <Input
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder={t("bagsReasonPlaceholder")}
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

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { setDeliveryTimeAction } from "@/shared/lib/actions/orders/set-delivery-time";
import { ChosenDeliverySlot } from "@/shared/lib/types/orders/order";
import {
  riyadhInputToDate,
  toRiyadhInputValues,
} from "@/shared/lib/utils/riyadh-time";

interface SetDeliveryTimeDialogProps {
  orderId: string;
  /** the slot an admin set earlier, when editing */
  currentSlot?: ChosenDeliverySlot;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SetDeliveryTimeDialog({
  orderId,
  currentSlot,
  open,
  onOpenChange,
}: SetDeliveryTimeDialogProps) {
  const t = useTranslations("orders.delivery_time");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-5 pt-5 pb-4 border-b">
          <DialogTitle className="text-lg font-bold text-[#000709] mt-4 text-center">
            {currentSlot ? t("edit") : t("set")}
          </DialogTitle>
        </DialogHeader>
        {/* mounted on every open, so it always starts from the current slot (or empty) */}
        <DeliveryTimeForm
          orderId={orderId}
          currentSlot={currentSlot}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

function DeliveryTimeForm({
  orderId,
  currentSlot,
  onClose,
}: {
  orderId: string;
  currentSlot?: ChosenDeliverySlot;
  onClose: () => void;
}) {
  const t = useTranslations("orders.delivery_time");
  const router = useRouter();
  const [isSaving, startSaving] = useTransition();

  const initialStart = toRiyadhInputValues(currentSlot?.start);
  const initialEnd = toRiyadhInputValues(currentSlot?.end);

  const [date, setDate] = useState(initialStart?.date ?? "");
  const [startTime, setStartTime] = useState(initialStart?.time ?? "");
  // an end on another day can't be expressed with one date field — leave it out
  const [endTime, setEndTime] = useState(
    initialEnd && initialEnd.date === initialStart?.date ? initialEnd.time : "",
  );
  const [error, setError] = useState<string | null>(null);
  const [today] = useState(() => toRiyadhInputValues(new Date())?.date ?? "");

  const handleSave = () => {
    const start = riyadhInputToDate(date, startTime);
    if (!start) return setError(t("errors.start_required"));
    if (start.getTime() <= Date.now())
      return setError(t("errors.must_be_future"));

    const end = endTime ? riyadhInputToDate(date, endTime) : null;
    if (endTime && (!end || end.getTime() <= start.getTime())) {
      return setError(t("errors.end_before_start"));
    }

    setError(null);
    startSaving(async () => {
      try {
        const result = await setDeliveryTimeAction(
          orderId,
          start.toISOString(),
          end?.toISOString(),
        );
        if (!result.success) {
          setError(t(`errors.${result.error ?? "unknown"}`));
          return;
        }
        onClose();
        toast.success(t("success"));
        router.refresh();
      } catch {
        setError(t("errors.unknown"));
      }
    });
  };

  return (
    <>
      <div className="px-5 py-5 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="delivery-date">{t("date")}</Label>
          <Input
            id="delivery-date"
            type="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-11 bg-gray-50 border-gray-200"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="delivery-start">{t("start_time")}</Label>
            <Input
              id="delivery-start"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="h-11 bg-gray-50 border-gray-200"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="delivery-end">
              {t("end_time")}{" "}
              <span className="text-xs text-gray-400 font-normal">
                {t("optional")}
              </span>
            </Label>
            <Input
              id="delivery-end"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="h-11 bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        <p className="text-xs text-gray-400">{t("hint")}</p>

        {error && (
          <p
            role="alert"
            className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2"
          >
            {error}
          </p>
        )}
      </div>

      <div className="flex gap-3 px-5 py-4 border-t">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="flex-1 bg-[#0C6175] hover:bg-[#0a5363] text-white rounded-xl h-11"
        >
          {isSaving ? t("saving") : t("save")}
        </Button>
        <Button
          variant="outline"
          onClick={onClose}
          disabled={isSaving}
          className="flex-1 rounded-xl h-11 border-gray-200 text-gray-700"
        >
          {t("cancel")}
        </Button>
      </div>
    </>
  );
}

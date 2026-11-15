"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { CalendarClock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { setPickupTimeAction } from "@/shared/lib/actions/orders/set-pickup-time";
import { Order } from "@/shared/lib/types/orders/order";
import {
  formatRiyadhSlot,
  formatRiyadhTimeRange,
  riyadhInputToDate,
  toRiyadhInputValues,
} from "@/shared/lib/utils/riyadh-time";

const TWO_HOURS = 2 * 60 * 60 * 1000;
/** the start of each 2-hour window: "00:00", "02:00" … "22:00" (Riyadh time) */
const WINDOW_STARTS = Array.from({ length: 12 }, (_, i) => `${String(i * 2).padStart(2, "0")}:00`);
// any day works for the button labels when no date is picked yet
const LABEL_DATE = "2026-01-01";

type PickupSlot = Pick<NonNullable<Order["pickup"]>, "slotStart" | "slotEnd">;

interface SetPickupTimeDialogProps {
  orderId: string;
  /** the current window, preselected */
  current?: PickupSlot;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SetPickupTimeDialog({
  orderId,
  current,
  open,
  onOpenChange,
}: SetPickupTimeDialogProps) {
  const t = useTranslations("orders.pickup_time");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-5 pt-5 pb-4 border-b">
          <DialogTitle className="text-lg font-bold text-[#000709] mt-4 text-center">
            {t("change")}
          </DialogTitle>
        </DialogHeader>
        {/* mounted on every open, so it always starts from the current window */}
        <PickupTimeForm
          orderId={orderId}
          current={current}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

/** the current window as form values: date, window start and a custom end when it isn't 2 hours */
function initialValues(current?: PickupSlot) {
  const start = toRiyadhInputValues(current?.slotStart);
  if (!start || !current?.slotStart) return { date: "", startTime: "", endTime: "" };
  const end = toRiyadhInputValues(current.slotEnd);
  const isTwoHours =
    !current.slotEnd ||
    new Date(current.slotEnd).getTime() - new Date(current.slotStart).getTime() === TWO_HOURS;
  return {
    date: start.date,
    startTime: start.time,
    // a custom end on the same day can be shown in the time field; anything else falls back to 2 hours
    endTime: !isTwoHours && end && end.date === start.date ? end.time : "",
  };
}

function PickupTimeForm({
  orderId,
  current,
  onClose,
}: {
  orderId: string;
  current?: PickupSlot;
  onClose: () => void;
}) {
  const t = useTranslations("orders.pickup_time");
  const locale = useLocale();
  const router = useRouter();
  const [isSaving, startSaving] = useTransition();

  const [initial] = useState(() => initialValues(current));
  const [date, setDate] = useState(initial.date);
  const [startTime, setStartTime] = useState(initial.startTime);
  const [endTime, setEndTime] = useState(initial.endTime);
  const [showCustomEnd, setShowCustomEnd] = useState(!!initial.endTime);
  const [error, setError] = useState<string | null>(null);
  const [now] = useState(() => Date.now());
  const [today] = useState(() => toRiyadhInputValues(new Date())?.date ?? "");

  const currentText = current?.slotStart
    ? formatRiyadhSlot(current.slotStart, current.slotEnd, locale)
    : null;

  const handleSave = () => {
    const start = riyadhInputToDate(date, startTime);
    if (!start) return setError(t("errors.window_required"));

    const end = showCustomEnd && endTime ? riyadhInputToDate(date, endTime) : null;
    if (showCustomEnd && endTime && (!end || end.getTime() <= start.getTime())) {
      return setError(t("errors.end_before_start"));
    }
    const effectiveEnd = end ?? new Date(start.getTime() + TWO_HOURS);
    if (effectiveEnd.getTime() <= Date.now()) return setError(t("errors.must_be_future"));

    setError(null);
    startSaving(async () => {
      try {
        const result = await setPickupTimeAction(
          orderId,
          start.toISOString(),
          end?.toISOString(),
        );
        if (!result.success) {
          setError(result.message || t("errors.unknown"));
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
        {currentText && (
          <p className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
            <CalendarClock className="w-3.5 h-3.5 shrink-0 text-[#0C6175]" />
            <span>
              {t("current")}: <span className="font-medium text-[#000709]">{currentText}</span>
            </span>
          </p>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="pickup-date">{t("date")}</Label>
          <Input
            id="pickup-date"
            type="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-11 bg-gray-50 border-gray-200"
          />
        </div>

        <div className="space-y-1.5">
          <Label>{t("window")}</Label>
          <div role="radiogroup" aria-label={t("window")} className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {WINDOW_STARTS.map((windowStart) => {
              const start = riyadhInputToDate(date || LABEL_DATE, windowStart);
              const end = start && new Date(start.getTime() + TWO_HOURS);
              // a window that is already over today can't be picked
              const isPast = !!date && !!end && end.getTime() <= now;
              const selected = startTime === windowStart;
              return (
                <button
                  key={windowStart}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  disabled={isPast}
                  onClick={() => setStartTime(windowStart)}
                  className={cn(
                    "h-10 rounded-lg border text-xs font-medium tabular-nums transition-colors",
                    selected
                      ? "border-[#0C6175] bg-[#0C6175] text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-[#0C6175] hover:text-[#0C6175]",
                    "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-700",
                  )}
                >
                  {formatRiyadhTimeRange(start, end, locale)}
                </button>
              );
            })}
          </div>
          {/* a current window that doesn't start on one of the buttons stays selected until changed */}
          {startTime && !WINDOW_STARTS.includes(startTime) && (
            <p className="text-xs text-gray-500">{t("current_start_kept", { time: startTime })}</p>
          )}
        </div>

        {showCustomEnd ? (
          <div className="space-y-1.5">
            <Label htmlFor="pickup-end">
              {t("custom_end")}{" "}
              <span className="text-xs text-gray-400 font-normal">{t("optional")}</span>
            </Label>
            <div className="flex gap-2">
              <Input
                id="pickup-end"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="h-11 bg-gray-50 border-gray-200 flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowCustomEnd(false);
                  setEndTime("");
                }}
                className="h-11 rounded-lg border-gray-200 text-gray-600"
              >
                {t("remove_custom_end")}
              </Button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowCustomEnd(true)}
            className="text-xs font-medium text-[#0C6175] hover:underline"
          >
            {t("add_custom_end")}
          </button>
        )}

        <p className="text-xs text-gray-400">{t("hint")}</p>

        {error && (
          <p role="alert" className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
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

/** "change pickup time" — renders nothing unless the admin is allowed to */
export function SetPickupTimeButton({
  order,
  className,
}: {
  order: Pick<Order, "_id" | "pickup" | "canSetPickupTime">;
  className?: string;
}) {
  const t = useTranslations("orders.pickup_time");
  const [open, setOpen] = useState(false);

  if (!order.canSetPickupTime) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center gap-1 text-xs font-medium text-[#0C6175] hover:underline whitespace-nowrap",
          className,
        )}
      >
        <CalendarClock className="w-3.5 h-3.5" />
        {t("change")}
      </button>
      <SetPickupTimeDialog
        orderId={order._id}
        current={order.pickup}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}

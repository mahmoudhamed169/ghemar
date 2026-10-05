"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { ClosedWindow, OrderHours } from "@/shared/lib/types/settings/order-hours";
import { useUpdateOrderHours } from "@/shared/lib/hooks/settings/use-update-order-hours";

interface WindowRow {
  /** local key only — never sent to the API */
  key: string;
  from: string;
  to: string;
  isActive: boolean;
  note: string;
}

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

function toRows(windows: ClosedWindow[]): WindowRow[] {
  return windows.map((w, index) => ({
    key: w._id ?? `saved-${index}`,
    // tolerate "HH:mm:ss" by keeping the first five characters
    from: (w.from ?? "").slice(0, 5),
    to: (w.to ?? "").slice(0, 5),
    isActive: w.isActive,
    note: w.note ?? "",
  }));
}

const INPUT_CLASS =
  "w-full px-3 py-2.5 rounded-xl border border-gray-100 bg-gray-50 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition";

interface OrderHoursFormProps {
  initialData: OrderHours;
}

export default function OrderHoursForm({ initialData }: OrderHoursFormProps) {
  const t = useTranslations("Settings.operations.orderHours");
  const [saved, setSaved] = useState<OrderHours>(initialData);
  const [rows, setRows] = useState<WindowRow[]>(() =>
    toRows(initialData.closedWindows ?? []),
  );
  const { mutate: updateOrderHours, isPending } = useUpdateOrderHours();

  const updateRow = (key: string, patch: Partial<WindowRow>) =>
    setRows((prev) =>
      prev.map((row) => (row.key === key ? { ...row, ...patch } : row)),
    );

  const addRow = () =>
    setRows((prev) => [
      ...prev,
      {
        key: `new-${Date.now()}-${prev.length}`,
        from: "",
        to: "",
        isActive: true,
        note: "",
      },
    ]);

  const removeRow = (key: string) =>
    setRows((prev) => prev.filter((row) => row.key !== key));

  const handleSave = () => {
    if (rows.some((row) => !TIME_PATTERN.test(row.from) || !TIME_PATTERN.test(row.to))) {
      toast.error(t("errorRequired"));
      return;
    }
    if (rows.some((row) => row.from === row.to)) {
      toast.error(t("errorSame"));
      return;
    }

    updateOrderHours(
      rows.map(({ from, to, isActive, note }) => ({
        from,
        to,
        isActive,
        note: note.trim(),
      })),
      {
        onSuccess: (result) => {
          toast.success(t("saveSuccess"));
          if (result.data) {
            setSaved(result.data);
            setRows(toRows(result.data.closedWindows ?? []));
          }
        },
        onError: (error) => toast.error(error.message || t("saveError")),
      },
    );
  };

  return (
    <>
      {/* Status */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
        <span
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
            saved.isClosedNow
              ? "bg-red-50 text-red-600"
              : "bg-green-50 text-green-700"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              saved.isClosedNow ? "bg-red-500" : "bg-green-500"
            }`}
          />
          {saved.isClosedNow
            ? saved.reopensAt
              ? t("closedNow", { reopensAt: saved.reopensAt })
              : t("closedNowNoTime")
            : t("openNow")}
        </span>
        <span className="text-xs text-gray-400">
          {t("timezoneNote", { timezone: saved.timezone })}
        </span>
      </div>

      {/* Windows */}
      <div className="flex flex-col gap-3">
        {rows.length === 0 && (
          <p className="text-sm text-gray-400 py-4 text-center">{t("empty")}</p>
        )}

        {rows.map((row) => (
          <div
            key={row.key}
            className="grid grid-cols-2 lg:grid-cols-[140px_140px_1fr_auto_auto] items-end gap-3 bg-[#F9FAFB] border border-[#F3F4F6] rounded-2xl p-4"
          >
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-gray-600">{t("from")}</span>
              <input
                type="time"
                value={row.from}
                onChange={(e) => updateRow(row.key, { from: e.target.value })}
                className={INPUT_CLASS}
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-gray-600">{t("to")}</span>
              <input
                type="time"
                value={row.to}
                onChange={(e) => updateRow(row.key, { to: e.target.value })}
                className={INPUT_CLASS}
              />
            </label>

            <label className="flex flex-col gap-1.5 col-span-2 lg:col-span-1">
              <span className="text-xs font-medium text-gray-600">{t("note")}</span>
              <input
                type="text"
                value={row.note}
                placeholder={t("notePlaceholder")}
                onChange={(e) => updateRow(row.key, { note: e.target.value })}
                className={INPUT_CLASS}
              />
            </label>

            <div className="flex items-center gap-2 h-[42px]">
              <Switch
                checked={row.isActive}
                onCheckedChange={(checked) => updateRow(row.key, { isActive: checked })}
                aria-label={t("active")}
              />
              <span className="text-xs text-gray-600">{t("active")}</span>
            </div>

            <button
              type="button"
              onClick={() => removeRow(row.key)}
              aria-label={t("delete")}
              title={t("delete")}
              className="h-[42px] w-[42px] justify-self-end flex items-center justify-center rounded-xl text-red-500 hover:bg-red-50 transition"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addRow}
          className="self-start flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-teal-500 text-teal-700 text-sm font-medium hover:bg-teal-50 transition"
        >
          <Plus size={16} />
          {t("add")}
        </button>
      </div>

      <div
        style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid #F3F4F6" }}
        className="flex items-center gap-4"
      >
        <button
          onClick={handleSave}
          disabled={isPending}
          style={{ backgroundColor: "#0F766E" }}
          className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium transition disabled:opacity-60"
        >
          {isPending ? t("saving") : t("save")}
        </button>
        <button
          onClick={() => setRows(toRows(saved.closedWindows ?? []))}
          className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition"
        >
          {t("cancel")}
        </button>
      </div>
    </>
  );
}

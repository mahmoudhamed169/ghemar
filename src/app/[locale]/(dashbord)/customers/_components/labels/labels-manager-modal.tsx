"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CustomerLabel } from "@/shared/lib/types/customers/labels";
import {
  LabelError,
  useCustomerLabels,
  useDeleteCustomerLabel,
  useSaveCustomerLabel,
} from "@/shared/lib/hooks/customers/use-customer-labels";
import LabelChip, { LABEL_COLORS, formatLabelExpiry } from "./label-chip";

const NAME_MAX = 50;

interface FormState {
  id?: string;
  name: string;
  color: string;
  mode: "permanent" | "until";
  /** datetime-local value, in the admin's own timezone */
  until: string;
}

const INITIAL: FormState = { name: "", color: LABEL_COLORS[0], mode: "permanent", until: "" };

// ISO (UTC) <-> the "YYYY-MM-DDTHH:mm" local value a datetime-local input uses
function toLocalInput(date: Date) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}T${p(date.getHours())}:${p(date.getMinutes())}`;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LabelsManagerModal({ open, onOpenChange }: Props) {
  const t = useTranslations("customers.labels");
  const locale = useLocale();
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [pastDate, setPastDate] = useState(false);

  const { data: labels = [], isLoading } = useCustomerLabels(open);
  const { mutate: save, isPending: saving } = useSaveCustomerLabel();
  const { mutate: remove, isPending: deleting } = useDeleteCustomerLabel();

  const name = form.name.trim();
  const isValid = !!name && (form.mode === "permanent" || (!!form.until && !pastDate));

  const resetForm = () => {
    setForm(INITIAL);
    setPastDate(false);
  };

  const isPast = (value: string) => new Date(value).getTime() <= Date.now();

  const onError = (error: Error) =>
    toast.error(
      error instanceof LabelError && error.status === 404
        ? t("expired")
        : error.message || t("error"),
    );

  const handleSave = () => {
    if (!isValid) return;
    // the picked time may have passed while the form was open
    if (form.mode === "until" && isPast(form.until)) return setPastDate(true);
    save(
      {
        id: form.id,
        input: {
          name,
          color: form.color,
          expiresAt: form.mode === "until" ? new Date(form.until).toISOString() : null,
        },
      },
      {
        onSuccess: () => {
          toast.success(t("saved"));
          resetForm();
          // the rows show label names and colors
          router.refresh();
        },
        onError,
      },
    );
  };

  const handleEdit = (label: CustomerLabel) => {
    setPastDate(false);
    setForm({
      id: label._id,
      name: label.name,
      color: label.color || LABEL_COLORS[0],
      mode: label.expiresAt ? "until" : "permanent",
      until: label.expiresAt ? toLocalInput(new Date(label.expiresAt)) : "",
    });
  };

  const handleDelete = (label: CustomerLabel) => {
    if (!window.confirm(t("confirmDelete", { name: label.name }))) return;
    remove(label._id, {
      onSuccess: () => {
        toast.success(t("deleted"));
        if (form.id === label._id) resetForm();
        router.refresh();
      },
      onError,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl font-bold text-[#000709] mt-2">
            {t("manageTitle")}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          {/* create / edit */}
          <div className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
            <p className="text-sm font-semibold text-[#000709]">
              {form.id ? t("editLabel") : t("newLabel")}
            </p>

            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-[#000709]">{t("name")}</Label>
              <Input
                value={form.name}
                maxLength={NAME_MAX}
                placeholder={t("namePlaceholder")}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="h-11 bg-white"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-[#000709]">{t("color")}</Label>
              <div className="flex flex-wrap gap-2">
                {LABEL_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    aria-label={color}
                    aria-pressed={form.color === color}
                    onClick={() => setForm((f) => ({ ...f, color }))}
                    className={`size-7 rounded-full border-2 transition ${
                      form.color === color ? "border-[#000709] scale-110" : "border-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-[#000709]">{t("duration")}</Label>
              <div className="grid grid-cols-2 gap-2">
                {(["permanent", "until"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, mode }))}
                    className={`h-10 rounded-lg border-2 text-sm font-medium transition ${
                      form.mode === mode
                        ? "border-[#0C6175] bg-[#0C6175]/5 text-[#0C6175]"
                        : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    {t(mode)}
                  </button>
                ))}
              </div>
              {form.mode === "until" && (
                <>
                  <Input
                    type="datetime-local"
                    dir="ltr"
                    value={form.until}
                    min={toLocalInput(new Date())}
                    onChange={(e) => {
                      const until = e.target.value;
                      setForm((f) => ({ ...f, until }));
                      setPastDate(!!until && isPast(until));
                    }}
                    className="h-11 bg-white"
                  />
                  {pastDate && (
                    <p className="text-xs text-red-500">{t("pastDate")}</p>
                  )}
                </>
              )}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Button
                onClick={handleSave}
                disabled={!isValid || saving}
                className="h-10 px-6 bg-[#0C6175] hover:bg-[#097188] text-white rounded-lg"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {form.id ? t("save") : t("create")}
              </Button>
              {form.id && (
                <Button
                  variant="outline"
                  onClick={resetForm}
                  disabled={saving}
                  className="h-10 rounded-lg"
                >
                  {t("cancel")}
                </Button>
              )}
            </div>
          </div>

          {/* existing labels */}
          <div className="flex flex-col gap-2">
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-gray-400 mx-auto my-4" />
            ) : labels.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">{t("empty")}</p>
            ) : (
              labels.map((label) => (
                <div
                  key={label._id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 px-3 py-2"
                >
                  <div className="flex flex-col items-start gap-1 min-w-0">
                    <LabelChip name={label.name} color={label.color} />
                    <span className="text-xs text-gray-400">
                      {t("members", { count: label.membersCount })}
                      {" · "}
                      {label.expiresAt
                        ? t("expiresAt", { date: formatLabelExpiry(label.expiresAt, locale) })
                        : t("permanent")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={t("editLabel")}
                      onClick={() => handleEdit(label)}
                    >
                      <Pencil className="w-4 h-4 text-gray-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={t("delete")}
                      disabled={deleting}
                      onClick={() => handleDelete(label)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

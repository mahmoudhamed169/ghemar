"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2, Bell, Users, UserCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RecipientRole } from "@/shared/lib/types/notifications/notification";
import { useCustomerLabels } from "@/shared/lib/hooks/customers/use-customer-labels";
import { useCreateNotification } from "@/shared/lib/hooks/notifications/use-create-notification";


interface AudienceOption {
  role: RecipientRole;
  labelKey: string;
  icon: React.ElementType;
}

const AUDIENCE: AudienceOption[] = [
  { role: "client", labelKey: "clients", icon: UserCheck },
  { role: "driver", labelKey: "drivers", icon: Clock },
  { role: "all", labelKey: "all", icon: Users },
];

interface FormState {
  title: string;
  titleAr: string;
  body: string;
  bodyAr: string;
}

const INITIAL: FormState = {
  title: "",
  titleAr: "",
  body: "",
  bodyAr: "",
};

interface SendNotificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** When provided, sends to a specific user (individual mode — hides audience selector) */
  recipientId?: string;
  recipientRole?: RecipientRole;
}

export default function SendNotificationModal({
  open,
  onOpenChange,
  recipientId,
  recipientRole: fixedRole,
}: SendNotificationModalProps) {
  const t = useTranslations("Notifications.form");
  const isIndividual = !!recipientId;
  const [selectedRole, setSelectedRole] = useState<RecipientRole>("client");
  const [form, setForm] = useState<FormState>(INITIAL);
  const [labelId, setLabelId] = useState("all");

  // labels only narrow a broadcast to clients
  const canPickLabel = !isIndividual && selectedRole === "client";
  const { data: labels = [] } = useCustomerLabels(open && !isIndividual);
  // a label that expired or was deleted drops out of the list
  const activeLabelId =
    canPickLabel && labels.some((l) => l._id === labelId) ? labelId : undefined;

  const { mutate: createNotification, isPending } = useCreateNotification();

  const isValid = !!(
    form.title.trim() &&
    form.titleAr.trim() &&
    form.body.trim() &&
    form.bodyAr.trim()
  );

  const handleChange = (field: keyof FormState, val: string) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  const handleSend = () => {
    if (!isValid) return;

    createNotification(
      {
        recipientId: isIndividual ? recipientId! : "all",
        recipientRole: isIndividual ? (fixedRole ?? "client") : selectedRole,
        title: form.title.trim(),
        titleAr: form.titleAr.trim(),
        body: form.body.trim(),
        bodyAr: form.bodyAr.trim(),
        type: "system",
        ...(activeLabelId && { labelId: activeLabelId }),
      },
      {
        onSuccess: () => {
          setForm(INITIAL);
          setLabelId("all");
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] rounded-2xl p-8">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-[#000709] mt-2">
            {t("title")}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          {/* Audience Selector — hidden in individual mode */}
          {!isIndividual && (
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-[#000709]">
                {t("audience")}
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {AUDIENCE.map(({ role, labelKey, icon: Icon }) => {
                  const selected = selectedRole === role;
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className={`
                        flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2
                        transition-all duration-150
                        ${
                          selected
                            ? "border-[#0C6175] bg-[#0C6175]/5 text-[#0C6175]"
                            : "border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200"
                        }
                      `}
                    >
                      <Icon
                        className={`w-5 h-5 ${selected ? "text-[#0C6175]" : "text-gray-400"}`}
                      />
                      <span className="text-xs font-semibold">{t(labelKey)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Label — narrows a clients broadcast to one label */}
          {canPickLabel && (
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-[#000709]">
                {t("targetLabel")}
              </Label>
              <Select value={activeLabelId ?? "all"} onValueChange={setLabelId}>
                <SelectTrigger className="w-full !h-11 bg-[#F5F5F5] border-none px-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allClients")}</SelectItem>
                  {labels.map((label) => (
                    <SelectItem key={label._id} value={label._id}>
                      {label.name} ({label.membersCount})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Title AR + EN */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-[#000709]">
                {t("titleAr")}
              </Label>
              <Input
                placeholder={t("titleArPlaceholder")}
                value={form.titleAr}
                onChange={(e) => handleChange("titleAr", e.target.value)}
                className="h-11 bg-[#F5F5F5] border-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-[#000709]">
                {t("titleEn")}
              </Label>
              <Input
                placeholder={t("titleEnPlaceholder")}
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="h-11 bg-[#F5F5F5] border-none"
                dir="ltr"
              />
            </div>
          </div>

          {/* Body AR + EN */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-[#000709]">
                {t("bodyAr")}
              </Label>
              <Textarea
                placeholder={t("bodyArPlaceholder")}
                value={form.bodyAr}
                onChange={(e) => handleChange("bodyAr", e.target.value)}
                className="bg-[#F5F5F5] border-none resize-none min-h-[100px]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-[#000709]">
                {t("bodyEn")}
              </Label>
              <Textarea
                placeholder={t("bodyEnPlaceholder")}
                value={form.body}
                onChange={(e) => handleChange("body", e.target.value)}
                className="bg-[#F5F5F5] border-none resize-none min-h-[100px]"
                dir="ltr"
              />
            </div>
          </div>

          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={isPending || !isValid}
            className="w-full h-12 bg-[#0C6175] hover:bg-[#097188] disabled:opacity-50 text-white rounded-lg text-base font-medium mt-1"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {t("sending")}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                {t("send")}
              </span>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

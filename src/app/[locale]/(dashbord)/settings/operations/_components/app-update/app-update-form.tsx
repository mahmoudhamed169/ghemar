"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  AppPlatform,
  AppPlatformUpdateInput,
  AppUpdateSettings,
  AppUpdateText,
  UpdateAppUpdateBody,
} from "@/shared/lib/types/settings/app-update";
import { useRefreshAppUpdate, useUpdateAppUpdate } from "@/shared/lib/hooks/settings/use-app-update";
import PlatformCard, {
  INPUT_CLASS,
  PlatformForm,
  toPlatformForm,
  validatePlatform,
} from "./platform-card";

const PLATFORMS: AppPlatform[] = ["android", "ios"];

interface FormState {
  android: PlatformForm;
  ios: PlatformForm;
  text: AppUpdateText;
}

function toForm(data: AppUpdateSettings): FormState {
  return {
    android: toPlatformForm(data.android),
    ios: toPlatformForm(data.ios),
    text: { ...data.text },
  };
}

/** only what changed — an emptied field is sent as "" (turns the check off) */
function buildBody(saved: AppUpdateSettings, form: FormState): UpdateAppUpdateBody {
  const body: UpdateAppUpdateBody = {};
  for (const platform of PLATFORMS) {
    const before = toPlatformForm(saved[platform]);
    const changes: AppPlatformUpdateInput = {};
    for (const key of ["minVersion", "latestVersion", "storeUrl"] as const) {
      const value = form[platform][key].trim();
      if (value !== before[key]) changes[key] = value;
    }
    if (Object.keys(changes).length) body[platform] = changes;
  }
  for (const key of Object.keys(form.text) as (keyof AppUpdateText)[]) {
    if (form.text[key] !== (saved.text[key] ?? "")) body[key] = form.text[key];
  }
  return body;
}

const MESSAGE_GROUPS = [
  { kind: "force", title: "forceTitle", message: "forceMessage" },
  { kind: "optional", title: "optionalTitle", message: "optionalMessage" },
] as const;

interface AppUpdateFormProps {
  initialData: AppUpdateSettings;
}

export default function AppUpdateForm({ initialData }: AppUpdateFormProps) {
  const t = useTranslations("Settings.operations.appUpdate");
  const [saved, setSaved] = useState<AppUpdateSettings>(initialData);
  const [form, setForm] = useState<FormState>(() => toForm(initialData));
  /** a 409 waiting for the admin: the API's message and the body to resend */
  const [pendingConfirm, setPendingConfirm] = useState<{
    message?: string;
    body: UpdateAppUpdateBody;
  } | null>(null);

  const { mutate: update, isPending } = useUpdateAppUpdate();
  const { mutate: refresh, isPending: isRefreshing } = useRefreshAppUpdate();

  const errors = {
    android: validatePlatform(form.android),
    ios: validatePlatform(form.ios),
  };
  const hasErrors = PLATFORMS.some((p) => Object.keys(errors[p]).length > 0);
  const body = buildBody(saved, form);
  const isDirty = Object.keys(body).length > 0;

  const setPlatform = (platform: AppPlatform, patch: Partial<PlatformForm>) =>
    setForm((prev) => ({ ...prev, [platform]: { ...prev[platform], ...patch } }));

  const setText = (key: keyof AppUpdateText, value: string) =>
    setForm((prev) => ({ ...prev, text: { ...prev.text, [key]: value } }));

  const send = (payload: UpdateAppUpdateBody) =>
    update(payload, {
      onSuccess: (result) => {
        if (result.needsConfirm) {
          setPendingConfirm({ message: result.message, body: payload });
          return;
        }
        setPendingConfirm(null);
        toast.success(t("saveSuccess"));
        if (result.data) {
          setSaved(result.data);
          setForm(toForm(result.data));
        }
      },
      onError: (error) => {
        setPendingConfirm(null);
        toast.error(error.message || t("saveError"));
      },
    });

  const handleSave = () => {
    if (hasErrors || !isDirty) return;
    send({ ...body, confirm: false });
  };

  const handleRefresh = () =>
    refresh(undefined, {
      onSuccess: (data) => {
        // keep the admin's edits; an untouched form follows the fresh values
        if (!isDirty) setForm(toForm(data));
        setSaved(data);
        toast.success(t("refreshSuccess"));
      },
      onError: () => toast.error(t("refreshError")),
    });

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {PLATFORMS.map((platform) => (
          <PlatformCard
            key={platform}
            platform={platform}
            info={saved[platform]}
            form={form[platform]}
            errors={errors[platform]}
            onChange={(patch) => setPlatform(platform, patch)}
            onRefresh={platform === "ios" ? handleRefresh : undefined}
            refreshing={isRefreshing}
          />
        ))}
      </div>

      {/* Messages */}
      <div className="mt-4 rounded-2xl border border-[#F3F4F6] bg-[#F9FAFB] p-4 sm:p-5 flex flex-col gap-5">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{t("messages.title")}</h3>
          <p className="text-xs text-gray-500 mt-1">{t("messages.description")}</p>
        </div>
        {MESSAGE_GROUPS.map((group) => (
          <div key={group.kind} className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-gray-700">{t(`messages.${group.kind}`)}</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(["Ar", ""] as const).map((suffix) => {
                const titleKey = `${group.title}${suffix}` as keyof AppUpdateText;
                const messageKey = `${group.message}${suffix}` as keyof AppUpdateText;
                const dir = suffix === "Ar" ? "rtl" : "ltr";
                const lang = suffix === "Ar" ? "ar" : "en";
                return (
                  <div key={lang} className="flex flex-col gap-2">
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium text-gray-600">{t(`messages.title_${lang}`)}</span>
                      <input
                        type="text"
                        value={form.text[titleKey] ?? ""}
                        onChange={(e) => setText(titleKey, e.target.value)}
                        className={INPUT_CLASS}
                        dir={dir}
                      />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium text-gray-600">{t(`messages.message_${lang}`)}</span>
                      <textarea
                        rows={3}
                        value={form.text[messageKey] ?? ""}
                        onChange={(e) => setText(messageKey, e.target.value)}
                        className={`${INPUT_CLASS} resize-y`}
                        dir={dir}
                      />
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* How to release */}
      <div className="mt-4 rounded-2xl border border-teal-100 bg-teal-50/50 p-4 sm:p-5">
        <h3 className="text-sm font-bold text-teal-900 mb-2">{t("howTo.title")}</h3>
        <ol className="list-decimal ps-5 space-y-1 text-sm text-teal-900/80">
          <li>{t("howTo.step1")}</li>
          <li>{t("howTo.step2")}</li>
          <li>{t("howTo.step3")}</li>
        </ol>
      </div>

      <div
        style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid #F3F4F6" }}
        className="flex items-center gap-4"
      >
        <button
          onClick={handleSave}
          disabled={isPending || hasErrors || !isDirty}
          style={{ backgroundColor: "#0F766E" }}
          className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium transition disabled:opacity-60"
        >
          {isPending ? t("saving") : t("save")}
        </button>
        <button
          onClick={() => setForm(toForm(saved))}
          disabled={isPending || !isDirty}
          className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition disabled:opacity-60"
        >
          {t("cancel")}
        </button>
      </div>

      {/* 409: minimum above the published version */}
      <Dialog
        open={!!pendingConfirm}
        onOpenChange={(open) => !open && !isPending && setPendingConfirm(null)}
      >
        <DialogContent className="sm:max-w-[440px] rounded-2xl p-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
              <AlertTriangle className="w-7 h-7 text-red-600" />
            </div>
            <DialogTitle className="text-lg font-bold text-red-700">{t("confirm.title")}</DialogTitle>
            <p className="text-sm font-medium text-red-700">{t("confirm.warning")}</p>
            {pendingConfirm?.message && (
              <p className="w-full text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2" dir="auto">
                {pendingConfirm.message}
              </p>
            )}
            <div className="flex gap-3 w-full mt-1">
              <button
                type="button"
                disabled={isPending}
                onClick={() => pendingConfirm && send({ ...pendingConfirm.body, confirm: true })}
                className="flex-1 h-11 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium disabled:opacity-60 inline-flex items-center justify-center gap-2"
              >
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                {t("confirm.confirm")}
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={() => setPendingConfirm(null)}
                className="flex-1 h-11 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 disabled:opacity-60"
              >
                {t("confirm.cancel")}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

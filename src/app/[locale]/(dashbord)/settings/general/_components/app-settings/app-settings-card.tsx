"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { GeneralSettings } from "@/shared/lib/types/settings/general-settings";
import { useUpdateGeneralSettings } from "@/shared/lib/hooks/settings/use-update-general-settings";
import AppSettingsHeader from "./app-settings-header";
import AppSettingsForm from "./app-settings-form";
import AppSettingsActions from "./app-settings-actions";

interface AppSettingsCardProps {
  initialData: GeneralSettings;
}

export default function AppSettingsCard({ initialData }: AppSettingsCardProps) {
  const t = useTranslations("Settings.general.appSettings");
  const initial: GeneralSettings = {
    ...initialData,
    orderArrivalMinutes: initialData.orderArrivalMinutes ?? 0,
  };
  const [data, setData] = useState<GeneralSettings>(initial);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const { mutate: updateSettings, isPending } = useUpdateGeneralSettings();

  const handleChange = (field: keyof GeneralSettings, value: string | number) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!Number.isInteger(data.orderArrivalMinutes) || data.orderArrivalMinutes < 0) {
      toast.error(t("orderArrivalMinutesInvalid"));
      return;
    }
    updateSettings({ data, logoFile });
  };

  const handleCancel = () => {
    setData(initial);
    setLogoFile(null);
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 w-full">
      <AppSettingsHeader initialLogo={data.appLogo} onLogoChange={setLogoFile} />
      <AppSettingsForm data={data} onChange={handleChange} />
      <AppSettingsActions
        onSave={handleSave}
        onCancel={handleCancel}
        loading={isPending}
      />
    </section>
  );
}

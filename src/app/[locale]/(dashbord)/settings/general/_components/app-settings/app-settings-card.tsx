"use client";

import { useState } from "react";
import { GeneralSettings } from "@/shared/lib/types/settings/general-settings";
import { useUpdateGeneralSettings } from "@/shared/lib/hooks/settings/use-update-general-settings";
import AppSettingsHeader from "./app-settings-header";
import AppSettingsForm from "./app-settings-form";
import AppSettingsActions from "./app-settings-actions";

interface AppSettingsCardProps {
  initialData: GeneralSettings;
}

export default function AppSettingsCard({ initialData }: AppSettingsCardProps) {
  const [data, setData] = useState<GeneralSettings>(initialData);
  const { mutate: updateSettings, isPending } = useUpdateGeneralSettings();

  const handleChange = (field: keyof GeneralSettings, value: string | number) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateSettings(data);
  };

  const handleCancel = () => {
    setData(initialData);
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 w-full">
      <AppSettingsHeader />
      <AppSettingsForm data={data} onChange={handleChange} />
      <AppSettingsActions
        onSave={handleSave}
        onCancel={handleCancel}
        loading={isPending}
      />
    </section>
  );
}

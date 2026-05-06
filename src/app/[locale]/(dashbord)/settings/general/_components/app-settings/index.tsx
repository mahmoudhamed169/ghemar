"use client";

import { useState } from "react";
import { mockAppSettings } from "./mock";
import type { AppSettings } from "./types";
import AppSettingsHeader from "./app-settings-header";
import AppSettingsForm from "./app-settings-form";
import AppSettingsActions from "./app-settings-actions";


export default function AppSettingsCard() {
  const [data, setData] = useState<AppSettings>(mockAppSettings);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof AppSettings, value: string | number) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoChange = (file: File) => {
    const url = URL.createObjectURL(file);
    setData((prev) => ({ ...prev, logoUrl: url }));
  };

  const handleSave = async () => {
    setLoading(true);
    // TODO: استبدل بـ API call لما الباك اند يخلص
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);
    console.log("Saved:", data);
  };

  const handleCancel = () => {
    setData(mockAppSettings);
  };

  const handleLogoDelete = () => {
    setData((prev) => ({ ...prev, logoUrl: "" }));
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 w-full ">
      <AppSettingsHeader
        logoUrl={data.logoUrl}
        onLogoChange={handleLogoChange}
      />
      <AppSettingsForm data={data} onChange={handleChange} />
      <AppSettingsActions
        onSave={handleSave}
        onCancel={handleCancel}
        loading={loading}
      />
    </section>
  );
}

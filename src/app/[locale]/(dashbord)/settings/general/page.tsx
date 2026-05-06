import React from "react";
import AppSettingsCard from "./_components/app-settings";
import AlertSettings from "./_components/alert-settings";

export default function page() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold"> الإعدادات العامة</h1>
      <AppSettingsCard />
      <AlertSettings />
    </div>
  );
}

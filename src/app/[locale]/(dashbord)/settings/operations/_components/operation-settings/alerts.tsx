"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/switch";
import { OperationalSettings } from "@/shared/lib/types/settings/operational-settings";
import { useUpdateOperationalSettings } from "@/shared/lib/hooks/settings/use-update-operational-settings";

type ToggleKey = keyof OperationalSettings;

const TOGGLES: ToggleKey[] = ["mandatoryBarcodeScanning", "autoAssignDrivers"];

interface OperationalFormProps {
  initialData: OperationalSettings;
}

export default function OperationalForm({ initialData }: OperationalFormProps) {
  const t = useTranslations("Settings.operations.operationalSettings");
  const [data, setData] = useState<OperationalSettings>(initialData);
  const { mutate: updateSettings, isPending } = useUpdateOperationalSettings();

  const handleToggle = (key: ToggleKey) =>
    setData((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {TOGGLES.map((key) => (
          <div
            key={key}
            style={{
              backgroundColor: "#F9FAFB",
              borderRadius: "16px",
              padding: "20px",
              minHeight: "94px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid #F3F4F6",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <h3 style={{ color: "#000709", fontWeight: 500, fontSize: "14px" }}>
                {t(`${key}.title`)}
              </h3>
              <p style={{ color: "#6A7282", fontSize: "13px" }}>
                {t(`${key}.description`)}
              </p>
            </div>
            <Switch checked={data[key]} onCheckedChange={() => handleToggle(key)} />
          </div>
        ))}
      </div>

      <div
        style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid #F3F4F6" }}
        className="flex items-center gap-4"
      >
        <button
          onClick={() => updateSettings(data)}
          disabled={isPending}
          style={{ backgroundColor: "#0F766E" }}
          className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium transition disabled:opacity-60"
        >
          {isPending ? t("saving") : t("save")}
        </button>
        <button
          onClick={() => setData(initialData)}
          className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition"
        >
          {t("cancel")}
        </button>
      </div>
    </>
  );
}

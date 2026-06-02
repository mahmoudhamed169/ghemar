"use client";

import { useTranslations } from "next-intl";
import { GeneralSettings } from "@/shared/lib/types/settings/general-settings";

interface AppSettingsFormProps {
  data: GeneralSettings;
  onChange: (field: keyof GeneralSettings, value: string | number) => void;
}

type FieldDef = {
  key: keyof GeneralSettings;
  type?: string;
};

const FIELDS: FieldDef[] = [
  { key: "appName" },
  { key: "supportEmail", type: "email" },
  { key: "supportPhone" },
  { key: "currency" },
  { key: "expressWashFee", type: "number" },
];

export default function AppSettingsForm({ data, onChange }: AppSettingsFormProps) {
  const t = useTranslations("Settings.general.appSettings");

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "28px",
        paddingTop: "24px",
        paddingBottom: "24px",
      }}
    >
      {FIELDS.map(({ key, type = "text" }) => (
        <div key={key} className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 text-right">
            {t(key)}
          </label>
          <input
            type={type}
            value={data[key] as string | number}
            onChange={(e) =>
              onChange(key, type === "number" ? Number(e.target.value) : e.target.value)
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-right text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition"
          />
        </div>
      ))}
    </div>
  );
}

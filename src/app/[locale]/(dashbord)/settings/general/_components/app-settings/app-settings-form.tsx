"use client";

import type { AppSettings } from "./types";

interface AppSettingsFormProps {
  data: AppSettings;
  onChange: (field: keyof AppSettings, value: string | number) => void;
}

const fields: {
  label: string;
  key: keyof AppSettings;
  placeholder: string;
  type?: string;
  colSpan?: boolean;
}[] = [
  { label: "اسم التطبيق", key: "appName", placeholder: "عمار" },
  {
    label: "عنوان البريد الإلكتروني",
    key: "email",
    placeholder: "x@gmail.com",
    type: "email",
  },
  { label: "رقم الدعم", key: "supportPhone", placeholder: "920001234" },
  { label: "العملة", key: "currency", placeholder: "ريال سعودي" },
  {
    label: "رسوم المستعجل",
    key: "urgentFee",
    placeholder: "15 ريال",
    type: "number",
    colSpan: true,
  },
];

export default function AppSettingsForm({
  data,
  onChange,
}: AppSettingsFormProps) {
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
      {fields.map(({ label, key, placeholder, type = "text", colSpan }) => (
        <div
          key={key}
          className={`flex flex-col gap-2 ${colSpan ? "col-span-1" : ""}`}
        >
          <label className="text-sm font-medium text-gray-700 text-right">
            {label}
          </label>
          <input
            type={type}
            placeholder={placeholder}
            value={data[key] as string}
            onChange={(e) =>
              onChange(
                key,
                type === "number" ? Number(e.target.value) : e.target.value,
              )
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-right text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition"
          />
        </div>
      ))}
    </div>
  );
}

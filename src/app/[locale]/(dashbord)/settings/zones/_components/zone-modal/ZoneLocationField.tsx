// _components/AddZoneModal/ZoneLocationField.tsx
// Controlled text input for the zone location / address

import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ZoneLocationField({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-700">الموقع</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="المملكة العربية السعودية جدة حي الزهور"
        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#0C6175] focus:ring-2 focus:ring-[#0C6175]/20 transition-all"
        dir="rtl"
      />
    </div>
  );
}
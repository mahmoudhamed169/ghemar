// _components/AddZoneModal/ZoneRadiusField.tsx
// Numeric input + range slider for choosing the zone radius (metres)

import React from "react";

interface Props {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export default function ZoneRadiusField({
  value,
  onChange,
  min = 100,
  max = 50000,
  step = 100,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-700">
          نصف قطر المنطقة
        </label>
        <div className="flex items-center gap-1.5">
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
              const v = Math.min(max, Math.max(min, Number(e.target.value)));
              onChange(v);
            }}
            className="w-24 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 outline-none focus:border-[#0C6175] focus:ring-2 focus:ring-[#0C6175]/20 text-center transition-all"
          />
          <span className="text-xs text-gray-500">متر</span>
        </div>
      </div>

      {/* Slider */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#0C6175] cursor-pointer"
        style={{ direction: "ltr" }}
      />

      <div
        className="flex justify-between text-xs text-gray-400"
        style={{ direction: "ltr" }}
      >
        <span>{min.toLocaleString()} م</span>
        <span>{max.toLocaleString()} م</span>
      </div>
    </div>
  );
}

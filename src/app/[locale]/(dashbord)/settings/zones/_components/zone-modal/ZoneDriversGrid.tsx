// _components/AddZoneModal/ZoneDriversGrid.tsx
// Checkbox grid for selecting drivers assigned to the zone

import React from "react";
import { Driver } from "./types";

interface Props {
  drivers: Driver[];
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
}

export default function ZoneDriversGrid({ drivers, selectedIds, onChange }: Props) {
  const toggle = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((d) => d !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700">السائقين المتاحين</label>

      <div className="grid grid-cols-3 gap-x-2 gap-y-2">
        {drivers.map((driver) => {
          const checked = selectedIds.includes(driver.id);
          return (
            <label
              key={driver.id}
              className={`flex items-center gap-2 cursor-pointer rounded-lg px-2 py-1.5 transition-colors
                ${checked ? "bg-[#0C6175]/8" : "hover:bg-gray-50"}`}
            >
              {/* Custom checkbox */}
              <div
                onClick={() => toggle(driver.id)}
                className={`w-4 h-4 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors
                  ${checked
                    ? "bg-[#0C6175] border-[#0C6175]"
                    : "bg-white border-gray-300"
                  }`}
              >
                {checked && (
                  <svg
                    width="9"
                    height="7"
                    viewBox="0 0 9 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 3L3.5 5.5L8 1"
                      stroke="white"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span className="text-xs text-gray-700 leading-tight">{driver.name}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
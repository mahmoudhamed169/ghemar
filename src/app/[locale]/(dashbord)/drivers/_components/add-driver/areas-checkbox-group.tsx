"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const areas = [
  "حي الروضة",
  "حي الزهرة",
  "وسط المدينة",
  "حي الزهور",
  "حي العقيق",
  "وسط المدينة",
  "وسط المدينة",
  "حي الزهة",
  "حي الروضة",
];

export default function AreasCheckboxGroup({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (areas: string[]) => void;
}) {
  const toggle = (area: string) => {
    onChange(
      selected.includes(area)
        ? selected.filter((a) => a !== area)
        : [...selected, area]
    );
  };

  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-3">
      {areas.map((area, i) => (
        <div key={i} className="flex items-center gap-2 flex-row-reverse justify-end">
          <Label htmlFor={`area-${i}`} className="text-sm cursor-pointer">
            {area}
          </Label>
          <Checkbox
            id={`area-${i}`}
            checked={selected.includes(area)}
            onCheckedChange={() => toggle(area)}
            className="data-[state=checked]:bg-[#0C6175] data-[state=checked]:border-[#0C6175]"
          />
        </div>
      ))}
    </div>
  );
}
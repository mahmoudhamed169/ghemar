"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Area } from "@/shared/lib/types/cities/city";

export default function AreasCheckboxGroup({
  areas,
  getAreaName,
  selected,
  onChange,
}: {
  areas: Area[];
  getAreaName: (area: Area) => string;
  selected: string[];
  onChange: (areas: string[]) => void;
}) {
  const toggle = (id: string) => {
    onChange(
      selected.includes(id)
        ? selected.filter((a) => a !== id)
        : [...selected, id],
    );
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
      {areas.map((area) => (
        <div
          key={area._id}
          className="flex items-center gap-2 flex-row-reverse justify-end"
        >
          <Label htmlFor={area._id} className="text-sm cursor-pointer">
            {getAreaName(area)}
          </Label>
          <Checkbox
            id={area._id}
            checked={selected.includes(area._id)}
            onCheckedChange={() => toggle(area._id)}
            className="data-[state=checked]:bg-[#0C6175] data-[state=checked]:border-[#0C6175]"
          />
        </div>
      ))}
    </div>
  );
}

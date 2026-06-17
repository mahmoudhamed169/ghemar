"use client";
import { Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Branch } from "@/shared/lib/types/branches/branch";

interface BranchAreasRowProps {
  index: number;
  branches: Branch[];
  branchId: string;
  assignedAreas: string[];
  onBranchChange: (branchId: string) => void;
  onAreaToggle: (areaCode: string) => void;
  onRemove: () => void;
}

export default function BranchAreasRow({
  branches,
  branchId,
  assignedAreas,
  onBranchChange,
  onAreaToggle,
  onRemove,
}: BranchAreasRowProps) {
  const selectedBranch = branches.find((b) => b._id === branchId);
  const branchAreas = selectedBranch?.areas ?? [];

  return (
    <div className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50">
      <div className="flex items-center gap-2">
        <Select value={branchId} onValueChange={onBranchChange}>
          <SelectTrigger className="flex-1 bg-white border-gray-200 h-11">
            <SelectValue placeholder="اختر الفرع" />
          </SelectTrigger>
          <SelectContent>
            {branches.map((b) => (
              <SelectItem key={b._id} value={b._id}>
                {b.nameAr}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <button
          type="button"
          onClick={onRemove}
          className="p-2 text-red-400 hover:text-red-600 shrink-0"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {branchId && branchAreas.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 pt-1">
          {branchAreas.map((area) => (
            <div
              key={area.areaCode}
              className="flex items-center gap-2 flex-row-reverse justify-end"
            >
              <Label htmlFor={`${branchId}-${area.areaCode}`} className="text-sm cursor-pointer">
                {area.cityId.nameAr} — {area.areaCode}
              </Label>
              <Checkbox
                id={`${branchId}-${area.areaCode}`}
                checked={assignedAreas.includes(area.areaCode)}
                onCheckedChange={() => onAreaToggle(area.areaCode)}
                className="data-[state=checked]:bg-[#0C6175] data-[state=checked]:border-[#0C6175]"
              />
            </div>
          ))}
        </div>
      )}

      {branchId && branchAreas.length === 0 && (
        <p className="text-xs text-gray-400 text-center py-1">لا توجد مناطق في هذا الفرع</p>
      )}
    </div>
  );
}

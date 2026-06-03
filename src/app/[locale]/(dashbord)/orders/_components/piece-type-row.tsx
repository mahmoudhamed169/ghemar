"use client";

import { memo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import QuantityControl from "./quantity-control";
import { PieceTypeKey } from "@/shared/lib/constants/piece-types";

interface PieceTypeRowProps {
  typeKey: PieceTypeKey;
  type: string;
  checked: boolean;
  quantity: number;
  onToggle: (key: PieceTypeKey) => void;
  onQuantityChange: (key: PieceTypeKey, v: number) => void;
}

export default memo(function PieceTypeRow({
  typeKey,
  type,
  checked,
  quantity,
  onToggle,
  onQuantityChange,
}: PieceTypeRowProps) {
  return (
    <div
      onClick={() => onToggle(typeKey)}
      className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer select-none
        ${
          checked
            ? "border-[#0C6175] bg-teal-50/50"
            : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
        }`}
    >
      <div className="flex items-center gap-3">
        <Checkbox
          checked={checked}
          onCheckedChange={() => onToggle(typeKey)}
          onClick={(e) => e.stopPropagation()}
          className="data-[state=checked]:bg-[#0C6175] data-[state=checked]:border-[#0C6175]"
        />
        <span className="text-sm font-medium text-[#000709]">{type}</span>
      </div>

      {checked && (
        <div onClick={(e) => e.stopPropagation()}>
          <QuantityControl
            value={quantity}
            onChange={(v) => onQuantityChange(typeKey, v)}
          />
        </div>
      )}
    </div>
  );
});

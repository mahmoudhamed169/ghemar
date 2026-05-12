"use client";

import { Minus, Plus } from "lucide-react";

interface QuantityControlProps {
  value: number;
  onChange: (v: number) => void;
}

export default function QuantityControl({
  value,
  onChange,
}: QuantityControlProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
      >
        <Minus className="w-3 h-3" />
      </button>
      <span className="w-6 text-center text-sm font-semibold text-[#000709]">
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  );
}

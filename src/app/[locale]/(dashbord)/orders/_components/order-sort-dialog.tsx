"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PieceTypeRow from "./piece-type-row";

const PIECE_TYPES = ["قميص", "سروال", "عباية"];

export interface PieceEntry {
  type: string;
  quantity: number;
}

interface OrderSortDialogProps {
  orderId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function OrderSortDialog({
  orderId,
  open,
  onOpenChange,
}: OrderSortDialogProps) {
  const [selected, setSelected] = useState<PieceEntry[]>([]);

  const totalPieces = selected.reduce((sum, p) => sum + p.quantity, 0);

  const isChecked = (type: string) => selected.some((p) => p.type === type);

  const toggleType = (type: string) => {
    if (isChecked(type)) {
      setSelected((prev) => prev.filter((p) => p.type !== type));
    } else {
      setSelected((prev) => [...prev, { type, quantity: 1 }]);
    }
  };

  const updateQuantity = (type: string, quantity: number) => {
    setSelected((prev) =>
      prev.map((p) => (p.type === type ? { ...p, quantity } : p)),
    );
  };

  const getQuantity = (type: string) =>
    selected.find((p) => p.type === type)?.quantity ?? 1;

  const handleConfirm = () => {
    // TODO: call API with orderId + selected pieces
    console.log(`Order ${orderId} sort:`, selected);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm p-0 gap-0 overflow-hidden" dir="rtl">
        <DialogHeader className="px-5 pt-5 pb-4 border-b">
          <h2 className="text-base font-bold text-[#000709] mt-5">
            تفاصيل فرز الأوردر رقم {orderId}
          </h2>
        </DialogHeader>

        <div className="px-5 py-4 space-y-5">
          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">عدد القطع</span>
            <span
              className={`text-lg font-bold ${
                totalPieces > 0 ? "text-[#0C6175]" : "text-gray-300"
              }`}
            >
              {totalPieces}
            </span>
          </div>

          {/* Piece types */}
          <div>
            <p className="text-xs text-gray-400 mb-3 text-left">
              حدد أنواع القطع
            </p>
            <div className="space-y-3">
              {PIECE_TYPES.map((type) => (
                <PieceTypeRow
                  key={type}
                  type={type}
                  checked={isChecked(type)}
                  quantity={getQuantity(type)}
                  onToggle={() => toggleType(type)}
                  onQuantityChange={(v) => updateQuantity(type, v)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 pb-5">
          <Button
            onClick={handleConfirm}
            disabled={selected.length === 0}
            className="w-full bg-[#0C6175] hover:bg-[#0a5363] text-white rounded-xl h-11"
          >
            تأكيد
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

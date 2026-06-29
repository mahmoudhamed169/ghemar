"use client";

import { useState } from "react";
import { ShoppingBag, Minus, Plus, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeliveredBagsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isPending: boolean;
  onConfirm: (bagsCount: number) => void;
}

export default function DeliveredBagsDialog({
  open,
  onOpenChange,
  isPending,
  onConfirm,
}: DeliveredBagsDialogProps) {
  const [count, setCount] = useState(1);

  const decrement = () => setCount((c) => Math.max(1, c - 1));
  const increment = () => setCount((c) => c + 1);

  const handleConfirm = () => {
    if (count < 1) return;
    onConfirm(count);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm p-0 overflow-hidden rounded-2xl" dir="rtl">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
          <DialogTitle className="flex items-center gap-2.5 text-right text-base font-bold text-[#000709]">
            <div className="w-9 h-9 rounded-xl bg-[#0C6175]/10 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-5 h-5 text-[#0C6175]" />
            </div>
            عدد الأكياس المسلّمة
          </DialogTitle>
        </DialogHeader>

        {/* Body */}
        <div className="px-6 py-6 space-y-5">
          <p className="text-sm text-gray-500 text-right leading-relaxed">
            أدخل عدد الأكياس التي سلّمها السائق للعميل في هذا الطلب
          </p>

          {/* Stepper */}
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={decrement}
              disabled={count <= 1}
              className="w-11 h-11 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#0C6175] hover:text-[#0C6175] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Minus size={18} />
            </button>

            <div className="flex flex-col items-center gap-1 min-w-20">
              <span className="text-5xl font-bold text-[#0C6175] tabular-nums leading-none">
                {count}
              </span>
              <span className="text-xs text-gray-400 font-medium">كيس</span>
            </div>

            <button
              type="button"
              onClick={increment}
              className="w-11 h-11 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#0C6175] hover:text-[#0C6175] transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3">
          <Button
            onClick={handleConfirm}
            disabled={count < 1 || isPending}
            className="flex-1 h-11 bg-[#0C6175] hover:bg-[#0a5464] text-white rounded-xl font-medium"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                جارٍ الحفظ...
              </span>
            ) : (
              "تأكيد التسليم"
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="flex-1 h-11 rounded-xl font-medium"
          >
            إلغاء
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

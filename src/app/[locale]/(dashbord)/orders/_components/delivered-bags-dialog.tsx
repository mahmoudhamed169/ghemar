"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
  const [count, setCount] = useState<number | "">(1);

  const handleConfirm = () => {
    if (!count || count < 1) return;
    onConfirm(Number(count));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-right">
            <ShoppingBag className="w-5 h-5 text-[#0C6175]" />
            عدد الأكياس المسلّمة
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-gray-500 mb-4 text-right">
            أدخل عدد الأكياس التي سلّمها السائق للعميل في هذا الطلب
          </p>
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
            <input
              type="number"
              min={1}
              value={count}
              onChange={(e) =>
                setCount(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="flex-1 text-center bg-transparent outline-none text-xl font-bold text-[#0C6175] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              dir="ltr"
              autoFocus
            />
            <span className="text-sm text-gray-400 shrink-0">كيس</span>
          </div>
        </div>

        <DialogFooter className="flex gap-2 flex-row-reverse">
          <Button
            onClick={handleConfirm}
            disabled={!count || Number(count) < 1 || isPending}
            className="flex-1 bg-[#0C6175] hover:bg-[#0a5464] text-white rounded-xl"
          >
            {isPending ? "جارٍ الحفظ..." : "تأكيد التسليم"}
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="flex-1 rounded-xl"
          >
            إلغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

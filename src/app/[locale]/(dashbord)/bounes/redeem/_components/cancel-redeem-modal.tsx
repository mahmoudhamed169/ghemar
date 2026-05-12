"use client";

import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface CancelRedeemModalProps {
  open: boolean;
  onClose: () => void;
  redeemId: number;
  userName: string;
}

export default function CancelRedeemModal({
  open,
  onClose,
  redeemId,
  userName,
}: CancelRedeemModalProps) {
  const handleConfirm = () => {
    console.log("تأكيد إلغاء الاستبدال", { redeemId, userName });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] rounded-2xl text-center px-8 py-8">
        {/* Icon */}
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
            <AlertTriangle size={32} className="text-[#E7000B]" />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold text-[#000709]">هل أنت متأكد؟</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            أنت تريد إلغاء عملية الاستبدال لـ
            <span className="font-semibold text-[#000709]"> {userName} </span>
            رقم
            <span className="font-semibold text-[#000709]"> {redeemId}</span>،
            سيتم إعادة النقاط للمستخدم.
          </p>
        </div>

        <DialogFooter className="flex flex-row gap-3 mt-2 sm:justify-center bg-white">
          <Button
            onClick={handleConfirm}
            className="flex-1 bg-[#E7000B] hover:bg-red-700 text-white rounded-xl h-11"
          >
            نعم
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 rounded-xl h-11 border-gray-200"
          >
            لا
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

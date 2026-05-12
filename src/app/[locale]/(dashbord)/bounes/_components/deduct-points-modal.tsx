"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Minus } from "lucide-react";

interface DeductPointsModalProps {
  open: boolean;
  onClose: () => void;
  userId: number;
  userName: string;
}

export default function DeductPointsModal({
  open,
  onClose,
  userId,
  userName,
}: DeductPointsModalProps) {
  const [points, setPoints] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    console.log("خصم نقاط", { userId, userName, points, reason, notes });
    onClose();
  };

  const handleClose = () => {
    setPoints("");
    setReason("");
    setNotes("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px] rounded-2xl">
        <DialogHeader>

          
          <h2 className="my-5 flex  justify-center text-2xl items-center gap-2 text-red-500">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
              <Minus size={16} className="text-red-500" />
            </div>
            خصم نقاط
          </h2>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          {/* User info - readonly */}
          <div className="flex gap-3">
            <div className="flex-1 flex flex-col gap-1.5">
              <Label className="text-right text-sm text-gray-600">
                اسم المستخدم
              </Label>
              <Input
                value={userName}
                readOnly
                className="bg-gray-50 text-right"
              />
            </div>
            <div className="w-[120px] flex flex-col gap-1.5">
              <Label className="text-right text-sm text-gray-600">ID</Label>
              <Input
                value={userId}
                readOnly
                className="bg-gray-50 text-center"
              />
            </div>
          </div>

          {/* Points */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-right text-sm text-gray-600">
              عدد النقاط <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              placeholder="أدخل عدد النقاط"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              className="text-right"
            />
          </div>

          {/* Reason */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-right text-sm text-gray-600">
              سبب الخصم <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="أدخل سبب الخصم"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="text-right"
            />
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-right text-sm text-gray-600">ملاحظات</Label>
            <Textarea
              placeholder="أدخل ملاحظات إضافية (اختياري)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="text-right resize-none"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="flex flex-row-reverse gap-2 sm:justify-start">
          <Button
            onClick={handleSubmit}
            disabled={!points || !reason}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl h-11"
          >
            تأكيد الخصم
          </Button>
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1 rounded-xl h-11"
          >
            إلغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

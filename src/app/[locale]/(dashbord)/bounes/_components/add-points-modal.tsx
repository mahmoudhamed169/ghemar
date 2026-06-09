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
import { Loader2, Plus } from "lucide-react";
import { useAddPoints } from "@/shared/lib/hooks/rewards/use-adjust-points";

interface AddPointsModalProps {
  open: boolean;
  onClose: () => void;
  userId: string;
  userName: string;
}

export default function AddPointsModal({
  open,
  onClose,
  userId,
  userName,
}: AddPointsModalProps) {
  const [points, setPoints] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const { mutate: addPoints, isPending } = useAddPoints();

  const handleClose = () => {
    setPoints("");
    setReason("");
    setNotes("");
    onClose();
  };

  const handleSubmit = () => {
    const description = notes.trim() ? `${reason.trim()} — ${notes.trim()}` : reason.trim();

    addPoints(
      { userId, points: Number(points), description },
      { onSuccess: handleClose },
    );
  };

  const isValid = !!points && Number(points) > 0 && !!reason.trim();

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:min-w-120 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="my-5 flex justify-center text-2xl items-center gap-2 text-[#0C6175]">
            <div className="w-8 h-8 rounded-lg bg-[#0C6175]/10 flex items-center justify-center">
              <Plus size={16} className="text-[#0C6175]" />
            </div>
            إضافة نقاط
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          {/* User info - readonly */}
          <div className="flex gap-3">
            <div className="flex-1 flex flex-col gap-1.5">
              <Label className="text-right text-sm text-gray-600">اسم المستخدم</Label>
              <Input value={userName} readOnly className="bg-gray-50 text-right" />
            </div>
            <div className="w-[120px] flex flex-col gap-1.5">
              <Label className="text-right text-sm text-gray-600">ID</Label>
              <Input value={userId.slice(-6)} readOnly className="bg-gray-50 text-center" />
            </div>
          </div>

          {/* Points */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-right text-sm text-gray-600">
              عدد النقاط <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              min={1}
              placeholder="أدخل عدد النقاط"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              className="text-right"
              dir="ltr"
            />
          </div>

          {/* Reason */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-right text-sm text-gray-600">
              سبب الإضافة <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="أدخل سبب الإضافة"
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
            disabled={!isValid || isPending}
            className="flex-1 bg-[#0C6175] hover:bg-[#0a5265] text-white rounded-xl h-11"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                جاري الإضافة...
              </span>
            ) : (
              "تأكيد الإضافة"
            )}
          </Button>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isPending}
            className="flex-1 rounded-xl h-11"
          >
            إلغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

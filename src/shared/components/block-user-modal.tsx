import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

interface BlockUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
  onConfirm: () => void;
}

export default function BlockUserModal({
  open,
  onOpenChange,
  userName,
  onConfirm,
}: BlockUserModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden gap-0">
        {/* Body */}
        <div className="flex flex-col items-center gap-4 px-8 py-10">
          {/* Icon */}
          <div className="relative flex items-center justify-center w-24 h-24">
            <div className="absolute w-24 h-24 rounded-full bg-red-100 opacity-40" />
            <div className="absolute w-16 h-16 rounded-full bg-red-100 opacity-60" />
            <div className="relative z-10 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <TriangleAlert className="text-red-500" size={22} />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-[#000709]">حظر المستخدم</h2>

          {/* Description */}
          <p className="text-center text-gray-500 text-sm leading-relaxed">
            هل أنت متأكد من حظر المستخدم{" "}
            <span className="font-bold text-[#000709]">"{userName}"</span>؟ لا
            يمكن التراجع عن هذا الإجراء.
          </p>
        </div>

        {/* Footer */}
        <div className="grid grid-cols-2 gap-0 border-t border-gray-100 sm:justify-center">
          <Button
            onClick={onConfirm}
            className="rounded-none h-14 bg-red-500 hover:bg-red-600 text-white text-base font-semibold"
          >
            نعم، احظر
          </Button>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="rounded-none h-14 text-base text-gray-500 hover:bg-gray-50"
          >
            إلغاء
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

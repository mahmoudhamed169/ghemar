import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import AddCodeForm from "./add-code-form";

interface AddCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddCodeModal({
  open,
  onOpenChange,
}: AddCodeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] rounded-2xl p-8" dir="rtl">
        <DialogHeader className="mb-2">
          <h2 className="text-right text-2xl font-bold text-[#000709] mt-4">
            إضافة كود خصم
          </h2>
        </DialogHeader>

        <AddCodeForm onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}

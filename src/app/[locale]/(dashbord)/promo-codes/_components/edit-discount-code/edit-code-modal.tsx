import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import EditCodeForm from "./edit-code-form";
import { PromoCode } from "@/shared/lib/types/promocode/promo-codes";

interface EditCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promoCode: PromoCode;
}

export default function EditCodeModal({
  open,
  onOpenChange,
  promoCode,
}: EditCodeModalProps) {
  const t = useTranslations("PromoCodes.editForm");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] rounded-2xl p-8">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-2xl font-bold text-[#000709] mt-4">
            {t("title")}
          </DialogTitle>
          <p className="text-sm text-gray-400 font-normal tracking-widest">
            {promoCode.code}
          </p>
        </DialogHeader>

        <EditCodeForm
          promoCode={promoCode}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

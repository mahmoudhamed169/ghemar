import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface AddCodeActionsProps {
  onCancel: () => void;
  onSave: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

export default function AddCodeActions({
  onCancel,
  onSave,
  isLoading = false,
  isDisabled = false,
}: AddCodeActionsProps) {
  const t = useTranslations("PromoCodes.form.actions");

  return (
    <div className="flex gap-4 mt-2">
      <Button
        onClick={onSave}
        disabled={isLoading || isDisabled}
        className="flex-1 h-12 bg-[#0C6175] hover:bg-[#097188] disabled:opacity-50 text-white rounded-lg text-base font-medium"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            {t("saving")}
          </span>
        ) : (
          t("save")
        )}
      </Button>

      <Button
        onClick={onCancel}
        disabled={isLoading}
        variant="outline"
        className="flex-1 h-12 border border-[#0C6175] text-[#0C6175] bg-white hover:bg-[#0C6175]/5 rounded-lg text-base font-medium"
      >
        {t("cancel")}
      </Button>
    </div>
  );
}

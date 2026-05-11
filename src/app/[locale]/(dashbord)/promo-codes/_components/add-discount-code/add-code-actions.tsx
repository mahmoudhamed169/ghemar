import { Button } from "@/components/ui/button";

interface AddCodeActionsProps {
  onCancel: () => void;
  onSave: () => void;
  isLoading?: boolean;
}

export default function AddCodeActions({
  onCancel,
  onSave,
  isLoading = false,
}: AddCodeActionsProps) {
  return (
    <div className="flex gap-4 mt-2" dir="rtl">
      <Button
        onClick={onSave}
        disabled={isLoading}
        className="flex-1 h-12 bg-[#0C6175] hover:bg-[#097188] text-white rounded-lg text-base font-medium"
      >
        {isLoading ? "جاري الحفظ..." : "حفظ"}
      </Button>

      <Button
        onClick={onCancel}
        variant="outline"
        className="flex-1 h-12 border border-[#0C6175] text-[#0C6175] bg-white hover:bg-[#0C6175]/5 rounded-lg text-base font-medium"
      >
        الغاء
      </Button>
    </div>
  );
}
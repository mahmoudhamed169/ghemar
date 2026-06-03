import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TermsSettings } from "../../types/settings/terms-settings";
import { updateTermsSettingsAction } from "../../actions/settings/update-terms-settings";

export function useUpdateTermsSettings() {
  const router = useRouter();

  return useMutation({
    mutationFn: (body: TermsSettings) => updateTermsSettingsAction(body),
    onSuccess: () => {
      toast.success("تم حفظ الشروط والأحكام بنجاح");
      router.refresh();
    },
    onError: () => {
      toast.error("حدث خطأ أثناء الحفظ، حاول مرة أخرى");
    },
  });
}

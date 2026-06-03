import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SecuritySettings } from "../../types/settings/security-settings";
import { updateSecuritySettingsAction } from "../../actions/settings/update-security-settings";

export function useUpdateSecuritySettings() {
  const router = useRouter();

  return useMutation({
    mutationFn: (body: SecuritySettings) => updateSecuritySettingsAction(body),
    onSuccess: () => {
      toast.success("تم حفظ إعدادات الأمان بنجاح");
      router.refresh();
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حفظ الإعدادات، حاول مرة أخرى");
    },
  });
}

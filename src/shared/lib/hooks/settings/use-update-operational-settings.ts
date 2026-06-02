import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { OperationalSettings } from "../../types/settings/operational-settings";
import { updateOperationalSettingsAction } from "../../actions/settings/update-operational-settings";

export function useUpdateOperationalSettings() {
  return useMutation({
    mutationFn: (body: OperationalSettings) =>
      updateOperationalSettingsAction(body),
    onSuccess: () => toast.success("تم حفظ إعدادات التشغيل بنجاح"),
    onError: () => toast.error("حدث خطأ أثناء حفظ الإعدادات، حاول مرة أخرى"),
  });
}

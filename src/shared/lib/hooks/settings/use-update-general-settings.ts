import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { GeneralSettings } from "../../types/settings/general-settings";
import { updateGeneralSettingsAction } from "../../actions/settings/update-general-settings";

export function useUpdateGeneralSettings() {
  return useMutation({
    mutationFn: (body: GeneralSettings) => updateGeneralSettingsAction(body),
    onSuccess: () => {
      toast.success("تم حفظ الإعدادات بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حفظ الإعدادات، حاول مرة أخرى");
    },
  });
}

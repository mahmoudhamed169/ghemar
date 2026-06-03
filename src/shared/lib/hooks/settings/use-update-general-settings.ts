import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { GeneralSettings } from "../../types/settings/general-settings";
import { updateGeneralSettingsAction } from "../../actions/settings/update-general-settings";

export function useUpdateGeneralSettings() {
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      data,
      logoFile,
    }: {
      data: GeneralSettings;
      logoFile?: File | null;
    }) => {
      const fd = new FormData();
      fd.append("appName", data.appName);
      fd.append("supportEmail", data.supportEmail);
      fd.append("supportPhone", data.supportPhone);
      fd.append("currency", data.currency);
      fd.append("expressWashFee", String(data.expressWashFee));
      if (logoFile) fd.append("appLogo", logoFile);
      return updateGeneralSettingsAction(fd);
    },
    onSuccess: () => {
      toast.success("تم حفظ الإعدادات بنجاح");
      router.refresh();
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حفظ الإعدادات، حاول مرة أخرى");
    },
  });
}

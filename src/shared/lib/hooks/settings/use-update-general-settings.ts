import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { GeneralSettings } from "../../types/settings/general-settings";
import { updateGeneralSettingsAction } from "../../actions/settings/update-general-settings";

export function useUpdateGeneralSettings() {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
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
      fd.append("orderArrivalMinutes", String(data.orderArrivalMinutes));
      if (logoFile) fd.append("appLogo", logoFile);

      const result = await updateGeneralSettingsAction(fd);
      if (!result.success) throw new Error(result.message ?? "");
      return result;
    },
    onSuccess: () => {
      toast.success("تم حفظ الإعدادات بنجاح");
      router.refresh();
    },
    onError: (error) => {
      toast.error(
        error.message || "حدث خطأ أثناء حفظ الإعدادات، حاول مرة أخرى",
      );
    },
  });
}

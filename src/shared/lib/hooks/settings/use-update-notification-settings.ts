import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { NotificationSettings } from "../../types/settings/notification-settings";
import { updateNotificationSettingsAction } from "../../actions/settings/update-notification-settings";

export function useUpdateNotificationSettings() {
  const router = useRouter();

  return useMutation({
    mutationFn: (body: NotificationSettings) =>
      updateNotificationSettingsAction(body),
    onSuccess: () => {
      toast.success("تم حفظ إعدادات التنبيهات بنجاح");
      router.refresh();
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حفظ الإعدادات، حاول مرة أخرى");
    },
  });
}

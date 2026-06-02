import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { NotificationSettings } from "../../types/settings/notification-settings";
import { updateNotificationSettingsAction } from "../../actions/settings/update-notification-settings";

export function useUpdateNotificationSettings() {
  return useMutation({
    mutationFn: (body: NotificationSettings) =>
      updateNotificationSettingsAction(body),
    onSuccess: () => {
      toast.success("تم حفظ إعدادات التنبيهات بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حفظ الإعدادات، حاول مرة أخرى");
    },
  });
}

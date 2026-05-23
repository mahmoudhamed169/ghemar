import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreateNotificationBody } from "../../types/notifications/notification";
import { createNotificationAction } from "../../actions/notifications/create-notification";

export function useCreateNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateNotificationBody) =>
      createNotificationAction(body),
    onSuccess: () => {
      toast.success("تم إرسال الإشعار بنجاح");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => {
      toast.error("حدث خطأ أثناء إرسال الإشعار، حاول مرة أخرى");
    },
  });
}

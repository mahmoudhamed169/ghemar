import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreateNotificationBody } from "../../types/notifications/notification";
import { createNotificationAction } from "../../actions/notifications/create-notification";

export function useCreateNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: CreateNotificationBody) => {
      const result = await createNotificationAction(body);
      if (!result.success)
        throw Object.assign(new Error(result.message), { status: result.status });
      return result;
    },
    onSuccess: ({ data }) => {
      toast.success(
        typeof data?.recipientCount === "number"
          ? `تم إرسال الإشعار إلى ${data.recipientCount} مستلم`
          : "تم إرسال الإشعار بنجاح",
      );
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error: Error & { status?: number }, body) => {
      if (body.labelId && error.status === 404) {
        // the label expired or was deleted — drop it from the pickers
        toast.error("هذه المجموعة انتهت أو تم حذفها");
        queryClient.invalidateQueries({ queryKey: ["customer-labels"] });
        return;
      }
      toast.error("حدث خطأ أثناء إرسال الإشعار، حاول مرة أخرى");
    },
  });
}

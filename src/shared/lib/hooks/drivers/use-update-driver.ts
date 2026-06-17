"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateDriver } from "../../actions/drivers/update-driver";
import { UpdateDriverPayload } from "../../types/drivers/driver";

export function useUpdateDriver() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ id, ...payload }: UpdateDriverPayload & { id: string }) =>
      updateDriver(id, payload),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("تم تعديل السائق بنجاح");
        queryClient.invalidateQueries({ queryKey: ["drivers"] });
        router.refresh();
      } else {
        toast.error(data.message ?? "فشل تعديل السائق");
      }
    },
    onError: () => toast.error("حدث خطأ غير متوقع"),
  });
}

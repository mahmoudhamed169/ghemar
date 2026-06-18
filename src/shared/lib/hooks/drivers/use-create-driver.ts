"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createDriver } from "../../actions/drivers/create-driver";
import { CreateDriverPayload } from "../../types/drivers/driver";

export function useCreateDriver() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateDriverPayload) => createDriver(payload),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("تم إضافة السائق بنجاح");
        queryClient.invalidateQueries({ queryKey: ["drivers"] });
      } else {
        toast.error(data.message ?? "فشل إضافة السائق");
      }
    },
    onError: () => {
      toast.error("حدث خطأ غير متوقع");
    },
  });
}

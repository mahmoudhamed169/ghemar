// use-update-driver-status.ts
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DriverStatus } from "@/shared/lib/types/drivers/driver";
import { toast } from "sonner";
import { updateDriverStatus } from "../../actions/drivers/update-driver-status";

interface UpdateDriverStatusPayload {
  driverId: string;
  status: DriverStatus;
}

export function useUpdateDriverStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateDriverStatusPayload) =>
      updateDriverStatus(payload),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["drivers"] });
      } else {
        toast.error(data.message);
      }
    },
    onError: () => {
      toast.error("حدث خطأ غير متوقع");
    },
  });
}

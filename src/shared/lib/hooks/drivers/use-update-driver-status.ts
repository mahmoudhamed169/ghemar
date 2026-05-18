// use-update-driver-status.ts
"use client";
import { useMutation } from "@tanstack/react-query";
import { DriverStatus } from "@/shared/lib/types/drivers/driver";
import { toast } from "sonner";
import { updateDriverStatus } from "../../actions/drivers/update-driver-status";

interface UpdateDriverStatusPayload {
  driverId: string;
  status: DriverStatus;
}

export function useUpdateDriverStatus() {
  return useMutation({
    mutationFn: (payload: UpdateDriverStatusPayload) =>
      updateDriverStatus(payload),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
}
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createDriver } from "../../actions/drivers/create-driver";

interface CreateDriverPayload {
  name: string;
  phone: string;
  cityId: string;
  vehicleType: string;
  vehiclePlate: string;
  nationalId: string;
  assignedAreas: string[];
}

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

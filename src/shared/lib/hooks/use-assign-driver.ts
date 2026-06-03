// hooks/use-assign-driver.ts
"use client";

import { useTransition } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { assignDriver } from "@/shared/lib/actions/orders/assign-driver";

export function useAssignDriver() {
  const router = useRouter();
  const [, startTransition] = useTransition();

  return useMutation({
    mutationFn: ({
      orderId,
      driverId,
    }: {
      orderId: string;
      driverId: string;
    }) => assignDriver(orderId, driverId),
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.message ?? "فشل تعيين السائق");
        return;
      }
      toast.success("تم تعيين السائق بنجاح");
      startTransition(() => router.refresh());
    },
    onError: () => toast.error("حدث خطأ غير متوقع"),
  });
}

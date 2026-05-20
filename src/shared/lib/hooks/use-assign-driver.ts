// hooks/use-assign-driver.ts
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { assignDriver } from "@/shared/lib/actions/orders/assign-driver";

interface UseAssignDriverReturn {
  assign: (orderId: string, driverId: string) => Promise<boolean>;
  isLoading: boolean;
}

export function useAssignDriver(): UseAssignDriverReturn {
  const [isLoading, setIsLoading] = useState(false);

  const assign = async (
    orderId: string,
    driverId: string,
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      const result = await assignDriver(orderId, driverId);

      if (!result.success) {
        toast.error(result.message ?? "فشل تعيين السائق");
        return false;
      }

      toast.success("تم تعيين السائق بنجاح");
      return true;
    } catch {
      toast.error("حدث خطأ غير متوقع");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { assign, isLoading };
}

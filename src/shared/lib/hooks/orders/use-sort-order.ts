// shared/lib/hooks/use-sort-order.ts
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { sortOrder, SortItem } from "@/shared/lib/actions/orders/sort-order";

interface UseSortOrderReturn {
  sort: (orderId: string, items: SortItem[]) => Promise<boolean>;
  isLoading: boolean;
}

export function useSortOrder(): UseSortOrderReturn {
  const [isLoading, setIsLoading] = useState(false);

  const sort = async (orderId: string, items: SortItem[]): Promise<boolean> => {
    try {
      setIsLoading(true);
      const result = await sortOrder(orderId, items);

      if (!result.success) {
        toast.error(result.message ?? "فشل حفظ بيانات الفرز");
        return false;
      }

      toast.success("تم حفظ بيانات الفرز بنجاح");
      return true;
    } catch {
      toast.error("حدث خطأ غير متوقع");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { sort, isLoading };
}

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { sortOrder, SortItem } from "@/shared/lib/actions/orders/sort-order";

export function useSortOrder() {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ orderId, items }: { orderId: string; items: SortItem[] }) =>
      sortOrder(orderId, items),
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.message ?? "فشل حفظ بيانات الفرز");
        return;
      }
      toast.success("تم حفظ بيانات الفرز بنجاح");
      router.refresh();
    },
    onError: () => toast.error("حدث خطأ غير متوقع"),
  });
}

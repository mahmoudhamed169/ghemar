import { useTransition } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { sortOrder, SortItem } from "@/shared/lib/actions/orders/sort-order";

export function useSortOrder() {
  const router = useRouter();
  const t = useTranslations("orders.sort");
  const [, startTransition] = useTransition();

  return useMutation({
    mutationFn: ({
      orderId,
      items,
      edit = false,
    }: {
      orderId: string;
      items: SortItem[];
      edit?: boolean;
    }) => sortOrder(orderId, items, edit),
    onSuccess: (result, { edit }) => {
      if (!result.success) {
        toast.error(
          result.status === 403
            ? t("error_forbidden")
            : result.status === 404
              ? t("error_not_found")
              : (result.message ?? "فشل حفظ بيانات الفرز"),
        );
        return;
      }
      toast.success(edit ? t("edit_success") : "تم حفظ بيانات الفرز بنجاح");
      startTransition(() => router.refresh());
    },
    onError: () => toast.error("حدث خطأ غير متوقع"),
  });
}

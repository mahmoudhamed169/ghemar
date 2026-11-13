import { useTransition } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateOrderStatusAction } from "../../actions/orders/update-order-status";

export function useCancelOrder() {
  const router = useRouter();
  const [, startTransition] = useTransition();

  return useMutation({
    mutationFn: (orderId: string) => updateOrderStatusAction(orderId, "cancelled"),
    onSuccess: (result) => {
      if (!result.success) {
        toast.error("فشل إلغاء الطلب");
        return;
      }
      // 0 for an unpaid express order, a package delivery, or an order cancelled before
      const refunded = result.refundedBags ?? 0;
      toast.success(
        refunded > 0 ? `تم الإلغاء وإرجاع ${refunded} كيس للعميل` : "تم إلغاء الطلب",
      );
      startTransition(() => router.refresh());
    },
    onError: () => toast.error("حدث خطأ غير متوقع"),
  });
}

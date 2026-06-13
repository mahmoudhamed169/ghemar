import { useTransition } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { OrderStatus } from "../../types/orders/order";
import { updateOrderStatusAction } from "../../actions/orders/update-order-status";

export function useUpdateOrderStatus() {
  const router = useRouter();
  const [, startTransition] = useTransition();

  return useMutation({
    mutationFn: ({
      orderId,
      status,
      deliveredBagsCount,
    }: {
      orderId: string;
      status: OrderStatus;
      deliveredBagsCount?: number;
    }) => updateOrderStatusAction(orderId, status, deliveredBagsCount),
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.message ?? "فشل تغيير حالة الطلب");
        return;
      }
      toast.success("تم تغيير حالة الطلب بنجاح");
      startTransition(() => router.refresh());
    },
    onError: () => toast.error("حدث خطأ غير متوقع"),
  });
}

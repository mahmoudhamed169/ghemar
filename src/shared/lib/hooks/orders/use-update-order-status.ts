import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { OrderStatus } from "../../types/orders/order";
import { updateOrderStatusAction } from "../../actions/orders/update-order-status";

export function useUpdateOrderStatus() {
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      orderId,
      status,
    }: {
      orderId: string;
      status: OrderStatus;
    }) => updateOrderStatusAction(orderId, status),
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.message ?? "فشل تغيير حالة الطلب");
        return;
      }
      toast.success("تم تغيير حالة الطلب بنجاح");
      router.refresh();
    },
    onError: () => toast.error("حدث خطأ غير متوقع"),
  });
}

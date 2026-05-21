import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { togglePromoCodeAction } from "../../actions/promocode/toggle-promo-code";

export function useTogglePromoCode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => togglePromoCodeAction(id),
    onSuccess: (res) => {
      const status = res.data.isActive ? "نشط" : "موقوف";
      toast.success(`تم تغيير حالة الكود إلى ${status}`);
      queryClient.invalidateQueries({ queryKey: ["promo-codes"] });
    },
    onError: () => {
      toast.error("حدث خطأ أثناء تغيير حالة الكود، حاول مرة أخرى");
    },
  });
}

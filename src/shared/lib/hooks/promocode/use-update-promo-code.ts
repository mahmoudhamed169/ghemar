import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UpdatePromoCodeBody } from "../../types/promocode/update-promo-code";
import { updatePromoCodeAction } from "../../actions/promocode/update-promo-code";


export function useUpdatePromoCode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdatePromoCodeBody }) =>
      updatePromoCodeAction(id, body),
    onSuccess: () => {
      toast.success("تم تعديل كود الخصم بنجاح");
      queryClient.invalidateQueries({ queryKey: ["promo-codes"] });
    },
    onError: () => {
      toast.error("حدث خطأ أثناء تعديل الكود، حاول مرة أخرى");
    },
  });
}

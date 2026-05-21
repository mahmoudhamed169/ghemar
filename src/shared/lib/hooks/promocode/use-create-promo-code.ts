import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreatePromoCodeBody } from "../../types/promocode/create-promo-code";
import { createPromoCodeAction } from "../../actions/promocode/create-promo-code";


export function useCreatePromoCode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreatePromoCodeBody) => createPromoCodeAction(body),
    onSuccess: () => {
      toast.success("تم إضافة كود الخصم بنجاح");
      queryClient.invalidateQueries({ queryKey: ["promo-codes"] });
    },
    onError: () => {
      toast.error("حدث خطأ أثناء إضافة الكود، حاول مرة أخرى");
    },
  });
}

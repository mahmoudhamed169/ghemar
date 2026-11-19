import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { UpdatePromoCodeBody } from "../../types/promocode/update-promo-code";
import { updatePromoCodeAction } from "../../actions/promocode/update-promo-code";

export function useUpdatePromoCode() {
  const t = useTranslations("PromoCodes.editForm");
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: UpdatePromoCodeBody }) => {
      const result = await updatePromoCodeAction(id, body);
      if (!result.success) {
        // 409 = the database's unique code index
        throw new Error(result.status === 409 ? t("codeTaken") : result.message);
      }
      return result;
    },
    onSuccess: () => {
      toast.success(t("success"));
      queryClient.invalidateQueries({ queryKey: ["promo-codes"] });
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message || t("error"));
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { deletePromoCodeAction } from "../../actions/promocode/delete-promo-code";

export function useDeletePromoCode() {
  const t = useTranslations("PromoCodes.deleteModal");
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deletePromoCodeAction(id);
      if (!result.success) throw new Error(result.message);
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

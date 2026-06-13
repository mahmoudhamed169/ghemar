import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { RewardsSettings } from "../../types/rewards/rewards-settings";
import { updateRewardsSettingsAction } from "../../actions/rewards/update-rewards-settings";

export function useUpdateRewardsSettings() {
  const router = useRouter();
  const t = useTranslations("Bounes.settings");

  return useMutation({
    mutationFn: (body: RewardsSettings) => updateRewardsSettingsAction(body),
    onSuccess: () => {
      toast.success(t("saveSuccess"));
      router.refresh();
    },
    onError: () => {
      toast.error(t("saveError"));
    },
  });
}

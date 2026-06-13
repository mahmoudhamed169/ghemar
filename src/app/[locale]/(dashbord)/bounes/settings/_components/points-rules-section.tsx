import { getRewardsSettings } from "@/shared/lib/services/rewards/get-rewards-settings";
import PointsRulesForm from "./points-rules-form";

export default async function PointsRulesSection() {
  const { data } = await getRewardsSettings();
  return <PointsRulesForm initialData={data} />;
}

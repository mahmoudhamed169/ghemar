
import { useTranslations } from "next-intl";

export default function OrderPriorityBadge({
  priority,
}: {
  priority: boolean;
}) {
  console.log("priority prop:", priority, typeof priority);
  const t = useTranslations("orders.table");
  const label = priority ? t("priority_express") : t("priority_normal");
  const styles = priority
    ? "text-red-500 font-semibold"
    : "text-gray-500 font-medium";
  return <span className={styles}>{label}</span>;
}

import { Badge } from "@/components/ui/badge";
import { getTranslations } from "next-intl/server";

export default async function OrderStatusBadge({ status }: { status: string }) {
  const t = await getTranslations("Reports.status");

  if (status === "completed") {
    return (
      <Badge className="bg-green-50 text-green-600 border border-green-200 hover:bg-green-50 gap-1 font-medium">
        <span className="size-1.5 rounded-full bg-green-500 inline-block" />
        {t("completed")}
      </Badge>
    );
  }

  if (status === "pending") {
    return (
      <Badge className="bg-orange-50 text-orange-500 border border-orange-200 hover:bg-orange-50 gap-1 font-medium">
        <span className="size-1.5 rounded-full bg-orange-400 inline-block" />
        {t("pending")}
      </Badge>
    );
  }

  return (
    <Badge className="bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-50 gap-1 font-medium">
      <span className="size-1.5 rounded-full bg-gray-400 inline-block" />
      {status}
    </Badge>
  );
}

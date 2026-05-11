import { Badge } from "@/components/ui/badge";

export type OrderStatus = "مستعجل" | "عادي";

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  if (status === "مستعجل") {
    return (
      <Badge className="bg-green-50 text-green-600 border border-green-200 hover:bg-green-50 gap-1 font-medium">
        <span className="size-1.5 rounded-full bg-green-500 inline-block" />
        مستعجل
      </Badge>
    );
  }
  return (
    <Badge className="bg-orange-50 text-orange-500 border border-orange-200 hover:bg-orange-50 gap-1 font-medium">
      <span className="size-1.5 rounded-full bg-orange-400 inline-block" />
      عادي
    </Badge>
  );
}
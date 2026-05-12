

type OrderPriority = "مستعجل" | "عادي";

interface OrderPriorityBadgeProps {
  priority: OrderPriority;
}

export default function OrderPriorityBadge({
  priority,
}: OrderPriorityBadgeProps) {
  const styles: Record<OrderPriority, string> = {
    مستعجل: "text-red-500 font-semibold",
    عادي: "text-gray-500 font-medium",
  };

  return (
    <span className={styles[priority]}>
      {priority === "مستعجل" ? "أوردر مستعجل" : "أوردر عادي"}
    </span>
  );
}

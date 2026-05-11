import { Badge } from "@/components/ui/badge";

export type CodeStatus = "نشط" | "موقوف";

interface CodeStatusBadgeProps {
  status: CodeStatus;
}

export default function CodeStatusBadge({ status }: CodeStatusBadgeProps) {
  const isActive = status === "نشط";

  return (
    <Badge
      variant="outline"
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
        isActive
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-red-50 text-red-600 border-red-200"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isActive ? "bg-green-500" : "bg-red-500"
        }`}
      />
      {status}
    </Badge>
  );
}
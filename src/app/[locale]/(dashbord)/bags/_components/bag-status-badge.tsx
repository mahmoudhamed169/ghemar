import { BagStatus } from "@/shared/lib/types/bags/bag";

const STATUS_CONFIG: Record<
  BagStatus,
  { label: string; labelEn: string; bg: string; text: string }
> = {
  generated: {
    label: "منشأ",
    labelEn: "Generated",
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  assigned: {
    label: "معين",
    labelEn: "Assigned",
    bg: "bg-purple-50",
    text: "text-purple-600",
  },
  in_use: {
    label: "قيد الاستخدام",
    labelEn: "In Use",
    bg: "bg-orange-50",
    text: "text-orange-600",
  },
  at_laundry: {
    label: "في المغسلة",
    labelEn: "At Laundry",
    bg: "bg-teal-50",
    text: "text-teal-600",
  },
  voucher: {
    label: "فاوتشر",
    labelEn: "Voucher",
    bg: "bg-green-50",
    text: "text-green-600",
  },
};

interface BagStatusBadgeProps {
  status: BagStatus;
}

export default function BagStatusBadge({ status }: BagStatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    bg: "bg-gray-50",
    text: "text-gray-600",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}

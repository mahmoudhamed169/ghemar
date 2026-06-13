"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  CheckCircle,
  CreditCard,
  UserCheck,
  Package,
  Navigation,
  PackageCheck,
  Truck,
  Building2,
  Sparkles,
  MapPin,
  PackageOpen,
  BadgeCheck,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { OrderStatus } from "@/shared/lib/types/orders/order";

interface StatusConfig {
  style: string;
  Icon: React.ElementType;
}

const STATUS_CONFIG: Record<OrderStatus, StatusConfig> = {
  pending: {
    style: "bg-gray-100 text-[#6B7280] border-gray-200 hover:bg-gray-100",
    Icon: Clock,
  },
  confirmed: {
    style: "bg-blue-100 text-[#1E40AF] border-blue-300 hover:bg-blue-100",
    Icon: CheckCircle,
  },
  awaiting_payment: {
    style: "bg-yellow-50 text-[#B45309] border-yellow-200 hover:bg-yellow-50",
    Icon: CreditCard,
  },
  driver_assigned: {
    style: "bg-blue-50 text-[#1D4ED8] border-blue-200 hover:bg-blue-50",
    Icon: UserCheck,
  },

  // Package delivery flow
  driver_preparing_bags: {
    style: "bg-indigo-50 text-[#4338CA] border-indigo-200 hover:bg-indigo-50",
    Icon: Package,
  },
  driver_on_way_to_customer: {
    style: "bg-purple-50 text-[#7C3AED] border-purple-200 hover:bg-purple-50",
    Icon: Navigation,
  },
  bags_delivered_and_linked: {
    style: "bg-teal-50 text-[#0C6175] border-teal-200 hover:bg-teal-50",
    Icon: PackageCheck,
  },
  first_bag_collected: {
    style: "bg-cyan-50 text-[#0E7490] border-cyan-200 hover:bg-cyan-50",
    Icon: Package,
  },

  // Laundry pickup flow
  driver_on_way_to_pickup: {
    style: "bg-orange-50 text-[#B45309] border-orange-200 hover:bg-orange-50",
    Icon: Navigation,
  },
  driver_arrived_at_pickup: {
    style: "bg-orange-100 text-[#92400E] border-orange-300 hover:bg-orange-100",
    Icon: MapPin,
  },
  picked_up_from_customer: {
    style: "bg-yellow-50 text-[#CA8A04] border-yellow-200 hover:bg-yellow-50",
    Icon: PackageOpen,
  },
  on_way_to_laundry: {
    style: "bg-amber-50 text-[#B45309] border-amber-200 hover:bg-amber-50",
    Icon: Truck,
  },
  delivered_to_laundry: {
    style: "bg-lime-50 text-[#4D7C0F] border-lime-200 hover:bg-lime-50",
    Icon: Building2,
  },
  at_laundry: {
    style: "bg-teal-50 text-[#0C6175] border-teal-200 hover:bg-teal-50",
    Icon: Sparkles,
  },
  ready_for_return: {
    style: "bg-emerald-50 text-[#065F46] border-emerald-200 hover:bg-emerald-50",
    Icon: PackageCheck,
  },
  driver_on_way_to_laundry_pickup: {
    style: "bg-violet-50 text-[#6D28D9] border-violet-200 hover:bg-violet-50",
    Icon: Navigation,
  },
  driver_arrived_at_laundry_pickup: {
    style: "bg-violet-100 text-[#5B21B6] border-violet-300 hover:bg-violet-100",
    Icon: MapPin,
  },
  picked_from_laundry: {
    style: "bg-purple-50 text-[#7C3AED] border-purple-200 hover:bg-purple-50",
    Icon: Package,
  },
  on_way_to_customer: {
    style: "bg-purple-100 text-[#6D28D9] border-purple-300 hover:bg-purple-100",
    Icon: Truck,
  },
  driver_arrived_at_customer: {
    style: "bg-pink-50 text-[#BE185D] border-pink-200 hover:bg-pink-50",
    Icon: MapPin,
  },
  delivered_to_customer: {
    style: "bg-green-50 text-[#15803D] border-green-200 hover:bg-green-50",
    Icon: PackageCheck,
  },

  // Terminals
  completed: {
    style: "bg-green-100 text-[#00C950] border-green-300 hover:bg-green-100",
    Icon: BadgeCheck,
  },
  cancelled: {
    style: "bg-red-50 text-[#DC2626] border-red-200 hover:bg-red-50",
    Icon: XCircle,
  },
  problem_reported: {
    style: "bg-rose-100 text-[#9F1239] border-rose-300 hover:bg-rose-100",
    Icon: AlertTriangle,
  },
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const t = useTranslations("orders.status");
  const { style, Icon } = STATUS_CONFIG[status] ?? {
    style: "bg-gray-100 text-gray-500 border-gray-200",
    Icon: Clock,
  };

  return (
    <Badge
      variant="outline"
      className={`gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${style}`}
    >
      <Icon className="w-3 h-3 shrink-0" />
      {t(status)}
    </Badge>
  );
}

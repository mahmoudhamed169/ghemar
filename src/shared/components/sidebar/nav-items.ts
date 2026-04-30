import {
  LayoutDashboard,
  Users,
  Home,
  ClipboardList,
  CreditCard,
  Percent,
  BarChart2,
  AlertCircle,
  Settings,
  Tag,
  Map,
  MapPin,
  type LucideIcon,
} from "lucide-react";

export interface NavItemType {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const navItems: NavItemType[] = [
  { label: "لوحة التحكم", href: "/overview", icon: LayoutDashboard },

  { label: "العملاء", href: "/customers", icon: Users },
  { label: "السائقين", href: "/drivers", icon: Home },
  { label: "الطلبات", href: "/orders", icon: ClipboardList },
  { label: "الباقات", href: "/packages", icon: CreditCard },
  { label: "الحقائب / الباركود", href: "/bags", icon: Tag },

  { label: "العروض", href: "/offers", icon: Percent },
  { label: "المسارات", href: "/routes", icon: Map },
  { label: "التتبع المباشر", href: "/tracking", icon: MapPin },
  { label: "التقارير", href: "/reports", icon: BarChart2 },
  { label: "الاشعارات", href: "/alerts", icon: AlertCircle },
  { label: "الاعدادات", href: "/settings", icon: Settings },
];

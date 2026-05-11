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
  children?: Omit<NavItemType, "icon" | "children">[];
}

export const navItems: NavItemType[] = [
  { label: "لوحة التحكم", href: "/overview", icon: LayoutDashboard },
  { label: "العملاء", href: "/customers", icon: Users },
  { label: "السائقين", href: "/drivers", icon: Home },
  {
    label: "الطلبات",
    href: "/orders",
    icon: ClipboardList,
    children: [
      { label: "طلبات عادية", href: "/orders/regular" },
      { label: "طلبات العملاء الجدد", href: "/orders/new-customers" },
    ],
  },
  { label: "الباقات", href: "/packages", icon: CreditCard },
  { label: "أكواد الخصم", href: "/promo-codes", icon: Percent },
  { label: " الباركود", href: "/bags", icon: Tag },
  { label: "الفواتير والتقارير المالية", href: "/reports", icon: BarChart2 },
  { label: " المكافئات والنقاط", href: "/bounes", icon: Map },
  // { label: "التتبع المباشر", href: "/tracking", icon: MapPin },
  { label: "الاشعارات", href: "/alerts", icon: AlertCircle },
  {
    label: "الاعدادات",
    href: "/settings",
    icon: Settings,
    children: [
      { label: "الاعدادات العامة", href: "/settings/general" },
      { label: "اعدادات التشغيل", href: "/settings/operations" },
      { label: "المشرفين والأدوار", href: "/settings/admins" },
      { label: "الشروط والأحكام", href: "/settings/terms" },
      { label: "مناطق التوصيل", href: "/settings/zones" },
    ],
  },
];

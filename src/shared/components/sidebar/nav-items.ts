import {
  LayoutDashboard, Users, Home, ClipboardList,
  CreditCard, Percent, BarChart2, AlertCircle,
  Settings, Tag, Map, type LucideIcon,
} from "lucide-react";

export interface NavItemType {
  labelKey: string;
  href: string;
  icon: LucideIcon;
  children?: Omit<NavItemType, "icon" | "children">[];
}

export const navItems: NavItemType[] = [
  { labelKey: "overview",   href: "/overview",    icon: LayoutDashboard },
  { labelKey: "customers",  href: "/customers",   icon: Users },
  { labelKey: "drivers",    href: "/drivers",     icon: Home },
  { labelKey: "orders", href: "/orders", icon: ClipboardList },
  { labelKey: "packages",   href: "/packages",    icon: CreditCard },
  { labelKey: "promoCodes", href: "/promo-codes", icon: Percent },
  { labelKey: "bags",       href: "/bags",        icon: Tag },
  { labelKey: "reports",    href: "/reports",     icon: BarChart2 },
  { labelKey: "bonuses",    href: "/bounes",      icon: Map },
  { labelKey: "alerts",     href: "/alerts",      icon: AlertCircle },
  {
    labelKey: "settings", href: "/settings", icon: Settings,
    children: [
      { labelKey: "settingsGeneral",    href: "/settings/general" },
      { labelKey: "settingsOperations", href: "/settings/operations" },
      { labelKey: "settingsAdmins",     href: "/settings/admins" },
      { labelKey: "settingsTerms",      href: "/settings/terms" },
      { labelKey: "settingsZones",      href: "/settings/zones" },
      { labelKey: "settingsBranches",   href: "/settings/branches" },
      { labelKey: "settingsContact",    href: "/settings/contact" },
    ],
  },
];
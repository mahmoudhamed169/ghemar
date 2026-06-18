import {
  LayoutDashboard, Users, Home, ClipboardList,
  CreditCard, Percent, BarChart2, AlertCircle,
  Settings, Tag, Map, type LucideIcon,
} from "lucide-react";

export interface NavItemType {
  labelKey: string;
  href: string;
  icon: LucideIcon;
  superAdminOnly?: boolean;
  children?: (Omit<NavItemType, "icon" | "children"> & { superAdminOnly?: boolean })[];
}

export const navItems: NavItemType[] = [
  { labelKey: "overview",   href: "/overview",    icon: LayoutDashboard },
  { labelKey: "orders",     href: "/orders",      icon: ClipboardList },
  { labelKey: "customers",  href: "/customers",   icon: Users },
  { labelKey: "drivers",    href: "/drivers",     icon: Home },
  { labelKey: "packages",   href: "/packages",    icon: CreditCard,  superAdminOnly: true },
  { labelKey: "promoCodes", href: "/promo-codes", icon: Percent,     superAdminOnly: true },
  { labelKey: "bags",       href: "/bags",        icon: Tag,         superAdminOnly: true },
  { labelKey: "reports",    href: "/reports",     icon: BarChart2,   superAdminOnly: true },
  { labelKey: "bonuses",    href: "/bounes",      icon: Map,         superAdminOnly: true },
  { labelKey: "alerts",     href: "/alerts",      icon: AlertCircle, superAdminOnly: true },
  {
    labelKey: "settings", href: "/settings", icon: Settings, superAdminOnly: true,
    children: [
      { labelKey: "settingsGeneral",    href: "/settings/general" },
      { labelKey: "settingsOperations", href: "/settings/operations" },
      { labelKey: "settingsAdmins",     href: "/settings/admins",   superAdminOnly: true },
      { labelKey: "settingsTerms",      href: "/settings/terms" },
      { labelKey: "settingsZones",      href: "/settings/zones" },
      { labelKey: "settingsBranches",   href: "/settings/branches", superAdminOnly: true },
      { labelKey: "settingsContact",    href: "/settings/contact" },
    ],
  },
];
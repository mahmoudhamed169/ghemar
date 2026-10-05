"use client";
import { useSession } from "next-auth/react";
import NavItem from "./nav-item";
import { navItems } from "./nav-items";
import { checkIsSuperAdmin } from "@/shared/lib/utils/is-super-admin";
import { useRealtimeNotifications } from "@/shared/providers/components/realtime-notifications-provider";

interface NavListProps {
  onClose?: () => void;
}

export default function NavList({ onClose }: NavListProps) {
  const { data: session } = useSession();
  const { unreadCount } = useRealtimeNotifications();
  const isSuperAdmin = checkIsSuperAdmin(session?.user?.role, (session?.user as any)?.isBranchAdmin);

  const visibleItems = navItems
    .filter((item) => !item.superAdminOnly || isSuperAdmin)
    .map((item) => ({
      ...item,
      children: item.children?.filter(
        (child) => !child.superAdminOnly || isSuperAdmin,
      ),
    }));

  return (
    <ul className="space-y-0.5 px-3">
      {visibleItems.map((item) => (
        <NavItem
          key={item.href}
          {...item}
          badge={item.href === "/alerts" ? unreadCount : undefined}
          onClose={onClose}
        />
      ))}
    </ul>
  );
}
"use client";
import { useSession } from "next-auth/react";
import NavItem from "./nav-item";
import { navItems } from "./nav-items";
import { checkIsSuperAdmin } from "@/shared/lib/utils/is-super-admin";

interface NavListProps {
  onClose?: () => void;
}

export default function NavList({ onClose }: NavListProps) {
  const { data: session } = useSession();
  const isSuperAdmin = checkIsSuperAdmin(
    session?.user?.role,
    (session?.user as any)?.phone,
  );

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
        <NavItem key={item.href} {...item} onClose={onClose} />
      ))}
    </ul>
  );
}
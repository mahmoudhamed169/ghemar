"use client";
import NavItem from "./nav-item";
import { navItems } from "./nav-items";

interface NavListProps {
  onClose?: () => void;
}

export default function NavList({ onClose }: NavListProps) {
  return (
    <ul className="space-y-0.5 px-3">
      {navItems.map((item) => (
        <NavItem key={item.href} {...item} onClose={onClose} />
      ))}
    </ul>
  );
}
"use client";

import NavItem from "./nav-item";
import { navItems } from "./nav-items";

export default function NavList() {
  return (
    <ul className="space-y-0.5 px-3">
      {navItems.map((item) => (
        <NavItem key={item.href} {...item} />
      ))}
    </ul>
  );
}

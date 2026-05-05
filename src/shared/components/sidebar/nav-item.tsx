"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { NavItemType } from "./nav-items";

export default function NavItem({ label, href, icon: Icon, children }: NavItemType) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");
  const [open, setOpen] = useState(isActive);

  if (children) {
    return (
      <li>
        <button
          onClick={() => setOpen(!open)}
          className={`w-full relative flex items-center gap-3 px-5 py-3.5 rounded-2xl text-base transition-all duration-200 ${
            isActive
              ? "bg-white/15 text-white font-semibold"
              : "text-white/65 hover:bg-white/10 hover:text-white"
          }`}
        >
          <Icon size={18} className={isActive ? "text-[#F5A623]" : "text-white/65"} />
          <span className="flex-1 text-right">{label}</span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""} ${
              isActive ? "text-[#F5A623]" : "text-white/65"
            }`}
          />
        </button>

        {open && (
          <ul className="mt-0.5 mr-6 border-r border-white/20 pr-3 space-y-0.5">
            {children.map((child) => {
              const isChildActive = pathname === child.href || pathname.startsWith(child.href + "/");
              return (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                      isChildActive
                        ? "text-[#F5A623] font-semibold"
                        : "text-white/55 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {isChildActive && <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />}
                    <span>{child.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <Link
        href={href}
        className={`relative flex items-center gap-3 px-5 py-3.5 rounded-2xl text-base transition-all duration-200 ${
          isActive
            ? "bg-white/15 text-white font-semibold"
            : "text-white/65 hover:bg-white/10 hover:text-white"
        }`}
      >
        <Icon size={18} className={isActive ? "text-[#F5A623]" : "text-white/65"} />
        <span className="flex-1">{label}</span>
        {isActive && <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]" />}
      </Link>
    </li>
  );
}
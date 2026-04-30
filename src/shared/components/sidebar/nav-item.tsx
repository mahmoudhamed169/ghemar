"use client";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import type { NavItemType } from "./nav-items";

export default function NavItem({ label, href, icon: Icon }: NavItemType) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <li>
      <Link
        href={href}
        className={`
  relative flex items-center gap-3 px-5 py-3.5 rounded-2xl text-base transition-all duration-200
  ${
    isActive
      ? "bg-white/15 text-white font-semibold"
      : "text-white/65 hover:bg-white/10 hover:text-white"
  }
`}
      >
        {/* الأيقونة */}
        <Icon
          size={18}
          className={isActive ? "text-[#F5A623]" : "text-white/65"}
        />

        {/* النص */}
        <span className="flex-1">{label}</span>

        {/* النقطة الصفراء على اليسار */}
        {isActive && <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]" />}
      </Link>
    </li>
  );
}

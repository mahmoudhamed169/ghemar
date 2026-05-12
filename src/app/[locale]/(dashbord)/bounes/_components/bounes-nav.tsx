"use client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

const tabs = [
  { label: "النقاط", href: "/bounes" },
  { label: "الاستبدال", href: "/bounes/redeem" },
  { label: "الإعدادات", href: "/bounes/settings" },
];

export default function BounesNav() {
  const pathname = usePathname();

  // pathname => "/ar/bounes/redeem"  نشيل الـ locale من الأول
  const normalizedPath = '/' + pathname.split('/').slice(2).join('/')

  return (
    <div
      className="flex items-center w-full bg-white p-1"
      style={{ height: 59, borderRadius: 12, padding: 4 }}
    >
      {tabs.map((tab) => {
        const isActive = normalizedPath === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex-1 h-full flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200",
              isActive
                ? "text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
            style={isActive ? { backgroundColor: "#0C6175" } : {}}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
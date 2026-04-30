import Image from "next/image";
import NavList from "./nav-list";

export default function Sidebar() {
  return (
    <aside className="w-[288px] h-full bg-[#0C6175] flex flex-col shrink-0">
      {/* Logo */}
      <div className="flex items-center justify-center py-6 border-b border-white/20">
        <div className="w-23 h-23  flex items-center justify-center overflow-hidden">
          <Image
            src="/images/logo.webp"
            alt="Ghomar"
            width={184}
            height={187}
            className="rounded-2xl"
          />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] sidebar-nav">
        <NavList />
      </nav>

      {/* User */}
      <div className="border-t border-white/20 p-4">
        <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-3">
          <div className="w-11 h-11 rounded-full bg-[#F5A623] flex items-center justify-center text-white font-bold text-lg shrink-0">
            أ
          </div>
          {/* النص على اليمين */}
          <div className="flex-1 min-w-0 text-right">
            <p className="text-white text-base font-bold truncate">
              أحمد المنصور
            </p>
            <p className="text-white/50 text-sm truncate">مدير النظام</p>
          </div>

          {/* الأفاتار على اليسار */}
        </div>
      </div>
    </aside>
  );
}

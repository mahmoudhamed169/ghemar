"use client"
import Image from "next/image"
import { useSession, signOut } from "next-auth/react"
import { LogOut } from "lucide-react"
import NavList from "./nav-list"

interface SidebarContentProps {
  onClose?: () => void
}

export default function SidebarContent({ onClose }: SidebarContentProps) {
  const { data: session } = useSession()

  async function handleLogout() {
    await signOut({ callbackUrl: "/ar/login" })
  }

  return (
    <div className="w-full h-full bg-[#0C6175] flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center py-6 border-b border-white/20">
        <div className="flex items-center justify-center overflow-hidden">
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
      <nav className="flex-1 py-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <NavList onClose={onClose} />
      </nav>

      {/* User + Logout */}
      <div className="border-t border-white/20 p-4 space-y-2">
        {/* User Info */}
        <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-3">
          <div className="w-11 h-11 rounded-full bg-[#F5A623] flex items-center justify-center text-white font-bold text-lg shrink-0">
            {session?.user?.name?.[0] ?? "م"}
          </div>
          <div className="flex-1 min-w-0 text-right">
            <p className="text-white text-base font-bold truncate">
              {session?.user?.name ?? "..."}
            </p>
            <p className="text-white/50 text-sm truncate">
              {(session?.user as any)?.role === "admin"
                ? "مدير النظام"
                : (session?.user as any)?.role ?? ""}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 transition rounded-2xl px-4 py-3 text-white text-sm font-medium"
        >
          <LogOut size={16} />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </div>
  )
}
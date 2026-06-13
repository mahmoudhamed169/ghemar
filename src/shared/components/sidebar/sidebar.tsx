"use client";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SidebarContent from "./sidebar-content";
import type { ContactInfo } from "@/shared/lib/services/content/get-contact";

interface SidebarProps {
  contact?: ContactInfo | null;
}

export default function Sidebar({ contact = null }: SidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex w-[288px] h-full shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile */}
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="fixed top-4 right-4 z-50 p-2 bg-[#0C6175] text-white rounded-xl shadow-lg">
              <Menu size={22} />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="p-0 w-[288px] bg-[#0C6175] border-none [&>button]:hidden"
          >
            <SidebarContent onClose={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
// zone-actions.tsx
"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import ZoneDetailsModal from "./zone-details-modal/zone-details-modal";
import { ZoneModal } from "./zone-modal";


interface ZoneActionsProps {
  zone: string;
  zoneId: number;
}

export default function ZoneActions({ zone, zoneId }: ZoneActionsProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const menuItems = [
    { label: "عرض التفاصيل", onClick: () => setDetailsOpen(true) },
    { label: "تعديل تفاصيل النقطة", onClick: () => setEditOpen(true) },
    { label: "اضافة سائق", onClick: () => {} },
  ];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 rounded-full"
          >
            <MoreVertical size={25} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="center"
          className="w-56 rounded-xl p-0 overflow-hidden"
        >
          {menuItems.map((item, i, arr) => (
            <DropdownMenuItem
              key={item.label}
              onClick={item.onClick}
              className={`justify-center cursor-pointer py-3 rounded-none text-[#000709] ${
                i < arr.length - 1 ? "border-b border-[#00000014]" : ""
              }`}
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Details modal */}
      <ZoneDetailsModal
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        zoneId={zoneId}
      />

      {/* Edit modal — opened directly from dropdown */}
      <ZoneModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        initialData={{ name: zone }}
        onSubmit={(data) => {
          console.log("Updated zone:", data);
          // TODO: call your API here with zoneId
          setEditOpen(false);
        }}
      />
    </>
  );
}
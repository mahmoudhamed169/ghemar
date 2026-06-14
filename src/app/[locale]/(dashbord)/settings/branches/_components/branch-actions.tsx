"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
interface BranchActionsProps {
  onEdit: () => void;
}

export default function BranchActions({ onEdit }: BranchActionsProps) {
  const items = [
    { label: "تعديل", action: onEdit },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full">
          <MoreVertical size={25} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-40 rounded-xl p-0 overflow-hidden">
        {items.map((item, i, arr) => (
          <DropdownMenuItem
            key={item.label}
            onClick={item.action}
            className={`justify-center cursor-pointer py-3 rounded-none text-[#000709] ${
              i < arr.length - 1 ? "border-b border-[#00000014]" : ""
            }`}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

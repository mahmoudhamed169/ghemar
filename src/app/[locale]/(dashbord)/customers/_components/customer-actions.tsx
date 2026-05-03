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
import CustomerDetailsModal from "./customer-details/customer-details-modal";
import BlockUserModal from "@/shared/components/block-user-modal";



interface CustomerActionsProps {
  customerName: string;
}

export default function CustomerActions({ customerName }: CustomerActionsProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full">
            <MoreVertical size={25} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center" className="w-56 rounded-xl p-0 overflow-hidden">
          {[
            { label: "ارسال اشعار", onClick: () => {} },
            { label: "عرض التفاصيل", onClick: () => setDetailsOpen(true) },
            { label: "سجل الأوردرات", onClick: () => {} },
          ].map((item, i, arr) => (
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
          <DropdownMenuItem
            onClick={() => setBlockOpen(true)}
            className="justify-center cursor-pointer py-3 rounded-none border-t border-[#00000014] text-red-500 focus:text-red-500 focus:bg-red-50"
          >
            حظر المستخدم
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CustomerDetailsModal
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        customerName={customerName}
      />

      <BlockUserModal
        open={blockOpen}
        onOpenChange={setBlockOpen}
        userName={customerName}
        onConfirm={() => {
          // call API هنا
          setBlockOpen(false);
        }}
      />
    </>
  );
}
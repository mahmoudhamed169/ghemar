"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import OrderDetailsSheet from "./order-details-sheet";
import AssignDriverDialog from "./assign-driver-dialog";

interface OrderActionsProps {
  orderId: number;
}

export default function OrderActions({ orderId }: OrderActionsProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);

  return (
    <>
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full w-8 h-8"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 p-1">
          <DropdownMenuItem
            className="cursor-pointer rounded-lg py-2.5 px-3 text-sm font-medium text-[#0C6175] focus:text-[#0C6175] focus:bg-teal-50"
            onSelect={() => setDetailsOpen(true)}
          >
            عرض التفاصيل
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer rounded-lg py-2.5 px-3 text-sm font-medium text-gray-700 focus:bg-gray-50"
            onSelect={() => setAssignOpen(true)}
          >
            تعيين سائق
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <OrderDetailsSheet
        orderId={orderId}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />

      <AssignDriverDialog
        orderId={orderId}
        open={assignOpen}
        onOpenChange={setAssignOpen}
      />
    </>
  );
}

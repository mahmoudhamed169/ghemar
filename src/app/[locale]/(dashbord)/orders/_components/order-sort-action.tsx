"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import OrderSortDialog from "./order-sort-dialog";


interface OrderSortActionProps {
  orderId: number;
}

export default function OrderSortAction({ orderId }: OrderSortActionProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        size="sm"
        className="text-xs border-[#0C6175] text-[#0C6175] hover:bg-gray-50 hover:text-gray-900 p-4 min-w-[101px] rounded-lg bg-[#0069800D]"
      >
        بدأ الفرز
      </Button>

      <OrderSortDialog orderId={orderId} open={open} onOpenChange={setOpen} />
    </>
  );
}

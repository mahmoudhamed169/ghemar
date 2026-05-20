"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import OrderSortDialog from "./order-sort-dialog";

interface OrderSortActionProps {
  orderId: string;
  isSorted: boolean;
  status: string;
}

export default function OrderSortAction({
  orderId,
  isSorted,
  status,
}: OrderSortActionProps) {
  const t = useTranslations("orders.sort");
  const [open, setOpen] = useState(false);

  const canSort =
    !isSorted && status === "delivered_to_laundry";

  return (
    <>
      <Button
        onClick={() => canSort && setOpen(true)}
        disabled={!canSort}
        variant="outline"
        size="sm"
        className="text-xs border-[#0C6175] text-[#0C6175] hover:bg-gray-50 hover:text-gray-900 p-4 min-w-[101px] rounded-lg bg-[#0069800D] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSorted ? t("done") : t("start")}
      </Button>

      <OrderSortDialog
        orderId={orderId}
        isSorted={isSorted}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Pencil } from "lucide-react";
import { SortedItem } from "@/shared/lib/types/orders/order";
import OrderSortDialog from "./order-sort-dialog";

// past these the backend refuses an edit
const LOCKED_STATUSES = ["delivered_to_customer", "completed", "cancelled"];

interface OrderSortEditProps {
  orderId: string;
  orderNumber: string;
  status: string;
  sortedItems: SortedItem[];
  onSaved: (sortedItems: SortedItem[]) => void;
}

/** "Edit sorting" — fixes the pieces after they were sent to the client. */
export default function OrderSortEdit({
  orderId,
  orderNumber,
  status,
  sortedItems,
  onSaved,
}: OrderSortEditProps) {
  const t = useTranslations("orders.sort");
  const [open, setOpen] = useState(false);
  // a fresh key per opening refills the form from the current pieces
  const [openCount, setOpenCount] = useState(0);

  if (sortedItems.length === 0 || LOCKED_STATUSES.includes(status)) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpenCount((n) => n + 1);
          setOpen(true);
        }}
        className="inline-flex items-center gap-1 text-xs font-medium text-[#0C6175] hover:underline whitespace-nowrap"
      >
        <Pencil className="w-3.5 h-3.5" />
        {t("edit")}
      </button>
      <OrderSortDialog
        key={openCount}
        orderId={orderId}
        orderNumber={orderNumber}
        isSorted
        open={open}
        onOpenChange={setOpen}
        initialItems={sortedItems}
        onSaved={onSaved}
      />
    </>
  );
}

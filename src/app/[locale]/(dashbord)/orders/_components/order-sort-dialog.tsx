"use client";

import { useState, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  PIECE_TYPE_KEYS,
  PieceTypeKey,
} from "@/shared/lib/constants/piece-types";
import PieceTypeRow from "./piece-type-row";
import { useSortOrder } from "@/shared/lib/hooks/orders/use-sort-order";

export interface PieceEntry {
  type: PieceTypeKey;
  quantity: number;
}

interface OrderSortDialogProps {
  orderId: string;
  isSorted: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function OrderSortDialog({
  orderId,
  isSorted,
  open,
  onOpenChange,
}: OrderSortDialogProps) {
  const t = useTranslations("piece_types");
  const tSort = useTranslations("orders.sort");
  const [selected, setSelected] = useState<PieceEntry[]>([]);
  const { mutate: sort, isPending: isLoading } = useSortOrder();

  // O(1) lookups — recomputed only when selected array changes
  const totalPieces = useMemo(
    () => selected.reduce((sum, p) => sum + p.quantity, 0),
    [selected],
  );

  const checkedSet = useMemo(
    () => new Set(selected.map((p) => p.type)),
    [selected],
  );

  const quantityMap = useMemo(
    () => new Map(selected.map((p) => [p.type, p.quantity])),
    [selected],
  );

  // Stable refs — PieceTypeRow memo can skip re-renders for unchanged rows
  const toggleType = useCallback((key: PieceTypeKey) => {
    setSelected((prev) =>
      prev.some((p) => p.type === key)
        ? prev.filter((p) => p.type !== key)
        : [...prev, { type: key, quantity: 1 }],
    );
  }, []);

  const updateQuantity = useCallback((key: PieceTypeKey, quantity: number) => {
    setSelected((prev) =>
      prev.map((p) => (p.type === key ? { ...p, quantity } : p)),
    );
  }, []);

  const handleConfirm = () => {
    const items = selected.map((p) => ({
      itemType: p.type,
      count: p.quantity,
    }));
    sort(
      { orderId, items },
      {
        onSuccess: (result) => {
          if (result.success) {
            setSelected([]);
            onOpenChange(false);
          }
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm p-0 gap-0 overflow-hidden" dir="rtl">
        <DialogHeader className="px-5 pt-5 pb-4 border-b">
          <h2 className="text-base font-bold text-[#000709] mt-5">
            {tSort("dialog_title")} {orderId}
          </h2>
        </DialogHeader>

        <div className="px-5 py-4 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              {tSort("piece_count")}
            </span>
            <span
              className={`text-lg font-bold ${totalPieces > 0 ? "text-[#0C6175]" : "text-gray-300"}`}
            >
              {totalPieces}
            </span>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-3 text-left">
              {tSort("select_types")}
            </p>
            <div className="space-y-3 max-h-72 overflow-y-auto">
              {PIECE_TYPE_KEYS.map((key) => (
                <PieceTypeRow
                  key={key}
                  typeKey={key}
                  type={t(key)}
                  checked={checkedSet.has(key)}
                  quantity={quantityMap.get(key) ?? 1}
                  onToggle={toggleType}
                  onQuantityChange={updateQuantity}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 pb-5">
          <Button
            onClick={handleConfirm}
            disabled={selected.length === 0 || isLoading || isSorted}
            className="w-full bg-[#0C6175] hover:bg-[#0a5363] text-white rounded-xl h-11 disabled:opacity-50"
          >
            {isSorted
              ? tSort("already_sorted")
              : isLoading
                ? tSort("saving")
                : tSort("confirm")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

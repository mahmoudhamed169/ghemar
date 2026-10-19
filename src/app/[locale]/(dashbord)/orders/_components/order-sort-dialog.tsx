"use client";

import { useState, useMemo, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { PIECE_TYPE_KEYS } from "@/shared/lib/constants/piece-types";
import PieceTypeRow from "./piece-type-row";
import { useSortOrder } from "@/shared/lib/hooks/orders/use-sort-order";
import { usePieceTypeLabel } from "@/shared/lib/hooks/orders/use-piece-type-label";
import { SortItem } from "@/shared/lib/actions/orders/sort-order";
import { SortedItem } from "@/shared/lib/types/orders/order";

export interface PieceEntry {
  type: string;
  quantity: number;
}

interface OrderSortDialogProps {
  orderId: string;
  isSorted: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** shown in the title instead of the id when given */
  orderNumber?: string;
  /**
   * Edit mode: the order's current pieces. The form starts filled with them
   * and saving replaces the whole list (PUT). The dialog reads them once on
   * mount, so the caller remounts it (key) each time it opens.
   */
  initialItems?: SortItem[];
  onSaved?: (sortedItems: SortedItem[]) => void;
}

export default function OrderSortDialog({
  orderId,
  isSorted,
  open,
  onOpenChange,
  orderNumber,
  initialItems,
  onSaved,
}: OrderSortDialogProps) {
  const pieceTypeLabel = usePieceTypeLabel();
  const tSort = useTranslations("orders.sort");
  const locale = useLocale();
  const isEdit = !!initialItems;
  const [selected, setSelected] = useState<PieceEntry[]>(() =>
    (initialItems ?? []).map((item) => ({
      type: item.itemType,
      quantity: item.count,
    })),
  );
  const { mutate: sort, isPending: isLoading } = useSortOrder();

  // an order sorted before the piece-type list changed may hold keys that are
  // no longer on it — keep them as rows so the edit doesn't drop them silently
  const typeKeys = useMemo(() => {
    const known = new Set<string>(PIECE_TYPE_KEYS);
    const legacy = (initialItems ?? [])
      .map((item) => item.itemType)
      .filter((type) => !known.has(type));
    return [...PIECE_TYPE_KEYS, ...legacy];
  }, [initialItems]);

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
  const toggleType = useCallback((key: string) => {
    setSelected((prev) =>
      prev.some((p) => p.type === key)
        ? prev.filter((p) => p.type !== key)
        : [...prev, { type: key, quantity: 1 }],
    );
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
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
      { orderId, items, edit: isEdit },
      {
        onSuccess: (result) => {
          if (result.success) {
            if (result.sortedItems) onSaved?.(result.sortedItems);
            if (!isEdit) setSelected([]);
            onOpenChange(false);
          }
        },
      },
    );
  };

  const blocked = isSorted && !isEdit;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-2xl p-0 gap-0 overflow-hidden"
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <DialogHeader className="px-5 pt-5 pb-4 border-b">
          <h2 className="text-base font-bold text-[#000709] mt-5">
            {tSort(isEdit ? "edit_dialog_title" : "dialog_title")}{" "}
            {orderNumber ?? orderId}
          </h2>
          {isEdit && (
            <p className="text-xs text-gray-400">{tSort("edit_hint")}</p>
          )}
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
            <p className="text-xs text-gray-400 mb-3">
              {tSort("select_types")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[55vh] overflow-y-auto pe-1">
              {typeKeys.map((key) => (
                <PieceTypeRow
                  key={key}
                  typeKey={key}
                  type={pieceTypeLabel(key)}
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
            disabled={selected.length === 0 || isLoading || blocked}
            className="w-full bg-[#0C6175] hover:bg-[#0a5363] text-white rounded-xl h-11 disabled:opacity-50"
          >
            {blocked
              ? tSort("already_sorted")
              : isLoading
                ? tSort("saving")
                : tSort(isEdit ? "save_edit" : "confirm")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

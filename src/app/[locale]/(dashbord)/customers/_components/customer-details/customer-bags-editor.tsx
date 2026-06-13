"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Pencil, Check, X, Loader2, ShoppingBag, Barcode } from "lucide-react";
import { Customer } from "@/shared/lib/types/customers";
import { updateCustomerAction } from "@/shared/lib/actions/customers/update-customer";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface Props {
  customer: Customer;
}

interface FieldState {
  value: number;
  editing: boolean;
}

export default function CustomerBagsEditor({ customer }: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [barcodes, setBarcodes] = useState<FieldState>({
    value: customer.purchasedBarcodesCount ?? 0,
    editing: false,
  });
  const [bags, setBags] = useState<FieldState>({
    value: customer.receivedBagsCount ?? 0,
    editing: false,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (input: { purchasedBarcodesCount?: number; receivedBagsCount?: number }) =>
      updateCustomerAction(customer._id, input),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("تم تحديث البيانات");
        startTransition(() => router.refresh());
      } else {
        toast.error(result.message ?? "فشل التحديث");
      }
    },
    onError: () => toast.error("حدث خطأ غير متوقع"),
  });

  const saveField = (field: "barcodes" | "bags") => {
    if (field === "barcodes") {
      mutate({ purchasedBarcodesCount: barcodes.value });
      setBarcodes((s) => ({ ...s, editing: false }));
    } else {
      mutate({ receivedBagsCount: bags.value });
      setBags((s) => ({ ...s, editing: false }));
    }
  };

  const cancelField = (field: "barcodes" | "bags") => {
    if (field === "barcodes") {
      setBarcodes({ value: customer.purchasedBarcodesCount ?? 0, editing: false });
    } else {
      setBags({ value: customer.receivedBagsCount ?? 0, editing: false });
    }
  };

  const fields = [
    {
      key: "barcodes" as const,
      label: "الباركودات المشتراة",
      icon: Barcode,
      state: barcodes,
      setState: setBarcodes,
    },
    {
      key: "bags" as const,
      label: "الأكياس المستلمة",
      icon: ShoppingBag,
      state: bags,
      setState: setBags,
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-500 border-t border-gray-100 pt-3">
        بيانات الأكياس
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {fields.map(({ key, label, icon: Icon, state, setState }) => (
          <div
            key={key}
            className="flex flex-col gap-2.5 bg-[#0069800D] border border-[#0C6175] rounded-lg py-4 px-3 min-h-[76px]"
          >
            <div className="flex items-center justify-between">
              <span className="text-[#6A7282] text-sm flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5" />
                {label}
              </span>
              {!state.editing && (
                <button
                  onClick={() => setState((s) => ({ ...s, editing: true }))}
                  className="text-[#0C6175] hover:text-[#0a5464] transition"
                  disabled={isPending}
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {state.editing ? (
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min={0}
                  value={state.value}
                  onChange={(e) =>
                    setState((s) => ({ ...s, value: Number(e.target.value) }))
                  }
                  dir="ltr"
                  className="w-full bg-white border border-[#0C6175] rounded-lg px-2 py-1 text-sm font-bold text-[#000709] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  autoFocus
                />
                <button
                  onClick={() => saveField(key)}
                  disabled={isPending}
                  className="text-emerald-600 hover:text-emerald-700 transition shrink-0"
                >
                  {isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => cancelField(key)}
                  disabled={isPending}
                  className="text-red-400 hover:text-red-500 transition shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <span className="font-bold text-[#000709]">{state.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

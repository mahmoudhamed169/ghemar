"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Loader2, Settings2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomersFilter } from "@/shared/lib/types/customers/labels";
import {
  LabelError,
  useCustomerLabelMembers,
  useCustomerLabels,
} from "@/shared/lib/hooks/customers/use-customer-labels";
import LabelsManagerModal from "./labels-manager-modal";

// Which customers of the current page are ticked. The table is rendered on the
// server, so the checkboxes and the bulk bar share their state through here.

interface Selection {
  ids: string[];
  selected: Set<string>;
  toggle: (id: string) => void;
  toggleAll: () => void;
  clear: () => void;
}

const SelectionContext = createContext<Selection | null>(null);

function useSelection() {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error("useSelection must be used inside CustomersSelectionProvider");
  return ctx;
}

interface ProviderProps {
  /** ids of the customers on the current page */
  ids: string[];
  children: React.ReactNode;
}

export function CustomersSelectionProvider({ ids, children }: ProviderProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  const toggleAll = () =>
    setSelected((prev) => (prev.size === ids.length ? new Set() : new Set(ids)));

  const clear = () => setSelected(new Set());

  return (
    <SelectionContext.Provider value={{ ids, selected, toggle, toggleAll, clear }}>
      {children}
    </SelectionContext.Provider>
  );
}

export function SelectAllCheckbox({ label }: { label: string }) {
  const { ids, selected, toggleAll } = useSelection();
  return (
    <Checkbox
      aria-label={label}
      disabled={ids.length === 0}
      checked={ids.length > 0 && selected.size === ids.length}
      onCheckedChange={toggleAll}
    />
  );
}

export function SelectRowCheckbox({ id, label }: { id: string; label: string }) {
  const { selected, toggle } = useSelection();
  return (
    <Checkbox aria-label={label} checked={selected.has(id)} onCheckedChange={() => toggle(id)} />
  );
}

interface BulkBarProps {
  /** customers matching the current filters, across all pages */
  total: number;
  /** the active list filters — sent as-is when applying to all results */
  filter: CustomersFilter;
}

export function LabelsBulkBar({ total, filter }: BulkBarProps) {
  const t = useTranslations("customers.labels");
  const router = useRouter();
  const { selected, clear } = useSelection();
  const [labelId, setLabelId] = useState("");
  const [allResults, setAllResults] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);

  const { data: labels = [] } = useCustomerLabels();
  const { mutate, isPending, variables } = useCustomerLabelMembers();

  // a label that expired or was deleted drops out of the list
  const activeLabelId = labels.some((l) => l._id === labelId) ? labelId : "";
  const count = allResults ? total : selected.size;
  const disabled = !activeLabelId || count === 0 || isPending;

  const apply = (mode: "add" | "remove") => {
    if (disabled) return;
    if (
      allResults &&
      !window.confirm(t(mode === "add" ? "confirmAddAll" : "confirmRemoveAll", { count: total }))
    )
      return;

    mutate(
      {
        id: activeLabelId,
        mode,
        body: allResults ? { filter } : { userIds: [...selected] },
      },
      {
        onSuccess: (data) => {
          toast.success(t(mode === "add" ? "added" : "removed", { count: data?.affected ?? 0 }));
          clear();
          setAllResults(false);
          router.refresh();
        },
        onError: (error) =>
          toast.error(
            error instanceof LabelError && error.status === 404
              ? t("expired")
              : error.message || t("error"),
          ),
      },
    );
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3">
        <Tag className="w-4 h-4 text-[#0C6175] shrink-0" />

        <Select value={activeLabelId} onValueChange={setLabelId}>
          <SelectTrigger className="w-[200px] !h-10 bg-white border border-gray-200 rounded-lg px-3">
            <SelectValue placeholder={labels.length ? t("choose") : t("empty")} />
          </SelectTrigger>
          <SelectContent>
            {labels.map((label) => (
              <SelectItem key={label._id} value={label._id}>
                {label.name} ({label.membersCount})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <label className="flex items-center gap-2 text-sm text-[#000709] cursor-pointer">
          <Checkbox
            checked={allResults}
            disabled={total === 0}
            onCheckedChange={(v) => setAllResults(v === true)}
          />
          {t("allResults", { count: total })}
        </label>

        {!allResults && (
          <span className="text-sm text-gray-500">{t("selected", { count: selected.size })}</span>
        )}

        <div className="flex items-center gap-2 ms-auto">
          <Button
            onClick={() => apply("add")}
            disabled={disabled}
            className="h-10 bg-[#0C6175] hover:bg-[#097188] text-white rounded-lg"
          >
            {isPending && variables?.mode === "add" && <Loader2 className="w-4 h-4 animate-spin" />}
            {t("add")}
          </Button>
          <Button
            variant="outline"
            onClick={() => apply("remove")}
            disabled={disabled}
            className="h-10 rounded-lg"
          >
            {isPending && variables?.mode === "remove" && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
            {t("remove")}
          </Button>
          <Button
            variant="ghost"
            onClick={() => setManageOpen(true)}
            className="h-10 rounded-lg text-[#0C6175]"
          >
            <Settings2 className="w-4 h-4" />
            {t("manage")}
          </Button>
        </div>
      </div>

      <LabelsManagerModal open={manageOpen} onOpenChange={setManageOpen} />
    </>
  );
}

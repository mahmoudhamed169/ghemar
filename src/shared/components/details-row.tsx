"use client";

import { createContext, useContext, useState } from "react";
import { TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

// A table row that opens its details when clicked anywhere, instead of going
// through the actions menu. The row owns the "details open" state; the actions
// cell reads it with useRowDetails() and renders the details panel.

interface RowDetails {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const RowDetailsContext = createContext<RowDetails | null>(null);

/** the row's details state, or null when the component is not inside a DetailsRow */
export function useRowDetails() {
  return useContext(RowDetailsContext);
}

// controls inside the row keep their own behaviour
const INTERACTIVE =
  'button, a, input, select, textarea, label, [role="switch"], [role="menuitem"], [role="combobox"], [role="option"]';

function isRowClick(event: { target: EventTarget; currentTarget: HTMLElement }) {
  const target = event.target as HTMLElement;
  // events from dialogs/menus opened by this row bubble here through React
  // even though they are rendered outside the row
  if (!event.currentTarget.contains(target)) return false;
  return !target.closest(INTERACTIVE);
}

export default function DetailsRow({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TableRow>) {
  const [open, setOpen] = useState(false);

  return (
    <RowDetailsContext.Provider value={{ open, setOpen }}>
      <TableRow
        {...props}
        tabIndex={0}
        onClick={(event) => {
          // selecting text in a cell is not a click on the row
          if (isRowClick(event) && !window.getSelection()?.toString()) setOpen(true);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && event.target === event.currentTarget) setOpen(true);
        }}
        className={cn(
          "cursor-pointer outline-none focus-visible:bg-gray-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0C6175]/30",
          className,
        )}
      >
        {children}
      </TableRow>
    </RowDetailsContext.Provider>
  );
}

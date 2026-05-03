"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      dir="ltr"
      className={cn(
        "group/switch inline-flex shrink-0 items-center rounded-full border border-transparent shadow-sm transition-all outline-none",
        "focus-visible:ring-2 focus-visible:ring-[#101828]/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=unchecked]:bg-[#D1D5DC]",
        "data-[state=checked]:bg-[#00A63E]",
        "data-[size=default]:h-[1.4rem] data-[size=default]:w-9",
        "data-[size=sm]:h-3.5 data-[size=sm]:w-6",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-white shadow-md ring-0 transition-transform",
          "group-data-[size=default]/switch:size-[0.85rem]",
          "group-data-[size=sm]/switch:size-2.5",
          "data-[state=unchecked]:translate-x-[2px]",
          "data-[state=checked]:translate-x-[1.1rem]",
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
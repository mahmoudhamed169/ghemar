"use client";

import { Switch } from "@/components/ui/switch";
import { useTogglePromoCode } from "@/shared/lib/hooks/promocode/use-toggle-promo-code";

interface ActiveToggleProps {
  id: string;
  isActive: boolean;
}

export default function ActiveToggle({ id, isActive }: ActiveToggleProps) {
  const { mutate: toggle, isPending } = useTogglePromoCode();

  return (
    <Switch
      defaultChecked={isActive}
      disabled={isPending}
      onCheckedChange={() => toggle(id)}
      aria-label={`تبديل حالة الكود ${id}`}
      className={
        isActive
          ? "data-[state=checked]:bg-green-500"
          : "data-[state=unchecked]:bg-gray-300"
      }
    />
  );
}

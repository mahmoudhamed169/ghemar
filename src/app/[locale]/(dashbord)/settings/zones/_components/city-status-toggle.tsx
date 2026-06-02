"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useToggleCityStatus } from "@/shared/lib/hooks/zones/use-city-mutations";

export default function CityStatusToggle({
  cityId,
  initialActive,
}: {
  cityId: string;
  initialActive: boolean;
}) {
  const [active, setActive] = useState(initialActive);
  const { mutate: toggle } = useToggleCityStatus();

  const handleToggle = () => {
    setActive((prev) => !prev);
    toggle(cityId, {
      onError: () => setActive((prev) => !prev),
    });
  };

  return <Switch checked={active} onCheckedChange={handleToggle} />;
}

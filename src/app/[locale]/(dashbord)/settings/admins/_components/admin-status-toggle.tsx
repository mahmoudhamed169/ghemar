"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useToggleAdminStatus } from "@/shared/lib/hooks/admins/use-admin-mutations";

export default function AdminStatusToggle({
  adminId,
  initialActive,
}: {
  adminId: string;
  initialActive: boolean;
}) {
  const [active, setActive] = useState(initialActive);
  const { mutate: toggle } = useToggleAdminStatus();

  const handleToggle = () => {
    setActive((prev) => !prev);
    toggle(adminId, {
      onError: () => setActive((prev) => !prev),
    });
  };

  return <Switch checked={active} onCheckedChange={handleToggle} />;
}

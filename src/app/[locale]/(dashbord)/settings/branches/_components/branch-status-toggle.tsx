"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useToggleBranchStatus } from "@/shared/lib/hooks/branches/use-branch-mutations";

export default function BranchStatusToggle({
  branchId,
  initialActive,
}: {
  branchId: string;
  initialActive: boolean;
}) {
  const [active, setActive] = useState(initialActive);
  const { mutate: toggle } = useToggleBranchStatus();

  const handleToggle = () => {
    setActive((prev) => !prev);
    toggle(branchId, {
      onError: () => setActive((prev) => !prev),
    });
  };

  return <Switch checked={active} onCheckedChange={handleToggle} />;
}

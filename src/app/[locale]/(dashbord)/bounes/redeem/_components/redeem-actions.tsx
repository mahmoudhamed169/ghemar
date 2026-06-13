"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import CancelRedeemModal from "./cancel-redeem-modal";

interface RedeemActionsProps {
  redeemId: string;
  userName: string;
}

export default function RedeemActions({
  redeemId,
  userName,
}: RedeemActionsProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="text-[#E7000B] hover:text-[#E7000B] hover:bg-red-50 rounded-xl h-11 px-8 gap-1.5"
        style={{ border: "1px solid #E7000B", minWidth: 93 }}
      >
        <X size={15} />
        إلغاء
      </Button>

      <CancelRedeemModal
        open={open}
        onClose={() => setOpen(false)}
        redeemId={redeemId}
        userName={userName}
      />
    </>
  );
}

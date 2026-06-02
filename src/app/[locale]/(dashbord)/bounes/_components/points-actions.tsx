"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Plus, Minus } from "lucide-react";
import { useState } from "react";
import AddPointsModal from "./add-points-modal";
import DeductPointsModal from "./deduct-points-modal";

interface PointsActionsProps {
  userId: string;
  userName: string;
}

export default function PointsActions({
  userId,
  userName,
}: PointsActionsProps) {
  const [addOpen, setAddOpen] = useState(false);
  const [deductOpen, setDeductOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="center"
          className="w-[200px] rounded-xl p-2"
        >
          <DropdownMenuItem
            className="justify-center text-[#000709] font-medium text-base gap-2 rounded-lg py-3 hover:bg-gray-50"
            onClick={() => setAddOpen(true)}
          >
            <Plus size={17} />
            إضافة نقاط
          </DropdownMenuItem>
          <DropdownMenuItem
            className="justify-center text-red-500 font-medium text-base gap-2 rounded-lg py-3 focus:text-red-500 hover:bg-red-50"
            onClick={() => setDeductOpen(true)}
          >
            <Minus size={17} />
            خصم نقاط
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddPointsModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        userId={userId}
        userName={userName}
      />
      <DeductPointsModal
        open={deductOpen}
        onClose={() => setDeductOpen(false)}
        userId={userId}
        userName={userName}
      />
    </>
  );
}

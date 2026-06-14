"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { City } from "@/shared/lib/types/zones/city";
import BranchModal from "./branch-modal";

interface BranchesHeaderPageProps {
  cities: City[];
}

export default function BranchesHeaderPage({ cities }: BranchesHeaderPageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-1">
        <h1 className="text-2xl lg:text-3xl font-bold">الفروع</h1>
        <Button
          onClick={() => setOpen(true)}
          className="bg-[#0C6175] text-white w-full sm:w-[288px] h-12 sm:h-[55px] rounded-lg text-base sm:text-lg hover:bg-[#097188]"
        >
          إضافة فرع جديد
        </Button>
      </div>

      <BranchModal open={open} onOpenChange={setOpen} cities={cities} />
    </>
  );
}

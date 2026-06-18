"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Branch } from "@/shared/lib/types/branches/branch";
import AdminModal from "./admin-modal";

interface AdminsHeaderPageProps {
  branches: Branch[];
}

export default function AdminsHeaderPage({ branches }: AdminsHeaderPageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-1">
        <h1 className="text-2xl lg:text-3xl font-bold">إدارة الأدمنز</h1>
        <Button
          onClick={() => setOpen(true)}
          className="bg-[#0C6175] text-white w-full sm:w-[288px] h-12 sm:h-[55px] rounded-lg text-base sm:text-lg hover:bg-[#097188]"
        >
          إضافة أدمن جديد
        </Button>
      </div>

      <AdminModal open={open} onOpenChange={setOpen} branches={branches} />
    </>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddCodeModal from "./add-discount-code/add-code-modal";


export default function PromoCodeBtn() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-[#0C6175] text-white w-[288px] h-[55px] rounded-lg text-lg hover:bg-[#097188] hover:text-white cursor-pointer"
      >
        اضافة كود خصم
      </Button>

      <AddCodeModal open={open} onOpenChange={setOpen} />
    </>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddDriverModal from "./add-driver-modal";
import AddDriverSuccessModal from "./add-driver-success-modal";

export default function AddDriverButton() {
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    setSuccessOpen(true);
    setTimeout(() => setSuccessOpen(false), 2500);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="mt-4 bg-[#0C6175] text-white w-[288px] h-[55px] rounded-lg text-lg flex items-center justify-center hover:bg-[#097188] hover:text-white hover:cursor-pointer"
      >
        اضافة سائق
      </Button>
      <AddDriverModal open={open} onClose={() => setOpen(false)} onSuccess={handleSuccess} />
      <AddDriverSuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
    </>
  );
}
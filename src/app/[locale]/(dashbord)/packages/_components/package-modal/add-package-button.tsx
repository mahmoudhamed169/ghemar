"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import PackageModal from "./package-modal";
import PackageSuccessModal from "./package-success-modal";

export default function AddPackageButton() {
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
        اضافة باقة
      </Button>
      <PackageModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={handleSuccess}
        mode="add"
      />
      <PackageSuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        mode="add"
      />
    </>
  );
}

// مثال في جدول الباقات
{
  /* <PackageModal
  open={editOpen}
  onClose={() => setEditOpen(false)}
  onSuccess={handleEditSuccess}
  mode="edit"
  initialData={{ name: "الباقة الذهبية", price: "100", bags: "3" }}
/> */
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import PackageModal from "./package-modal/package-modal";
import PackageSuccessModal from "./package-modal/package-success-modal";
import PackageDeleteModal from "./package-modal/package-delete-modal";

interface PackageCardActionsProps {
  name: string;
  price: string;
  bags: string;
}

export default function PackageCardActions({
  name,
  price,
  bags,
}: PackageCardActionsProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMode, setSuccessMode] = useState<"edit" | "delete">("edit");

  const handleEditSuccess = () => {
    setEditOpen(false);
    setSuccessMode("edit");
    setSuccessOpen(true);
    setTimeout(() => setSuccessOpen(false), 2500);
  };

  const handleDeleteConfirm = () => {
    setDeleteOpen(false);
    setSuccessMode("delete");
    setSuccessOpen(true);
    setTimeout(() => setSuccessOpen(false), 2500);
  };

  return (
    <>
      <div className="flex items-center gap-3 mt-1">
        <Button
          onClick={() => setEditOpen(true)}
          className="flex-1 h-11 rounded-xl bg-[#0C6175] hover:bg-[#097188] text-white"
        >
          تعديل
        </Button>
        <Button
          variant="outline"
          onClick={() => setDeleteOpen(true)}
          className="flex-1 h-11 rounded-xl border-red-400 text-red-500 hover:bg-red-50 hover:text-red-500"
        >
          حذف
        </Button>
      </div>

      <PackageModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSuccess={handleEditSuccess}
        mode="edit"
        initialData={{ name, price, bags }}
      />
      <PackageDeleteModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        packageName={name}
      />
      <PackageSuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        mode={successMode}
      />
    </>
  );
}

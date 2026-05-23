"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Package } from "@/shared/lib/types/packages/package";
import PackageModal from "./package-modal/package-modal";
import PackageDeleteModal from "./package-modal/package-delete-modal";
import PackageSuccessModal from "./package-modal/package-success-modal";

interface PackageCardActionsProps {
  pkg: Package;
}

export default function PackageCardActions({ pkg }: PackageCardActionsProps) {
  const t = useTranslations("Packages.card");

  const [editOpen,    setEditOpen]    = useState(false);
  const [deleteOpen,  setDeleteOpen]  = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMode, setSuccessMode] = useState<"add" | "edit" | "delete">("edit");

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
      <div className="flex items-center gap-3 mt-auto">
        <Button
          onClick={() => setEditOpen(true)}
          className="flex-1 h-9 sm:h-11 rounded-xl bg-[#0C6175] hover:bg-[#097188] text-white text-xs sm:text-sm"
        >
          {t("edit")}
        </Button>
        <Button
          variant="outline"
          onClick={() => setDeleteOpen(true)}
          className="flex-1 h-9 sm:h-11 rounded-xl border-red-300 text-red-500 hover:bg-red-50 hover:text-red-500 text-xs sm:text-sm"
        >
          {t("delete")}
        </Button>
      </div>

      <PackageModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSuccess={handleEditSuccess}
        mode="edit"
        pkg={pkg}
      />

      <PackageDeleteModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        pkg={pkg}
      />

      <PackageSuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        mode={successMode}
      />
    </>
  );
}
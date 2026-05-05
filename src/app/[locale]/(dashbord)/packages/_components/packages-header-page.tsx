// packages-header-page.tsx
"use client";

import { useState } from "react";
import AddPackageButton from "./package-modal/add-package-button";
import PackageModal from "./package-modal/package-modal";
import PackageSuccessModal from "./package-modal/package-success-modal";
import PackagesStats from "./packages-stats";

export default function PackagesHeaderPage() {
  const [editOpen, setEditOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleEditSuccess = () => {
    setEditOpen(false);
    setSuccessOpen(true);
    setTimeout(() => setSuccessOpen(false), 2500);
  };

  return (
    <div className="space-y-6 mt-1">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">ادارة الباقات</h1>
        <AddPackageButton />
      </div>

      <PackagesStats />

      <PackageModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSuccess={handleEditSuccess}
        mode="edit"
        initialData={{ name: "الباقة الذهبية", price: "100", bags: "3" }}
      />
      <PackageSuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        mode="edit"
      />
    </div>
  );
}

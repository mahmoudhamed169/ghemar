// ZonesHeaderPage.tsx
// Header page — wires the "اضافة منطقة" button to ZoneModal

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ZoneFormData, ZoneModal } from "./zone-modal";


export default function ZonesHeaderPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = (data: ZoneFormData) => {
    console.log("Zone saved:", data);
    // TODO: call your API here
  };

  return (
    <div className="space-y-6 mt-1">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">مناطق التوصيل</h1>
        <Button
          onClick={() => setModalOpen(true)}
          className="mt-4 bg-[#0C6175] text-white w-[288px] h-[55px] rounded-lg text-lg flex items-center justify-center hover:bg-[#097188] hover:text-white hover:cursor-pointer"
        >
          اضافة منطقة
        </Button>
      </div>

      <ZoneModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

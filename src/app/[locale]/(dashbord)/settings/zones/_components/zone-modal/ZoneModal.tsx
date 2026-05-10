// _components/ZoneModal/ZoneModal.tsx

"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ZoneNameField from "./ZoneNameField";
import ZoneLocationField from "./ZoneLocationField";
import ZoneRadiusField from "./ZoneRadiusField";
import ZoneMap from "./ZoneMap";
import ZoneDriversGrid from "./ZoneDriversGrid";
import ZoneModalActions from "./ZoneModalActions";
import { ZoneFormData, Driver } from "./types";

interface ZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<ZoneFormData>;
  onSubmit?: (data: ZoneFormData) => void;
}

const MOCK_DRIVERS: Driver[] = [
  { id: "1", name: "محمد أحمد" },
  { id: "2", name: "أحمد محمد" },
  { id: "3", name: "علي أحمد" },
  { id: "4", name: "أحمد عبدالله" },
  { id: "5", name: "أحمد عبدالله" },
  { id: "6", name: "أحمد عبدالله" },
  { id: "7", name: "أحمد عبدالله" },
  { id: "8", name: "أحمد عبدالله" },
  { id: "9", name: "أحمد عبدالله" },
];

export default function ZoneModal({
  isOpen,
  onClose,
  initialData,
  onSubmit,
}: ZoneModalProps) {
  const isEditMode = Boolean(initialData);

  const [form, setForm] = useState<ZoneFormData>({
    name: initialData?.name ?? "",
    location: initialData?.location ?? "",
    radius: initialData?.radius ?? 500,
    lat: initialData?.lat ?? 21.4858,
    lng: initialData?.lng ?? 39.1925,
    selectedDriverIds: initialData?.selectedDriverIds ?? [],
  });

  const handleChange = (field: keyof ZoneFormData, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSubmit?.(form);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        dir="rtl"
        className="min-w-xl w-full rounded-2xl p-0 overflow-hidden gap-0"
      >
        {/* Header */}
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mt-5">
            {isEditMode ? "تعديل منطقة" : "اضافة منطقة"}
          </h2>
        </DialogHeader>

        {/* Body */}
        <div className="overflow-y-auto max-h-[70vh] px-6 py-5 space-y-5">
          <ZoneNameField
            value={form.name}
            onChange={(v) => handleChange("name", v)}
          />

          <ZoneLocationField
            value={form.location}
            onChange={(v) => handleChange("location", v)}
          />

          <ZoneRadiusField
            value={form.radius}
            onChange={(v) => handleChange("radius", v)}
          />

          <ZoneMap
            lat={form.lat}
            lng={form.lng}
            radius={form.radius}
            onPositionChange={(lat, lng) => {
              handleChange("lat", lat);
              handleChange("lng", lng);
            }}
          />

          <ZoneDriversGrid
            drivers={MOCK_DRIVERS}
            selectedIds={form.selectedDriverIds}
            onChange={(ids) => handleChange("selectedDriverIds", ids)}
          />
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100">
          <ZoneModalActions onCancel={onClose} onSave={handleSave} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

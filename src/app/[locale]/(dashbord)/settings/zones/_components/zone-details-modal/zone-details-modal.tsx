// zone-details-modal.tsx
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ZoneDetails } from "./zone-details-modal.types";
import { ZoneModal } from "../zone-modal";


const ZoneMap = dynamic(() => import("./zone-map"), { ssr: false });

const DUMMY_ZONE: ZoneDetails = {
  id: 88200,
  name: "منطقة حي الزهور",
  location: "السعودية جدة حي الزهور",
  drivers: [
    { name: "محمد أحمد", phone: "+962512345678" },
    { name: "محمد أحمد", phone: "+962512345678" },
  ],
  coordinates: { lat: 21.4858, lng: 39.1925 },
};

function ReadonlyField({
  label,
  value,
  dir,
}: {
  label: string;
  value: string;
  dir?: "rtl" | "ltr";
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-sm font-medium text-gray-700 text-right">
        {label}
      </Label>
      <Input
        readOnly
        value={value}
        dir={dir}
        className="bg-gray-50 border-gray-200 text-gray-600 text-right cursor-default focus-visible:ring-0"
      />
    </div>
  );
}

interface ZoneDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  zoneId?: number;
}

export default function ZoneDetailsModal({
  open,
  onOpenChange,
  zoneId,
}: ZoneDetailsModalProps) {
  const [editOpen, setEditOpen] = useState(false);

  const zone = DUMMY_ZONE;

  const handleEditClick = () => {
    onOpenChange(false); // أقفل التفاصيل
    setEditOpen(true);   // افتح التعديل
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="min-w-md w-full rounded-2xl p-0 overflow-hidden gap-0">
          <DialogHeader className="px-6 pt-5 pb-4 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mt-5">
              تفاصيل منطقة {zone.name.replace("منطقة ", "")}
            </h2>
          </DialogHeader>

          <div className="overflow-y-auto max-h-[70vh] px-6 py-5 flex flex-col gap-5">
            <ReadonlyField
              label="عدد السائقين"
              value={String(zone.drivers.length)}
            />

            {zone.drivers.map((driver, i) => (
              <div key={i} className="grid grid-cols-2 gap-3">
                <ReadonlyField
                  label={`اسم السائق ${i === 0 ? "الأول" : "الثاني"}`}
                  value={driver.name}
                />
                <ReadonlyField
                  label={`رقم هاتف السائق ${i === 0 ? "الأول" : "الثاني"}`}
                  value={driver.phone}
                />
              </div>
            ))}

            <ReadonlyField label="الموقع" value={zone.location} />

            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-gray-700 text-right">
                موقع النقطة على الخريطة
              </Label>
              <div className="h-44 w-full rounded-xl overflow-hidden border border-gray-200">
                <ZoneMap
                  lat={zone.coordinates.lat}
                  lng={zone.coordinates.lng}
                  zoneName={zone.name}
                />
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-100">
            <Button
              onClick={handleEditClick}
              className="w-full h-11 rounded-xl bg-[#1a1a2e] hover:bg-[#16213e] text-white font-semibold"
            >
              تعديل
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit modal — opens after details closes */}
      <ZoneModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        initialData={{
          name: zone.name,
          location: zone.location,
          lat: zone.coordinates.lat,
          lng: zone.coordinates.lng,
        }}
        onSubmit={(data) => {
          console.log("Updated zone:", data);
          // TODO: call your API here with zone.id
          setEditOpen(false);
        }}
      />
    </>
  );
}
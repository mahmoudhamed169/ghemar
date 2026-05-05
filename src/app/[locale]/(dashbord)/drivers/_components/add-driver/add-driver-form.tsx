"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AreasCheckboxGroup from "./areas-checkbox-group";

export default function AddDriverForm({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const handleSubmit = () => {
    onSuccess();
  };

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label className="text-sm font-medium text-right block">اسم السائق</Label>
        <Input
          placeholder="مُحَمد أحمد"
          className="bg-gray-100 border-none text-right placeholder:text-gray-400 h-12"
          dir="rtl"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium text-right block">رقم الهاتف</Label>
        <Input
          placeholder="+96251234567"
          className="bg-gray-100 border-none text-left placeholder:text-gray-400 h-12"
          dir="ltr"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium text-right block">الموقع</Label>
        <Input
          placeholder="جدة حي الزهور"
          className="bg-gray-100 border-none text-right placeholder:text-gray-400 h-12"
          dir="rtl"
        />
      </div>
      <div className="space-y-3">
        <Label className="text-sm font-medium text-right block">المناطق المتاح بها</Label>
        <AreasCheckboxGroup selected={selectedAreas} onChange={setSelectedAreas} />
      </div>
      <Button
        onClick={handleSubmit}
        className="w-full h-12 bg-[#0C6175] hover:bg-[#097188] text-white text-lg rounded-xl mt-2"
      >
        تأكيد
      </Button>
    </div>
  );
}
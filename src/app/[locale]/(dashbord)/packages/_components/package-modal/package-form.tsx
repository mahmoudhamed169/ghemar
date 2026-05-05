"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export interface PackageFormData {
  name: string;
  price: string;
  bags: string;
}

interface PackageFormProps {
  initialData?: PackageFormData;
  onSubmit: (data: PackageFormData) => void;
}

export default function PackageForm({ initialData, onSubmit }: PackageFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    onSubmit({
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      price: (form.elements.namedItem("price") as HTMLInputElement).value,
      bags: (form.elements.namedItem("bags") as HTMLInputElement).value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium block text-right">سعر الباقة / شهر</Label>
          <Input
            name="price"
            placeholder="100 ريال"
            defaultValue={initialData?.price}
            className="bg-gray-100 border-none text-right placeholder:text-gray-400 h-12"
            dir="rtl"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium block text-right">أسم الباقة</Label>
          <Input
            name="name"
            placeholder="الباقة الذهبية"
            defaultValue={initialData?.name}
            className="bg-gray-100 border-none text-right placeholder:text-gray-400 h-12"
            dir="rtl"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium block text-right">عدد الأكياس</Label>
        <Input
          name="bags"
          placeholder="3"
          defaultValue={initialData?.bags}
          className="bg-gray-100 border-none text-right placeholder:text-gray-400 h-12"
          dir="rtl"
          type="number"
        />
      </div>

      <Button
        type="submit"
        className="w-full h-12 bg-[#0C6175] hover:bg-[#097188] text-white text-lg rounded-xl"
      >
        حفظ الباقة
      </Button>
    </form>
  );
}
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddCodeFieldsProps {
  code: string;
  value: string;
  maxUsage: string;
  expiryDate: string;
  onChange: (field: string, val: string) => void;
}

export default function AddCodeFields({
  code,
  value,
  maxUsage,
  expiryDate,
  onChange,
}: AddCodeFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="code" className="text-right text-sm font-medium text-[#000709]">
          كود الخصم
        </Label>
        <Input
          id="code"
          placeholder="AaB32"
          value={code}
          onChange={(e) => onChange("code", e.target.value)}
          className="text-right h-11 bg-[#F5F5F5] border-none placeholder:text-gray-400"
          dir="rtl"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="value" className="text-right text-sm font-medium text-[#000709]">
          القيمة
        </Label>
        <Input
          id="value"
          placeholder="%20"
          value={value}
          onChange={(e) => onChange("value", e.target.value)}
          className="text-right h-11 bg-[#F5F5F5] border-none placeholder:text-gray-400"
          dir="rtl"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="maxUsage" className="text-right text-sm font-medium text-[#000709]">
          الحد الأقصي
        </Label>
        <Input
          id="maxUsage"
          placeholder="100 استخدام"
          value={maxUsage}
          onChange={(e) => onChange("maxUsage", e.target.value)}
          className="text-right h-11 bg-[#F5F5F5] border-none placeholder:text-gray-400"
          dir="rtl"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="expiryDate" className="text-right text-sm font-medium text-[#000709]">
          تاريخ الانتهاء
        </Label>
        <Input
          id="expiryDate"
          placeholder="DD/MM/YYYY"
          type="date"
          value={expiryDate}
          onChange={(e) => onChange("expiryDate", e.target.value)}
          className="text-right h-11 bg-[#F5F5F5] border-none text-gray-400"
          dir="rtl"
        />
      </div>
    </div>
  );
}
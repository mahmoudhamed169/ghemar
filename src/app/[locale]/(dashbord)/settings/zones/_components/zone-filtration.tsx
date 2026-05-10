import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ZonesFilters() {
  return (
    <div className="flex flex-row items-center gap-4 w-full">
      {/* Search Input - يأخد الباقي */}
      <div className="relative flex-1">
        <Search
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          size={18}
        />
        <Input
          placeholder="ابحث عن منطقة"
          className="w-full bg-white h-[55px] rounded-lg pr-10 text-right border border-gray-200 shadow-sm"
        />
      </div>

      {/* Filter Section - ثابت 340px */}
      <div className="flex flex-row items-center gap-3 w-[300px] shrink-0">
        <p className="text-[#000709] font-medium text-[18px] whitespace-nowrap">
          فلتر حسب حالة المنطقة{" "}
        </p>

        <Select defaultValue="">
          <SelectTrigger className="flex-1 !h-[55px] bg-white border border-gray-200 rounded-lg shadow-sm text-right px-3">
            <SelectValue placeholder="اختر حالة المنطقة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="basic">نشطة</SelectItem>
            <SelectItem value="apple">موقوفة</SelectItem>
        
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

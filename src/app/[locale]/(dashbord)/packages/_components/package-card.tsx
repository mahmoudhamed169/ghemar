import { SaudiRiyalIcon, ShoppingBag } from "lucide-react";
import PackageCardActions from "./package-card-actions";

interface PackageCardProps {
  id: number;
  name: string;
  price: number;
  bags: number;
  description: string;
}

export default function PackageCard({
  name,
  price,
  bags,
  description,
}: PackageCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4 min-h-[191px]">
      <div className="flex items-center justify-between pb-3 border-b border-[#00000014]">
        <h3 className="text-lg font-bold text-[#000709]">{name}</h3>
        <div className="flex items-center"> 
          <span className="text-2xl font-bold text-[#000709] me-1">{price}</span>
          <SaudiRiyalIcon size={18} className="inline-block mb-1" />
          <span className="text-sm text-gray-400">/شهر</span>
        </div>
      </div>

      <div className="flex items-center  gap-2 text-sm text-[#000709] py-4 mb-2">
        <ShoppingBag className="w-4 h-4 text-[#0C6175]" />
        <span>
          {bags} أكياس / شهر "{description}"
        </span>
      </div>

      <PackageCardActions
        name={name}
        price={String(price)}
        bags={String(bags)}
      />
    </div>
  );
}

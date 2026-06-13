"use client";

import Image from "next/image";
import { Trash2, Pencil } from "lucide-react";
import { Banner } from "@/shared/lib/types/settings/banner";

interface BannerItemProps {
  banner: Banner;
  editMode: boolean;
  onEdit: (banner: Banner) => void;
  onDelete: (id: string) => void;
}

export default function BannerItem({
  banner,
  editMode,
  onEdit,
  onDelete,
}: BannerItemProps) {
  return (
    <div
      className="relative group border border-gray-100 overflow-hidden"
      style={{ width: "343px", height: "217px", borderRadius: "16px" }}
    >
      <Image
        src={banner.imageUrl}
        alt={banner.title}
        fill
        className="object-cover"
        sizes="343px"
      />

      {!banner.isActive && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <span className="text-white text-xs font-medium bg-black/60 px-3 py-1 rounded-full">
            غير نشط
          </span>
        </div>
      )}

      {editMode && (
        <div className="absolute top-3 left-3 flex gap-2">
          <button
            onClick={() => onEdit(banner)}
            className="w-7 h-7 rounded-full bg-[#0C6175] hover:bg-[#097188] transition text-white flex items-center justify-center shadow-md"
          >
            <Pencil size={12} />
          </button>
          <button
            onClick={() => onDelete(banner._id)}
            className="w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 transition text-white flex items-center justify-center shadow-md"
          >
            <Trash2 size={12} />
          </button>
        </div>
      )}
    </div>
  );
}

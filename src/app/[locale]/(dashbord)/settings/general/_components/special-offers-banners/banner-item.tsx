"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import type { Banner } from "./types";

interface BannerItemProps {
  banner: Banner;
  editMode: boolean;
  onDelete: (id: string) => void;
}

export default function BannerItem({ banner, editMode, onDelete }: BannerItemProps) {
  return (
    <div
      className="relative group border border-gray-100 overflow-hidden"
      style={{
        width: "343px",
        height: "217px",
        borderRadius: "16px",
        borderWidth: "1px",
      }}
    >
      <Image
        src={banner.imageUrl}
        alt={banner.alt ?? "بنر"}
        fill
        className="object-cover"
      />

      {editMode && (
        <button
          onClick={() => onDelete(banner.id)}
          className="absolute top-3 left-3 w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 transition text-white flex items-center justify-center shadow-md"
        >
          <Trash2 size={13} />
        </button>
      )}
    </div>
  );
}
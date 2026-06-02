"use client";

import BannerItem from "./banner-item";
import { Banner } from "@/shared/lib/types/settings/banner";

interface BannersGridProps {
  banners: Banner[];
  editMode: boolean;
  onEdit: (banner: Banner) => void;
  onDelete: (id: string) => void;
}

export default function BannersGrid({
  banners,
  editMode,
  onEdit,
  onDelete,
}: BannersGridProps) {
  if (!banners.length) {
    return (
      <div className="flex items-center justify-center h-32 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 text-sm">
        لا توجد بنرات بعد
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {banners.map((banner) => (
        <BannerItem
          key={banner._id}
          banner={banner}
          editMode={editMode}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

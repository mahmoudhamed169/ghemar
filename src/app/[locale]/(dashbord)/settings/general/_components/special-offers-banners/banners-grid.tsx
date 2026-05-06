"use client";

import BannerItem from "./banner-item";
import type { Banner } from "./types";

interface BannersGridProps {
  banners: Banner[];
  editMode: boolean;
  onDelete: (id: string) => void;
}

export default function BannersGrid({
  banners,
  editMode,
  onDelete,
}: BannersGridProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {banners.map((banner) => (
        <BannerItem
          key={banner.id}
          banner={banner}
          editMode={editMode}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

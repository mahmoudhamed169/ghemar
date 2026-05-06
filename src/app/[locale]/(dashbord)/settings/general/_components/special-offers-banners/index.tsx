"use client";

import { useState } from "react";
import { mockBanners } from "./mock";
import type { Banner } from "./types";
import BannersGrid from "./banners-grid";
import BannersActions from "./banners-actions";

export default function SpecialOffersBanners() {
  const [banners, setBanners] = useState<Banner[]>(mockBanners);
  const [editMode, setEditMode] = useState(false);

  const handleAdd = (file: File) => {
    const url = URL.createObjectURL(file);
    const newBanner: Banner = {
      id: Date.now().toString(),
      imageUrl: url,
      alt: `بنر ${banners.length + 1}`,
    };
    setBanners((prev) => [...prev, newBanner]);
  };

  const handleDelete = (id: string) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        بنرات العروض الخاصة
      </h2>

      <BannersGrid
        banners={banners}
        editMode={editMode}
        onDelete={handleDelete}
      />

      <BannersActions
        editMode={editMode}
        onToggleEdit={() => setEditMode((prev) => !prev)}
        onAdd={handleAdd}
      />
    </section>
  );
}
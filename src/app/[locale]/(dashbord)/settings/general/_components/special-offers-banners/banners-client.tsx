"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Banner } from "@/shared/lib/types/settings/banner";
import BannersGrid from "./banners-grid";
import BannersActions from "./banners-actions";
import AddBannerModal from "./add-banner-modal";
import EditBannerModal from "./edit-banner-modal";
import DeleteBannerDialog from "./delete-banner-dialog";

interface BannersClientProps {
  initialBanners: Banner[];
}

export default function BannersClient({ initialBanners }: BannersClientProps) {
  const t = useTranslations("Settings.general.banners");
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [editMode, setEditMode] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editBanner, setEditBanner] = useState<Banner | null>(null);
  const [deleteBannerId, setDeleteBannerId] = useState<string | null>(null);

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t("title")}</h2>

      <BannersGrid
        banners={banners}
        editMode={editMode}
        onEdit={setEditBanner}
        onDelete={setDeleteBannerId}
      />

      <BannersActions
        editMode={editMode}
        onToggleEdit={() => setEditMode((prev) => !prev)}
        onAdd={() => setAddOpen(true)}
      />

      <AddBannerModal
        open={addOpen}
        onOpenChange={setAddOpen}
        onCreated={(banner) => setBanners((prev) => [...prev, banner])}
      />

      <EditBannerModal
        banner={editBanner}
        onOpenChange={(open) => { if (!open) setEditBanner(null); }}
        onUpdated={(updated) =>
          setBanners((prev) =>
            prev.map((b) => (b._id === updated._id ? updated : b)),
          )
        }
      />

      <DeleteBannerDialog
        bannerId={deleteBannerId}
        onOpenChange={(open) => { if (!open) setDeleteBannerId(null); }}
        onDeleted={(id) =>
          setBanners((prev) => prev.filter((b) => b._id !== id))
        }
      />
    </section>
  );
}

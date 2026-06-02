"use client";

import { useTranslations } from "next-intl";
import { Pencil, Check, Plus } from "lucide-react";

interface BannersActionsProps {
  editMode: boolean;
  onToggleEdit: () => void;
  onAdd: () => void;
}

export default function BannersActions({
  editMode,
  onToggleEdit,
  onAdd,
}: BannersActionsProps) {
  const t = useTranslations("Settings.general.banners");

  return (
    <div className="flex items-center gap-3 mt-4">
      <button
        onClick={onAdd}
        style={{ color: "#0C6175", borderColor: "#0C6175" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0069800D";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "white";
        }}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white transition cursor-pointer border"
      >
        <Plus size={20} className="bg-[#0069800D] rounded-full p-0.5" />
        {t("add")}
      </button>

      <button
        onClick={onToggleEdit}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#0C6175";
          (e.currentTarget as HTMLButtonElement).style.color = "#0C6175";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = editMode ? "#0C6175" : "#E5E7EB";
          (e.currentTarget as HTMLButtonElement).style.color = editMode ? "#0C6175" : "#4B5563";
        }}
        style={{
          borderColor: editMode ? "#0C6175" : "#E5E7EB",
          color: editMode ? "#0C6175" : "#4B5563",
        }}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition border bg-white"
      >
        {editMode ? <Check size={15} /> : <Pencil size={15} />}
        {editMode ? t("done") : t("edit")}
      </button>
    </div>
  );
}

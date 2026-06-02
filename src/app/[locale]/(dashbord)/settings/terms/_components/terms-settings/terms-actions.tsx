"use client";

import { useTranslations } from "next-intl";

interface TermsActionsProps {
  onSave: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function TermsActions({ onSave, onCancel, loading }: TermsActionsProps) {
  const t = useTranslations("Settings.terms");

  return (
    <div
      className="flex items-center gap-4 pt-6"
      style={{ borderTop: "1px solid #F3F4F6", marginTop: "32px" }}
    >
      <button
        onClick={onSave}
        disabled={loading}
        style={{ backgroundColor: "#0F766E" }}
        className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium transition disabled:opacity-60"
      >
        {loading ? t("saving") : t("save")}
      </button>
      <button
        onClick={onCancel}
        className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition"
      >
        {t("cancel")}
      </button>
    </div>
  );
}

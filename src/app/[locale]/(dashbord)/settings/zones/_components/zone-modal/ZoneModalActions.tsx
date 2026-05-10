// _components/AddZoneModal/ZoneModalActions.tsx
// Footer action bar — Cancel + Save buttons

import React from "react";

interface Props {
  onCancel: () => void;
  onSave: () => void;
  saveLabel?: string;
  cancelLabel?: string;
  saving?: boolean;
}

export default function ZoneModalActions({
  onCancel,
  onSave,
  saveLabel = "حفظ",
  cancelLabel = "إلغاء",
  saving = false,
}: Props) {
  return (
    <div
      className="flex items-center gap-3 px-5 py-4 border-t border-gray-100 sticky bottom-0 bg-white rounded-b-2xl"
      dir="rtl"
    >
      {/* Save */}
      <button
        onClick={onSave}
        disabled={saving}
        className="flex-1 bg-[#0C6175] text-white rounded-xl py-3 text-sm font-semibold
          hover:bg-[#0a5163] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {saving ? "جارٍ الحفظ…" : saveLabel}
      </button>

      {/* Cancel */}
      <button
        onClick={onCancel}
        className="flex-1 bg-gray-100 text-gray-600 rounded-xl py-3 text-sm font-semibold
          hover:bg-gray-200 active:scale-[0.98] transition-all"
      >
        {cancelLabel}
      </button>
    </div>
  );
}
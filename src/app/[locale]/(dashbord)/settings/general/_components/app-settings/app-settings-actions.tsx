"use client";

interface AppSettingsActionsProps {
  onSave: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function AppSettingsActions({ onSave, onCancel, loading }: AppSettingsActionsProps) {
  return (
    <div
      style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid #F3F4F6" }}
      className="flex items-center gap-4"
    >
      <button
        onClick={onSave}
        disabled={loading}
        style={{ backgroundColor: "#0F766E" }}
        className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium transition disabled:opacity-60"
      >
        {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
      </button>
      <button
        onClick={onCancel}
        className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition"
      >
        الغاء
      </button>
    </div>
  );
}
"use client";

import { X } from "lucide-react";

interface ConfirmLogoutModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmLogoutModal({ open, onConfirm, onCancel }: ConfirmLogoutModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl p-6 w-[320px] shadow-xl border border-dashed border-gray-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition">
            <X size={18} />
          </button>
        </div>

        <p className="text-gray-800 font-medium text-right text-base leading-relaxed mb-6">
          هل أنت متأكد أنك تريد تسجيل خروج جميع الجلسات؟
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium transition"
            style={{ backgroundColor: "#E53E3E" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#C53030")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#E53E3E")}
          >
            نعم
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-gray-600 text-sm font-medium border border-gray-200 transition hover:bg-gray-50"
          >
            لا
          </button>
        </div>
      </div>
    </div>
  );
}
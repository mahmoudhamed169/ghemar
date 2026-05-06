"use client";

import { useState } from "react";
import ConfirmLogoutModal from "./confirm-logout-modal";

export default function LogoutAllSessionsButton() {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    // TODO: استبدل بـ API call
    console.log("تسجيل خروج جميع الجلسات");
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-2.5 rounded-xl text-white text-sm font-medium transition"
        style={{ backgroundColor: "#E53E3E" }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
            "#C53030")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
            "#E53E3E")
        }
      >
        تسجيل خروج جميع الجلسات
      </button>

      <ConfirmLogoutModal
        open={open}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}

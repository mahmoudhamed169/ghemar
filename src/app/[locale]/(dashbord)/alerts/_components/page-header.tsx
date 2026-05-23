"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import SendNotificationModal from "./send-notification-modal";

export default function PageHeader() {
  const t = useTranslations("Notifications");
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#000709]">
          {t("header.title")}
        </h1>
        <Button
          onClick={() => setOpen(true)}
          className="w-full sm:w-[288px] h-[48px] sm:h-[55px] bg-[#0C6175] hover:bg-[#097188] text-white rounded-lg text-base sm:text-lg gap-2"
        >
          <Bell className="w-5 h-5" />
          {t("header.sendButton")}
        </Button>
      </div>

      <SendNotificationModal open={open} onOpenChange={setOpen} />
    </>
  );
}

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Bell, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRealtimeNotifications } from "@/shared/providers/components/realtime-notifications-provider";
import SendNotificationModal from "./send-notification-modal";

export default function PageHeader() {
  const t = useTranslations("Notifications");
  const { soundMuted, toggleSoundMuted } = useRealtimeNotifications();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#000709]">
            {t("header.title")}
          </h1>
          <button
            onClick={toggleSoundMuted}
            aria-pressed={soundMuted}
            aria-label={t(soundMuted ? "list.unmuteSound" : "list.muteSound")}
            title={t(soundMuted ? "list.unmuteSound" : "list.muteSound")}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-[#0C6175] hover:bg-gray-50 transition"
          >
            {soundMuted ? (
              <VolumeX className="w-5 h-5 text-gray-400" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
        </div>
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

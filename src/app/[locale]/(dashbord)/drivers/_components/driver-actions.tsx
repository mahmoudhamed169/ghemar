"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import BlockUserModal from "@/shared/components/block-user-modal";
import DriverDetailsModal from "./driver-details/driver-details-modal";
import SendNotificationModal from "@/app/[locale]/(dashbord)/alerts/_components/send-notification-modal";
import { Driver } from "@/shared/lib/types/drivers/driver";

export default function DriverActions({ driver }: { driver: Driver }) {
  const t = useTranslations("drivers.actions");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [blockOpen, setBlockOpen]     = useState(false);
  const [notifyOpen, setNotifyOpen]   = useState(false);

  const menuItems = [
    { label: t("send_notification"), onClick: () => setNotifyOpen(true) },
    { label: t("view_details"),      onClick: () => setDetailsOpen(true) },
    { label: t("order_history"),     onClick: () => {} },
  ];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full">
            <MoreVertical size={25} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-56 rounded-xl p-0 overflow-hidden">
          {menuItems.map((item, i, arr) => (
            <DropdownMenuItem
              key={item.label}
              onClick={item.onClick}
              className={`justify-center cursor-pointer py-3 rounded-none text-[#000709] ${
                i < arr.length - 1 ? "border-b border-[#00000014]" : ""
              }`}
            >
              {item.label}
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem
            onClick={() => setBlockOpen(true)}
            className="justify-center cursor-pointer py-3 rounded-none border-t border-[#00000014] text-red-500 focus:text-red-500 focus:bg-red-50"
          >
            {t("block_user")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DriverDetailsModal
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        driver={driver}
      />
      <BlockUserModal
        open={blockOpen}
        onOpenChange={setBlockOpen}
        userName={driver.name}
        onConfirm={() => setBlockOpen(false)}
      />
      <SendNotificationModal
        open={notifyOpen}
        onOpenChange={setNotifyOpen}
        recipientId={driver._id}
        recipientRole="driver"
      />
    </>
  );
}
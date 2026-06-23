"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { useTranslations } from "next-intl";
import CustomerDetailsModal from "./customer-details/customer-details-modal";
import BlockUserModal from "@/shared/components/block-user-modal";
import SendNotificationModal from "@/app/[locale]/(dashbord)/alerts/_components/send-notification-modal";
import { Customer } from "@/shared/lib/types/customers";

interface CustomerActionsProps {
  customer: Customer;
}

export default function CustomerActions({ customer }: CustomerActionsProps) {
  const t = useTranslations("customers.actions");
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);

  const handleOrderHistory = () => {
    const name = encodeURIComponent(customer.name ?? customer.phone);
    router.push(`/${locale}/customers/${customer._id}/orders?name=${name}`);
  };

  const menuItems = [
    { label: t("sendNotification"), onClick: () => setNotifyOpen(true) },
    { label: t("viewDetails"), onClick: () => setDetailsOpen(true) },
    { label: t("orderHistory"), onClick: handleOrderHistory },
  ];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 rounded-full"
          >
            <MoreVertical size={25} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="center"
          className="w-48 rounded-xl p-0 overflow-hidden"
        >
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
            {t("blockUser")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CustomerDetailsModal
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        customerId={customer._id}
      />
      <BlockUserModal
        open={blockOpen}
        onOpenChange={setBlockOpen}
        userName={customer.name ?? customer.phone}
        onConfirm={() => setBlockOpen(false)}
      />
      <SendNotificationModal
        open={notifyOpen}
        onOpenChange={setNotifyOpen}
        recipientId={customer._id}
        recipientRole="client"
      />
    </>
  );
}

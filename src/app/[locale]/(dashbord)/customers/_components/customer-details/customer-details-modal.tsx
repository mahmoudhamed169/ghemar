"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { Loader2, AlertCircle } from "lucide-react";
import { useCustomer } from "@/shared/lib/hooks/customers/use-customer";
import CustomerDetailsInfo from "./customer-details-info";
import CustomerDetailsLocation from "./customer-details-location";
import CustomerBagsEditor from "./customer-bags-editor";
import CustomerEditForm from "./customer-edit-form";
import CustomerRecentOrders from "./customer-recent-orders";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerId: string;
}

export default function CustomerDetailsModal({ open, onOpenChange, customerId }: Props) {
  const t = useTranslations("customers");
  const { data, isLoading, isError } = useCustomer(open ? customerId : null);

  const customer = data?.data?.user;
  const recentOrders = data?.data?.recentOrders ?? [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-2xl rounded-2xl px-4 sm:px-6 py-8 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-[#0C6175]" />
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-red-500">
            <AlertCircle className="w-8 h-8" />
            <p className="text-sm">{t("details.loadError")}</p>
          </div>
        )}

        {customer && (
          <>
            <h1 className="text-xl sm:text-2xl font-bold text-[#000709] my-2" dir="rtl">
              {t("actions.detailsTitle")} {customer.name ?? customer.phone}
            </h1>

            <CustomerDetailsInfo customer={customer} />
            <CustomerEditForm customer={customer} customerId={customerId} />
            <CustomerBagsEditor customer={customer} customerId={customerId} />
            <CustomerRecentOrders orders={recentOrders} />
            <CustomerDetailsLocation customer={customer} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

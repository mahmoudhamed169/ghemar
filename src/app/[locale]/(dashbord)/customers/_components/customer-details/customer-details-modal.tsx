"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { Loader2, AlertCircle } from "lucide-react";
import { useCustomer } from "@/shared/lib/hooks/customers/use-customer";
import CustomerDetailsInfo from "./customer-details-info";
import CustomerDetailsLocation from "./customer-details-location";
import CustomerBagsEditor from "./customer-bags-editor";
import CustomerBagsHistory from "./customer-bags-history";
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
      {/* sm:max-w-* is needed: the base dialog caps the width at sm:max-w-sm */}
      <DialogContent className="w-[95vw] max-w-3xl sm:max-w-3xl rounded-2xl p-0 flex flex-col gap-0 max-h-[90vh] overflow-hidden">
        {/* the title stays in place while the content scrolls */}
        <div className="shrink-0 border-b border-gray-100 px-5 sm:px-7 py-4 pr-12 sm:pr-14" dir="rtl">
          <DialogTitle className="text-lg sm:text-xl font-bold text-[#000709]">
            {t("actions.detailsTitle")} {customer ? (customer.name ?? customer.phone) : ""}
          </DialogTitle>
          {customer?.name && (
            <p className="text-sm text-gray-500 mt-0.5" dir="ltr" style={{ textAlign: "right" }}>
              {customer.phone}
            </p>
          )}
        </div>

        {/* shrink-0 on the sections: in a height-limited column, the ones with
            overflow-hidden (the edit box) would otherwise be squashed flat */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-5 flex flex-col gap-5 [&>*]:shrink-0">
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
            <CustomerDetailsInfo customer={customer} />
            <CustomerEditForm customer={customer} customerId={customerId} />
            {/* keyed so the editor picks up counts changed by "add bags" */}
            <CustomerBagsEditor
              key={`${customer.purchasedBarcodesCount}-${customer.receivedBagsCount}`}
              customer={customer}
              customerId={customerId}
            />
            <CustomerBagsHistory customer={customer} customerId={customerId} />
            <CustomerRecentOrders orders={recentOrders} />
            <CustomerDetailsLocation customer={customer} />
          </>
        )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

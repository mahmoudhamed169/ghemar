"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import CustomerDetailsInfo from "./customer-details-info";
import CustomerDetailsLocation from "./customer-details-location";
import CustomerBagsEditor from "./customer-bags-editor";
import { Customer } from "@/shared/lib/types/customers";

interface CustomerDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer;
}

export default function CustomerDetailsModal({
  open,
  onOpenChange,
  customer,
}: CustomerDetailsModalProps) {
  const t = useTranslations("customers.actions");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-2xl rounded-2xl px-4 sm:px-6 py-8 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        <h1 className="text-xl sm:text-2xl font-bold text-[#000709] my-2">
          {t("detailsTitle")} {customer.name ?? customer.phone}
        </h1>
        <CustomerDetailsInfo customer={customer} />
        <CustomerBagsEditor customer={customer} />
        <CustomerDetailsLocation customer={customer} />
      </DialogContent>
    </Dialog>
  );
}

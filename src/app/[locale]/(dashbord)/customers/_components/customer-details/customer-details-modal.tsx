import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomerDetailsInfo from "./customer-details-info";
import CustomerDetailsLocation from "./customer-details-location";

interface CustomerDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerName?: string;
}

export default function CustomerDetailsModal({
  open,
  onOpenChange,
  customerName,
}: CustomerDetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-126.5 rounded-2xl px-6  py-10 flex flex-col gap-4">
      
      <h1 className="text-2xl font-bold text-[#000709] my-5 "> تفاصيل العميل {customerName}</h1>

        <CustomerDetailsInfo />
        <CustomerDetailsLocation />
      </DialogContent>
    </Dialog>
  );
}

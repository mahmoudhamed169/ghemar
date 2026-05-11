import { X } from "lucide-react";
import { DialogClose, DialogTitle } from "@/components/ui/dialog";

interface InvoiceHeaderProps {
  invoiceId: string;
}

export default function InvoiceHeader({ invoiceId }: InvoiceHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-900 mt-5">
        فاتورة #{invoiceId}
      </h2>
    </div>
  );
}

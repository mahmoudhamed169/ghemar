import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import DriverDetailsLocation from "./driver-details-location";
import DriverDetailsInfo from "./driver-details-info";

interface DriverDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  driverName?: string;
}

export default function DriverDetailsModal({
  open,
  onOpenChange,
  driverName,
}: DriverDetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-126.5 rounded-2xl px-6  py-10 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-[#000709] my-5 ">
          {" "}
          تفاصيل السائق {driverName}
        </h1>

        <DriverDetailsInfo />
        <DriverDetailsLocation />
      </DialogContent>
    </Dialog>
  );
}

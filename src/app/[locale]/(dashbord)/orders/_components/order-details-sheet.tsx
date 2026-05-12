"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface OrderDetailsSheetProps {
  orderId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Placeholder order data — replace with real API call
const mockOrder = {
  clientName: "ماريهان رضوان",
  clientPhone: "+966512345678",
  driverName: "ماريهان رضوان",
  driverPhone: "+966512345678",
  receiveDate: "12 يناير 2026",
  receiveTime: "الساعة 9 صباحاً",
  totalAmount: "100 ريال سعودي",
  totalPieces: 5,
  sortingStatus: "3 سراويل",
  notes: "",
};

function DetailCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 flex flex-col gap-1">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="text-sm font-medium text-[#000709]">{value || "—"}</span>
    </div>
  );
}

export default function OrderDetailsSheet({
  orderId,
  open,
  onOpenChange,
}: OrderDetailsSheetProps) {
  const order = mockOrder; // TODO: fetch by orderId

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full max-w-md p-0" >
        <SheetHeader className="flex  items-center justify-between px-5 pt-5 pb-3 border-b mt-4">
          <h2 className="text-base font-bold text-[#000709] text-start">
            #ord-{orderId}
          </h2>
        </SheetHeader>

        <div className="overflow-y-auto h-full pb-10 px-5 pt-4 space-y-4">
          {/* Map placeholder */}
          <div className="w-full h-40 rounded-xl bg-gray-100 overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://maps.google.com/maps?q=Positano,Italy&z=13&output=embed"
              loading="lazy"
            />
          </div>

          {/* Details grid */}
          <p className="text-sm font-semibold text-[#000709]">
            تتبع موقع السائق {order.driverName}
          </p>

          <div className="grid grid-cols-2 gap-3">
            <DetailCard label="اسم العميل" value={order.clientName} />
            <DetailCard label="رقم العميل" value={order.clientPhone} />
            <DetailCard label="اسم السائق" value={order.driverName} />
            <DetailCard label="رقم السائق" value={order.driverPhone} />
            <DetailCard label="تاريخ الاستلام" value={order.receiveDate} />
            <DetailCard label="وقت الاستلام" value={order.receiveTime} />
            <DetailCard label="المبلغ الإجمالي" value={order.totalAmount} />
            <DetailCard label="إجمالي الأكياس" value={order.totalPieces} />
            <DetailCard label="حالة الفرز" value={order.sortingStatus} />
          </div>

          {/* Notes */}
          <div className="bg-gray-50 rounded-xl p-3 space-y-1">
            <span className="text-xs text-gray-400">ملاحظات</span>
            <p className="text-sm text-gray-400 italic">
              {order.notes || "اكتب شيئاً هنا للسجل..."}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

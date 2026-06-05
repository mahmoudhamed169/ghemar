"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Order } from "@/shared/lib/types/orders/order";
import {
  MapPin,
  Phone,
  User,
  Truck,
  Calendar,
  Clock,
  Package,
  Shirt,
  Printer,
} from "lucide-react";
import { useTranslations } from "next-intl";

interface OrderDetailsSheetProps {
  order: Order;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/* ─── helpers ─── */

function buildAddress(address?: Order["pickup"]["address"]) {
  if (!address) return null;
  const parts = [
    address.street,
    address.building && `مبنى ${address.building}`,
    address.floor && `دور ${address.floor}`,
    address.apartment && `شقة ${address.apartment}`,
    address.area,
    address.city,
  ];
  return parts.filter(Boolean).join("، ") || null;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ─── print ─── */

function buildReceiptHTML(
  order: Order,
  r: ReturnType<typeof useTranslations<"orders.receipt">>,
  statusLabel: string,
): string {
  const pickupAddress = buildAddress(order.pickup.address);
  const createdDate = new Date(order.createdAt).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const createdTime = new Date(order.createdAt).toLocaleTimeString("ar-SA", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const hr = `<hr/>`;

  function row(label: string, value?: string | number | null, ltr = false) {
    if (!value && value !== 0) return "";
    return `<div class="row"><span class="lbl">${label}</span><span class="val"${ltr ? ' dir="ltr"' : ""}>${value}</span></div>`;
  }

  const bagsSection =
    order.bags.length > 0
      ? `${hr}<div class="center bold" style="font-size:10px">${r("bag_barcodes")}</div>
       ${order.bags.map((b) => `<div class="center" style="font-family:monospace;font-size:10px;letter-spacing:1px;margin:3px 0">${b.barcode}</div>`).join("")}`
      : "";

  return `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
<meta charset="UTF-8"/>
<title>فاتورة — ${order.orderNumber}</title>
<style>
  @page { size: 72mm auto; margin: 4mm 3mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Courier New', Courier, monospace; font-size: 11px; line-height: 1.75; color: #000; background: #fff; width: 66mm; }
  .center { text-align: center; }
  .bold   { font-weight: 700; }
  .lg     { font-size: 14px; letter-spacing: 1px; }
  .sm     { font-size: 10px; color: #555; }
  .row    { display: flex; justify-content: space-between; gap: 6px; }
  .lbl    { color: #555; flex-shrink: 0; }
  .val    { text-align: left; }
  hr      { border: none; border-top: 1px dashed #999; margin: 5px 0; }
  .urgent { border: 2px solid #000; text-align: center; font-weight: 700; font-size: 12px; padding: 2px 0; margin: 5px 0; letter-spacing: 2px; }
</style>
</head>
<body>
  <div class="center bold lg">${r("company_name")}</div>
  <div class="center sm">${r("company_subtitle")}</div>
  ${hr}
  <div class="center sm">${r("order_number_label")}</div>
  <div class="center bold" style="font-size:12px">${order.orderNumber}</div>
  <div class="center sm">${createdDate} — ${createdTime}</div>
  ${order.isExpressWash ? `<div class="urgent">${r("urgent")}</div>` : ""}
  ${hr}
  ${row(r("client"), order.client.name)}
  ${row(r("phone"), order.client.phone, true)}
  ${row(r("district"), order.pickup.address?.area)}
  ${row(r("city"), order.pickup.address?.city)}
  ${row(r("address"), pickupAddress ?? undefined)}
  ${row(r("notes"), order.pickup.address?.notes)}
  ${hr}
  ${row(r("pickup"), `${formatDate(order.pickup.scheduledDate)} — ${order.pickup.scheduledTime}`)}
  ${row(r("delivery_label"), `${formatDate(order.delivery.scheduledDate)} — ${order.delivery.scheduledTime}`)}
  ${hr}
  ${row(r("order_type"), order.orderType === "laundry_pickup" ? r("order_type_laundry") : r("order_type_delivery"))}
  ${row(r("bag_count"), order.bagCount)}
  ${row(r("priority"), order.isExpressWash ? r("priority_express") : r("priority_normal"))}
  ${row(r("order_status"), statusLabel)}
  ${order.packageId ? row(r("package"), order.packageId.nameAr) : ""}
  ${order.driver ? `${hr}${row(r("driver"), order.driver.name)}${row(r("driver_phone"), order.driver.phone, true)}` : ""}
  ${order.specialInstructions ? `${hr}${row(r("instructions"), order.specialInstructions)}` : ""}
  ${bagsSection}
  ${hr}
  <div class="center sm">${r("thank_you")}</div>
  <div class="center sm">${r("footer")}</div>
  <script>
    window.onload = function () { window.print(); window.onafterprint = function () { window.close() } }
  <\/script>
</body>
</html>`;
}

/* ─── sub-components ─── */

function DetailCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value?: string | number | null;
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 flex items-start gap-2.5">
      <div className="mt-0.5 text-[#0C6175]">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-xs text-gray-400">{label}</span>
        <span className="text-sm font-medium text-[#000709] break-words">
          {value ?? "—"}
        </span>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-bold text-[#000709] pt-2">{children}</p>;
}

function MapEmbed({ lat, lng }: { lat: number; lng: number }) {
  return (
    <div className="w-full h-44 rounded-xl overflow-hidden border border-gray-100">
      <iframe
        className="w-full h-full"
        src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
        loading="lazy"
        title="موقع الطلب"
      />
    </div>
  );
}

/* ─── main ─── */

export default function OrderDetailsSheet({
  order,
  open,
  onOpenChange,
}: OrderDetailsSheetProps) {
  const t = useTranslations("orders.details");
  const r = useTranslations("orders.receipt");
  const ts = useTranslations("orders.status");
  const pt = useTranslations("piece_types");

  const statusLabel = ts(order.status as Parameters<typeof ts>[0]);
  const pickupCoords = order.pickup.address?.coordinates;
  const pickupAddress = buildAddress(order.pickup.address);
  const deliveryAddress = buildAddress(order.delivery.address);
  const hasBags = order.bags.length > 0;

  const handlePrint = () => {
    const win = window.open(
      "",
      "_blank",
      "width=420,height=700,toolbar=0,scrollbars=1",
    );
    if (!win) return;
    win.document.write(buildReceiptHTML(order, r, statusLabel));
    win.document.close();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-full max-w-md p-0 flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-6 pb-4 border-b shrink-0">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400">
              {t("order_number_label")}
            </span>
            <span className="text-base font-bold text-[#000709]">
              {order.orderNumber}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="text-xs rounded-full px-3 py-1 border-[#0C6175] text-[#0C6175] bg-teal-50"
            >
              {statusLabel}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="h-8 w-8 p-0 border-gray-200 hover:bg-gray-50"
              title={t("print_tooltip")}
            >
              <Printer className="w-4 h-4 text-gray-500" />
            </Button>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-5 py-4 space-y-4">
          {pickupCoords && (
            <>
              <SectionTitle>{t("pickup_location")}</SectionTitle>
              <MapEmbed lat={pickupCoords.lat} lng={pickupCoords.lng} />
            </>
          )}

          <SectionTitle>{t("client_info")}</SectionTitle>
          <div className="grid grid-cols-2 gap-3">
            <DetailCard
              icon={User}
              label={t("name")}
              value={order.client.name}
            />
            <DetailCard
              icon={Phone}
              label={t("phone")}
              value={order.client.phone}
            />
          </div>

          <SectionTitle>{t("driver_info")}</SectionTitle>
          <div className="grid grid-cols-2 gap-3">
            <DetailCard
              icon={Truck}
              label={t("name")}
              value={order.driver?.name}
            />
            <DetailCard
              icon={Phone}
              label={t("phone")}
              value={order.driver?.phone}
            />
          </div>

          <SectionTitle>{t("pickup")}</SectionTitle>
          <div className="grid grid-cols-2 gap-3">
            <DetailCard
              icon={Calendar}
              label={t("date")}
              value={formatDate(order.pickup.scheduledDate)}
            />
            <DetailCard
              icon={Clock}
              label={t("time")}
              value={order.pickup.scheduledTime}
            />
            {order.pickup.address?.area && (
              <DetailCard
                icon={MapPin}
                label={t("district")}
                value={order.pickup.address.area}
              />
            )}
            <div className={order.pickup.address?.area ? "" : "col-span-2"}>
              <DetailCard
                icon={MapPin}
                label={t("address")}
                value={pickupAddress}
              />
            </div>
            {order.pickup.address?.notes && (
              <div className="col-span-2">
                <DetailCard
                  icon={MapPin}
                  label={t("notes")}
                  value={order.pickup.address.notes}
                />
              </div>
            )}
          </div>

          <SectionTitle>{t("delivery")}</SectionTitle>
          <div className="grid grid-cols-2 gap-3">
            <DetailCard
              icon={Calendar}
              label={t("date")}
              value={formatDate(order.delivery.scheduledDate)}
            />
            <DetailCard
              icon={Clock}
              label={t("time")}
              value={order.delivery.scheduledTime}
            />
            {order.delivery.address?.area && (
              <DetailCard
                icon={MapPin}
                label={t("district")}
                value={order.delivery.address.area}
              />
            )}
            <div className={order.delivery.address?.area ? "" : "col-span-2"}>
              <DetailCard
                icon={MapPin}
                label={t("address")}
                value={deliveryAddress}
              />
            </div>
          </div>

          <SectionTitle>{t("order_details")}</SectionTitle>
          <div className="grid grid-cols-2 gap-3">
            <DetailCard
              icon={Package}
              label={t("bag_count")}
              value={order.bagCount}
            />
            <DetailCard
              icon={Package}
              label={t("order_type")}
              value={
                order.orderType === "laundry_pickup"
                  ? t("order_type_laundry")
                  : t("order_type_delivery")
              }
            />
            {order.packageId && (
              <DetailCard
                icon={Package}
                label={t("package")}
                value={order.packageId.nameAr}
              />
            )}
          </div>

          <SectionTitle>{t("sorted_items")}</SectionTitle>
          {order.sortedItems.length === 0 ? (
            <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2.5">
              <Shirt className="w-4 h-4 text-gray-300 shrink-0" />
              <span className="text-sm text-gray-400">{t("sorting_not_started")}</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {order.sortedItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-50 rounded-xl p-3 flex items-center gap-2.5"
                >
                  <Shirt className="w-4 h-4 text-[#0C6175] shrink-0" />
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-xs text-gray-400 truncate">
                      {pt(item.itemType as Parameters<typeof pt>[0])}
                    </span>
                    <span className="text-sm font-bold text-[#0C6175]">
                      × {item.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {hasBags && (
            <>
              <SectionTitle>{t("bag_barcodes")}</SectionTitle>
              <div className="grid grid-cols-2 gap-3">
                {order.bags.map((bag) => (
                  <div
                    key={bag.bagId}
                    className="bg-gray-50 rounded-xl p-3 flex flex-col items-center gap-1"
                  >
                    <Package className="w-4 h-4 text-[#0C6175]" />
                    <span className="text-xs text-gray-400">{t("bag")}</span>
                    <span className="text-xs font-mono font-bold text-[#000709] break-all text-center">
                      {bag.barcode}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {order.specialInstructions && (
            <>
              <SectionTitle>{t("special_instructions")}</SectionTitle>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-sm text-gray-700">
                  {order.specialInstructions}
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

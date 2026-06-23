"use client";

import { useTranslations } from "next-intl";
import { CustomerDetail } from "@/shared/lib/types/customers";

interface Props {
  customer: CustomerDetail;
}

export default function CustomerDetailsLocation({ customer }: Props) {
  const t = useTranslations("customers.details");

  const address = customer.addresses?.[0];

  const locationText = [address?.area, address?.street, address?.building, address?.city]
    .filter(Boolean)
    .join("، ");

  const lat = address?.coordinates?.lat;
  const lng = address?.coordinates?.lng;

  return (
    <div className="border border-[#00000014] rounded-xl p-4 flex flex-col gap-3" dir="rtl">
      <h3 className="font-semibold text-[#000709]">{t("location")}</h3>
      <p className="text-sm text-gray-500">{locationText || "—"}</p>

      <div className="w-full h-40 rounded-xl overflow-hidden">
        {lat && lng ? (
          <iframe
            src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-gray-400 bg-gray-50 rounded-xl">
            {t("noLocation")}
          </div>
        )}
      </div>
    </div>
  );
}

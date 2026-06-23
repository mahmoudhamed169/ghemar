"use client";

import { useTranslations, useLocale } from "next-intl";
import { CustomerDetail } from "@/shared/lib/types/customers";
import { CheckCircle, XCircle } from "lucide-react";

interface Props {
  customer: CustomerDetail;
}

export default function CustomerDetailsInfo({ customer }: Props) {
  const t = useTranslations("customers.details");
  const locale = useLocale();

  const branchName = customer.branchId
    ? (locale === "ar" ? customer.branchId.nameAr || customer.branchId.name : customer.branchId.name)
    : "—";

  const fields = [
    {
      key: "joinDate",
      value: new Date(customer.createdAt).toLocaleDateString("en-GB"),
    },
    {
      key: "clientCode",
      value: customer.clientCode ?? "—",
      dir: "ltr" as const,
    },
    {
      key: "phone",
      value: customer.phone,
      dir: "ltr" as const,
    },
    {
      key: "branch",
      value: branchName,
    },
    {
      key: "city",
      value: customer.cityId?.name ?? "—",
    },
    {
      key: "availableBags",
      value: customer.availableBags,
    },
    {
      key: "currentPoints",
      value: customer.currentPoints,
    },
    {
      key: "profileComplete",
      value: customer.isProfileComplete,
      isBoolean: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3" dir="rtl">
      {fields.map((field) => (
        <div
          key={field.key}
          className="flex flex-col gap-2.5 bg-[#0069800D] border border-[#0C6175] rounded-lg py-4 px-3 min-h-[76px]"
        >
          <span className="text-[#6A7282] text-sm">{t(field.key)}</span>
          {field.isBoolean ? (
            <span className="font-bold text-[#000709] flex items-center gap-1">
              {field.value ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400" />
              )}
              {field.value ? t("yes") : t("no")}
            </span>
          ) : (
            <span className="font-bold text-[#000709]" dir={field.dir ?? "rtl"}>
              {String(field.value)}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

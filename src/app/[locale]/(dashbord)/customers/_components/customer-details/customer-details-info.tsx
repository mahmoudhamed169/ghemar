"use client";

import { useTranslations } from "next-intl";
import { Customer } from "@/shared/lib/types/customers";

interface Props {
  customer: Customer;
}

export default function CustomerDetailsInfo({ customer }: Props) {
  const t = useTranslations("customers.details");

  const fields = [
    {
      key: "joinDate",
      value: new Date(customer.createdAt).toLocaleDateString("EN"),
    },
    {
      key: "lastOrder",
      value: customer.updatedAt
        ? new Date(customer.updatedAt).toLocaleDateString("EN")
        : "-",
    },
    {
      key: "totalBags",
      value: customer.availableBags + customer.expressWashCredits,
    },
    {
      key: "remainingBags",
      value: customer.availableBags,
    },
    {
      key: "usedBags",
      value: customer.expressWashCredits,
    },
    {
      key: "guaranteeBags",
      value: customer.currentPoints,
    },
    {
      key: "totalAgreement",
      value: customer.currentPackage?.nameAr ?? "-",
      fullWidth: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {fields.map((field) => (
        <div
          key={field.key}
          className={`flex flex-col gap-2.5 bg-[#0069800D] border border-[#0C6175] rounded-lg py-4 px-3 min-h-[76px] ${
            field.fullWidth ? "col-span-2" : ""
          }`}
        >
          <span className="text-[#6A7282] text-sm">{t(field.key)}</span>
          <span className="font-bold text-[#000709]">{field.value}</span>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerDetail } from "@/shared/lib/types/customers";
import { useCustomerBagsHistory } from "@/shared/lib/hooks/customers/use-customer-bags";
import { formatRiyadhDateTime } from "@/shared/lib/utils/riyadh-time";
import CustomerAddBags from "./customer-add-bags";

const LIMIT = 10;

interface Props {
  customer: CustomerDetail;
  customerId: string;
}

export default function CustomerBagsHistory({ customer, customerId }: Props) {
  const t = useTranslations("customers.details");
  const tPagination = useTranslations("pagination");
  const locale = useLocale();
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error, isFetching } = useCustomerBagsHistory(
    customerId,
    page,
    LIMIT,
  );

  const items = data?.data ?? [];
  const totalPages = Math.max(1, Math.ceil((data?.pagination?.total ?? 0) / LIMIT));

  return (
    <div className="space-y-3 border-t border-gray-100 pt-3" dir="rtl">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-gray-500 flex items-center gap-2">
          {t("bagsHistory")}
          {isFetching && !isLoading && (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0C6175]" />
          )}
        </h3>
        <CustomerAddBags customer={customer} customerId={customerId} />
      </div>

      {isLoading && (
        <div className="flex justify-center py-6">
          <Loader2 className="w-6 h-6 animate-spin text-[#0C6175]" />
        </div>
      )}

      {isError && (
        <p className="text-sm text-red-500 py-4 text-center">
          {error?.message || t("bagsHistoryError")}
        </p>
      )}

      {!isLoading && !isError && items.length === 0 && (
        <p className="text-sm text-gray-300 py-6 text-center">{t("bagsHistoryEmpty")}</p>
      )}

      {items.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm text-right">
            <thead className="bg-gray-50 text-xs text-gray-500">
              <tr>
                <th className="px-3 py-2.5 font-medium whitespace-nowrap">{t("historyDate")}</th>
                <th className="px-3 py-2.5 font-medium whitespace-nowrap">{t("historyCount")}</th>
                <th className="px-3 py-2.5 font-medium whitespace-nowrap">{t("historyReason")}</th>
                <th className="px-3 py-2.5 font-medium whitespace-nowrap">{t("historyBefore")}</th>
                <th className="px-3 py-2.5 font-medium whitespace-nowrap">{t("historyAfter")}</th>
                <th className="px-3 py-2.5 font-medium whitespace-nowrap">{t("historyAdmin")}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-t border-gray-100">
                  <td className="px-3 py-2.5 text-xs text-gray-500 whitespace-nowrap">
                    {formatRiyadhDateTime(item.createdAt, locale) ?? "—"}
                  </td>
                  <td className="px-3 py-2.5 font-bold text-emerald-600" dir="ltr">
                    +{item.count}
                  </td>
                  <td className="px-3 py-2.5 text-gray-600">{item.reason || "—"}</td>
                  <td className="px-3 py-2.5 text-gray-600">{item.balanceBefore}</td>
                  <td className="px-3 py-2.5 font-medium text-[#000709]">{item.balanceAfter}</td>
                  <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">
                    {item.admin?.name || item.admin?.phone || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || isFetching}
          >
            {tPagination("prev")}
          </Button>
          <span className="text-xs text-gray-500">
            {t("pageOf", { page, total: totalPages })}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages || isFetching}
          >
            {tPagination("next")}
          </Button>
        </div>
      )}
    </div>
  );
}

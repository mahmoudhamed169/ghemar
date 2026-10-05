import { getTranslations } from "next-intl/server";
import { getOrderHours } from "@/shared/lib/services/settings/get-order-hours";
import OrderHoursForm from "./order-hours-form";

export default async function OrderHoursSettings() {
  const [t, data] = await Promise.all([
    getTranslations("Settings.operations.orderHours"),
    getOrderHours()
      .then((res) => res.data)
      .catch(() => null),
  ]);

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{t("title")}</h2>
      <p className="text-sm text-gray-500 mb-6">{t("description")}</p>
      {data ? (
        <OrderHoursForm initialData={data} />
      ) : (
        <p className="text-sm text-red-500">{t("loadError")}</p>
      )}
    </section>
  );
}

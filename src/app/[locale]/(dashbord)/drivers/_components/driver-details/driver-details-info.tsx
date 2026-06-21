"use client";
import { useTranslations } from "next-intl";
import { Driver } from "@/shared/lib/types/drivers/driver";

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function DriverDetailsInfo({ driver }: { driver: Driver }) {
  const t = useTranslations("drivers.details");

  const fields = [
    { label: t("join_date"),        value: formatDate(driver.createdAt) },
    { label: t("vehicle_type"),     value: t(`vehicle.${driver.vehicleType}`) },
    { label: t("vehicle_plate"),    value: driver.vehiclePlate || "—" },
    { label: t("city"),             value: driver.cityId?.name || "—" },
    { label: t("total_orders"),     value: String(driver.performanceMetrics.totalDeliveries) },
    { label: t("completed_orders"), value: String(driver.performanceMetrics.onTimeDeliveries) },
    { label: t("avg_rating"),       value: String(driver.performanceMetrics.avgRating) },
    { label: t("error_rate"),       value: `${driver.performanceMetrics.errorRate}%` },
    {
      label: t("assigned_areas"),
      value: (() => {
        const details = driver.assignedAreasDetails;
        if (details && details.length > 0) {
          return details.map((a) => a.nameAr || a.name || a.areaCode).join("، ");
        }
        if (driver.assignedAreas.length > 0) {
          return driver.assignedAreas.join("، ");
        }
        return "—";
      })(),
      fullWidth: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {fields.map((field) => (
        <div
          key={field.label}
          className={`flex flex-col gap-2.5 bg-[#0069800D] border border-[#0C6175] rounded-lg py-4 px-3 min-h-[76px] ${
            field.fullWidth ? "col-span-2" : ""
          }`}
        >
          <span className="text-[#6A7282]">{field.label}</span>
          <span className="font-bold text-[#000709]">{field.value}</span>
        </div>
      ))}
    </div>
  );
}
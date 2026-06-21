"use client";
import { useTranslations } from "next-intl";
import { DriverDetail } from "@/shared/lib/types/drivers/driver";

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function InfoCard({
  label,
  value,
  fullWidth = false,
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-2.5 bg-[#0069800D] border border-[#0C6175] rounded-lg py-4 px-3 min-h-[76px] ${
        fullWidth ? "col-span-2" : ""
      }`}
    >
      <span className="text-[#6A7282] text-sm">{label}</span>
      <span className="font-bold text-[#000709]">{value}</span>
    </div>
  );
}

export default function DriverDetailsInfo({ driver }: { driver: DriverDetail }) {
  const t = useTranslations("drivers.details");

  const live = driver.liveStats;
  const perf = driver.performanceMetrics;

  // Build lookup map from cityId.areas (populated in detail response)
  const cityAreaMap = new Map(
    (driver.cityId?.areas ?? []).map((a) => [a._id, a.nameAr || a.name || a.code]),
  );
  const resolveIds = (ids: string[]) => {
    const names = ids.map((id) => cityAreaMap.get(id)).filter(Boolean) as string[];
    return names.length ? names.join("، ") : null;
  };

  const branchNames = (() => {
    if (!driver.branches?.length) return "—";
    return driver.branches
      .map((b) => b.branchId?.nameAr || b.branchId?.name || "—")
      .join("، ");
  })();

  const assignedAreas = (() => {
    // 1. assignedAreasDetails populated
    if (driver.assignedAreasDetails?.length) {
      return driver.assignedAreasDetails
        .map((a) => a.nameAr || a.name || a.areaCode)
        .join("، ");
    }
    // 2. branch-level assignedAreasDetails
    const branchDetails = driver.branches?.flatMap((b) => b.assignedAreasDetails) ?? [];
    if (branchDetails.length) {
      return branchDetails.map((a) => a.nameAr || a.name || a.areaCode).join("، ");
    }
    // 3. resolve top-level assignedAreas IDs via cityId.areas
    if (driver.assignedAreas?.length) {
      const resolved = resolveIds(driver.assignedAreas);
      if (resolved) return resolved;
    }
    // 4. resolve branch assignedAreas IDs via cityId.areas
    const branchAreaIds = driver.branches?.flatMap((b) => b.assignedAreas) ?? [];
    if (branchAreaIds.length) {
      const resolved = resolveIds(branchAreaIds);
      if (resolved) return resolved;
    }
    // 5. fallback: all city areas (driver covers entire city)
    const cityAreas = driver.cityId?.areas ?? [];
    if (cityAreas.length) {
      return cityAreas.map((a) => a.nameAr || a.name || a.code).join("، ");
    }
    return "—";
  })();

  return (
    <div className="grid grid-cols-2 gap-3">
      <InfoCard label={t("join_date")}     value={formatDate(driver.createdAt)} />
      <InfoCard label={t("phone")}         value={driver.phone} />
      <InfoCard label={t("employee_id")}   value={driver.employeeId || "—"} />
      <InfoCard label={t("national_id")}   value={driver.nationalId || "—"} />
      <InfoCard label={t("vehicle_type")}  value={t(`vehicle.${driver.vehicleType}`)} />
      <InfoCard label={t("vehicle_plate")} value={driver.vehiclePlate || "—"} />
      <InfoCard label={t("city")}          value={driver.cityId?.nameAr || driver.cityId?.name || "—"} />
      <InfoCard label={t("avg_rating")}    value={String(perf.avgRating)} />
      <InfoCard label={t("total_orders")}     value={String(live?.totalOrders     ?? perf.totalDeliveries)} />
      <InfoCard label={t("completed_orders")} value={String(live?.completedOrders ?? perf.onTimeDeliveries)} />
      <InfoCard label={t("active_orders")}    value={String(live?.activeOrders    ?? 0)} />
      <InfoCard label={t("cancelled_orders")} value={String(live?.cancelledOrders ?? 0)} />
      <InfoCard label={t("error_rate")}    value={`${perf.errorRate}%`} />
      <InfoCard label={t("branches")}      value={branchNames}   fullWidth />
      <InfoCard label={t("assigned_areas")} value={assignedAreas} fullWidth />
    </div>
  );
}

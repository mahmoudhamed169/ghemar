import { getOverview } from "@/shared/lib/services/overview/get-overview";
import StatsGrid from "./stats-grid";
import SummaryStrip from "./summary-strip";
import OrdersTrend from "./orders-trend";
import OrdersDistribution from "./orders-distribution";
import MonthlyRevenue from "./monthly-revenue";
import PackagesDistribution from "./packages-distribution";

export default async function OverviewContent() {
  const { data } = await getOverview();

  return (
    <div className="space-y-6">
      <StatsGrid cards={data.cards} />

      <SummaryStrip
        totalOrders={data.totalOrders}
        activeOrders={data.activeOrders}
        completedOrders={data.completedOrders}
        totalRevenue={data.totalRevenue}
        activeDrivers={data.activeDrivers}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 min-w-0">
          <OrdersTrend data={data.last7DaysTrend} />
        </div>
        <OrdersDistribution data={data.orderStatusDistribution} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 min-w-0">
          <MonthlyRevenue data={data.monthlyRevenue} />
        </div>
        <PackagesDistribution data={data.packageDistribution} />
      </div>
    </div>
  );
}

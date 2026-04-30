import OrdersChart from "./orders-chart";
import OrdersDistribution from "./orders-distribution";

export default function ChartsSection() {
  return (
    <div className="flex gap-4 w-full">
      <OrdersChart />
      <OrdersDistribution />
    </div>
  );
}

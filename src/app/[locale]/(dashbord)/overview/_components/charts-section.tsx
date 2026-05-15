import OrdersChart from "./orders-chart";
import OrdersDistribution from "./orders-distribution";

export default function ChartsSection() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full">
      <div className="w-full lg:flex-[2]">
        <OrdersChart />
      </div>
      <div className="w-full lg:flex-[1]">
        <OrdersDistribution />
      </div>
    </div>
  );
}

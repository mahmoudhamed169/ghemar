import PackagesDistribution from "./packages-distribution";
import MonthlyRevenue from "./monthly-revenue";

export default function ChartsSection2() {
  return (
    <div className="flex gap-4 w-full">
      <MonthlyRevenue />
      <PackagesDistribution />
    </div>
  );
}

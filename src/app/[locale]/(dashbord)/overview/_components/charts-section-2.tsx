import MonthlyRevenue from "./monthly-revenue";
import PackagesDistribution from "./packages-distribution";

export default function ChartsSection2() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full">
      <div className="w-full lg:flex-[2]">
        <MonthlyRevenue />
      </div>
      <div className="w-full lg:flex-[1]">
        <PackagesDistribution />
      </div>
    </div>
  );
}

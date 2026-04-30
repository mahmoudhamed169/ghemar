import ChartsSection from "./_components/charts-section";
import ChartsSection2 from "./_components/charts-section-2";
import StatsGrid from "./_components/stats-grid";

export default function OverviewPage() {
  return (
    <div className=" space-y-6">
      <StatsGrid />
      <ChartsSection />
      <ChartsSection2 />
    </div>
  );
}

import BarcodeFilters from "./_components/bages-filter";
import PageHeader from "./_components/page-header";
import AutoRefresh from "@/shared/components/auto-refresh";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="space-y-6">
      <PageHeader />
      <div className="flex justify-end">
        <BarcodeFilters />
      </div>
      {children}
      <AutoRefresh intervalMs={2000} />
    </main>
  );
}

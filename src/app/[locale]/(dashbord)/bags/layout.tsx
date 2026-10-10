import BarcodeFilters from "./_components/bages-filter";
import PageHeader from "./_components/page-header";
import AutoRefresh from "@/shared/components/auto-refresh";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="space-y-6">
      <PageHeader />
      <div className="flex flex-wrap items-center justify-end gap-3">
        <BarcodeFilters />
        <AutoRefresh intervalMs={60000} showButton title="تحديث الباركود" />
      </div>
      {children}
    </main>
  );
}

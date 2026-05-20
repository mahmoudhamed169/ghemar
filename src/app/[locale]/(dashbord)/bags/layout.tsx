import BarcodeFilters from "./_components/bages-filter";
import PageHeader from "./_components/page-header";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="space-y-6">
      <PageHeader />
      <BarcodeFilters />
      {children}
    </main>
  );
}

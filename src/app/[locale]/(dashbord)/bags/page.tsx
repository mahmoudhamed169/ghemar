import BarcodeTable from "./_components/barcode-table";
import ActivationCodesTable from "./_components/activation-codes-table";

interface PageProps {
  searchParams: Promise<{
    page?:   string;
    search?: string;
    status?: string;
    from?:   string;
    to?:     string;
    type?:   string;
  }>;
}

export default async function BagsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const isPackageType = params.type === "package";

  return isPackageType ? (
    <ActivationCodesTable searchParams={params} />
  ) : (
    <BarcodeTable searchParams={params} />
  );
}

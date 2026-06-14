import { getBranches } from "@/shared/lib/services/branches/get-branches";
import { getCities } from "@/shared/lib/services/zones/get-cities";
import BranchesHeaderPage from "./_components/branches-header-page";
import BranchesFilter from "./_components/branches-filter";
import BranchesTableClient from "./_components/branches-table-client";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    cityId?: string;
    areaCode?: string;
    isActive?: string;
    page?: string;
  }>;
}

export default async function BranchesPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const isActive =
    params.isActive === "true"
      ? true
      : params.isActive === "false"
        ? false
        : undefined;

  const [branchesRes, citiesRes] = await Promise.all([
    getBranches({
      search: params.search,
      cityId: params.cityId,
      areaCode: params.areaCode,
      isActive,
      page: params.page ? Number(params.page) : undefined,
    }),
    getCities(),
  ]);

  const branches = branchesRes.data ?? [];
  const cities = citiesRes.data ?? [];

  return (
    <main className="space-y-4 lg:space-y-6">
      <BranchesHeaderPage cities={cities} />
      <BranchesFilter cities={cities} />
      <BranchesTableClient branches={branches} cities={cities} />
    </main>
  );
}

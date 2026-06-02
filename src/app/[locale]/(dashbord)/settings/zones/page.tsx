import { Suspense } from "react";
import ZonesTable from "./_components/zones-table";

export default function page() {
  return (
    <Suspense>
      <ZonesTable />
    </Suspense>
  );
}

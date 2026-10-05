import { Suspense } from "react";
import OpSettings from "./_components/operation-settings/index";
import OrderHoursSettings from "./_components/order-hours";
import SecSettings from "./_components/security-settings";

export default function page() {
  return (
    <main className="space-y-6">
      <Suspense>
        <OpSettings />
      </Suspense>
      <Suspense>
        <OrderHoursSettings />
      </Suspense>
      <Suspense>
        <SecSettings />
      </Suspense>
    </main>
  );
}

import { Suspense } from "react";
import OpSettings from "./_components/operation-settings/index";
import SecSettings from "./_components/security-settings";

export default function page() {
  return (
    <main className="space-y-6">
      <Suspense>
        <OpSettings />
      </Suspense>
      <Suspense>
        <SecSettings />
      </Suspense>
    </main>
  );
}

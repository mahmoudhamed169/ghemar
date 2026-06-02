import { Suspense } from "react";
import TermsSettings from "./_components/terms-settings";

export default function page() {
  return (
    <main className="space-y-6">
      <Suspense>
        <TermsSettings />
      </Suspense>
    </main>
  );
}

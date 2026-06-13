import { Suspense } from "react";
import PointsRulesSection from "./_components/points-rules-section";

export default function BounesSettingsPage() {
  return (
    <main className="space-y-6">
      <Suspense>
        <PointsRulesSection />
      </Suspense>
    </main>
  );
}

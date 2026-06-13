import { Suspense } from "react";
import AppSettings from "./_components/app-settings";
import AlertSettings from "./_components/alert-settings";
import SpecialOffersBanners from "./_components/special-offers-banners";

export default function page() {
  return (
    <main className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-bold">الاعدادات العامه</h1>
      <Suspense>
        <AppSettings />
      </Suspense>
      <Suspense>
        <AlertSettings />
      </Suspense>
      <SpecialOffersBanners />
    </main>
  );
}

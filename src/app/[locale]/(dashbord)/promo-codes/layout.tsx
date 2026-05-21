import React from "react";
import OffersHeaderPage from "./_components/offer-header-page";
import OffersStat from "./_components/offers-stat";
import CodesFilter from "./_components/codes-filter";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="space-y-4">
      <OffersHeaderPage />
      <OffersStat />
      {/* <CodesFilter /> */}
      {children}
    </main>
  );
}

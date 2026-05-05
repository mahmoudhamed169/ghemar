import React from "react";
import PackagesHeaderPage from "./_components/packages-header-page";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PackagesHeaderPage />
      {children}
    </div>
  );
}

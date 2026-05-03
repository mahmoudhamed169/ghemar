import React from "react";
import CustomerFilters from "./customer-filters";

export default function CustomerHeaderPage() {
  return (
    <div className="space-y-8 mt-1">
      <h1 className="text-3xl font-bold">ادارة العملاء</h1>
      <CustomerFilters />
    </div>
  );
}

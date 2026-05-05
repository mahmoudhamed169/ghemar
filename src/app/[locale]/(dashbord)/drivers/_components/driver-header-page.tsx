import { Button } from "@/components/ui/button";
import React from "react";
import DriverFilters from "./driver-filters";
import AddDriverButton from "./add-driver/add-driver-button";

export default function DriverHeaderPage() {
  return (
    <div className="space-y-8 mt-1">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">ادارة السائقين</h1>
        <AddDriverButton />
      </div>
      <DriverFilters />
    </div>
  );
}

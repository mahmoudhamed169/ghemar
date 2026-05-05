import { Button } from "@/components/ui/button";
import React from "react";
import DriverFilters from "./driver-filters";

export default function DriverHeaderPage() {
  return (
    <div className="space-y-8 mt-1">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">ادارة السائقين</h1>
        <Button variant="outline" className="mt-4 bg-[#0C6175] text-white w-[288px] h-[55px] rounded-lg text-lg flex items-center justify-center hover:bg-[#097188] hover:text-white hover:cursor-pointer">
          اضافة سائق 
        </Button>
      </div>
      <DriverFilters />
    </div>
  );
}

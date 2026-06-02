"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { City } from "@/shared/lib/types/zones/city";
import CityDetailsModal from "./city-details-modal";
import CityModal from "./city-modal";
import AreaModal from "./area-modal";

interface ZoneActionsProps {
  city: City;
}

export default function ZoneActions({ city }: ZoneActionsProps) {
  const t = useTranslations("Zones.actions");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full">
            <MoreVertical size={25} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-52 rounded-xl p-0 overflow-hidden">
          {[
            { label: t("viewDetails"), action: () => setDetailsOpen(true) },
            { label: t("edit"), action: () => setEditOpen(true) },
            { label: t("addArea"), action: () => setAreaOpen(true) },
          ].map((item, i, arr) => (
            <DropdownMenuItem
              key={item.label}
              onClick={item.action}
              className={`justify-center cursor-pointer py-3 rounded-none text-[#000709] ${
                i < arr.length - 1 ? "border-b border-[#00000014]" : ""
              }`}
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <CityDetailsModal open={detailsOpen} onOpenChange={setDetailsOpen} city={city} onEdit={() => { setDetailsOpen(false); setEditOpen(true); }} />
      <CityModal open={editOpen} onOpenChange={setEditOpen} initialData={city} />
      <AreaModal open={areaOpen} onOpenChange={setAreaOpen} cityId={city._id} />
    </>
  );
}

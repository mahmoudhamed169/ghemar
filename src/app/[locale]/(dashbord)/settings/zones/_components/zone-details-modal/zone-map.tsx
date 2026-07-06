"use client";

import { useEffect, useRef } from "react";
import { PolygonPoint } from "@/shared/lib/types/zones/city";

interface ZoneMapProps {
  polygon?: PolygonPoint[];
  zoneName: string;
}

export default function ZoneMap({ polygon, zoneName }: ZoneMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      const points = polygon ?? [];
      const defaultCenter: [number, number] = [24.7136, 46.6753];

      const map = L.map(mapRef.current!).setView(defaultCenter, 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      if (points.length >= 3) {
        const latlngs = points.map((p) => [p.lat, p.lng] as [number, number]);
        const poly = L.polygon(latlngs, {
          color: "#0C6175",
          fillColor: "#0C6175",
          fillOpacity: 0.15,
          weight: 2,
        }).addTo(map).bindPopup(zoneName);
        map.fitBounds(poly.getBounds(), { padding: [16, 16] });
      } else if (points.length > 0) {
        map.setView([points[0].lat, points[0].lng], 14);
      }

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }
    };
  }, [polygon, zoneName]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      />
      <div ref={mapRef} className="h-full w-full rounded-xl" />
    </>
  );
}

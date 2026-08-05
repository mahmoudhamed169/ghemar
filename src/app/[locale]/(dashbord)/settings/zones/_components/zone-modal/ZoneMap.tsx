"use client";

import { useEffect, useRef, useState } from "react";
import { PolygonPoint } from "@/shared/lib/types/zones/city";

interface Props {
  polygon: PolygonPoint[];
  onPolygonChange: (points: PolygonPoint[]) => void;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    L: any;
  }
}

const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
const DEFAULT_CENTER: [number, number] = [24.7136, 46.6753];
const ESRI_GEOCODE = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates";

async function searchPlace(query: string): Promise<{ lat: number; lng: number; label: string } | null> {
  const params = new URLSearchParams({
    SingleLine: `${query}، السعودية`,
    countryCode: "SAU",
    maxLocations: "1",
    f: "json",
    outFields: "PlaceName,Place_addr",
  });
  const res = await fetch(`${ESRI_GEOCODE}?${params}`);
  const data = await res.json();
  const candidate = data?.candidates?.[0];
  if (!candidate) return null;
  return {
    lat: candidate.location.y,
    lng: candidate.location.x,
    label: candidate.attributes?.PlaceName || candidate.address,
  };
}

/** Parse lat/lng from a Google Maps URL or plain "lat, lng" text */
function parseGoogleMapsInput(input: string): { lat: number; lng: number } | null {
  const s = input.trim();

  // Full URL: extract /@lat,lng,zoom or /@lat,lng,zoom
  const atMatch = s.match(/@([-\d.]+),([-\d.]+)/);
  if (atMatch) {
    const lat = parseFloat(atMatch[1]);
    const lng = parseFloat(atMatch[2]);
    if (!isNaN(lat) && !isNaN(lng)) return { lat, lng };
  }

  // ?q=lat,lng or &q=lat,lng
  const qMatch = s.match(/[?&]q=([-\d.]+),([-\d.]+)/);
  if (qMatch) {
    const lat = parseFloat(qMatch[1]);
    const lng = parseFloat(qMatch[2]);
    if (!isNaN(lat) && !isNaN(lng)) return { lat, lng };
  }

  // Plain coordinates: "24.7136, 46.6753" or "24.7136 46.6753"
  const plainMatch = s.match(/^([-\d.]+)[,\s]+([-\d.]+)$/);
  if (plainMatch) {
    const lat = parseFloat(plainMatch[1]);
    const lng = parseFloat(plainMatch[2]);
    if (!isNaN(lat) && !isNaN(lng)) return { lat, lng };
  }

  return null;
}

function loadLeaflet(): Promise<void> {
  return new Promise((resolve) => {
    if (window.L) { resolve(); return; }
    if (!document.querySelector(`link[href="${LEAFLET_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = LEAFLET_CSS;
      document.head.appendChild(link);
    }
    if (!document.querySelector(`script[src="${LEAFLET_JS}"]`)) {
      const script = document.createElement("script");
      script.src = LEAFLET_JS;
      script.onload = () => resolve();
      document.head.appendChild(script);
    } else {
      const poll = setInterval(() => {
        if (window.L) { clearInterval(poll); resolve(); }
      }, 50);
    }
  });
}

export default function ZoneMap({ polygon, onPolygonChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const layerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<any[]>([]);
  const pointsRef = useRef<PolygonPoint[]>(polygon);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  const [gmInput, setGmInput] = useState("");
  const [gmError, setGmError] = useState("");

  const handleSearch = async () => {
    if (!searchQuery.trim() || !mapRef.current) return;
    setSearching(true);
    setSearchError("");
    const result = await searchPlace(searchQuery.trim());
    setSearching(false);
    if (!result) {
      setSearchError("لم يتم العثور على الموقع");
      return;
    }
    mapRef.current.flyTo([result.lat, result.lng], 15, { animate: true, duration: 1 });
  };

  const handleAddFromGoogleMaps = () => {
    setGmError("");
    const parsed = parseGoogleMapsInput(gmInput);
    if (!parsed) {
      setGmError("تعذّر استخراج الإحداثيات — تأكد من صحة الرابط أو الإحداثيات");
      return;
    }
    const newPoints = [...pointsRef.current, parsed];
    pointsRef.current = newPoints;
    redraw(window.L, newPoints);
    onPolygonChange(newPoints);
    if (mapRef.current) {
      mapRef.current.flyTo([parsed.lat, parsed.lng], 16, { animate: true, duration: 0.8 });
    }
    setGmInput("");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const redraw = (L: any, points: PolygonPoint[]) => {
    if (layerRef.current) { layerRef.current.remove(); layerRef.current = null; }
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    if (!mapRef.current || points.length === 0) return;

    const latlngs = points.map((p) => [p.lat, p.lng] as [number, number]);

    if (points.length < 3) {
      layerRef.current = L.polyline(latlngs, { color: "#0C6175", weight: 2 }).addTo(mapRef.current);
    } else {
      layerRef.current = L.polygon(latlngs, {
        color: "#0C6175", fillColor: "#0C6175", fillOpacity: 0.15, weight: 2,
      }).addTo(mapRef.current);
    }

    markersRef.current = points.map((p, i) =>
      L.circleMarker([p.lat, p.lng], {
        radius: 5,
        color: i === 0 ? "#e11d48" : "#0C6175",
        fillColor: "#fff",
        fillOpacity: 1,
        weight: 2,
      }).addTo(mapRef.current)
    );
  };

  useEffect(() => {
    if (!containerRef.current) return;
    let isMounted = true;

    loadLeaflet().then(() => {
      if (!isMounted || !containerRef.current || mapRef.current) return;
      const L = window.L;

      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const initialPoints = pointsRef.current;
      const center = initialPoints.length > 0
        ? ([initialPoints[0].lat, initialPoints[0].lng] as [number, number])
        : DEFAULT_CENTER;

      const map = L.map(containerRef.current, { center, zoom: 13 });
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
        { attribution: "© Esri" },
      ).addTo(map);

      mapRef.current = map;

      if (initialPoints.length > 0) {
        redraw(L, initialPoints);
        if (initialPoints.length >= 3 && layerRef.current) {
          map.fitBounds(layerRef.current.getBounds(), { padding: [24, 24] });
        }
      }

      map.on("click", (e: { latlng: { lat: number; lng: number } }) => {
        const newPoints = [...pointsRef.current, { lat: e.latlng.lat, lng: e.latlng.lng }];
        pointsRef.current = newPoints;
        redraw(L, newPoints);
        onPolygonChange(newPoints);
      });
    });

    return () => { isMounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUndo = () => {
    if (!window.L || pointsRef.current.length === 0) return;
    const newPoints = pointsRef.current.slice(0, -1);
    pointsRef.current = newPoints;
    redraw(window.L, newPoints);
    onPolygonChange(newPoints);
  };

  const handleClear = () => {
    if (!window.L) return;
    pointsRef.current = [];
    redraw(window.L, []);
    onPolygonChange([]);
  };

  return (
    <div className="flex flex-col gap-1.5">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-700">
          حدود المنطقة على الخريطة
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleUndo}
            disabled={polygon.length === 0}
            className="text-xs px-2.5 py-1 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ↩ تراجع
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={polygon.length === 0}
            className="text-xs px-2.5 py-1 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            مسح الكل
          </button>
        </div>
      </div>

      {/* Search box */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setSearchError(""); }}
          placeholder="ابحث عن مدينة أو حي… مثال: حي النزهة، الرياض"
          dir="rtl"
          className="flex-1 h-9 px-3 text-sm rounded-lg border border-gray-200 bg-[#F5F5F5] outline-none focus:border-[#0C6175] transition-colors"
        />
        <button
          type="submit"
          disabled={searching || !searchQuery.trim()}
          className="h-9 px-4 text-sm rounded-lg bg-[#0C6175] text-white hover:bg-[#097188] disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
        >
          {searching ? "…" : "بحث"}
        </button>
      </form>

      {searchError && (
        <p className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-1.5">{searchError}</p>
      )}

      {/* Google Maps import */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleAddFromGoogleMaps(); }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={gmInput}
          onChange={(e) => { setGmInput(e.target.value); setGmError(""); }}
          placeholder='رابط جوجل ماب أو إحداثيات… مثال: 24.7136, 46.6753'
          dir="ltr"
          className="flex-1 h-9 px-3 text-sm rounded-lg border border-gray-200 bg-[#F5F5F5] outline-none focus:border-emerald-500 transition-colors placeholder:text-right placeholder:dir-rtl"
        />
        <button
          type="submit"
          disabled={!gmInput.trim()}
          className="h-9 px-4 text-sm rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
        >
          + إضافة نقطة
        </button>
      </form>

      {gmError && (
        <p className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-1.5">{gmError}</p>
      )}

      {/* Map */}
      <div
        ref={containerRef}
        className="w-full h-64 rounded-xl overflow-hidden border border-gray-200 z-0"
        style={{ cursor: "crosshair" }}
      />

      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>انقر على الخريطة لإضافة نقاط الحدود · النقطة الأولى باللون الأحمر</span>
        {polygon.length > 0 && (
          <span className="font-medium text-[#0C6175]">{polygon.length} نقطة</span>
        )}
      </div>
    </div>
  );
}

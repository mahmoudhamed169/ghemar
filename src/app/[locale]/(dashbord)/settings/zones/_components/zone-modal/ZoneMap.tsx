// _components/AddZoneModal/ZoneMap.tsx
// Interactive Leaflet map — draggable marker + circle that reflects the chosen radius

"use client";

import React, { useEffect, useRef } from "react";

// Leaflet is loaded from CDN inside a <script> tag; we access it via window.L
// to avoid SSR issues in Next.js (mark the file with "use client").

interface Props {
  lat: number;
  lng: number;
  /** Radius in metres */
  radius: number;
  onPositionChange: (lat: number, lng: number) => void;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    L: any;
  }
}

const LEAFLET_CSS =
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS =
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

/** Dynamically inject Leaflet CSS + JS once and resolve when ready. */
function loadLeaflet(): Promise<void> {
  return new Promise((resolve) => {
    if (window.L) {
      resolve();
      return;
    }

    // CSS
    if (!document.querySelector(`link[href="${LEAFLET_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = LEAFLET_CSS;
      document.head.appendChild(link);
    }

    // JS
    if (!document.querySelector(`script[src="${LEAFLET_JS}"]`)) {
      const script = document.createElement("script");
      script.src = LEAFLET_JS;
      script.onload = () => resolve();
      document.head.appendChild(script);
    } else {
      // Script tag already exists but may not have fired onload yet
      const poll = setInterval(() => {
        if (window.L) {
          clearInterval(poll);
          resolve();
        }
      }, 50);
    }
  });
}

export default function ZoneMap({ lat, lng, radius, onPositionChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const circleRef = useRef<any>(null);

  /* ── Initialise map once ── */
  useEffect(() => {
    if (!containerRef.current) return;

    let isMounted = true;

    loadLeaflet().then(() => {
      if (!isMounted || !containerRef.current) return;
      if (mapRef.current) return; // already initialised

      const L = window.L;

      // Fix default icon paths (common Next.js gotcha)
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(containerRef.current, {
        center: [lat, lng],
        zoom: 13,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      const marker = L.marker([lat, lng], { draggable: true }).addTo(map);
      const circle = L.circle([lat, lng], {
        radius,
        color: "#0C6175",
        fillColor: "#0C6175",
        fillOpacity: 0.15,
        weight: 2,
      }).addTo(map);

      marker.on("dragend", () => {
        const { lat: newLat, lng: newLng } = marker.getLatLng();
        circle.setLatLng([newLat, newLng]);
        onPositionChange(newLat, newLng);
      });

      // Click on map to move marker
      map.on("click", (e: { latlng: { lat: number; lng: number } }) => {
        const { lat: newLat, lng: newLng } = e.latlng;
        marker.setLatLng([newLat, newLng]);
        circle.setLatLng([newLat, newLng]);
        onPositionChange(newLat, newLng);
      });

      mapRef.current = map;
      markerRef.current = marker;
      circleRef.current = circle;
    });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Sync radius changes ── */
  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.setRadius(radius);
    }
  }, [radius]);

  /* ── Sync external lat/lng changes (e.g. edit mode) ── */
  useEffect(() => {
    if (markerRef.current && circleRef.current && mapRef.current) {
      markerRef.current.setLatLng([lat, lng]);
      circleRef.current.setLatLng([lat, lng]);
      mapRef.current.setView([lat, lng]);
    }
  }, [lat, lng]);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-700">
        موقع المنطقة على الخريطة
      </label>
      <div
        ref={containerRef}
        className="w-full h-48 rounded-xl overflow-hidden border border-gray-200 z-0"
        style={{ minHeight: 190 }}
      />
      <p className="text-xs text-gray-400 text-center">
        اسحب الدبوس أو انقر على الخريطة لتحديد الموقع
      </p>
    </div>
  );
}
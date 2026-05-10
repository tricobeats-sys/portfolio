"use client";

import { useEffect, useRef } from "react";

// Munich locations — glowing circles across the city
const LOCATIONS = [
  { lat: 48.1351, lng: 11.5820, r: 28 }, // Marienplatz (center)
  { lat: 48.1450, lng: 11.5580, r: 18 }, // Maxvorstadt
  { lat: 48.1200, lng: 11.5700, r: 14 },
  { lat: 48.1530, lng: 11.6100, r: 20 }, // Bogenhausen
  { lat: 48.1280, lng: 11.6250, r: 12 },
  { lat: 48.1600, lng: 11.5300, r: 16 }, // Schwabing
  { lat: 48.1050, lng: 11.5600, r: 14 },
  { lat: 48.1680, lng: 11.6050, r: 10 },
  { lat: 48.1100, lng: 11.6500, r: 18 }, // Ramersdorf
  { lat: 48.1750, lng: 11.5500, r: 12 },
  { lat: 48.1420, lng: 11.4900, r: 22 }, // Pasing
  { lat: 48.1230, lng: 11.4800, r: 10 },
  { lat: 48.0980, lng: 11.5150, r: 16 }, // Sendling
  { lat: 48.0850, lng: 11.5700, r: 12 },
  { lat: 48.0920, lng: 11.6200, r: 14 },
  { lat: 48.1380, lng: 11.7000, r: 10 }, // Trudering
  { lat: 48.1800, lng: 11.4800, r: 12 }, // Allach
  { lat: 48.0760, lng: 11.4800, r: 16 }, // Forstenried
  { lat: 48.1580, lng: 11.3800, r: 10 }, // Lochhausen
  { lat: 48.2050, lng: 11.6100, r: 14 }, // Unterföhring
];

export default function GermanyMap({ accent }: { accent: string }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (!mapRef.current || instanceRef.current) return;

    import("leaflet").then((L) => {
      // Fix default icon paths
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({ iconUrl: "", shadowUrl: "" });

      const map = L.map(mapRef.current!, {
        center: [48.137, 11.575],
        zoom: 12,
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        keyboard: false,
      });

      // CartoDB Dark Matter tiles — free, no API key
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        { subdomains: "abcd", maxZoom: 19 }
      ).addTo(map);

      // Add glowing circle markers
      LOCATIONS.forEach((loc, i) => {
        setTimeout(() => {
          const size = loc.r * 2;
          const html = `
            <div style="
              width:${size}px;height:${size}px;border-radius:50%;
              background:radial-gradient(circle,${accent}cc 0%,${accent}55 45%,${accent}00 70%);
              box-shadow:0 0 ${loc.r}px ${accent}99, 0 0 ${loc.r * 2}px ${accent}44;
              animation:pulse${i} 2.5s ease-in-out infinite;
            "></div>`;

          L.marker([loc.lat, loc.lng], {
            icon: L.divIcon({
              html,
              className: "",
              iconSize: [size, size],
              iconAnchor: [size / 2, size / 2],
            }),
          }).addTo(map);
        }, i * 120);
      });

      instanceRef.current = map;
    });

    return () => {
      if (instanceRef.current) {
        (instanceRef.current as { remove: () => void }).remove();
        instanceRef.current = null;
      }
    };
  }, [accent]);

  return (
    <>
      <style>{`
        @keyframes mapPulse {
          0%,100% { opacity:0.85; transform:scale(1); }
          50% { opacity:1; transform:scale(1.08); }
        }
        .leaflet-container { background:#0a0d14 !important; }
      `}</style>
      <div ref={mapRef} style={{
        position: "absolute", inset: 0,
        borderRadius: 0,
        filter: "saturate(0.4) brightness(0.9)",
      }} />
      {/* Green overlay for the glowing feel */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 70% 60% at 48% 52%, ${accent}12 0%, transparent 65%)`,
      }} />
    </>
  );
}

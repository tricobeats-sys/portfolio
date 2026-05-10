"use client";

import { useEffect, useRef } from "react";
const CITIES = [
  { lat: 48.1351, lng: 11.5820, name: "München",    r: 14, highlight: true  },
  { lat: 53.5753, lng: 10.0153, name: "Hamburg",    r: 7  },
  { lat: 52.5200, lng: 13.4050, name: "Berlin",     r: 8  },
  { lat: 50.1109, lng:  8.6821, name: "Frankfurt",  r: 7  },
  { lat: 50.9333, lng:  6.9500, name: "Köln",       r: 6  },
  { lat: 48.7758, lng:  9.1829, name: "Stuttgart",  r: 6  },
  { lat: 51.2217, lng:  6.7762, name: "Düsseldorf", r: 5  },
  { lat: 51.0504, lng: 13.7373, name: "Dresden",    r: 6  },
  { lat: 51.3397, lng: 12.3731, name: "Leipzig",    r: 6  },
  { lat: 49.4521, lng: 11.0767, name: "Nürnberg",   r: 6  },
  { lat: 52.3759, lng:  9.7320, name: "Hannover",   r: 5  },
  { lat: 53.0793, lng:  8.8017, name: "Bremen",     r: 5  },
  { lat: 51.5136, lng:  7.4653, name: "Dortmund",   r: 5  },
  { lat: 49.4875, lng:  8.4660, name: "Mannheim",   r: 5  },
  { lat: 47.9990, lng:  7.8421, name: "Freiburg",   r: 5  },
  { lat: 54.0924, lng: 12.0991, name: "Rostock",    r: 5  },
  { lat: 50.9848, lng: 11.0299, name: "Erfurt",     r: 5  },
  { lat: 48.3705, lng: 10.8978, name: "Augsburg",   r: 5  },
  { lat: 49.0134, lng: 12.1016, name: "Regensburg", r: 5  },
  { lat: 49.7944, lng:  9.9294, name: "Würzburg",   r: 5  },
];

export default function GermanyMapLeaflet({ accent }: { accent: string }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Check if container was already initialized by Leaflet (React strict mode double-mount)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const container = mapRef.current as any;
    if (container._leaflet_id) return;

    // Dynamic import to avoid SSR issues
    import("leaflet").then((L) => {
      if (!mapRef.current || mapInstanceRef.current) return;

      // Fix default icon path issue in Next.js
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;

      const map = L.map(mapRef.current, {
        center: [51.2, 10.5],
        zoom: 6,
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
      });

      mapInstanceRef.current = map;

      // CartoDB Dark Matter tiles
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map);

      // Add cities with staggered delay
      CITIES.forEach((city, i) => {
        setTimeout(() => {
          if (city.highlight) {
            // München: large pulsing ring + bright dot
            const pulseIcon = L.divIcon({
              className: "",
              html: `
                <div style="position:relative;width:60px;height:60px;transform:translate(-50%,-50%)">
                  <div class="munich-ring"></div>
                  <div class="munich-ring" style="animation-delay:0.7s"></div>
                  <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
                    width:16px;height:16px;border-radius:50%;
                    background:${accent};box-shadow:0 0 20px ${accent},0 0 40px ${accent}88,0 0 80px ${accent}44;"></div>
                </div>
              `,
              iconSize: [60, 60],
              iconAnchor: [30, 30],
            });
            L.marker([city.lat, city.lng], { icon: pulseIcon }).addTo(map);

            // München label
            const labelIcon = L.divIcon({
              className: "",
              html: `<div style="color:${accent};font-size:11px;font-weight:700;letter-spacing:0.1em;
                white-space:nowrap;text-shadow:0 0 8px ${accent};margin-top:2px;font-family:system-ui">MÜNCHEN</div>`,
              iconSize: [80, 20],
              iconAnchor: [-8, -10],
            });
            L.marker([city.lat, city.lng], { icon: labelIcon }).addTo(map);
          } else {
            L.circleMarker([city.lat, city.lng], {
              radius: city.r,
              color: accent,
              fillColor: accent,
              fillOpacity: 0.7,
              weight: 0,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              className: "city-dot",
            } as any).addTo(map);
          }
        }, 400 + i * 80);
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mapInstanceRef.current as any).remove();
        mapInstanceRef.current = null;
      }
    };
  }, [accent]);

  return (
    <>
      <style>{`
        .munich-ring {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 60px; height: 60px;
          border-radius: 50%;
          border: 1.5px solid ${accent};
          opacity: 0;
          animation: munich-pulse 2.2s ease-out infinite;
        }
        @keyframes munich-pulse {
          0%   { transform: translate(-50%,-50%) scale(0.2); opacity: 0.8; }
          100% { transform: translate(-50%,-50%) scale(1.8); opacity: 0; }
        }
        .city-dot {
          filter: drop-shadow(0 0 6px ${accent}) drop-shadow(0 0 12px ${accent}88);
        }
        .leaflet-container { background: #07090f !important; }
      `}</style>
      <div ref={mapRef} style={{ width: "100%", height: "100%", borderRadius: 0 }} />
    </>
  );
}

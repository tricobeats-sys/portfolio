"use client";

import { useEffect, useRef } from "react";

// 20 real Munich locations + ~25 smaller background dots for visual density
const LOCATIONS = [
  // Main 20 locations (larger dots)
  { lat: 48.1351, lng: 11.5820, r: 14, main: true  }, // Marienplatz
  { lat: 48.1400, lng: 11.5600, r: 10, main: true  }, // Maxvorstadt
  { lat: 48.1270, lng: 11.5800, r: 9,  main: true  }, // Sendling
  { lat: 48.1500, lng: 11.5900, r: 10, main: true  }, // Schwabing
  { lat: 48.1450, lng: 11.6100, r: 8,  main: true  }, // Bogenhausen
  { lat: 48.1200, lng: 11.5600, r: 9,  main: true  }, // Thalkirchen
  { lat: 48.1600, lng: 11.5700, r: 8,  main: true  }, // Milbertshofen
  { lat: 48.1300, lng: 11.5400, r: 9,  main: true  }, // Laim
  { lat: 48.1550, lng: 11.5400, r: 8,  main: true  }, // Neuhausen
  { lat: 48.1100, lng: 11.5900, r: 9,  main: true  }, // Untergiesing
  { lat: 48.1380, lng: 11.6300, r: 7,  main: true  }, // Riem
  { lat: 48.1250, lng: 11.6100, r: 9,  main: true  }, // Giesing
  { lat: 48.1480, lng: 11.5200, r: 8,  main: true  }, // Nymphenburg
  { lat: 48.1700, lng: 11.5800, r: 8,  main: true  }, // Schwabing Nord
  { lat: 48.1350, lng: 11.5500, r: 10, main: true  }, // Westend
  { lat: 48.1430, lng: 11.5950, r: 9,  main: true  }, // Haidhausen
  { lat: 48.1200, lng: 11.6200, r: 8,  main: true  }, // Berg am Laim
  { lat: 48.1600, lng: 11.6100, r: 7,  main: true  }, // Johanneskirchen
  { lat: 48.1050, lng: 11.5700, r: 8,  main: true  }, // Obersendling
  { lat: 48.1150, lng: 11.5500, r: 7,  main: true  }, // Pasing
  // Background ambient dots
  { lat: 48.1370, lng: 11.5750, r: 5,  main: false },
  { lat: 48.1320, lng: 11.5870, r: 4,  main: false },
  { lat: 48.1410, lng: 11.5720, r: 5,  main: false },
  { lat: 48.1280, lng: 11.5650, r: 4,  main: false },
  { lat: 48.1460, lng: 11.5850, r: 5,  main: false },
  { lat: 48.1330, lng: 11.6000, r: 4,  main: false },
  { lat: 48.1520, lng: 11.5650, r: 4,  main: false },
  { lat: 48.1240, lng: 11.5750, r: 5,  main: false },
  { lat: 48.1580, lng: 11.6000, r: 4,  main: false },
  { lat: 48.1180, lng: 11.5850, r: 4,  main: false },
  { lat: 48.1390, lng: 11.6150, r: 5,  main: false },
  { lat: 48.1650, lng: 11.5850, r: 4,  main: false },
  { lat: 48.1310, lng: 11.5300, r: 5,  main: false },
  { lat: 48.1440, lng: 11.5150, r: 4,  main: false },
  { lat: 48.1080, lng: 11.5600, r: 4,  main: false },
  { lat: 48.1750, lng: 11.5650, r: 4,  main: false },
];

export default function GermanyMapLeaflet({ accent }: { accent: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const el = containerRef.current as any;
    if (el._leaflet_id) return;

    import("leaflet").then((L) => {
      if (!containerRef.current || mapRef.current) return;

      // Fix icon path
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;

      const map = L.map(containerRef.current, {
        center: [48.137, 11.576],
        zoom: 12,
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
        keyboard: false,
      });

      mapRef.current = map;

      // CartoDB Dark Matter tiles
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map);

      // Force size calculation with ResizeObserver + timeouts
      const ro = new ResizeObserver(() => map.invalidateSize());
      ro.observe(containerRef.current!);
      [50, 200, 500, 1000].forEach(t => setTimeout(() => map.invalidateSize(), t));

      // Add building icons with stagger
      LOCATIONS.forEach((loc, i) => {
        const delay = 1000 + i * 140;
        const scale = loc.main ? 1 : 0.65;
        const w = Math.round(18 * scale);
        const h = Math.round(24 * scale);
        const pulseDelay = delay + 500;

        setTimeout(() => {
          const icon = L.divIcon({
            className: "",
            html: `
              <div class="building-wrap" style="animation-delay:0ms">
                ${loc.main ? `<div class="building-ring" style="animation-delay:${pulseDelay}ms"></div>` : ""}
                <svg width="${w}" height="${h}" viewBox="0 0 18 24" xmlns="http://www.w3.org/2000/svg"
                  style="filter:drop-shadow(0 0 ${loc.main ? 6 : 3}px ${accent}) drop-shadow(0 0 ${loc.main ? 12 : 5}px ${accent}88);
                         animation:building-pulse 2.4s ease-in-out infinite;
                         animation-delay:${pulseDelay}ms;">
                  <!-- Left wing -->
                  <rect x="0" y="10" width="5" height="14" fill="${accent}" opacity="0.75"/>
                  <!-- Right wing -->
                  <rect x="13" y="7" width="5" height="17" fill="${accent}" opacity="0.75"/>
                  <!-- Main tower -->
                  <rect x="4" y="0" width="10" height="24" fill="${accent}"/>
                  <!-- Windows main -->
                  <rect x="6"  y="3"  width="2" height="2" fill="#07090f" opacity="0.6"/>
                  <rect x="10" y="3"  width="2" height="2" fill="#07090f" opacity="0.6"/>
                  <rect x="6"  y="7"  width="2" height="2" fill="#07090f" opacity="0.6"/>
                  <rect x="10" y="7"  width="2" height="2" fill="#07090f" opacity="0.6"/>
                  <rect x="6"  y="11" width="2" height="2" fill="#07090f" opacity="0.6"/>
                  <rect x="10" y="11" width="2" height="2" fill="#07090f" opacity="0.6"/>
                  <!-- Windows side left -->
                  <rect x="1"  y="12" width="1.5" height="1.5" fill="#07090f" opacity="0.5"/>
                  <rect x="1"  y="15" width="1.5" height="1.5" fill="#07090f" opacity="0.5"/>
                  <!-- Windows side right -->
                  <rect x="14.5" y="9"  width="1.5" height="1.5" fill="#07090f" opacity="0.5"/>
                  <rect x="14.5" y="12" width="1.5" height="1.5" fill="#07090f" opacity="0.5"/>
                </svg>
              </div>
            `,
            iconSize: [w, h],
            iconAnchor: [w / 2, h],
          });
          L.marker([loc.lat, loc.lng], { icon }).addTo(map);
        }, delay);
      });

      // München label
      setTimeout(() => {
        const icon = L.divIcon({
          className: "",
          html: `<div style="
            color:${accent};font-size:10px;font-weight:700;
            letter-spacing:0.12em;white-space:nowrap;
            text-shadow:0 0 8px ${accent},0 0 16px ${accent}88;
            font-family:system-ui,sans-serif;
          ">MÜNCHEN</div>`,
          iconSize: [80, 14],
          iconAnchor: [-6, 20],
        });
        L.marker([48.1351, 11.5820], { icon }).addTo(map);
      }, 1500);

      // Cleanup
      return () => {
        ro.disconnect();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mapRef.current as any)?.remove();
        mapRef.current = null;
      };
    });
  }, [accent]);

  return (
    <>
      <style>{`
        .leaflet-container { background: #0d1117 !important; }
        .leaflet-tile-pane .leaflet-layer {
          filter: brightness(0.85) saturate(1.1) hue-rotate(5deg);
        }

        .building-wrap {
          position: relative;
          display: flex; align-items: flex-end; justify-content: center;
          opacity: 0;
          transform: scale(0) translateY(8px);
          animation: building-pop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes building-pop {
          0%   { opacity: 0; transform: scale(0) translateY(8px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes building-pulse {
          0%, 100% { opacity: 0.9; }
          50%       { opacity: 1;   }
        }

        .building-ring {
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 20px; height: 20px;
          border-radius: 50%;
          border: 1px solid ${accent};
          opacity: 0;
          animation: ring-expand 2.4s ease-out infinite;
        }
        @keyframes ring-expand {
          0%   { transform: translateX(-50%) scale(0.5); opacity: 0.8; }
          100% { transform: translateX(-50%) scale(3);   opacity: 0;   }
        }
      `}</style>
      <div ref={containerRef} style={{ width: "100%", height: "100%", minHeight: "100vh" }} />
    </>
  );
}

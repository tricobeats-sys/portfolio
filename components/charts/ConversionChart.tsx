"use client";

import { motion } from "framer-motion";

type Props = { accent: string };

const rows = [
  { label: "Früher",  factor: 1, highlight: false },
  { label: "Heute",   factor: 2, highlight: true  },
];
const MAX = 2;

export default function ConversionChart({ accent }: Props) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: `1px solid ${accent}55`,
      borderRadius: 20,
      padding: "22px 28px 20px",
      width: 340,
      boxShadow: `0 0 18px ${accent}40, 0 0 60px ${accent}18, inset 0 0 30px ${accent}06`,
    }}>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 24 }}>
        Q-Lead → Placement
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {rows.map((row, ri) => (
          <div key={row.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{
                fontSize: 12, fontWeight: 600,
                color: row.highlight ? "#fff" : "rgba(255,255,255,0.38)",
              }}>
                {row.label}
              </span>
              <span style={{
                fontSize: 13, fontWeight: 800,
                color: row.highlight ? accent : "rgba(255,255,255,0.28)",
                textShadow: row.highlight ? `0 0 12px ${accent}` : "none",
              }}>
                {row.factor}×
              </span>
            </div>
            <div style={{
              position: "relative", height: 8, borderRadius: 999,
              background: "rgba(255,255,255,0.07)",
              overflow: "hidden",
            }}>
              <motion.div
                style={{
                  position: "absolute", left: 0, top: 0, bottom: 0,
                  borderRadius: 999,
                  background: row.highlight
                    ? `linear-gradient(90deg, ${accent}bb, ${accent})`
                    : "rgba(255,255,255,0.2)",
                  boxShadow: row.highlight
                    ? `0 0 6px ${accent}, 0 0 16px ${accent}cc, 0 0 40px ${accent}66`
                    : "none",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${(row.factor / MAX) * 100}%` }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: ri * 0.15 + 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{
        display: "flex", justifyContent: "space-between",
        marginTop: 14, fontSize: 10,
        color: "rgba(255,255,255,0.2)",
        letterSpacing: "0.05em",
      }}>
        <span>0×</span>
        <span>0.5×</span>
        <span>1×</span>
        <span>1.5×</span>
        <span>2×</span>
      </div>

      <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "5px 12px", borderRadius: 999,
          background: `${accent}18`,
          border: `1px solid ${accent}35`,
          boxShadow: `0 0 10px ${accent}20`,
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span style={{ fontSize: 12, fontWeight: 700, color: accent }}>Conversion verdoppelt</span>
        </div>
      </div>
    </div>
  );
}

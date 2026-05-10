"use client";

import { motion } from "framer-motion";

type Props = { accent: string };

const data = [
  { year: "2021", value: 100, partial: false },
  { year: "2022", value: 112, partial: false },
  { year: "2023", value: 130, partial: false },
  { year: "2024", value: 148, partial: false },
  { year: "2025", value: 170, partial: false },
  { year: "2026", value: 88,  partial: true  },
];

const MAX = 185;
const CHART_H = 150;

export default function RevenueChart({ accent }: Props) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: `1px solid ${accent}55`,
      borderRadius: 20,
      padding: "22px 28px 16px",
      width: "100%",
      maxWidth: 400,
      boxShadow: `0 0 18px ${accent}40, 0 0 60px ${accent}18, inset 0 0 30px ${accent}06`,
    }}>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 20 }}>
        Umsatzentwicklung (indexiert)
      </p>

      {/* Bars */}
      <div style={{ display: "flex", gap: 12, alignItems: "flex-end", height: CHART_H }}>
        {data.map((d, i) => {
          const barH = (d.value / MAX) * CHART_H;
          const isPeak = i === data.length - 2; // 2025 is the peak full year
          return (
            <div key={d.year} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, flex: 1 }}>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                style={{
                  fontSize: 11, fontWeight: 700, marginBottom: 5,
                  color: d.partial ? "rgba(255,255,255,0.22)" : isPeak ? accent : "rgba(255,255,255,0.35)",
                  textShadow: isPeak ? `0 0 10px ${accent}` : "none",
                }}
              >
                {d.partial ? "…" : `${d.value}%`}
              </motion.span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: barH }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.12 }}
                style={{
                  width: "100%",
                  borderRadius: "6px 6px 4px 4px",
                  background: d.partial
                    ? `repeating-linear-gradient(45deg, ${accent}22 0px, ${accent}22 3px, transparent 3px, transparent 7px)`
                    : isPeak
                    ? `linear-gradient(180deg, ${accent} 0%, ${accent}99 100%)`
                    : "rgba(255,255,255,0.11)",
                  border: d.partial ? `1px dashed ${accent}55` : "none",
                  boxShadow: isPeak ? `0 0 14px ${accent}99, 0 0 36px ${accent}44` : "none",
                  opacity: d.partial ? 0.7 : 1,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Year labels */}
      <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
        {data.map((d) => (
          <span key={d.year} style={{ flex: 1, textAlign: "center", fontSize: 10, color: d.partial ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.28)", fontWeight: 500 }}>
            {d.year}{d.partial ? "*" : ""}
          </span>
        ))}
      </div>

      {/* Growth badge */}
      <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "5px 12px", borderRadius: 999,
          background: `${accent}18`,
          border: `1px solid ${accent}35`,
          boxShadow: `0 0 10px ${accent}20`,
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 6l-9.5 9.5-5-5L1 18" /><path d="M17 6h6v6" />
          </svg>
          <span style={{ fontSize: 12, fontWeight: 700, color: accent }}>+70% seit 2021</span>
        </div>
      </div>
    </div>
  );
}

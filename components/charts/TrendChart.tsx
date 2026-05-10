"use client";

import { motion } from "framer-motion";

type Variant = "neukunden" | "bestandskunden";
type Props = { accent: string; variant: Variant };

const datasets: Record<Variant, { title: string; unit: string; rows: { year: string; value: number }[] }> = {
  neukunden: {
    title: "Neukundenquote",
    unit: "%",
    rows: [
      { year: "2022", value: 22 },
      { year: "2023", value: 29 },
      { year: "2024", value: 37 },
      { year: "2025", value: 42 },
      { year: "2026", value: 46 },
    ],
  },
  bestandskunden: {
    title: "Vermittlungsquote Bestandskunden",
    unit: "%",
    rows: [
      { year: "2022", value: 54 },
      { year: "2023", value: 62 },
      { year: "2024", value: 71 },
      { year: "2025", value: 77 },
      { year: "2026", value: 81 },
    ],
  },
};

const CHART_H = 120;

export default function TrendChart({ accent, variant }: Props) {
  const ds = datasets[variant];
  const MAX = Math.max(...ds.rows.map(r => r.value)) * 1.15;
  const first = ds.rows[0].value;
  const last = ds.rows[ds.rows.length - 1].value;
  const diff = last - first;
  const pct = Math.round((diff / first) * 100);

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: `1px solid ${accent}55`,
      borderRadius: 20,
      padding: "22px 28px 16px",
      width: "100%",
      maxWidth: 320,
      boxShadow: `0 0 18px ${accent}40, 0 0 60px ${accent}18, inset 0 0 30px ${accent}06`,
    }}>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 20 }}>
        {ds.title}
      </p>

      {/* Bars */}
      <div style={{ display: "flex", gap: 12, alignItems: "flex-end", height: CHART_H }}>
        {ds.rows.map((d, i) => {
          const barH = (d.value / MAX) * CHART_H;
          const isLast = i === ds.rows.length - 1;
          return (
            <div key={d.year} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                style={{
                  fontSize: 11, fontWeight: 700, marginBottom: 5,
                  color: isLast ? accent : "rgba(255,255,255,0.35)",
                  textShadow: isLast ? `0 0 10px ${accent}` : "none",
                }}
              >
                {d.value}{ds.unit}
              </motion.span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: barH }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.12 }}
                style={{
                  width: "100%",
                  borderRadius: "6px 6px 4px 4px",
                  background: isLast
                    ? `linear-gradient(180deg, ${accent} 0%, ${accent}88 100%)`
                    : `rgba(255,255,255,${0.07 + i * 0.03})`,
                  boxShadow: isLast ? `0 0 14px ${accent}99, 0 0 36px ${accent}44` : "none",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Year labels */}
      <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
        {ds.rows.map((d) => (
          <span key={d.year} style={{ flex: 1, textAlign: "center", fontSize: 10, color: "rgba(255,255,255,0.28)", fontWeight: 500 }}>
            {d.year}
          </span>
        ))}
      </div>

      {/* Badge */}
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
          <span style={{ fontSize: 12, fontWeight: 700, color: accent }}>+{pct}% seit 2021</span>
        </div>
      </div>
    </div>
  );
}

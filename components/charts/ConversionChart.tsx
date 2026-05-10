"use client";

import { motion } from "framer-motion";

type Props = { accent: string };

// Visual: show 5 "leads", then filled circles = placements
// Früher: 2 out of 5 convert (1×), Heute: 4 out of 5 convert (2×)
const TOTAL = 5;
const BEFORE = 2;
const AFTER = 4;

function DotRow({ filled, total, accent, delay }: { filled: number; total: number; accent: string; delay: number }) {
  return (
    <div style={{ display: "flex", gap: 7, marginTop: 10, marginBottom: 6 }}>
      {Array.from({ length: total }).map((_, i) => (
        <motion.div key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: delay + i * 0.07, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 14, height: 14, borderRadius: "50%",
            background: i < filled ? accent : "rgba(255,255,255,0.1)",
            boxShadow: i < filled ? `0 0 8px ${accent}99` : "none",
          }} />
      ))}
    </div>
  );
}

export default function ConversionChart({ accent }: Props) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: `1px solid ${accent}55`,
      borderRadius: 20,
      padding: "22px 28px 22px",
      width: "100%",
      maxWidth: 420,
      boxShadow: `0 0 18px ${accent}40, 0 0 60px ${accent}18, inset 0 0 30px ${accent}06`,
    }}>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 20 }}>
        Q-Lead → Placement
      </p>

      <div style={{ display: "flex", gap: 16 }}>
        {/* Früher */}
        <div style={{ flex: 1, padding: "14px 16px", borderRadius: 14, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", fontWeight: 600, letterSpacing: "0.1em" }}>FRÜHER</span>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            style={{ fontSize: "2.6rem", fontWeight: 900, color: "rgba(255,255,255,0.3)", lineHeight: 1.1, marginTop: 6 }}>
            1×
          </motion.div>
          <DotRow filled={BEFORE} total={TOTAL} accent="rgba(255,255,255,0.25)" delay={0.3} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.28)" }}>{BEFORE} von {TOTAL} Leads</span>
        </div>

        {/* Heute */}
        <div style={{ flex: 1, padding: "14px 16px", borderRadius: 14, background: `${accent}10`, border: `1px solid ${accent}40` }}>
          <span style={{ fontSize: 11, color: accent, fontWeight: 600, letterSpacing: "0.1em" }}>HEUTE</span>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.4 }}
            style={{ fontSize: "2.6rem", fontWeight: 900, color: accent, lineHeight: 1.1, marginTop: 6, textShadow: `0 0 20px ${accent}88` }}>
            2×
          </motion.div>
          <DotRow filled={AFTER} total={TOTAL} accent={accent} delay={0.55} />
          <span style={{ fontSize: 11, color: `${accent}cc` }}>{AFTER} von {TOTAL} Leads</span>
        </div>
      </div>

      {/* Badge */}
      <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "5px 14px", borderRadius: 999,
          background: `${accent}18`, border: `1px solid ${accent}35`,
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

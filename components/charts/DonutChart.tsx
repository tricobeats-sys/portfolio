"use client";

import { motion } from "framer-motion";

type Props = { accent: string };

const R       = 68;
const STROKE  = 14;
const C       = 2 * Math.PI * R;
const SUCCESS = 0.92;
const SIZE    = 200;
const CX      = SIZE / 2;

export default function DonutChart({ accent }: Props) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: `1px solid ${accent}55`,
      borderRadius: 20,
      padding: "22px 28px 20px",
      boxShadow: `0 0 18px ${accent}40, 0 0 60px ${accent}18, inset 0 0 30px ${accent}06`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 16,
    }}>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
        Erfolgsquote
      </p>

      <div style={{ position: "relative" }}>
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          <defs>
            <filter id="donut-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="donut-glow-strong" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Outer decorative ring */}
          <circle cx={CX} cy={CX} r={R + STROKE + 10}
            fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={1} strokeDasharray="3 6"
          />

          {/* Track */}
          <circle cx={CX} cy={CX} r={R}
            fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={STROKE}
          />

          {/* Wide glow arc */}
          <motion.circle
            cx={CX} cy={CX} r={R}
            fill="none"
            stroke={accent}
            strokeWidth={STROKE + 8}
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C}
            style={{ rotate: "-90deg", transformOrigin: `${CX}px ${CX}px`, opacity: 0.25 }}
            filter="url(#donut-glow-strong)"
            animate={{ strokeDashoffset: C * (1 - SUCCESS) }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          />

          {/* Crisp arc */}
          <motion.circle
            cx={CX} cy={CX} r={R}
            fill="none"
            stroke={accent}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C}
            style={{ rotate: "-90deg", transformOrigin: `${CX}px ${CX}px` }}
            filter="url(#donut-glow)"
            animate={{ strokeDashoffset: C * (1 - SUCCESS) }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          />

          {/* End dot glow */}
          <motion.circle
            cx={CX} cy={CX - R}
            r={7}
            fill={accent}
            filter="url(#donut-glow)"
            style={{ transformOrigin: `${CX}px ${CX}px` }}
            initial={{ rotate: "-90deg", opacity: 0 }}
            animate={{ rotate: `${-90 + 360 * SUCCESS}deg`, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          />
        </svg>

        {/* Center label */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        }}>
          <motion.span
            style={{ fontSize: 42, fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-0.03em" }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            92%
          </motion.span>
          <span style={{ fontSize: 11, marginTop: 4, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>
            Erfolg
          </span>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 20, fontSize: 11 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: accent, boxShadow: `0 0 6px ${accent}` }} />
          <span style={{ color: "rgba(255,255,255,0.45)" }}>Erfolgreiche Besetzung</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
          <span style={{ color: "rgba(255,255,255,0.28)" }}>Offen</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";

const data = [
  { year: "22", value: 18 },
  { year: "23", value: 26 },
  { year: "24", value: 34 },
  { year: "25", value: 44 },
  { year: "26", value: 52 },
];

  const MAX = 56;
const W = 420;
const H = 200;
const PAD = { top: 16, right: 12, bottom: 28, left: 8 };
const cW = W - PAD.left - PAD.right;
const cH = H - PAD.top - PAD.bottom;

const pts = data.map((d, i) => ({
  x: PAD.left + (i / (data.length - 1)) * cW,
  y: PAD.top + (1 - d.value / MAX) * cH,
  value: d.value,
  year: d.year,
}));

// Smooth cubic bezier through points
const linePath = pts.reduce((acc, p, i) => {
  if (i === 0) return `M${p.x},${p.y}`;
  const prev = pts[i - 1];
  const cx = (prev.x + p.x) / 2;
  return `${acc} C${cx},${prev.y} ${cx},${p.y} ${p.x},${p.y}`;
}, "");

const areaPath = `${linePath} L${pts[pts.length - 1].x},${PAD.top + cH} L${pts[0].x},${PAD.top + cH} Z`;

type Props = { accent: string };

export default function BarChart({ accent }: Props) {
  const filterId = "bar-glow";
  const gradId   = "bar-area";

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: `1px solid ${accent}55`,
      borderRadius: 20,
      padding: "22px 24px 16px",
      width: "100%",
      maxWidth: 420,
      boxShadow: `0 0 18px ${accent}40, 0 0 60px ${accent}18, inset 0 0 30px ${accent}06`,
    }}>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>
        Vermittlungen pro Jahr
      </p>

      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} overflow="visible">
        <defs>
          <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.22" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Horizontal guide lines */}
        {[0.25, 0.5, 0.75, 1].map(f => (
          <line key={f}
            x1={PAD.left} y1={PAD.top + (1 - f) * cH}
            x2={PAD.left + cW} y2={PAD.top + (1 - f) * cH}
            stroke="rgba(255,255,255,0.06)" strokeWidth={1} strokeDasharray="4 5"
          />
        ))}

        {/* Area fill */}
        <motion.path
          d={areaPath}
          fill={`url(#${gradId})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Glow line (wide, blurred) */}
        <motion.path
          d={linePath}
          fill="none"
          stroke={accent}
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${filterId})`}
          style={{ opacity: 0.45 }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.45 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Crisp line on top */}
        <motion.path
          d={linePath}
          fill="none"
          stroke={accent}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Dots */}
        {pts.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x} cy={p.y} r={4}
            fill="#07090f"
            stroke={accent}
            strokeWidth={2}
            filter={`url(#${filterId})`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 + i * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          />
        ))}

        {/* Year labels */}
        {pts.map((p, i) => (
          <text key={i} x={p.x} y={H - 4} textAnchor="middle"
            fontSize={10} fill="rgba(255,255,255,0.28)" fontWeight={500}>
            {p.year}
          </text>
        ))}
      </svg>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Track } from "@/data/slides";

type Props = { onChoose: (track: Track) => void };

export default function LandingScreen({ onChoose }: Props) {
  const [chosen,  setChosen]  = useState<Track | null>(null);
  const [hovered, setHovered] = useState<Track | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const pick = (id: Track) => {
    if (chosen) return;
    setChosen(id);
    setTimeout(() => onChoose(id), 120);
  };

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: "#07090f" }}>

      {/* Orb 1 */}
      <div className="absolute pointer-events-none" style={{
        width: "75vw", height: "75vw", borderRadius: "50%",
        background: "radial-gradient(circle, #0e8045 0%, transparent 65%)",
        filter: "blur(110px)", opacity: 0.45,
        top: "50%", left: "30%", transform: "translate(-50%, -50%)",
      }} />
      {/* Orb 2 */}
      <div className="absolute pointer-events-none" style={{
        width: "40vw", height: "40vw", borderRadius: "50%",
        background: "radial-gradient(circle, #0a6035 0%, transparent 70%)",
        filter: "blur(90px)", opacity: 0.3,
        top: "0%", right: "5%", transform: "translate(0, -20%)",
      }} />
      {/* Orb 3 */}
      <div className="absolute pointer-events-none" style={{
        width: "35vw", height: "35vw", borderRadius: "50%",
        background: "radial-gradient(circle, #0d6e3a 0%, transparent 70%)",
        filter: "blur(80px)", opacity: 0.35,
        bottom: "5%", right: "15%",
      }} />

      {/* Portrait — right side, only on desktop */}
      <div className="hidden md:block absolute pointer-events-none" style={{
        right: 0, bottom: 0, width: "46vw", maxWidth: 600, height: "95vh",
        mixBlendMode: "screen",
        WebkitMaskImage: "radial-gradient(ellipse 72% 82% at 50% 48%, black 15%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.4) 62%, transparent 78%)",
        maskImage: "radial-gradient(ellipse 72% 82% at 50% 48%, black 15%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.4) 62%, transparent 78%)",
        opacity: 0.75, filter: "contrast(1.6) brightness(0.55) saturate(0.7)",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/portrait.png" alt=""
          style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "right bottom" }} />
      </div>

      {/* Grain */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px", opacity: 0.04, mixBlendMode: "overlay",
        }}
      />

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.45 }}
        className="relative z-20 flex justify-end"
        style={{ padding: "20px 20px" }}
      >
        <GlowButton
          as="a"
          href="/cv.pdf"
          download="Mike_Hammer_Lebenslauf.pdf"
          glowColor="rgba(14,128,69,0.55)"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v13M7 11l5 5 5-5" /><path d="M5 19h14" />
          </svg>
          Lebenslauf
        </GlowButton>
      </motion.div>

      {/* Content — left aligned */}
      <div className="relative z-10 flex-1 flex flex-col items-start justify-center text-left" style={{
        paddingLeft:  isMobile ? "24px" : "clamp(60px, 10vw, 140px)",
        paddingRight: isMobile ? "24px" : "52vw",
      }}>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 32 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt="persona service"
            style={{
              height: 44,
              width: "auto",
              filter: "brightness(0) invert(1)",
              opacity: 0.9,
            }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: isMobile ? "clamp(1rem, 5vw, 1.9rem)" : "clamp(2rem, 2.8vw, 2.8rem)",
            letterSpacing: "-0.025em",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.15,
            marginBottom: 40,
          }}
        >
          Viele Möglichkeiten.
          <br />
          Einige Herausforderungen.
          <br />
          20 Hubs.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.5 }}
          style={{ display: "flex", flexDirection: "row", gap: 12, width: "100%", maxWidth: 380 }}
        >
          <GlowButton
            onClick={() => pick("achievements")}
            onMouseEnter={() => setHovered("achievements")}
            onMouseLeave={() => setHovered(null)}
            glowColor="rgba(255,255,255,0.7)"
            primary
            style={{ flex: 1, opacity: chosen && chosen !== "achievements" ? 0.35 : 1 }}
          >
            Meine Erfolge
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </GlowButton>

          <GlowButton
            onClick={() => pick("goals")}
            onMouseEnter={() => setHovered("goals")}
            onMouseLeave={() => setHovered(null)}
            glowColor="rgba(14,128,69,0.55)"
            style={{ flex: 1, opacity: chosen && chosen !== "goals" ? 0.35 : 1 }}
          >
            Der Weg zum Ziel
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </GlowButton>
        </motion.div>

      </div>
    </div>
  );
}

/* ── Reusable glow button ── */
type GlowBtnProps = {
  as?: "a" | "button";
  href?: string;
  download?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  glowColor: string;
  primary?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

function GlowButton({ as: Tag = "button", glowColor, primary, style, children, ...rest }: GlowBtnProps) {
  const [hov, setHov] = useState(false);

  const base: React.CSSProperties = {
    height: 52,
    padding: "0 22px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 14,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.03em",
    cursor: "pointer",
    transition: "box-shadow 0.2s, transform 0.2s",
    whiteSpace: "nowrap" as const,
    textDecoration: "none",
    background: primary ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.04)",
    color: primary ? "#0d0d0d" : "#fff",
    border: primary
      ? `1px solid rgba(255,255,255,${hov ? "0.95" : "0.8"})`
      : `1px solid ${glowColor}`,
    boxShadow: hov
      ? `0 0 14px ${glowColor}, 0 0 40px ${glowColor.replace(/[\d.]+\)$/, "0.25)")}, 0 0 80px ${glowColor.replace(/[\d.]+\)$/, "0.1)")}, inset 0 0 12px ${glowColor.replace(/[\d.]+\)$/, "0.08)")}`
      : `0 0 8px ${glowColor.replace(/[\d.]+\)$/, "0.35)")}, 0 0 24px ${glowColor.replace(/[\d.]+\)$/, "0.15)")}`,
    transform: hov ? "translateY(-2px)" : "translateY(0)",
    ...style,
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag
      {...rest}
      style={base}
      onMouseEnter={(e: React.MouseEvent) => { setHov(true); (rest as GlowBtnProps).onMouseEnter?.(); }}
      onMouseLeave={(e: React.MouseEvent) => { setHov(false); (rest as GlowBtnProps).onMouseLeave?.(); }}
    >
      {children}
    </Tag>
  );
}

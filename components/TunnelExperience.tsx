"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { achievementSlides, goalSlides, Track } from "@/data/slides";
import BarChart from "@/components/charts/BarChart";
import CompareBar from "@/components/charts/CompareBar";
import RevenueChart from "@/components/charts/RevenueChart";
import ConversionChart from "@/components/charts/ConversionChart";
import TrendChart from "@/components/charts/TrendChart";
import GermanyMap from "@/components/GermanyMap";

type Props = { track: Track; onSwitch: () => void };

const warpVariants = {
  enter: { scale: 0.03, opacity: 1, filter: "blur(3px)" },
  center: {
    scale: 1, opacity: 1, filter: "blur(0px)",
    transition: {
      scale:  { duration: 1.05, ease: [0.22, 0.0, 0.06, 1.0] as [number,number,number,number] },
      filter: { duration: 0.7,  ease: "easeOut" as const },
    },
  },
  exit: {
    scale: 22, opacity: 0, filter: "blur(55px)",
    transition: {
      scale:   { duration: 0.38, ease: [0.55, 0.0, 1.0, 1.0] as [number,number,number,number] },
      opacity: { duration: 0.14, ease: "easeIn" as const },
      filter:  { duration: 0.14, ease: "easeIn" as const },
    },
  },
};

function SlideChart({ slideId, accent }: { slideId: number; accent: string }) {
  if (slideId === 1) return <BarChart accent={accent} />;
  if (slideId === 2) return <RevenueChart accent={accent} />;
  if (slideId === 3) return <CompareBar accent={accent} />;
  if (slideId === 4) return <ConversionChart accent={accent} />;
  if (slideId === 5) return <TrendChart accent={accent} variant="neukunden" />;
  if (slideId === 6) return <TrendChart accent={accent} variant="bestandskunden" />;
  return null;
}

function HighlightedText({ text, highlights, accent }: { text: string; highlights?: string[]; accent: string }) {
  if (!highlights?.length) return <>{text}</>;
  const escaped = highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "g");
  const parts = text.split(regex).filter(Boolean);
  return (
    <>
      {parts.map((p, i) =>
        highlights.includes(p) ? (
          <span key={i} style={{ color: accent }}>{p}</span>
        ) : p
      )}
    </>
  );
}

export default function TunnelExperience({ track, onSwitch }: Props) {
  const slides  = track === "achievements" ? achievementSlides : goalSlides;
  const [index,  setIndex]  = useState(0);
  const [locked, setLocked] = useState(false);
  const [flash,  setFlash]  = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const slide    = slides[index];
  const isLast   = index === slides.length - 1;
  const isFirst  = index === 0;
  const progress = index / (slides.length - 1);
  const hasChart = track === "achievements" && slide.category === "achievement";

  useEffect(() => { setIsExpanded(false); }, [slide.id]);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 70, damping: 18 });
  const springY = useSpring(cursorY, { stiffness: 70, damping: 18 });
  useEffect(() => {
    const h = (e: MouseEvent) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, [cursorX, cursorY]);

  const advance = useCallback((delta: 1 | -1) => {
    if (locked) return;
    const next = index + delta;
    if (next < 0 || next >= slides.length) return;
    setLocked(true);
    setFlash(true);
    setTimeout(() => setFlash(false), 140);
    setIndex(next);
    setTimeout(() => setLocked(false), 750);
  }, [index, locked, slides.length]);

  // Touch swipe
  const touchStartX = useMotionValue(0);
  useEffect(() => {
    const onStart = (e: TouchEvent) => { touchStartX.set(e.touches[0].clientX); };
    const onEnd = (e: TouchEvent) => {
      const diff = touchStartX.get() - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) advance(diff > 0 ? 1 : -1);
    };
    window.addEventListener("touchstart", onStart);
    window.addEventListener("touchend", onEnd);
    return () => { window.removeEventListener("touchstart", onStart); window.removeEventListener("touchend", onEnd); };
  }, [advance, touchStartX]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (["ArrowRight","ArrowDown"," "].includes(e.key)) { e.preventDefault(); advance(1); }
      if (["ArrowLeft","ArrowUp"].includes(e.key))        { e.preventDefault(); advance(-1); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [advance]);

  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ perspective: "1200px" }}>

      {/* Cursor glow */}
      <motion.div className="pointer-events-none fixed z-50 w-72 h-72 rounded-full"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%",
          background: `radial-gradient(circle, ${slide.accent}18 0%, transparent 70%)` }} />

      {/* Background */}
      <div className="absolute inset-0" style={{ background: "#07090f" }} />

      {/* Orb */}
      <AnimatePresence>
        <motion.div key={`orb-${slide.id}`} className="absolute pointer-events-none"
          style={{ width: "85vw", height: "85vw", borderRadius: "50%",
            background: `radial-gradient(circle, ${slide.accent}45 0%, transparent 65%)`,
            filter: "blur(120px)", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }} />
      </AnimatePresence>
      <AnimatePresence>
        <motion.div key={`orb2-${slide.id}`} className="absolute pointer-events-none"
          style={{ width: "40vw", height: "40vw", borderRadius: "50%",
            background: `radial-gradient(circle, ${slide.accent}22 0%, transparent 70%)`,
            filter: "blur(80px)", top: "10%", right: "8%" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }} />
      </AnimatePresence>

      {/* Grain */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px", opacity: 0.05, mixBlendMode: "overlay" }} />

      {/* Flash */}
      <motion.div className="absolute inset-0 pointer-events-none z-40 bg-white"
        animate={{ opacity: flash ? 0.08 : 0 }} transition={{ duration: 0.1 }} />

      {/* Speed pulse */}
      <motion.div className="absolute inset-0 pointer-events-none z-30"
        animate={{ opacity: flash ? 1 : 0, scale: flash ? 1.06 : 1 }}
        transition={{ duration: 0.12 }}
        style={{ background: `radial-gradient(ellipse 45% 35% at 50% 50%, transparent 35%, ${slide.accent}10 68%, transparent 100%)` }} />

      {/* ── Content ── */}
      <div className="absolute inset-0 flex items-center justify-center"
        style={{
          padding: slide.category === "map" ? 0 : (isMobile ? "72px 24px 64px" : "112px 40px 96px"),
          transformStyle: "preserve-3d",
        }}>
        <AnimatePresence mode="wait">
          <motion.div key={slide.id} variants={warpVariants} initial="enter" animate="center" exit="exit"
            style={{
              willChange: "transform, opacity, filter",
              ...(slide.category === "map"
                ? { width: "100%", height: "100%", maxWidth: "unset" }
                : { width: "100%", maxWidth: "72rem" }),
            }}>

            {hasChart ? (
              /* ── Achievement: split layout ── */
              <div className={isMobile ? "" : "flex flex-row items-center"} style={isMobile ? {} : { justifyContent: "space-between", gap: 64 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left", flex: isMobile ? undefined : "0 1 420px", minWidth: 0 }}>
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28, duration: 0.35 }}
                    style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                    <span style={{ height: 1, width: 20, opacity: 0.4, background: slide.accent, display: "block" }} />
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: slide.accent }}>{slide.number}</span>
                    <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}>{slide.eyebrow}</span>
                  </motion.div>
                  <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.34, duration: 0.45 }}
                    style={{ fontWeight: 900, color: "#fff", lineHeight: 1.05, marginBottom: 20,
                      fontSize: isMobile ? "clamp(2rem, 8vw, 2.6rem)" : "clamp(2.8rem, 4.8vw, 5rem)",
                      whiteSpace: "pre-line", textShadow: `0 0 60px ${slide.accent}55` }}>
                    <HighlightedText text={slide.headline} highlights={slide.highlights} accent={slide.accent} />
                  </motion.h1>
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.44, duration: 0.4 }}
                    style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.8, fontSize: isMobile ? 14 : 17, maxWidth: 400 }}>
                    {slide.sub}
                  </motion.p>
                </div>
                {!isMobile && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-shrink-0 flex items-center justify-end" style={{ flex: "0 1 auto" }}>
                    <SlideChart slideId={slide.id} accent={slide.accent} />
                  </motion.div>
                )}
              </div>

            ) : slide.category === "map" ? (
              /* ── Full-screen Germany Map (no text) ── */
              <div style={{ position: "absolute", inset: 0 }}>
                <GermanyMap accent={slide.accent} />
              </div>

            ) : slide.category === "closing" ? (
              /* ── Closing ── */
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center">
                <NeonButton glowColor="rgba(255,255,255,0.75)" primary onClick={onSwitch}>
                  {track === "achievements" ? (
                    <span>So bringe ich <strong style={{ fontWeight: 900 }}>Persona Service</strong> voran</span>
                  ) : "Meine Erfolge"}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </NeonButton>
              </motion.div>

            ) : slide.category === "accordion" ? (
              /* ── Accordion ── */
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", maxWidth: 680 }}>
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.35 }}
                  style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                  <span style={{ height: 1, width: 20, opacity: 0.4, background: slide.accent, display: "block" }} />
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: slide.accent }}>{slide.number}</span>
                  <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}>{slide.eyebrow}</span>
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.34, duration: 0.45 }}
                  style={{ fontWeight: 900, color: "#fff", lineHeight: 1.0, marginBottom: 28,
                    fontSize: isExpanded
                      ? (isMobile ? "clamp(1.4rem, 5vw, 1.6rem)" : "clamp(2rem, 3.5vw, 3.5rem)")
                      : (isMobile ? "clamp(1.8rem, 7vw, 2.4rem)" : "clamp(3rem, 5.5vw, 5.5rem)"),
                    whiteSpace: "pre-line", transition: "font-size 0.35s ease" }}>
                  <HighlightedText text={slide.headline} highlights={slide.highlights} accent={slide.accent} />
                </motion.h1>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden", marginBottom: 32 }}>
                      <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.85, fontSize: 16, marginBottom: slide.bullets ? 20 : 0 }}>{slide.sub}</p>
                      {slide.bullets && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
                          {slide.bullets.map((b, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.15 + i * 0.12, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                              style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                              <span style={{ color: slide.accent, fontWeight: 700, fontSize: 14, marginTop: 2, flexShrink: 0 }}>—</span>
                              <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 1.7 }}>{b}</span>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48, duration: 0.4 }}>
                  <button onClick={() => setIsExpanded(e => !e)} style={{
                    display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px",
                    borderRadius: 10, cursor: "pointer",
                    background: isExpanded ? `${slide.accent}18` : "rgba(255,255,255,0.05)",
                    border: `1px solid ${isExpanded ? slide.accent + "55" : "rgba(255,255,255,0.12)"}`,
                    color: isExpanded ? slide.accent : "rgba(255,255,255,0.55)",
                    fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", transition: "all 0.2s",
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                    {isExpanded ? "Einklappen" : "Ausklappen"}
                  </button>
                </motion.div>
              </div>

            ) : slide.category === "phases" ? (
              /* ── Phases: 3 columns (desktop) / stacked (mobile) ── */
              <div style={{ width: "100%", maxWidth: 900, margin: "0 auto" }}>
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }} style={{ marginBottom: isMobile ? 20 : 32, textAlign: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ height: 1, width: 20, opacity: 0.4, background: slide.accent, display: "block" }} />
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: slide.accent }}>{slide.number}</span>
                    <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}>{slide.eyebrow}</span>
                    <span style={{ height: 1, width: 20, opacity: 0.4, background: slide.accent, display: "block" }} />
                  </div>
                  <h1 style={{ fontWeight: 900, color: "#fff", lineHeight: 1.0, fontSize: isMobile ? "clamp(1.5rem, 6vw, 1.9rem)" : "clamp(2.5rem, 4.2vw, 4.2rem)", whiteSpace: "pre-line", textShadow: `0 0 60px ${slide.accent}55` }}>
                    <HighlightedText text={slide.headline} highlights={slide.highlights} accent={slide.accent} />
                  </h1>
                </motion.div>
                <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 10 }}>
                  {slide.phases?.map((phase, i) => (
                    <motion.div key={phase.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 + i * 0.22, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        flex: 1,
                        background: "rgba(255,255,255,0.03)",
                        border: `1px solid ${slide.accent}30`,
                        borderRadius: 16,
                        padding: isMobile ? "16px 16px" : "24px 20px",
                        boxShadow: `0 0 18px ${slide.accent}20, inset 0 0 30px ${slide.accent}05`,
                      }}>
                      <div style={{ display: "flex", alignItems: isMobile ? "center" : "flex-start", gap: isMobile ? 12 : 0, flexDirection: isMobile ? "row" : "column" }}>
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: slide.accent, display: "block", marginBottom: isMobile ? 0 : 10, flexShrink: 0 }}>0{i + 1}</span>
                        <h3 style={{ fontSize: isMobile ? 14 : 16, fontWeight: 800, color: "#fff", marginBottom: isMobile ? 0 : 14, letterSpacing: "-0.01em" }}>{phase.title}</h3>
                      </div>
                      {!isMobile && <div style={{ width: 28, height: 1, background: `${slide.accent}50`, marginBottom: 14 }} />}
                      {!isMobile && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                          {phase.bullets.map((b, j) => (
                            <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                              <span style={{ color: slide.accent, fontSize: 11, marginTop: 4, flexShrink: 0 }}>▸</span>
                              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>{b}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

            ) : slide.category === "quote_slide" ? (
              /* ── Quote ── */
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.35 }}
                  style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
                  <span style={{ height: 1, width: 20, opacity: 0.4, background: slide.accent, display: "block" }} />
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: slide.accent }}>{slide.number}</span>
                  <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}>{slide.eyebrow}</span>
                  <span style={{ height: 1, width: 20, opacity: 0.4, background: slide.accent, display: "block" }} />
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.34, duration: 0.5 }}
                  style={{ fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 28,
                    fontSize: isMobile ? "clamp(1.6rem, 6.5vw, 2.2rem)" : "clamp(2.5rem, 4.5vw, 4.5rem)",
                    textShadow: `0 0 70px ${slide.accent}55` }}>
                  <HighlightedText text={slide.headline} highlights={slide.highlights} accent={slide.accent} />
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  style={{ color: "rgba(255,255,255,0.4)", fontSize: isMobile ? 15 : 17, lineHeight: 1.8, fontStyle: "italic", whiteSpace: "pre-line", textAlign: "center" }}>
                  {slide.quoteSmall}
                </motion.p>
              </div>

            ) : (
              /* ── Centered value layout ── */
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: 672, margin: "0 auto" }}>
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.35 }}
                  style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
                  <span style={{ height: 1, width: 20, opacity: 0.4, background: slide.accent, display: "block" }} />
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: slide.accent }}>{slide.number}</span>
                  <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}>{slide.eyebrow}</span>
                  <span style={{ height: 1, width: 20, opacity: 0.4, background: slide.accent, display: "block" }} />
                </motion.div>
                {slide.metric && (
                  <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.33, duration: 0.3 }}
                    style={{ display: "inline-flex", alignItems: "baseline", gap: 8, marginBottom: 28, padding: "10px 24px",
                      borderRadius: 999, background: `${slide.accent}15`, border: `1px solid ${slide.accent}35` }}>
                    <span style={{ fontSize: "1.5rem", fontWeight: 900, color: slide.accent }}>{slide.metric}</span>
                    <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.4)" }}>{slide.metricLabel}</span>
                  </motion.div>
                )}
                <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.36, duration: 0.45 }}
                  style={{ fontWeight: 900, color: "#fff", lineHeight: 0.95, marginBottom: 28,
                    fontSize: isMobile ? "clamp(2rem, 9vw, 3rem)" : "clamp(3rem, 5.5vw, 5.5rem)",
                    whiteSpace: "pre-line", textShadow: `0 0 70px ${slide.accent}55` }}>
                  <HighlightedText text={slide.headline} highlights={slide.highlights} accent={slide.accent} />
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.46, duration: 0.4 }}
                  style={{ color: "rgba(255,255,255,0.48)", lineHeight: 1.85, maxWidth: 520, fontSize: isMobile ? 14 : 17 }}>
                  {slide.sub}
                </motion.p>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom bar ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="relative w-full h-px" style={{ background: "rgba(255,255,255,0.06)" }}>
          <motion.div className="absolute left-0 top-0 h-full" style={{ background: slide.accent }}
            animate={{ width: `${progress * 100}%` }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />
        </div>
        <div className="flex items-center justify-between px-4 md:px-10 py-3 md:py-4">
          <div style={{ width: 44 }} />
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button key={i}
                onClick={() => { if (!locked) { setIndex(i); setFlash(true); setTimeout(() => setFlash(false), 140); } }}
                aria-label={`Folie ${i + 1}`} className="flex items-center justify-center" style={{ width: 20, height: 20 }}>
                <div className="rounded-full transition-all duration-300"
                  style={{ width: i === index ? 18 : 5, height: 5,
                    background: i === index ? slide.accent : "rgba(255,255,255,0.2)",
                    boxShadow: i === index ? `0 0 8px ${slide.accent}` : "none" }} />
              </button>
            ))}
          </div>
          <div style={{ width: 44 }} />
        </div>
      </div>

      {/* ── Side arrows — desktop only ── */}
      <div className="hidden md:block absolute left-0 z-30" style={{ top: "50%", transform: "translateY(-50%)", paddingLeft: 20 }}>
        <NeonIconButton onClick={() => advance(-1)} disabled={isFirst || locked} glowColor={`${slide.accent}99`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "rotate(180deg)" }}>
            <path d="M9 5l7 7-7 7" />
          </svg>
        </NeonIconButton>
      </div>
      <div className="hidden md:block absolute right-0 z-30" style={{ top: "50%", transform: "translateY(-50%)", paddingRight: 20 }}>
        <NeonIconButton onClick={() => advance(1)} disabled={isLast || locked} glowColor={`${slide.accent}cc`} filled={!isLast} fillColor={slide.accent}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </NeonIconButton>
      </div>

      {index === 0 && !locked && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: [0, 0.3, 0] }}
          transition={{ delay: 2, duration: 2.5, repeat: 2 }}
          className="absolute pointer-events-none whitespace-nowrap hidden md:block"
          style={{ bottom: 76, left: "50%", transform: "translateX(-50%)",
            color: "rgba(255,255,255,0.22)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Pfeiltaste oder Klick →
        </motion.p>
      )}
      {index === 0 && !locked && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: [0, 0.85, 0.85, 0] }}
          transition={{ delay: 1.2, duration: 3.5, times: [0, 0.15, 0.85, 1], repeat: 2 }}
          className="absolute pointer-events-none md:hidden"
          style={{ bottom: 68, left: "50%", transform: "translateX(-50%)" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "8px 16px", borderRadius: 999,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M15 8l4 4-4 4" />
            </svg>
            <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
              Wischen zum Weiterblättern
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function NeonButton({ glowColor, primary, onClick, children }: {
  glowColor: string; primary?: boolean; onClick?: () => void; children: React.ReactNode;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        height: 52, padding: "0 28px", display: "inline-flex", alignItems: "center", gap: 10,
        borderRadius: 14, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap",
        background: primary ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.04)",
        color: primary ? "#0d0d0d" : "#fff", border: `1px solid ${glowColor}`,
        boxShadow: hov
          ? `0 0 16px ${glowColor}, 0 0 48px ${glowColor.replace(/[\d.a-f]+\)$/i, "0.2)")}, inset 0 0 12px ${glowColor.replace(/[\d.a-f]+\)$/i, "0.08)")}`
          : `0 0 8px ${glowColor.replace(/[\d.a-f]+\)$/i, "0.35)")}, 0 0 24px ${glowColor.replace(/[\d.a-f]+\)$/i, "0.12)")}`,
        transform: hov ? "translateY(-2px)" : "none",
      }}>
      {children}
    </button>
  );
}

function NeonIconButton({ glowColor, filled, fillColor, onClick, disabled, children }: {
  glowColor: string; filled?: boolean; fillColor?: string;
  onClick?: () => void; disabled?: boolean; children: React.ReactNode;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
        borderRadius: 12, cursor: disabled ? "not-allowed" : "pointer", transition: "all 0.2s",
        opacity: disabled ? 0.15 : 1,
        background: filled ? fillColor : "rgba(255,255,255,0.04)",
        color: filled ? "#000" : "#fff",
        border: filled ? "none" : `1px solid ${glowColor}`,
        boxShadow: hov && !disabled
          ? `0 0 14px ${glowColor}, 0 0 40px ${glowColor.replace(/[\d.a-f]+\)$/i, "0.2)")}, inset 0 0 10px ${glowColor.replace(/[\d.a-f]+\)$/i, "0.08)")}`
          : filled
            ? `0 0 12px ${glowColor}, 0 0 32px ${glowColor.replace(/[\d.a-f]+\)$/i, "0.2)")}`
            : `0 0 6px ${glowColor.replace(/[\d.a-f]+\)$/i, "0.3)")}`,
        transform: hov && !disabled ? "translateY(-1px)" : "none",
      }}>
      {children}
    </button>
  );
}

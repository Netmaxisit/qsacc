"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";

// ── Bar data — matches reference: tall-gold, short-teal, tallest-gold, shortest-teal, tall-teal, tall-gold ──
// Heights are % of chart area (185px). Values > 100 overflow above the card header.
const BARS = [
  { h: 106, grad: "linear-gradient(to top, #C4A05A, #E8CA8A)" },
  { h: 36,  grad: "linear-gradient(to top, #0A3F4A, #1A7A8C)" },
  { h: 114, grad: "linear-gradient(to top, #C4A05A, #E8CA8A)" },
  { h: 24,  grad: "linear-gradient(to top, #0A3F4A, #1A7A8C)" },
  { h: 82,  grad: "linear-gradient(to top, #0A3F4A, #1A7A8C)" },
  { h: 110, grad: "linear-gradient(to top, #C4A05A, #E8CA8A)" },
];

const CHART_H = 185; // px — bar container height

// ── Trend line sits in lower portion of chart (not on bar tops) ──
// Starts ~50%, dips to ~72%, rises to ~42% from top
const LINE  = `M 0,92 C 30,98 60,118 100,126 C 140,134 160,128 200,110 C 240,92 270,80 300,76`;
const LFILL = `${LINE} L 300,${CHART_H} L 0,${CHART_H} Z`;

// ── Calculator keys ──
const CALC_ROWS = [
  [
    { label: "C", bg: "rgba(254,226,226,0.9)", color: "#DC2626" },
    { label: "%", bg: "rgba(14,93,107,0.13)",  color: "#0E5D6B" },
    { label: "÷", bg: "rgba(14,93,107,0.13)",  color: "#0E5D6B" },
  ],
  [{ label: "7", bg: "#F1F5F9", color: "#334155" }, { label: "8", bg: "#F1F5F9", color: "#334155" }, { label: "9", bg: "#F1F5F9", color: "#334155" }],
  [{ label: "4", bg: "#F1F5F9", color: "#334155" }, { label: "5", bg: "#F1F5F9", color: "#334155" }, { label: "6", bg: "#F1F5F9", color: "#334155" }],
  [{ label: "1", bg: "#F1F5F9", color: "#334155" }, { label: "2", bg: "#F1F5F9", color: "#334155" }, { label: "3", bg: "#F1F5F9", color: "#334155" }],
];

function CalcDisplay({ go }: { go: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!go) return;
    const target = 2450, start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1600, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    const id = setTimeout(() => requestAnimationFrame(tick), 700);
    return () => clearTimeout(id);
  }, [go]);
  return <span>£{val.toLocaleString("en-GB")}</span>;
}

export default function HeroGraphic() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    // Container slightly taller to show bar overflow above card
    <div ref={ref} className="relative select-none" style={{ width: 390, height: 380 }}>

      {/* ── Ambient glow ── */}
      <div className="absolute pointer-events-none" style={{
        inset: -60,
        background: "radial-gradient(ellipse at 55% 50%, rgba(14,93,107,0.2) 0%, rgba(211,178,103,0.08) 45%, transparent 68%)",
        filter: "blur(32px)", zIndex: 0,
      }} />

      {/* ── Floating £ coin ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0, y: 14 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.2, type: "spring", stiffness: 220, damping: 14 }}
        className="absolute z-30" style={{ top: 2, left: 50 }}
      >
        <motion.div
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-2xl"
          style={{ background: "linear-gradient(145deg,#E8CA8A,#D3B267)", color: "#0A3F4A", boxShadow: "0 10px 28px rgba(211,178,103,0.55)" }}
        >£</motion.div>
      </motion.div>

      {/* ── Main chart card (overflow VISIBLE so tall bars emerge above) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 26 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute z-10"
        style={{
          top: 30, left: 0, right: 88,
          borderRadius: 24,
          overflow: "visible",          // ← bars overflow above card
          background: "#fff",
          border: "1.5px solid rgba(14,93,107,0.1)",
          boxShadow: "0 24px 60px rgba(14,93,107,0.18), 0 4px 16px rgba(0,0,0,0.06)",
        }}
      >
        {/* ── Teal header band — sits ON TOP of bars (z-index 20) ── */}
        <div
          className="relative flex items-center gap-2 px-5"
          style={{
            height: 36, zIndex: 20,
            background: "linear-gradient(90deg,#0A3F4A,#0E5D6B)",
            borderRadius: "22px 22px 0 0",
          }}
        >
          {["rgba(255,255,255,0.7)", "#D3B267", "rgba(255,255,255,0.25)"].map((c, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
          ))}
          <div className="ml-2 h-1.5 flex-1 rounded-full opacity-20" style={{ background: "#fff" }} />
        </div>

        {/* ── Chart area ── */}
        <div
          className="relative"
          style={{
            height: CHART_H,
            overflow: "visible",          // bars taller than 100% emerge above
            padding: "0 10px 10px",
          }}
        >
          {/* Guide lines */}
          {[0.3, 0.6].map((t, i) => (
            <div key={i} className="absolute left-2 right-2" style={{
              top: `${t * 100}%`, height: 1, background: "rgba(14,93,107,0.05)", zIndex: 1,
            }} />
          ))}

          {/* ── Bars — spring-bounce, anchored to bottom ── */}
          <div
            className="absolute left-2.5 right-2.5 bottom-2.5 flex items-end"
            style={{ gap: 4, overflow: "visible" }}
          >
            {BARS.map((bar, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={inView ? { scaleY: 1, opacity: 1 } : {}}
                transition={{
                  delay: 0.4 + i * 0.11,
                  type: "spring",
                  stiffness: 85,
                  damping: 8,           // overshoot = growth "pop" effect
                }}
                style={{
                  flex: 1,
                  height: `${bar.h}%`,  // tall bars overflow above container
                  background: bar.grad,
                  borderRadius: "5px 5px 2px 2px",
                  transformOrigin: "bottom",
                  zIndex: 5,
                }}
              />
            ))}
          </div>

          {/* ── Trend line SVG (lower portion, visually over bars) ── */}
          <svg
            className="absolute pointer-events-none"
            style={{ top: 0, left: 10, right: 10, width: "calc(100% - 20px)", height: "100%", zIndex: 15 }}
            viewBox={`0 0 300 ${CHART_H}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#0E5D6B" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#0E5D6B" stopOpacity="0.01" />
              </linearGradient>
            </defs>
            <motion.path
              d={LFILL} fill="url(#trend-fill)"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 2.5 }}
            />
            <motion.path
              d={LINE}
              fill="none" stroke="#0E5D6B" strokeWidth="2.6"
              strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.5, delay: 1.1, ease: "easeInOut" }}
            />
            {/* Moving dot at line tip */}
            <motion.circle
              cx={300} cy={76} r={5}
              fill="white" stroke="#0E5D6B" strokeWidth="2.4"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 2.65, type: "spring", stiffness: 280 }}
            />
            <motion.circle
              cx={300} cy={76} r={5}
              fill="none" stroke="#0E5D6B" strokeWidth="1.5"
              initial={{ scale: 1, opacity: 0 }}
              animate={inView ? { scale: [1, 3], opacity: [0.6, 0] } : {}}
              transition={{ duration: 1.5, delay: 2.75, repeat: Infinity, ease: "easeOut" }}
            />
          </svg>
        </div>
      </motion.div>

      {/* ── Calculator card ── */}
      <motion.div
        initial={{ opacity: 0, x: 22, y: -16 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute z-20 rounded-2xl overflow-hidden"
        style={{
          top: 0, right: 0, width: 100,
          background: "rgba(255,255,255,0.98)",
          border: "1.5px solid rgba(14,93,107,0.12)",
          boxShadow: "0 14px 40px rgba(14,93,107,0.18)",
        }}
      >
        {/* Display */}
        <div className="px-3 pt-3 pb-2 text-right" style={{
          background: "linear-gradient(135deg,rgba(14,93,107,0.07),rgba(211,178,103,0.09))",
          borderBottom: "1px solid rgba(14,93,107,0.08)",
        }}>
          <div className="text-[9px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: "#94A3B8" }}>TAX SAVED</div>
          <div className="text-sm font-bold" style={{ color: "#0E5D6B", lineHeight: 1 }}>
            <CalcDisplay go={inView} />
          </div>
        </div>
        {/* Keys */}
        <div className="p-2.5 flex flex-col gap-1.5">
          {CALC_ROWS.map((row, ri) => (
            <div key={ri} className="flex gap-1.5">
              {row.map((key, ki) => (
                <motion.div
                  key={ki}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.22, type: "spring", stiffness: 220, delay: 0.85 + (ri * 3 + ki) * 0.04 }}
                  className="flex-1 flex items-center justify-center rounded-lg font-semibold cursor-default"
                  style={{ height: 22, background: key.bg, color: key.color, fontSize: 11 }}
                >{key.label}</motion.div>
              ))}
            </div>
          ))}
          <div className="flex gap-1.5">
            {[
              { label: "0", flex: 2, bg: "#F1F5F9", color: "#334155" },
              { label: ".", flex: 1, bg: "#F1F5F9", color: "#334155" },
              { label: "=", flex: 1, bg: "linear-gradient(135deg,#E8CA8A,#D3B267)", color: "#0A3F4A" },
            ].map((k, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.22, type: "spring", stiffness: 220, delay: 1.46 + i * 0.05 }}
                className="flex items-center justify-center rounded-lg font-bold cursor-default"
                style={{ flex: k.flex, height: 22, background: k.bg, color: k.color, fontSize: 11 }}
              >{k.label}</motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Growth badge ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute z-30 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl"
        style={{
          top: 168, right: -4,
          background: "rgba(255,255,255,0.98)",
          border: "1.5px solid rgba(14,93,107,0.1)",
          boxShadow: "0 8px 28px rgba(14,93,107,0.15)",
        }}
      >
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(34,197,94,0.12)" }}>
          <TrendingUp size={15} style={{ color: "#16A34A" }} />
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#94A3B8" }}>Growth</div>
          <motion.div className="text-sm font-bold" style={{ color: "#16A34A" }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 2.2 }}>
            +24.5%
          </motion.div>
        </div>
      </motion.div>

      {/* ── Tax Saved badge (bottom-left) ── */}
      <motion.div
        initial={{ opacity: 0, x: -22, y: 8 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute z-30 flex items-center gap-3 px-4 py-3 rounded-2xl"
        style={{
          bottom: 6, left: -14,
          background: "rgba(255,255,255,0.98)",
          border: "1.5px solid rgba(14,93,107,0.1)",
          boxShadow: "0 8px 28px rgba(14,93,107,0.14)",
        }}
      >
        <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base"
          style={{ background: "rgba(14,93,107,0.1)", color: "#0E5D6B" }}>£</div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#94A3B8" }}>Tax Saved</div>
          <div className="text-sm font-bold" style={{ color: "#1A2B2E" }}>£12,450</div>
        </div>
      </motion.div>

      {/* ── Floating orbs ── */}
      <motion.div animate={{ y: [-5, 5, -5], x: [0, 3, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute rounded-full pointer-events-none"
        style={{ width: 10, height: 10, bottom: 68, right: 22, background: "#D3B267", opacity: 0.6, boxShadow: "0 0 16px rgba(211,178,103,0.7)", zIndex: 0 }}
      />
      <motion.div animate={{ y: [3, -5, 3] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="absolute rounded-full pointer-events-none"
        style={{ width: 7, height: 7, top: 80, left: 14, background: "#0E5D6B", opacity: 0.5, boxShadow: "0 0 12px rgba(14,93,107,0.65)", zIndex: 0 }}
      />
    </div>
  );
}

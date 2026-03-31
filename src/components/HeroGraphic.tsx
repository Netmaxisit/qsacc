"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";

// ── Data ──
const MONTHLY_DATA = [42, 55, 38, 70, 65, 80, 74, 88, 62, 95, 85, 100];
const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

const TICKER_ITEMS = [
  "Self Assessment submitted on time",
  "Corporation Tax return filed — £0 penalty",
  "Payroll processed · 12 employees",
  "VAT return filed before deadline",
  "Bookkeeping up to date — all accounts reconciled",
];

// ── Animated number counter ──
function AnimatedNumber({
  target,
  decimals = 0,
  suffix = "",
}: {
  target: number;
  decimals?: number;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    const start = performance.now();
    const duration = 800;

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target * 10) / 10);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setHasAnimated(true);
      }
    };

    requestAnimationFrame(animate);
  }, [target, hasAnimated]);

  return <span>{display.toFixed(decimals)}{suffix}</span>;
}

// ── Pre-compute bar heights (deterministic) ──
function useBarData() {
  return useMemo(() => {
    const max = Math.max(...MONTHLY_DATA);
    return MONTHLY_DATA.map((value, i) => ({
      value,
      height: Math.round((value / max) * 68),
      isHigh: value >= 80,
      delay: i * 0.05,
      month: MONTHS[i],
    }));
  }, []);
}

export default function HeroGraphic() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduce = useReducedMotion();
  const barData = useBarData();

  // Ticker animation state
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    if (!inView || shouldReduce) return;
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % TICKER_ITEMS.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [inView, shouldReduce]);

  const currentTicker = TICKER_ITEMS[tickerIndex];

  return (
    <div
      ref={ref}
      className="relative select-none"
      style={{
        width: "100%",
        maxWidth: 420,
        minHeight: 420,
        margin: "0 auto",
        padding: "20px 0",
      }}
    >
      {/* ── Ambient background ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: -60,
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(14,93,107,0.2) 0%, rgba(211,178,103,0.05) 50%, transparent 70%)",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      {/* ── Corner decorative arcs ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: -40,
          right: -40,
          width: 140,
          height: 140,
          border: "1px solid rgba(211,178,103,0.1)",
          borderRadius: "50%",
          zIndex: 1,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: -70,
          right: -70,
          width: 200,
          height: 200,
          border: "1px solid rgba(211,178,103,0.06)",
          borderRadius: "50%",
          zIndex: 1,
        }}
      />

      {/* ── Main card ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative z-10"
        style={{
          background:
            "linear-gradient(175deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)",
          border: "1.5px solid rgba(211,178,103,0.18)",
          borderRadius: 20,
          backdropFilter: "blur(16px)",
          boxShadow:
            "0 24px 60px rgba(10,63,74,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
          padding: 24,
        }}
      >
        {/* ── Top strip ── */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "rgba(211,178,103,0.15)",
                border: "1px solid rgba(211,178,103,0.3)",
              }}
            >
              <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                <rect
                  x="2"
                  y="2"
                  width="5"
                  height="6"
                  rx="1"
                  fill="#D3B267"
                  opacity={0.8}
                />
                <rect
                  x="9"
                  y="2"
                  width="5"
                  height="6"
                  rx="1"
                  fill="#D3B267"
                  opacity={0.5}
                />
                <rect
                  x="2"
                  y="10"
                  width="12"
                  height="4"
                  rx="1"
                  fill="#D3B267"
                  opacity={0.9}
                />
              </svg>
            </div>
            <div>
              <div
                className="text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Accounting & Tax Dashboard
              </div>
              <div className="text-sm font-bold" style={{ color: "#fff" }}>
                Real-time overview
              </div>
            </div>
          </div>

          {/* Live badge */}
          <div
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-full"
            style={{
              background: "rgba(14,93,107,0.5)",
              border: "1px solid rgba(211,178,103,0.25)",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#4caf7d" }}
            />
            <span className="text-[9px] font-semibold" style={{ color: "#D3B267" }}>
              Live
            </span>
          </div>
        </div>

        {/* ── Visual area ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
          {/* ── Left column ── */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            {/* KPI row */}
            <div className="grid grid-cols-2 gap-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="p-2.5 rounded-lg border"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(211,178,103,0.15)",
                }}
              >
                <div className="text-[8px] uppercase tracking-wider mb-1" style={{ color: "rgba(211,178,103,0.6)" }}>
                  Tax Saved
                </div>
                <div className="text-lg font-bold" style={{ color: "#D3B267" }}>
                  £<AnimatedNumber target={18.4} decimals={1} suffix="k" />
                </div>
                <div className="text-[9px] mt-1" style={{ color: "#4cdd8e" }}>
                  ↑ 12% vs last yr
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-2.5 rounded-lg border"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(211,178,103,0.15)",
                }}
              >
                <div className="text-[8px] uppercase tracking-wider mb-1" style={{ color: "rgba(211,178,103,0.6)" }}>
                  Compliance
                </div>
                <div className="text-lg font-bold" style={{ color: "#D3B267" }}>
                  100%
                </div>
                <div className="text-[9px] mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                  MTD & SA ready
                </div>
              </motion.div>
            </div>

            {/* Bar chart */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="rounded-lg border p-2.5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(211,178,103,0.12)",
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-[9px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Monthly Revenue
                </div>
                <div className="text-[8px] px-1.5 py-0.5 rounded" style={{ background: "rgba(211,178,103,0.15)", color: "rgba(211,178,103,0.7)" }}>
                  FY 2025
                </div>
              </div>

              <div
                className="flex items-end gap-1"
                style={{ height: 72 }}
              >
                {barData.map((bar, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    {/* Bar */}
                    <motion.div
                      className="w-full rounded-t-sm"
                      style={{
                        background: bar.isHigh
                          ? "linear-gradient(to top, #D3B267CC, #D3B26788)"
                          : "rgba(211,178,103,0.35)",
                        transformOrigin: "bottom",
                        height: `${bar.height}px`,
                      }}
                      initial={{ scaleY: 0 }}
                      animate={
                        inView && !shouldReduce
                          ? { scaleY: 1 }
                          : { scaleY: 1 }
                      }
                      transition={{
                        duration: 0.7,
                        delay: bar.delay,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                    />
                    {/* Month label */}
                    <div className="text-[8px] text-gray-400" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {bar.month}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right column ── */}
          <div className="lg:col-span-2 flex flex-col items-center gap-3">
            {/* Orbit */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
              style={{ width: 110, height: 110 }}
            >
              {/* Orbit ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: "1px solid rgba(211,178,103,0.2)",
                  top: 1,
                  left: 1,
                  width: 108,
                  height: 108,
                }}
              />

              {/* Center */}
              <div
                className="absolute inset-0 m-auto w-14 h-14 rounded-full flex items-center justify-center border-2"
                style={{
                  background: "rgba(211,178,103,0.15)",
                  borderColor: "rgba(211,178,103,0.35)",
                  animation: "shimmer 3s ease-in-out infinite",
                }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 26 26"
                  fill="none"
                  style={{ opacity: 0.9 }}
                >
                  <path
                    d="M5 7h16M5 12h10M5 17h13"
                    stroke="#D3B267"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <rect
                    x="16"
                    y="14"
                    width="7"
                    height="9"
                    rx="1.5"
                    fill="#D3B267"
                    opacity={0.7}
                  />
                </svg>
              </div>

              {/* Orbiting coins */}
              {shouldReduce ? (
                // Static positions for reduced motion
                <>
                  <div className="absolute w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ top: 0, left: "50%", transform: "translate(-50%, -50%)", background: "var(--pri)", border: "1.5px solid var(--sec)", color: "#D3B267" }}>£</div>
                  <div className="absolute w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ top: "50%", left: 0, transform: "translate(-50%, -50%) rotate(120deg)", background: "var(--pri)", border: "1.5px solid var(--sec)", color: "#D3B267" }}>$</div>
                  <div className="absolute w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ top: "50%", right: 0, transform: "translate(50%, -50%) rotate(240deg)", background: "var(--pri)", border: "1.5px solid var(--sec)", color: "#D3B267" }}>€</div>
                </>
              ) : (
                <>
                  <motion.div
                    className="absolute w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] font-bold"
                    style={{
                      top: 0,
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      background: "var(--pri)",
                      border: "1.5px solid var(--sec)",
                      color: "#D3B267",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  >
                    £
                  </motion.div>
                  <motion.div
                    className="absolute w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] font-bold"
                    style={{
                      top: "50%",
                      left: 0,
                      transform: "translate(-50%, -50%) rotate(120deg)",
                      background: "var(--pri)",
                      border: "1.5px solid var(--sec)",
                      color: "#D3B267",
                    }}
                    animate={{ rotate: [120, 480] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  >
                    $
                  </motion.div>
                  <motion.div
                    className="absolute w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] font-bold"
                    style={{
                      top: "50%",
                      right: 0,
                      transform: "translate(50%, -50%) rotate(240deg)",
                      background: "var(--pri)",
                      border: "1.5px solid var(--sec)",
                      color: "#D3B267",
                    }}
                    animate={{ rotate: [240, 600] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  >
                    €
                  </motion.div>
                </>
              )}
            </motion.div>

            {/* Status stack */}
            <div className="w-full space-y-2">
              {["MTD Compliant", "VAT Filed", "P&L Balanced"].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[9px]"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(211,178,103,0.15)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  <div
                    className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(76,193,125,0.2)",
                      border: "1px solid rgba(76,193,125,0.5)",
                    }}
                  >
                    <svg width="7" height="7" viewBox="0 0 8 8">
                      <path
                        d="M1.5 4L3.5 6L6.5 2"
                        stroke="#4cc17d"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                  {text}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom ticker ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="rounded-lg overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(211,178,103,0.12)",
          }}
        >
          <div className="flex items-center gap-2 px-3 py-2">
            <div
              className="text-[8px] uppercase tracking-wider whitespace-nowrap"
              style={{ color: "rgba(211,178,103,0.5)", flexShrink: 0 }}
            >
              Updates
            </div>
            <div className="h-4 flex-1 overflow-hidden relative">
              <motion.div
                className="absolute inset-0 flex flex-col"
                initial={{ y: 0 }}
                animate={
                  inView && !shouldReduce
                    ? {
                      y: [
                        0,
                        -16,
                        -16,
                        -32,
                        -32,
                        -48,
                        -48,
                        0,
                      ],
                    }
                    : { y: 0 }
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 2,
                }}
              >
                {[...TICKER_ITEMS, TICKER_ITEMS[0]].map((item, i) => (
                  <div
                    key={i}
                    className="h-4 flex items-center gap-1.5 text-[10px]"
                    style={{ color: "#D3B267", fontWeight: 500 }}
                  >
                    <span style={{ color: "#4cdd8e", fontSize: 8 }}>●</span>
                    {item}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import HeroGraphic from "./HeroGraphic";

const stats = [
  { number: "15+", label: "Years Experience" },
  { number: "500+", label: "Happy Clients" },
  { number: "98%", label: "Client Retention" },
  { number: "£500K+", label: "Records Managed" },
];

const words = ["Expert", "Solutions", "For", "Your", "Accounting", "Success"];

export default function Hero() {
  // ── Mouse tracking ──
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spring = { stiffness: 55, damping: 18 };
  const smoothX = useSpring(rawX, spring);
  const smoothY = useSpring(rawY, spring);

  // Parallax layers (different depths)
  const orb1X = useTransform(smoothX, [-1, 1], [-28, 28]);
  const orb1Y = useTransform(smoothY, [-1, 1], [-18, 18]);
  const orb2X = useTransform(smoothX, [-1, 1], [18, -18]);
  const orb2Y = useTransform(smoothY, [-1, 1], [12, -12]);
  const gridX = useTransform(smoothX, [-1, 1], [-6, 6]);
  const gridY = useTransform(smoothY, [-1, 1], [-4, 4]);
  const graphX = useTransform(smoothX, [-1, 1], [14, -14]);
  const graphY = useTransform(smoothY, [-1, 1], [9, -9]);

  // Cursor spotlight
  const [spot, setSpot] = useState({ x: 50, y: 50, on: false });

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    rawX.set(nx);
    rawY.set(ny);
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      on: true,
    });
  };

  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setSpot(s => ({ ...s, on: false }));
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(145deg, #082D36 0%, #0A3F4A 40%, #0E5D6B 100%)" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* ── Cursor spotlight ── */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(520px circle at ${spot.x}% ${spot.y}%, rgba(211,178,103,0.1) 0%, rgba(14,93,107,0.08) 40%, transparent 70%)`,
          opacity: spot.on ? 1 : 0,
          zIndex: 1,
        }}
      />

      {/* ── Parallax grid ── */}
      <motion.div
        className="absolute inset-0 opacity-[0.07]"
        style={{ x: gridX, y: gridY }}
      >
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M 64 0 L 0 0 0 64" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </motion.div>

      {/* ── Diagonal lines (static) ── */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 80px)",
        }}
      />

      {/* ── Parallax orb 1 (gold) ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ top: "18%", right: "6%", x: orb1X, y: orb1Y }}
      >
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="w-72 h-72 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(211,178,103,0.22) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </motion.div>

      {/* ── Parallax orb 2 (teal) ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ bottom: "28%", left: "4%", x: orb2X, y: orb2Y }}
      >
        <motion.div
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="w-56 h-56 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(14,93,107,0.55) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </motion.div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex items-center" style={{ zIndex: 2 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10 w-full">

          {/* Two-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* ── Left: Copy ── */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8"
                style={{
                  background: "rgba(211,178,103,0.15)",
                  border: "1px solid rgba(211,178,103,0.4)",
                  color: "#D3B267",
                }}
              >
                <CheckCircle2 size={15} />
                Trustworthy Tax Services — Manchester
              </motion.div>

              <div className="text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-7 overflow-hidden">
                <div className="flex flex-wrap gap-x-[0.3em] gap-y-1">
                  {words.map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: 80, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.35 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      style={word === "Accounting" ? { color: "#D3B267" } : { color: "#ffffff" }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.85 }}
                className="text-lg leading-relaxed mb-10"
                style={{ color: "rgba(255,255,255,0.72)" }}
              >
                Quicksolve Accountants provides expert accounting and bookkeeping support in Manchester. Our tailored services keep your records accurate, organised, and fully compliant.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:scale-105 hover:shadow-2xl"
                  style={{
                    background: "#D3B267",
                    color: "#0A3F4A",
                    boxShadow: "0 8px 32px rgba(211,178,103,0.35)",
                  }}
                >
                  Make Appointment
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-white transition-all duration-200 hover:bg-white/10"
                  style={{ border: "1.5px solid rgba(255,255,255,0.3)" }}
                >
                  Explore Services
                </a>
              </motion.div>
            </div>

            {/* ── Right: Parallax graphic ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ x: graphX, y: graphY }}
              className="hidden lg:flex justify-center items-center"
            >
              <HeroGraphic />
            </motion.div>
          </div>

          {/* ── Stats row ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.25 + i * 0.1 }}
                whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
                className="rounded-2xl p-5 text-center"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <div className="text-3xl font-bold mb-1" style={{ color: "#D3B267", fontFamily: "var(--font-lexend)" }}>
                  {stat.number}
                </div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="relative z-10 flex flex-col items-center gap-2 pb-8"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>

      {/* ── Bottom wave ── */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60 C360 20 1080 20 1440 60 L1440 60 L0 60 Z" fill="#F8FAFC" fillOpacity="0.06" />
        </svg>
      </div>
    </section>
  );
}

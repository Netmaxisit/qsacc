"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Award, Users, TrendingUp, Sparkles } from "lucide-react";

const features = [
  "Flexible Services",
  "24/7 Online Support",
  "Business Improvement",
  "Commitment to Integrity",
  "Expert Team",
  "Easy Solutions",
];

const stats = [
  { icon: Award, value: 25, suffix: "+", label: "Years Experience" },
  { icon: Users, value: 500, suffix: "+", label: "Happy Clients" },
  { icon: TrendingUp, value: 98, suffix: "%", label: "Retention Rate" },
];

function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const update = (ts: number) => {
      const progress = Math.min((ts - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="about" className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Left: Text content */}
          <div ref={ref}>
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8"
                style={{
                  background: "rgba(211,178,103,0.12)",
                  border: "1px solid rgba(211,178,103,0.35)",
                  color: "#B8954A",
                }}
              >
                <Sparkles size={14} />
                25 Years of Excellence
              </div>

              <h2
                className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
                style={{ color: "#1A2B2E" }}
              >
                The Easiest Way to Manage Your{" "}
                <span style={{ color: "#0E5D6B" }}>Personal Finances</span>
              </h2>

              <p className="text-lg leading-relaxed mb-8" style={{ color: "#64748B" }}>
                Quick Solve Accountants is your go-to partner for efficient financial
                management solutions in Manchester. With a commitment to integrity and
                professionalism, we empower our clients to achieve their financial goals
                swiftly and effectively.
              </p>

              {/* Feature badges */}
              <div className="flex flex-wrap gap-3 mb-10">
                {features.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                    style={{
                      background: "rgba(14,93,107,0.06)",
                      border: "1px solid rgba(14,93,107,0.18)",
                      color: "#0E5D6B",
                    }}
                  >
                    <ShieldCheck size={13} />
                    {f}
                  </motion.div>
                ))}
              </div>

              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base"
                style={{
                  background: "linear-gradient(135deg, #0E5D6B 0%, #1A7A8C 100%)",
                  boxShadow: "0 8px 24px rgba(14,93,107,0.3)",
                }}
              >
                Get In Touch Today
              </motion.a>
            </motion.div>
          </div>

          {/* Right: Stats card */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Background decoration */}
            <div
              className="absolute -inset-4 rounded-3xl opacity-40 -z-10"
              style={{
                background: "linear-gradient(135deg, #0E5D6B, #1A7A8C)",
                transform: "rotate(2deg)",
                filter: "blur(1px)",
              }}
            />

            <div
              className="relative rounded-3xl p-10 overflow-hidden"
              style={{ background: "linear-gradient(145deg, #0A3F4A 0%, #0E5D6B 100%)" }}
            >
              {/* Subtle grid inside card */}
              <div className="absolute inset-0 opacity-[0.06]">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="card-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#card-grid)" />
                </svg>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                  Financial Solutions That Help Your Business Grow
                </h3>
                <p className="text-sm leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.65)" }}>
                  From strategic planning to risk management, we provide the expertise
                  and support you need to thrive in today&apos;s competitive landscape.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {stats.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                      className="rounded-2xl p-5 text-center"
                      style={{
                        background: "rgba(255,255,255,0.09)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.12)",
                      }}
                    >
                      <div
                        className="text-3xl font-bold mb-1"
                        style={{ color: "#D3B267" }}
                      >
                        <AnimatedCounter target={s.value} />
                        {s.suffix}
                      </div>
                      <div className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                        {s.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Certifications */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Certified Company", value: "Best Skills Provider" },
                    { label: "Expert Team", value: "100% Professionals" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl"
                      style={{ background: "rgba(211,178,103,0.12)", border: "1px solid rgba(211,178,103,0.2)" }}
                    >
                      <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>
                        {item.label}
                      </div>
                      <div className="text-sm font-semibold text-white">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

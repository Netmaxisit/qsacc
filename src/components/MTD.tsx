"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, AlertTriangle, Calendar, ArrowRight, FileText } from "lucide-react";

const timeline = [
  {
    date: "April 2026",
    desc: "Applies to self-employed individuals and landlords with annual income over £50,000",
  },
  {
    date: "April 2027",
    desc: "Extended to those with annual business or property income over £30,000",
  },
];

const whatChanges = [
  "Keep digital records of income and expenses",
  "Send quarterly updates to HMRC",
  "Submit an End of Period Statement",
  "Complete a Final Declaration each year",
];

const helpItems = [
  "Setting up MTD-compatible accounting software",
  "Training and support to manage your digital records",
  "Preparing and submitting quarterly updates",
  "Managing your End of Year declarations",
  "Ongoing tax planning and advice",
];

export default function MTD() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="mtd"
      className="py-24 lg:py-32 relative overflow-hidden"
      ref={ref}
      style={{ background: "linear-gradient(145deg, #082D36 0%, #0A3F4A 40%, #0E5D6B 100%)" }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.06]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="16" cy="16" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Gold orb */}
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-10 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(211,178,103,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{
              background: "rgba(211,178,103,0.15)",
              border: "1px solid rgba(211,178,103,0.4)",
              color: "#D3B267",
            }}
          >
            <AlertTriangle size={15} />
            Making Tax Digital for Income Tax
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            MTD ITSA — Are You Ready?
          </h2>
          <p
            className="text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            The UK tax system is changing. MTD ITSA will require many self-employed
            individuals and landlords to keep digital records and submit quarterly updates
            to HMRC using compatible software.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Who Is Affected */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="rounded-2xl p-8"
            style={{
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(211,178,103,0.2)" }}
              >
                <Calendar size={18} style={{ color: "#D3B267" }} />
              </div>
              <h3 className="text-xl font-bold text-white">Who Is Affected?</h3>
            </div>

            <div className="space-y-5 mb-6">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div
                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                    style={{ background: "#D3B267" }}
                  />
                  <div>
                    <div className="font-semibold text-white text-sm">{item.date}</div>
                    <div className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.80)" }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="rounded-xl p-4 text-sm"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <div className="font-semibold text-white mb-2">This Includes:</div>
              {["Self-employed individuals", "Sole traders", "Landlords with property income"].map(
                (item, i) => (
                  <div key={i} className="flex items-center gap-2 mt-1.5">
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "#D3B267" }}
                    />
                    <span style={{ color: "rgba(255,255,255,0.7)" }}>{item}</span>
                  </div>
                )
              )}
            </div>
          </motion.div>

          {/* What Changes */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="rounded-2xl p-8"
            style={{
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(211,178,103,0.2)" }}
              >
                <FileText size={18} style={{ color: "#D3B267" }} />
              </div>
              <h3 className="text-xl font-bold text-white">What Will Change?</h3>
            </div>

            <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.85)" }}>
              Instead of submitting one annual tax return, you will need to:
            </p>

            <div className="space-y-4">
              {whatChanges.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                    style={{ background: "rgba(211,178,103,0.2)", color: "#D3B267" }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* How We Help */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="rounded-2xl p-8"
            style={{
              background: "rgba(211,178,103,0.12)",
              border: "1.5px solid rgba(211,178,103,0.3)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(211,178,103,0.25)" }}
              >
                <CheckCircle2 size={18} style={{ color: "#D3B267" }} />
              </div>
              <h3 className="text-xl font-bold text-white">How We Can Help</h3>
            </div>

            <div className="space-y-3 mb-8">
              {helpItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={16}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: "#D3B267" }}
                  />
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>

            <a
              href="/contact"
              className="group flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
              style={{ background: "#D3B267", color: "#0A3F4A" }}
            >
              Book MTD Readiness Review
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </a>

            <p className="text-center text-xs mt-4" style={{ color: "rgba(255,255,255,0.5)" }}>
              Our goal: save you time, keep you compliant, reduce stress.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

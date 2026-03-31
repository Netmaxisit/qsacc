"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CalendarCheck } from "lucide-react";

interface AppointmentCTAProps {
  tagline?: string;
  headline?: string;
}

export default function AppointmentCTA({ tagline, headline }: AppointmentCTAProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, #D3B267 0%, #E8CA8A 50%, #D3B267 100%)" }}
      />
      {/* Diagonal overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(14,93,107,0.5) 0px, rgba(14,93,107,0.5) 1px, transparent 1px, transparent 40px)",
        }}
      />
      {/* Orb */}
      <div
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(14,93,107,0.15) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start gap-5"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(14,93,107,0.18)" }}
            >
              <CalendarCheck size={26} style={{ color: "#0A3F4A" }} />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#0A3F4A" }}>
                {headline || "Ready to Get Your Books in Order?"}
              </h2>
              {tagline && (
                <p className="text-base font-semibold mb-2" style={{ color: "#0E5D6B" }}>
                  {tagline}
                </p>
              )}
              <p className="text-base" style={{ color: "rgba(10,63,74,0.75)" }}>
                Contact QuickSolve Accountants today. Let&apos;s discuss how our tailored
                solutions can drive your success.
              </p>
            </div>
          </motion.div>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="group flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base"
            style={{
              background: "linear-gradient(135deg, #0A3F4A 0%, #0E5D6B 100%)",
              boxShadow: "0 8px 24px rgba(10,63,74,0.35)",
            }}
          >
            Make Appointment
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </motion.a>
        </div>
      </div>
    </section>
  );
}

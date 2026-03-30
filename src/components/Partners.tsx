"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const partners = [
  { name: "IRIS", description: "Accounting Software" },
  { name: "NEST", description: "Pension Provider" },
  { name: "QuickBooks", description: "Cloud Accounting" },
  { name: "Senta by IRIS", description: "Practice Management" },
];

export default function Partners() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section className="py-16 bg-white border-y" style={{ borderColor: "rgba(14,93,107,0.08)" }} ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] mb-10"
          style={{ color: "#64748B" }}
        >
          Trusted Partners &amp; Professional Affiliations
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="group flex flex-col items-center px-8 py-5 rounded-2xl cursor-default transition-all duration-300"
              style={{
                background: "rgba(14,93,107,0.04)",
                border: "1.5px solid rgba(14,93,107,0.1)",
              }}
            >
              <div
                className="text-xl font-bold mb-1 transition-colors duration-200 group-hover:text-[#0E5D6B]"
                style={{ color: "#1A2B2E", fontFamily: "var(--font-lexend)" }}
              >
                {partner.name}
              </div>
              <div className="text-xs" style={{ color: "#64748B" }}>
                {partner.description}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center text-sm leading-relaxed mt-10 max-w-xl mx-auto"
          style={{ color: "#64748B" }}
        >
          The platforms we use enhance our accuracy and efficiency, while our partnerships
          reflect our commitment to professional standards and innovation.
        </motion.p>
      </div>
    </section>
  );
}

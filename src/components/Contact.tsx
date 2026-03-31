"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, Globe, ArrowRight } from "lucide-react";

const contactItems = [
  {
    icon: MapPin,
    label: "Office Address",
    value: "1040 Stockport Road, Manchester, M19 3WX",
  },
  {
    icon: Phone,
    label: "Phone Number",
    value: "0161 478 9412",
    href: "tel:01614789412",
  },
  {
    icon: Mail,
    label: "Email Address",
    value: "info@qsaccountants.co.uk",
    href: "mailto:info@qsaccountants.co.uk",
  },
  {
    icon: Globe,
    label: "Website",
    value: "qsaccountants.co.uk",
    href: "https://qsaccountants.co.uk",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8"
              style={{ background: "rgba(14,93,107,0.08)", color: "#0E5D6B" }}
            >
              Get In Touch
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              style={{ color: "#1A2B2E" }}
            >
              Ready to Take Control of Your{" "}
              <span style={{ color: "#0E5D6B" }}>Tax & Accounts?</span>
            </h2>
            <p className="text-lg leading-relaxed mb-12" style={{ color: "#475569" }}>
              Contact QuickSolve Accountants today. Let&apos;s discuss how our tailored
              solutions can drive your success. Our expert team is here 24/7.
            </p>

            <div className="space-y-6">
              {contactItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(14,93,107,0.08)" }}
                  >
                    <item.icon size={20} style={{ color: "#0E5D6B" }} />
                  </div>
                  <div>
                    <div
                      className="text-xs font-semibold uppercase tracking-wider mb-1"
                      style={{ color: "#64748B" }}
                    >
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-base font-medium transition-colors duration-200"
                        style={{ color: "#1A2B2E" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#0E5D6B")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#1A2B2E")}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-base font-medium" style={{ color: "#1A2B2E" }}>
                        {item.value}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Card */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{ background: "linear-gradient(145deg, #0A3F4A 0%, #0E5D6B 100%)" }}
            >
              {/* Subtle pattern */}
              <div className="absolute inset-0 opacity-[0.06]">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="contact-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.8" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#contact-grid)" />
                </svg>
              </div>

              <div className="relative z-10 p-10">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8"
                  style={{ background: "rgba(211,178,103,0.2)" }}
                >
                  <Mail size={28} style={{ color: "#D3B267" }} />
                </div>

                <h3 className="text-3xl font-bold text-white mb-4">Make An Appointment</h3>
                <p className="leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Ready to Get Your Accounts in Order? Let&apos;s discuss how our tailored
                  solutions can drive your success. Our expert team is ready to help.
                </p>

                <a
                  href="mailto:info@qsaccountants.co.uk"
                  className="group flex items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold text-base mb-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
                  style={{ background: "#D3B267", color: "#0A3F4A" }}
                >
                  Book a Free Consultation
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </a>

                <a
                  href="tel:01614789412"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold text-base text-white transition-all duration-200 hover:bg-white/10"
                  style={{ border: "1.5px solid rgba(255,255,255,0.2)" }}
                >
                  <Phone size={18} />
                  Call 0161 478 9412
                </a>

                <div
                  className="mt-8 pt-8 grid grid-cols-3 gap-4 text-center"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
                >
                  {[
                    ["Free", "Initial Consultation"],
                    ["15+", "Years Experience"],
                    ["24/7", "Support Available"],
                  ].map(([num, text], i) => (
                    <div key={i}>
                      <div
                        className="text-2xl font-bold mb-1"
                        style={{ color: "#D3B267" }}
                      >
                        {num}
                      </div>
                      <div className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                        {text}
                      </div>
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

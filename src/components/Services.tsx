"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  BookOpen,
  Building2,
  Receipt,
  Rocket,
  Users,
  UserCheck,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: BookOpen,
    title: "Book Keeping",
    description:
      "Streamlined bookkeeping solutions customized to your business requirements, ensuring accurate, up-to-date financial records.",
    href: "/book-keeping",
  },
  {
    icon: Building2,
    title: "Small Business Services",
    description:
      "Comprehensive financial solutions for small businesses — from bookkeeping and tax preparation to strategic business advisory.",
    href: "/small-business-services",
  },
  {
    icon: Receipt,
    title: "VAT Solutions",
    description:
      "VAT solutions tailored to your business needs, ensuring compliance, maximising savings, and reducing administrative burden.",
    href: "/vat-solutions",
  },
  {
    icon: Rocket,
    title: "Business Startup",
    description:
      "Comprehensive startup support — business structuring, registration, financial planning, tax planning, and ongoing mentorship.",
    href: "/business-startup",
  },
  {
    icon: Users,
    title: "Payroll",
    description:
      "Efficient payroll processing ensuring compliance, accuracy, on-time payments, and seamless employee benefits administration.",
    href: "/payroll",
  },
  {
    icon: UserCheck,
    title: "Services for Individuals",
    description:
      "Personal tax preparation, retirement planning, investment advisory, estate planning, and regular financial health checkups.",
    href: "/services-for-individuals",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-40px" });
  const [spotX, setSpotX] = useState(50);
  const [spotY, setSpotY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotX(x);
    setSpotY(y);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl p-8 cursor-pointer flex flex-col overflow-hidden"
      style={{
        border: isHovered ? "1.5px solid rgba(14,93,107,0.45)" : "1.5px solid rgba(14,93,107,0.08)",
        boxShadow: isHovered
          ? "0 16px 48px rgba(14,93,107,0.18), inset 0 0 0 1px rgba(211,178,103,0.12)"
          : "0 2px 16px rgba(14,93,107,0.05)",
        transition: "box-shadow 0.35s ease, border-color 0.35s ease",
        background: "#ffffff",
      }}
    >
      {/* Mouse-tracking radial spotlight */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(280px circle at ${spotX}% ${spotY}%, rgba(14,93,107,0.22) 0%, rgba(211,178,103,0.14) 40%, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.35s ease",
        }}
      />

      {/* Secondary glow layer for extra depth */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(160px circle at ${spotX}% ${spotY}%, rgba(211,178,103,0.18) 0%, transparent 60%)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.35s ease",
        }}
      />

      {/* Top accent bar */}
      <div
        className="absolute top-0 left-8 right-8 h-0.5 rounded-full"
        style={{
          background: "linear-gradient(90deg, #0E5D6B, #D3B267)",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.25 }}
        className="relative z-10 w-14 h-14 rounded-xl flex items-center justify-center mb-6"
        style={{
          background: isHovered
            ? "rgba(14,93,107,0.14)"
            : "rgba(14,93,107,0.08)",
          transition: "background 0.3s ease",
        }}
      >
        <service.icon size={26} style={{ color: "#0E5D6B" }} />
      </motion.div>

      <h3
        className="relative z-10 text-xl font-bold mb-3 transition-colors duration-200"
        style={{ color: isHovered ? "#0E5D6B" : "#1A2B2E" }}
      >
        {service.title}
      </h3>
      <p className="relative z-10 text-sm leading-relaxed flex-1 mb-6" style={{ color: "#475569" }}>
        {service.description}
      </p>

      <a
        href={service.href}
        className="relative z-10 inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group-hover:gap-3"
        style={{ color: "#0E5D6B" }}
      >
        Learn More
        <ArrowRight size={15} />
      </a>
    </motion.div>
  );
}

export default function Services() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-40px" });

  return (
    <section id="services" className="py-24 lg:py-32" style={{ background: "#F8FAFC" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16" ref={headingRef}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{ background: "rgba(14,93,107,0.08)", color: "#0E5D6B" }}
          >
            Our Services
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            style={{ color: "#1A2B2E" }}
          >
            We Provide{" "}
            <span style={{ color: "#0E5D6B" }}>Exclusive Service</span>
            <br className="hidden md:block" /> For Your Business
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base leading-relaxed max-w-xl mx-auto"
            style={{ color: "#4B5563" }}
          >
            From bookkeeping to retirement planning, we offer comprehensive financial
            services tailored to your unique needs — all under one roof.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

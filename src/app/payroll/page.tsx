"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Users,
  CheckCircle2,
  ArrowRight,
  Clock,
  Shield,
  FileText,
  BarChart3,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppointmentCTA from "@/components/AppointmentCTA";
import Contact from "@/components/Contact";

const benefits = [
  {
    icon: Clock,
    title: "Efficient Payroll Processing",
    description:
      "We handle all aspects of payroll processing, from calculating wages and salaries to deducting taxes and other withholdings. Our streamlined system ensures accuracy and timeliness, so your employees are paid on time, every time.",
  },
  {
    icon: Shield,
    title: "Tax Withholding & Reporting",
    description:
      "Navigating payroll taxes and compliance can be daunting, but our expert team stays up-to-date with the latest regulations to ensure accurate withholding and reporting. We handle all tax filings and reporting requirements, so you can focus on running your business.",
  },
  {
    icon: BarChart3,
    title: "Direct Deposit & Payment Options",
    description:
      "Offering direct deposit streamlines the payment process for both you and your employees. We set up and manage direct deposit services, providing convenience and security for everyone involved.",
  },
  {
    icon: FileText,
    title: "Customised Reporting & Analysis",
    description:
      "We provide customised payroll reports and analysis to help you track expenses, monitor trends, and make informed business decisions. Whether you need detailed reports for budgeting or analysis of labour costs, we've got you covered.",
  },
];

function BenefitCard({
  benefit,
  index,
}: {
  benefit: (typeof benefits)[0];
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

      {/* Secondary glow layer */}
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
        <benefit.icon size={26} style={{ color: "#0E5D6B" }} />
      </motion.div>

      <h3
        className="relative z-10 text-xl font-bold mb-3 transition-colors duration-200"
        style={{ color: isHovered ? "#0E5D6B" : "#1A2B2E" }}
      >
        {benefit.title}
      </h3>
      <p className="relative z-10 text-sm leading-relaxed flex-1" style={{ color: "#475569" }}>
        {benefit.description}
      </p>
    </motion.div>
  );
}

export default function PayrollPage() {
  const heroRef = useRef(null);
  const introRef = useRef(null);
  const detailsRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-40px" });
  const introInView = useInView(introRef, { once: true, margin: "-60px" });
  const detailsInView = useInView(detailsRef, { once: true, margin: "-60px" });

  // Mouse tracking for parallax
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spring = { stiffness: 55, damping: 18 };
  const smoothX = useSpring(rawX, spring);
  const smoothY = useSpring(rawY, spring);

  const orb1X = useTransform(smoothX, [-1, 1], [-28, 28]);
  const orb1Y = useTransform(smoothY, [-1, 1], [-18, 18]);
  const orb2X = useTransform(smoothX, [-1, 1], [18, -18]);
  const orb2Y = useTransform(smoothY, [-1, 1], [12, -12]);
  const gridX = useTransform(smoothX, [-1, 1], [-6, 6]);
  const gridY = useTransform(smoothY, [-1, 1], [-4, 4]);

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
    <main>
      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] flex flex-col overflow-hidden"
        style={{ background: "linear-gradient(145deg, #082D36 0%, #0A3F4A 40%, #0E5D6B 100%)" }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {/* Cursor spotlight */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(520px circle at ${spot.x}% ${spot.y}%, rgba(211,178,103,0.1) 0%, rgba(14,93,107,0.08) 40%, transparent 70%)`,
            opacity: spot.on ? 1 : 0,
            zIndex: 1,
          }}
        />

        {/* Parallax grid */}
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

        {/* Diagonal lines (static) */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 80px)",
          }}
        />

        {/* Parallax orb 1 (gold) */}
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

        {/* Parallax orb 2 (teal) */}
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

        {/* Main content */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10 w-full">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                style={{ background: "rgba(211,178,103,0.15)", border: "1px solid rgba(211,178,103,0.4)", color: "#D3B267" }}
              >
                <CheckCircle2 size={15} />
                Payroll Services
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              >
                Efficient Payroll Solutions for{" "}
                <span style={{ color: "#D3B267" }}>Your Business</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl leading-relaxed mb-10"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                Managing payroll can be time-consuming and complex, but Quick Solve Accountants simplifies
                the process with our efficient payroll services tailored to your business needs.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:scale-105 hover:shadow-2xl"
                  style={{
                    background: "#D3B267",
                    color: "#0A3F4A",
                    boxShadow: "0 8px 32px rgba(211,178,103,0.35)",
                  }}
                >
                  Get Started
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                </a>
                <a
                  href="#details"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-white transition-all duration-200 hover:bg-white/10"
                  style={{ border: "1.5px solid rgba(255,255,255,0.3)" }}
                >
                  Learn More
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60 C360 20 1080 20 1440 60 L1440 60 L0 60 Z" fill="#F8FAFC" fillOpacity="0.06" />
          </svg>
        </div>
      </section>

      {/* Introduction Section */}
      <section
        ref={introRef}
        className="py-24 lg:py-32"
        style={{ background: "#F8FAFC" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold mb-8 leading-tight"
              style={{ color: "#1A2B2E" }}
            >
              Streamlined Payroll Services for Your Peace of Mind
            </h2>

            <div className="space-y-6 text-base leading-relaxed" style={{ color: "#475569" }}>
              <p>
                Managing payroll can be time-consuming and complex, but Quick Solve Accountants simplifies
                the process with our efficient payroll services tailored to your business needs.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section
        id="details"
        ref={detailsRef}
        className="py-24 lg:py-32"
        style={{ background: "#ffffff" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={detailsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "#1A2B2E" }}
            >
              Our Payroll Services
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: "#475569" }}>
              Comprehensive payroll solutions ensuring accuracy, compliance, and convenience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <BenefitCard key={i} benefit={benefit} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 lg:py-32" style={{ background: "rgba(14,93,107,0.03)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-8 leading-tight"
              style={{ color: "#0E5D6B" }}
            >
              Complete Payroll Management
            </h2>

            <div className="space-y-6 text-base leading-relaxed" style={{ color: "#475569" }}>
              <div>
                <h3 className="text-xl font-bold mb-3" style={{ color: "#1A2B2E" }}>Compliance and Regulations</h3>
                <p>
                  Staying compliant with payroll regulations is essential to avoid penalties and legal issues.
                  We ensure that your payroll processes adhere to all relevant regulations, including wage and hour laws,
                  tax withholding requirements, and reporting obligations.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3" style={{ color: "#1A2B2E" }}>Employee Benefits Administration</h3>
                <p>
                  Managing employee benefits adds another layer of complexity to payroll. Our team assists with administering
                  employee benefits such as health insurance, retirement plans, and other perks, ensuring that your employees
                  are well taken care of.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Summary CTA */}
      <section className="py-20 lg:py-28" style={{ background: "#ffffff" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-6 leading-tight"
              style={{ color: "#0E5D6B" }}
            >
              Simplify Your Payroll Today
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "#475569" }}>
              Let Quick Solve Accountants handle your payroll so you can focus on what matters most — running your business.
              Our accurate, compliant, and efficient payroll services ensure your employees are paid correctly and on time,
              every time.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:scale-105"
              style={{ background: "#D3B267", color: "#0A3F4A", boxShadow: "0 6px 20px rgba(211,178,103,0.25)" }}
            >
              Get Payroll Support
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <AppointmentCTA headline="We keep your numbers working, not worrying." />

      {/* Contact Form */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}

"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  UserCheck,
  CheckCircle2,
  ArrowRight,
  Calculator,
  PiggyBank,
  TrendingUp,
  Heart,
  ClipboardCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppointmentCTA from "@/components/AppointmentCTA";
import Contact from "@/components/Contact";

const benefits = [
  {
    icon: Calculator,
    title: "Personal Tax Preparation",
    description:
      "Navigating personal taxes can be challenging. Our experts simplify the process, ensuring your tax returns are prepared accurately and filed on time. We focus on maximising your eligible deductions and minimising liabilities to optimise your tax savings.",
  },
  {
    icon: PiggyBank,
    title: "Retirement Planning",
    description:
      "Secure your long-term tax efficiency with our comprehensive retirement planning services. We work closely with you to analyse your current accounting position, define your retirement aspirations, and create robust strategies — utilising pensions, investments, and other vehicles — to help you achieve your goals.",
  },
  {
    icon: TrendingUp,
    title: "Financial Health Checkups",
    description:
      "Regular account health checkups are vital to keep your tax and accounting plan aligned with your evolving goals. Our team conducts comprehensive reviews of your accounts, identifying areas for improvement and opportunities for tax savings, ensuring you remain on track to achieve your objectives.",
  },
  {
    icon: Heart,
    title: "Estate Planning",
    description:
      "Protect your assets and ensure your wishes are honoured with our thorough estate planning services. We assist with wills, trusts, and estate administration, helping you plan the distribution of your assets and minimise potential tax liabilities for your beneficiaries, providing peace of mind for you and your loved ones.",
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

export default function ServicesForIndividualsPage() {
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
                Services for Individuals
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              >
                Your Partner in{" "}
                <span style={{ color: "#D3B267" }}>Tax Efficiency</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl leading-relaxed mb-10"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                At Quick Solve Accountants, we offer a comprehensive suite of personalised tax and accounting services
                designed to meet your unique individual needs. Whether you&apos;re planning for the future,
                managing your self-assessment, or navigating the complexities of taxation, our expert guidance and
                dedicated support are with you every step of the way.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap justify-center gap-4"
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
              Comprehensive Personal Financial Services
            </h2>

            <div className="space-y-6 text-base leading-relaxed" style={{ color: "#475569" }}>
              <p>
                At Quick Solve Accountants, we offer a comprehensive suite of personalised financial services
                designed to meet your unique individual needs. Whether you&apos;re planning for the future,
                managing investments, or navigating the complexities of taxation, our expert guidance and
                dedicated support are with you every step of the way.
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
              Our Individual Services
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: "#475569" }}>
              Personalised financial solutions for your life goals and financial well-being.
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
              Additional Individual Services
            </h2>

            <div className="space-y-6 text-base leading-relaxed" style={{ color: "#475569" }}>
              <div>
                <h3 className="text-xl font-bold mb-3" style={{ color: "#1A2B2E" }}>Tax Planning and Advisory</h3>
                <p>
                  Proactive tax planning is key to reducing your tax burden and maximising savings.
                  Our advisors develop personalised tax strategies tailored to your specific financial situation
                  and long-term goals, empowering you to make informed decisions and achieve optimal tax efficiency.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3" style={{ color: "#1A2B2E" }}>Financial Health Checkups</h3>
                <p>
                  Regular financial health checkups are vital to keep your financial plan aligned with your evolving goals.
                  Our team conducts comprehensive reviews of your financial situation, identifying areas for improvement and
                  opportunities for growth, ensuring you remain on course to achieve your financial objectives.
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
              Achieve Your Personal Financial Goals
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "#475569" }}>
              Let Quick Solve Accountants be your trusted partner in financial well-being.
              Contact us today for a consultation and discover how our personalised services
              can help you build, protect, and grow your wealth.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:scale-105"
              style={{ background: "#D3B267", color: "#0A3F4A", boxShadow: "0 6px 20px rgba(211,178,103,0.25)" }}
            >
              Book a Consultation
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <AppointmentCTA headline="Your books, done right the first time." />

      {/* Contact Form */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}

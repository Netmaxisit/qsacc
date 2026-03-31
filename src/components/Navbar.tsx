"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const services = [
  { label: "Book Keeping", href: "/book-keeping" },
  { label: "Small Business", href: "/small-business-services" },
  { label: "VAT Solutions", href: "/vat-solutions" },
  { label: "Business Startup", href: "/business-startup" },
  { label: "Payroll", href: "/payroll" },
  { label: "Individual Services", href: "/services-for-individuals" },
  { label: "MTD ITSA", href: "/mtd-itsa" },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services", hasDropdown: true },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleServicesMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setServicesDropdownOpen(true);
  };

  const handleServicesMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 200); // 200ms delay before closing
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={
        scrolled
          ? {
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 1px 24px 0 rgba(14,93,107,0.10)",
          }
          : { background: "transparent" }
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-md transition-transform duration-200 group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, #0E5D6B, #1A7A8C)" }}
            >
              QS
            </div>
            <div>
              <div
                className="font-bold text-lg leading-tight transition-colors duration-300"
                style={{ color: scrolled ? "#0E5D6B" : "#ffffff" }}
              >
                Quicksolve
              </div>
              <div
                className="text-xs transition-colors duration-300"
                style={{ color: scrolled ? "#6B7280" : "rgba(255,255,255,0.65)" }}
              >
                Accountants
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.hasDropdown && handleServicesMouseEnter()}
                onMouseLeave={() => link.hasDropdown && handleServicesMouseLeave()}
              >
                <a
                  href={link.href}
                  className="text-sm font-medium transition-all duration-200 relative group flex items-center gap-1"
                  style={{ color: scrolled ? "#374151" : "rgba(255,255,255,0.88)" }}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${servicesDropdownOpen ? "rotate-180" : ""}`}
                    />
                  )}
                  <span
                    className="absolute -bottom-0.5 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded-full"
                    style={{ background: "#D3B267" }}
                  />
                </a>

                {/* Services Dropdown */}
                {link.hasDropdown && servicesDropdownOpen && (
                  <motion.div
                    onMouseEnter={handleServicesMouseEnter}
                    onMouseLeave={handleServicesMouseLeave}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 rounded-xl shadow-xl overflow-hidden z-50"
                    style={{ background: "#ffffff", border: "1px solid rgba(14,93,107,0.1)" }}
                  >
                    <div className="py-2">
                      {services.map((service) => (
                        <a
                          key={service.href}
                          href={service.href}
                          className="block px-4 py-3 text-sm transition-colors hover:bg-teal-50"
                          style={{ color: "#475569" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#0E5D6B";
                            e.currentTarget.style.background = "rgba(14,93,107,0.04)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "#475569";
                            e.currentTarget.style.background = "transparent";
                          }}
                        >
                          {service.label}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="tel:01614789412"
              className="flex items-center gap-2 text-sm font-medium transition-colors duration-200"
              style={{ color: scrolled ? "#0E5D6B" : "rgba(255,255,255,0.88)" }}
            >
              <Phone size={15} />
              0161 478 9412
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{
                background: "#D3B267",
                color: "#0A3F4A",
              }}
            >
              Make Appointment
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: scrolled ? "#0E5D6B" : "#ffffff" }}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.98)",
              backdropFilter: "blur(16px)",
              borderTop: "1px solid rgba(14,93,107,0.1)",
            }}
          >
            <div className="px-4 py-5 flex flex-col gap-1">
              {/* Home */}
              <motion.a
                href="/"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0 }}
                className="py-3 px-4 rounded-xl font-medium transition-colors text-gray-700 hover:text-[#0E5D6B] hover:bg-teal-50"
              >
                Home
              </motion.a>

              {/* Services (parent link) */}
              <motion.a
                href="/#services"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 }}
                className="py-3 px-4 rounded-xl font-medium transition-colors text-gray-700 hover:text-[#0E5D6B] hover:bg-teal-50"
              >
                Services
              </motion.a>

              {/* Services sub-items (indented) */}
              {services.map((service, i) => (
                <motion.a
                  key={service.href}
                  href={service.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.06 }}
                  className="py-3 pl-10 pr-4 rounded-xl font-medium transition-colors text-gray-600 hover:text-[#0E5D6B] hover:bg-teal-50 text-sm"
                >
                  {service.label}
                </motion.a>
              ))}

              {/* About */}
              <motion.a
                href="/#about"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="py-3 px-4 rounded-xl font-medium transition-colors text-gray-700 hover:text-[#0E5D6B] hover:bg-teal-50"
              >
                About
              </motion.a>

              {/* Contact */}
              <motion.a
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.36 }}
                className="py-3 px-4 rounded-xl font-medium transition-colors text-gray-700 hover:text-[#0E5D6B] hover:bg-teal-50"
              >
                Contact
              </motion.a>

              <motion.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 }}
                className="mt-3 py-3.5 px-4 rounded-xl text-center font-semibold"
                style={{ background: "#D3B267", color: "#0A3F4A" }}
              >
                Make Appointment
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

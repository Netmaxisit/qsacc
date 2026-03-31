"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const officeHours = [
  { day: "Monday – Friday", hours: "9:00 AM – 5:30 PM" },
  { day: "Saturday", hours: "By Appointment" },
  { day: "Sunday", hours: "Closed" },
];

export default function ContactPage() {
  const formRef = useRef(null);
  const inView = useInView(formRef, { once: true, margin: "-40px" });

  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please call us on 0161 478 9412.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      {/* Hero strip */}
      <div
        className="pt-32 pb-16"
        style={{ background: "linear-gradient(135deg, #0A3F4A 0%, #0E5D6B 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
              style={{ background: "rgba(211,178,103,0.18)", color: "#D3B267" }}
            >
              Our Advisors
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              How Can We{" "}
              <em style={{ color: "#D3B267", fontStyle: "italic" }}>Help You?</em>
            </h1>
            <p className="mt-4 text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
              Get in touch with our team of expert accountants in Manchester.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <section className="py-16 lg:py-24" style={{ background: "#F8FAFC" }} ref={formRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-14 items-start">

            {/* LEFT: Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="rounded-3xl p-8 md:p-10"
                style={{ background: "#ffffff", boxShadow: "0 4px 32px rgba(14,93,107,0.07)" }}
              >
                {submitted ? (
                  <div className="text-center py-16">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ background: "rgba(14,93,107,0.08)" }}
                    >
                      <Send size={28} style={{ color: "#0E5D6B" }} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3" style={{ color: "#1A2B2E" }}>
                      Message Sent!
                    </h3>
                    <p style={{ color: "#475569" }}>
                      Thank you for getting in touch. We&apos;ll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={form.firstName}
                          onChange={handleChange}
                          placeholder="Your First Name"
                          required
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                          style={{
                            border: "1.5px solid #E2E8F0",
                            color: "#1A2B2E",
                            background: "#FAFBFC",
                          }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "#0E5D6B")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "#E2E8F0")}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                          placeholder="Your Last Name"
                          required
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                          style={{
                            border: "1.5px solid #E2E8F0",
                            color: "#1A2B2E",
                            background: "#FAFBFC",
                          }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "#0E5D6B")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "#E2E8F0")}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="0161 478 9412"
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                          style={{
                            border: "1.5px solid #E2E8F0",
                            color: "#1A2B2E",
                            background: "#FAFBFC",
                          }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "#0E5D6B")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "#E2E8F0")}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          required
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                          style={{
                            border: "1.5px solid #E2E8F0",
                            color: "#1A2B2E",
                            background: "#FAFBFC",
                          }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "#0E5D6B")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "#E2E8F0")}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us a bit about what you're looking for help with…"
                        required
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                        style={{
                          border: "1.5px solid #E2E8F0",
                          color: "#1A2B2E",
                          background: "#FAFBFC",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#0E5D6B")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#E2E8F0")}
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => setAgreed(!agreed)}
                        className="mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center transition-all duration-200"
                        style={{
                          border: agreed ? "none" : "1.5px solid #CBD5E1",
                          background: agreed ? "#0E5D6B" : "transparent",
                        }}
                        aria-label="Agree to privacy policy"
                      >
                        {agreed && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                      <span className="text-sm" style={{ color: "#64748B" }}>
                        I agree to the{" "}
                        <a href="#" style={{ color: "#0E5D6B" }} className="underline underline-offset-2">
                          privacy policy
                        </a>
                        .
                      </span>
                    </div>

                    {error && (
                      <p className="text-sm text-red-500 text-center">{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={!agreed || loading}
                      className="w-full py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      style={{ background: "#D3B267", color: "#0A3F4A" }}
                    >
                      {loading ? "Sending…" : "Send Message"}
                      {!loading && <Send size={16} />}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* RIGHT: Info cards */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Contact Information */}
              <div
                className="rounded-3xl p-8"
                style={{
                  background: "linear-gradient(145deg, #0A3F4A 0%, #0E5D6B 100%)",
                }}
              >
                <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
                <div className="space-y-5">
                  {[
                    {
                      icon: Phone,
                      label: "Phone",
                      value: "0161 478 9412",
                      href: "tel:01614789412",
                    },
                    {
                      icon: Mail,
                      label: "Email",
                      value: "info@qsaccountants.co.uk",
                      href: "mailto:info@qsaccountants.co.uk",
                    },
                    {
                      icon: MapPin,
                      label: "Office Location",
                      value: "1040 Stockport Road, Manchester, M19 3WX",
                      href: null,
                    },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(211,178,103,0.18)" }}
                      >
                        <Icon size={18} style={{ color: "#D3B267" }} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                          {label}
                        </div>
                        {href ? (
                          <a
                            href={href}
                            className="text-sm font-medium text-white transition-colors duration-200"
                            style={{ color: "rgba(255,255,255,0.9)" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#D3B267")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                          >
                            {value}
                          </a>
                        ) : (
                          <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.9)" }}>
                            {value}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office Hours */}
              <div
                className="rounded-3xl p-8"
                style={{ background: "#ffffff", boxShadow: "0 4px 32px rgba(14,93,107,0.07)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Clock size={20} style={{ color: "#0E5D6B" }} />
                  <h3 className="text-xl font-bold" style={{ color: "#1A2B2E" }}>
                    Office Hours
                  </h3>
                </div>
                <div className="space-y-3">
                  {officeHours.map(({ day, hours }) => (
                    <div key={day} className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: "#64748B" }}>{day}</span>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: hours === "Closed" ? "#EF4444" : "#0E5D6B" }}
                      >
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <div className="w-full h-80 md:h-96">
        <iframe
          title="QuickSolve Accountants Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2375.6!2d-2.194!3d53.438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bb2e6c6789abd%3A0x1!2s1040+Stockport+Rd%2C+Manchester+M19+3WX!5e0!3m2!1sen!2suk!4v1"
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <Footer />
    </>
  );
}

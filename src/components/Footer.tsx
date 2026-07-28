import { MapPin, Phone, Mail } from "lucide-react";
import BrandIcon from "@/components/BrandIcon";
import BrandWordmark from "@/components/BrandWordmark";

const services = [
  { label: "Book Keeping", href: "/book-keeping" },
  { label: "Small Business Services", href: "/small-business-services" },
  { label: "VAT Solutions", href: "/vat-solutions" },
  { label: "Business Startups", href: "/business-startup" },
  { label: "Payroll", href: "/payroll" },
  { label: "Services for Individuals", href: "/services-for-individuals" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "MTD ITSA", href: "/#mtd" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#082D36" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {/* Brand */}
          <div>
            <a
              href="/"
              aria-label="QuickSolve Accountants home"
              className="inline-flex flex-col items-start gap-2.5 mb-6"
              style={{
                filter:
                  "drop-shadow(0 4px 10px rgba(0,0,0,0.55)) drop-shadow(0 1px 3px rgba(0,0,0,0.4))",
              }}
            >
              <BrandIcon size={56} />
              <BrandWordmark theme="dark" />
            </a>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.80)" }}>
              Your go-to partner for efficient accounts management solutions in
              Manchester. Expert accounting, tax, and business advisory services with
              15+ years of experience.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.80)" }}>
                <MapPin size={15} className="mt-0.5 flex-shrink-0" style={{ color: "#D3B267" }} />
                1040 Stockport Road, Manchester, M19 3WX
              </div>
              <a
                href="tel:01614789412"
                className="flex items-center gap-3 text-sm transition-colors duration-200 hover:text-white"
                style={{ color: "rgba(255,255,255,0.80)" }}
              >
                <Phone size={15} style={{ color: "#D3B267" }} />
                0161 478 9412
              </a>
              <a
                href="mailto:info@qsaccountants.co.uk"
                className="flex items-center gap-3 text-sm transition-colors duration-200 hover:text-white"
                style={{ color: "rgba(255,255,255,0.80)" }}
              >
                <Mail size={15} style={{ color: "#D3B267" }} />
                info@qsaccountants.co.uk
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-base mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, i) => (
                <li key={i}>
                  <a
                    href={service.href}
                    className="flex items-center gap-2.5 text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: "rgba(255,255,255,0.80)" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "#D3B267" }}
                    />
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links + MTD promo */}
          <div>
            <h4 className="text-white font-bold text-base mb-6">Quick Links</h4>
            <ul className="space-y-3 mb-8">
              {quickLinks.map(({ label, href }, i) => (
                <li key={i}>
                  <a
                    href={href}
                    className="flex items-center gap-2.5 text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: "rgba(255,255,255,0.80)" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "#D3B267" }}
                    />
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(211,178,103,0.1)",
                border: "1px solid rgba(211,178,103,0.25)",
              }}
            >
              <div className="text-sm font-semibold text-white mb-1">
                MTD ITSA — Coming Soon
              </div>
              <div className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
                Are you prepared for Making Tax Digital? Get ready now before April 2026.
              </div>
              <a
                href="/mtd-itsa"
                className="text-xs font-semibold"
                style={{ color: "#D3B267" }}
              >
                Learn More →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            Copyright 2024 QuickSolve Accountants. All Rights Reserved.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            1040 Stockport Road, Manchester, M19 3WX, United Kingdom
          </p>
        </div>
      </div>
    </footer>
  );
}

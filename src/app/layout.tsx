import type { Metadata } from "next";
import { Lexend, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import LocalBusinessJsonLd from "@/components/LocalBusinessJsonLd";
import { siteUrl } from "@/lib/site-url";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Quicksolve Accountants — Expert Accounting & Bookkeeping in Manchester",
  description:
    "Quicksolve Accountants provides reliable accounting support in Manchester. Accurate bookkeeping, tax preparation, and clear reporting for businesses and individuals.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "Quicksolve Accountants",
    title: "Quicksolve Accountants — Expert Accounting & Bookkeeping in Manchester",
    description:
      "Expert accounting, bookkeeping, tax, VAT, payroll, and MTD ITSA services in Manchester.",
    images: [{ url: "/qs-icon.png", width: 500, height: 500, alt: "Quicksolve Accountants" }],
  },
  twitter: {
    card: "summary",
    title: "Quicksolve Accountants",
    description:
      "Expert accounting and bookkeeping services in Manchester.",
    images: ["/qs-icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${lexend.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full" suppressHydrationWarning>
        <LocalBusinessJsonLd />
        {children}
        <script
          src="https://api.elvorastrategies.com/widget.js"
          data-client="qsaccountants"
        />
      </body>
    </html>
  );
}

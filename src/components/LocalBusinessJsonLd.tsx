import { siteUrl } from "@/lib/site-url";

export default function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: "QuickSolve Accountants",
    url: siteUrl,
    telephone: "+441614789412",
    email: "info@qsaccountants.co.uk",
    image: `${siteUrl}/qs-icon.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "1040 Stockport Road",
      addressLocality: "Manchester",
      postalCode: "M19 3WX",
      addressCountry: "GB",
    },
    areaServed: {
      "@type": "City",
      name: "Manchester",
    },
    description:
      "Expert accounting, bookkeeping, tax, VAT, payroll, and MTD ITSA services for businesses and individuals in Manchester.",
    sameAs: ["https://www.google.com/search?q=Quicksolve+Accountants+Reviews"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

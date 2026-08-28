import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

const routes = [
  { path: "", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/contact", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/book-keeping", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/small-business-services", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/vat-solutions", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/business-startup", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/payroll", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/services-for-individuals", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/mtd-itsa", changeFrequency: "monthly" as const, priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}

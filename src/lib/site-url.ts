/** Canonical public site URL (production domain). */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://qsaccountants.co.uk";

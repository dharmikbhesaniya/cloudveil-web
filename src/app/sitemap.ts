import type { MetadataRoute } from "next";

const DOMAIN = "https://intractify.com";
const LAST_MODIFIED = new Date("2026-05-21");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: DOMAIN,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${DOMAIN}/contact`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${DOMAIN}/privacy-policy`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${DOMAIN}/terms-of-service`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${DOMAIN}/refund-policy`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${DOMAIN}/data-deletion`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}

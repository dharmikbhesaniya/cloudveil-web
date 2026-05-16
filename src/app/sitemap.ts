import type { MetadataRoute } from "next";

const DOMAIN = "https://cloudveil.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: DOMAIN,
      lastModified: new Date("2025-05-16"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${DOMAIN}/privacy-policy`,
      lastModified: new Date("2025-05-16"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${DOMAIN}/terms-of-service`,
      lastModified: new Date("2025-05-16"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${DOMAIN}/refund-policy`,
      lastModified: new Date("2025-05-16"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${DOMAIN}/contact`,
      lastModified: new Date("2025-05-16"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${DOMAIN}/data-deletion`,
      lastModified: new Date("2025-05-16"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}

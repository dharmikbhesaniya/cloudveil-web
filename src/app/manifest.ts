import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Intractify — Private Cloud Browser",
    short_name: "Intractify",
    description:
      "Launch a fully isolated cloud browser in under 5 seconds. Zero logs, zero fingerprint, zero trace.",
    start_url: "/?source=pwa",
    display: "standalone",
    background_color: "#F4EFE3",
    theme_color: "#1F2C58",
    lang: "en",
    categories: ["productivity", "utilities", "security"],
    icons: [
      {
        src: "/favicon/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicon/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}

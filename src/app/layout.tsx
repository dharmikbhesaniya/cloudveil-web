import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/lib/seo/structured-data";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { UTMTracker } from "@/components/common/UTMTracker";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  // Normal style only — emphasis is expressed through the serif family itself,
  // not an italic slant, so the italic optical files are never fetched.
  style: ["normal"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Intractify — Private Cloud Browser | Browse Without a Trace",
    template: "%s | Intractify",
  },
  description:
    "Launch a fully isolated cloud browser. Container-level isolation, zero logs — the browser is destroyed when your session ends. Pre-launch — join the waitlist.",
  metadataBase: new URL("https://intractify.com"),
  alternates: { canonical: "https://intractify.com" },
  keywords: [
    "cloud browser",
    "private browser",
    "isolated browser",
    "browser isolation service",
    "ephemeral browser",
    "zero-log browsing",
    "anonymous browser cloud",
    "remote browser isolation",
    "private browsing cloud",
    "cloud-based browser",
    "disposable browser",
    "Intractify",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Intractify — Private Cloud Browser | Browse Without a Trace",
    description:
      "Launch isolated cloud browser sessions with zero logs. The container is destroyed when your session ends — your device and its data stay out of it.",
    url: "https://intractify.com",
    siteName: "Intractify",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://intractify.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Intractify — Private Cloud Browser. Launch a session. Disappear when done.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Intractify — Private Cloud Browser | Browse Without a Trace",
    description:
      "Launch isolated cloud browser sessions with zero logs. No trace, no local footprint, no leaks.",
    images: ["https://intractify.com/og-image.png"],
    site: "@intractify",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  authors: [{ name: "Intractify Technologies", url: "https://intractify.com" }],
  creator: "Intractify Technologies",
  publisher: "Intractify Technologies",
  category: "technology",
  applicationName: "Intractify",
  // NOTE: Replace with actual code from Google Search Console once verified
  // verification: { google: "YOUR_GOOGLE_VERIFICATION_CODE" },
  appleWebApp: {
    capable: true,
    title: "Intractify",
    statusBarStyle: "black-translucent",
  },
  other: {
    "theme-color": "#1F2C58",
    "color-scheme": "light",
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="noise-overlay bg-background text-foreground flex min-h-full flex-col"
      >
        <UTMTracker />
        <StructuredData data={[organizationSchema, websiteSchema]} />
        {children}
      </body>
    </html>
  );
}

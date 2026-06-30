import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/lib/seo/structured-data";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Intractify — Private Cloud Browser | Browse Without a Trace",
    template: "%s | Intractify",
  },
  description:
    "Launch a fully isolated cloud browser in under 5 seconds. Container-level isolation, zero fingerprint, zero logs — browser destroyed when your session ends. Free to start.",
  metadataBase: new URL("https://intractify.com"),
  alternates: { canonical: "https://intractify.com" },
  keywords: [
    "cloud browser",
    "private browser",
    "isolated browser",
    "browser fingerprint protection",
    "ephemeral browser",
    "zero-log browsing",
    "anonymous browser cloud",
    "browser isolation service",
    "remote browser isolation",
    "private browsing cloud",
    "anti-fingerprint browser",
    "cloud-based browser",
    "disposable browser",
    "Intractify",
  ],
  openGraph: {
    title: "Intractify — Private Cloud Browser | Browse Without a Trace",
    description:
      "Launch isolated cloud browser sessions with zero logs. Container destroyed when your session ends — your IP, fingerprint, and history stay invisible.",
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
      "Launch isolated cloud browser sessions with zero logs. No trace, no fingerprint, no leaks.",
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
        <StructuredData data={[organizationSchema, websiteSchema]} />
        {children}
      </body>
    </html>
  );
}

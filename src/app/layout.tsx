import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { organizationSchema, softwareSchema } from "@/content/schema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CloudVeil — Private Cloud Browser | Browse Without a Trace",
  description:
    "Launch isolated cloud browser sessions with zero logs. Your IP, fingerprint, and browsing history stay invisible. Free plan available — no credit card required.",
  metadataBase: new URL("https://cloudveil.app"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "CloudVeil — Private Cloud Browser | Browse Without a Trace",
    description:
      "Launch isolated cloud browser sessions with zero logs. Your IP, fingerprint, and browsing history stay invisible.",
    url: "https://cloudveil.app",
    siteName: "CloudVeil",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://cloudveil.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "CloudVeil — Private Cloud Browser",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CloudVeil — Private Cloud Browser | Browse Without a Trace",
    description:
      "Launch isolated cloud browser sessions with zero logs. No trace, no fingerprint, no leaks.",
    images: ["https://cloudveil.app/og-image.png"],
    site: "@cloudveil",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareSchema),
          }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded focus:bg-[var(--cv-indigo)] focus:text-white"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}

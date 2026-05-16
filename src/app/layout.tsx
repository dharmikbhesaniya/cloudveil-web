import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "CloudVeil — Your Private Space in the Cloud", template: "%s | CloudVeil" },
  description:
    "A cloud-based privacy platform where you launch and interact with a fully isolated browser — entirely through a web-based interface. Nothing stored. Nothing tracked. Nothing traced.",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        {children}
      </body>
    </html>
  );
}

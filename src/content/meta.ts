import type { Metadata } from "next";

const DOMAIN = "https://cloudveil.app";
const SITE_NAME = "CloudVeil";

export const homeMeta: Metadata = {
  title: "CloudVeil — Private Cloud Browser | Browse Without a Trace",
  description:
    "Launch isolated cloud browser sessions with zero logs. Your IP, fingerprint, and browsing history stay invisible. Free plan available — no credit card required.",
  metadataBase: new URL(DOMAIN),
  alternates: { canonical: "/" },
  openGraph: {
    title: "CloudVeil — Private Cloud Browser | Browse Without a Trace",
    description:
      "Launch isolated cloud browser sessions with zero logs. Your IP, fingerprint, and browsing history stay invisible.",
    url: DOMAIN,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${DOMAIN}/og-image.png`,
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
    images: [`${DOMAIN}/og-image.png`],
    site: "@cloudveil",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const privacyPolicyMeta: Metadata = {
  title: "Privacy Policy — CloudVeil",
  description:
    "Read how CloudVeil collects, uses, and protects your data. We store no browsing content — your sessions are private by architecture.",
  metadataBase: new URL(DOMAIN),
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

export const termsOfServiceMeta: Metadata = {
  title: "Terms of Service — CloudVeil",
  description:
    "Review the terms governing your use of the CloudVeil cloud browser platform, including subscription terms, acceptable use, and payment conditions.",
  metadataBase: new URL(DOMAIN),
  alternates: { canonical: "/terms-of-service" },
  robots: { index: true, follow: true },
};

export const refundPolicyMeta: Metadata = {
  title: "Refund & Cancellation Policy — CloudVeil",
  description:
    "CloudVeil offers a 7-day refund window for new subscriptions. Learn about our cancellation policy, refund eligibility, and how to request a refund.",
  metadataBase: new URL(DOMAIN),
  alternates: { canonical: "/refund-policy" },
  robots: { index: true, follow: true },
};

export const contactMeta: Metadata = {
  title: "Contact Us — CloudVeil",
  description:
    "Get in touch with CloudVeil for support, billing questions, privacy inquiries, or enterprise sales. We respond within 24 hours on business days.",
  metadataBase: new URL(DOMAIN),
  alternates: { canonical: "/contact" },
  robots: { index: true, follow: true },
};

export const dataDeletionMeta: Metadata = {
  title: "Data Deletion Request — CloudVeil",
  description:
    "Request deletion of your CloudVeil account and all associated data. We process deletion requests within 30 days in compliance with GDPR and Google Play data safety requirements.",
  metadataBase: new URL(DOMAIN),
  alternates: { canonical: "/data-deletion" },
  robots: { index: true, follow: true },
};

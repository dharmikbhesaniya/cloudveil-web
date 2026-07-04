import type { Metadata } from "next";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { ContactForm } from "@/components/features/contact/ContactForm";
import Link from "next/link";
import { StructuredData } from "@/lib/seo/structured-data";
import { generateWebPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Contact | Intractify",
  description: "Get in touch with the Intractify team for support, billing, or privacy inquiries.",
  alternates: { canonical: "https://intractify.com/contact" },
};

const pageSchema = generateWebPageSchema({
  name: "Contact Intractify",
  description: "Get in touch with the Intractify team for support, billing, or privacy inquiries.",
  url: "https://intractify.com/contact",
  breadcrumb: [
    { name: "Home", url: "https://intractify.com" },
    { name: "Contact", url: "https://intractify.com/contact" },
  ],
});

const CONTACT_METHODS = [
  {
    label: "General Support",
    email: "support@intractify.com",
    description: "Account issues, technical problems, general questions",
  },
  {
    label: "Billing",
    email: "billing@intractify.com",
    description: "Payment issues, refund requests, invoice queries",
  },
  {
    label: "Privacy",
    email: "privacy@intractify.com",
    description: "Data requests, GDPR/CCPA rights, privacy concerns",
  },
  {
    label: "Legal",
    email: "legal@intractify.com",
    description: "Terms of service, legal notices, compliance",
  },
];

const FAQ_SHORTCUTS = [
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Data Deletion", href: "/data-deletion" },
];

export default function ContactPage() {
  return (
    <>
      <StructuredData data={pageSchema} />
      <Navbar />
      <main
        id="main-content"
        className="mx-auto max-w-4xl px-4 pb-24 pt-32 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <div className="mb-12">
          <p
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
              marginBottom: "8px",
            }}
          >
            — Get in Touch
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display, 'Instrument Serif', Georgia, serif)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "-0.02em",
              color: "var(--foreground)",
            }}
          >
            Contact Intractify
          </h1>
          <p
            style={{
              marginTop: "16px",
              maxWidth: "480px",
              fontSize: "15px",
              lineHeight: 1.6,
              color: "var(--muted-foreground)",
            }}
          >
            We&apos;re here to help. Our support team responds within 24 hours on
            business days (Monday–Friday, 9am–6pm IST).
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div>
            <h2
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "var(--foreground)",
                marginBottom: "24px",
              }}
            >
              Send Us a Message
            </h2>
            <ContactForm />
          </div>

          {/* Right column */}
          <div className="space-y-8">
            {/* Business info */}
            <div
              style={{
                background: "var(--cv-card-bg)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "24px",
              }}
            >
              <h2
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "var(--foreground)",
                  marginBottom: "16px",
                }}
              >
                Business Information
              </h2>
              <dl className="space-y-3 text-sm">
                {[
                  { label: "Company name", value: "Intractify Technologies" },
                  { label: "Registered address", value: "Intractify Technologies, India" },
                  { label: "Support hours", value: "Monday–Friday, 9am–6pm IST" },
                  { label: "Response time", value: "Within 24 hours on business days" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <dt style={{ fontWeight: 500, color: "var(--muted-foreground)" }}>
                      {label}
                    </dt>
                    <dd style={{ marginTop: "2px", color: "var(--foreground)", opacity: 0.7 }}>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Email contacts */}
            <div>
              <h2
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "var(--foreground)",
                  marginBottom: "16px",
                }}
              >
                Department Emails
              </h2>
              <ul className="space-y-3" role="list">
                {CONTACT_METHODS.map((method) => (
                  <li
                    key={method.email}
                    style={{
                      background: "var(--cv-card-bg)",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                      padding: "14px 16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--primary)",
                      }}
                    >
                      {method.label}
                    </span>
                    <a
                      href={`mailto:${method.email}`}
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "var(--foreground)",
                        textDecoration: "none",
                      }}
                      className="hover:text-[var(--primary)]"
                    >
                      {method.email}
                    </a>
                    <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
                      {method.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ shortcuts */}
            <div>
              <h2
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "var(--foreground)",
                  marginBottom: "16px",
                }}
              >
                Quick Links
              </h2>
              <ul className="grid grid-cols-2 gap-2" role="list">
                {FAQ_SHORTCUTS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        borderRadius: "12px",
                        border: "1px solid var(--border)",
                        padding: "12px 16px",
                        fontSize: "13px",
                        color: "var(--muted-foreground)",
                        textDecoration: "none",
                        transition: "border-color 0.2s, color 0.2s",
                      }}
                      className="hover:border-[var(--primary)] hover:text-[var(--primary)]"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path
                          d="M7 1L13 7m0 0L7 13M13 7H1"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

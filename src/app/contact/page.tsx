import type { Metadata } from "next";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | CloudVeil",
  description: "Get in touch with the CloudVeil team for support, billing, or privacy inquiries.",
};

const CONTACT_METHODS = [
  {
    label: "General Support",
    email: "support@cloudveil.app",
    description: "Account issues, technical problems, general questions",
  },
  {
    label: "Billing",
    email: "billing@cloudveil.app",
    description: "Payment issues, refund requests, invoice queries",
  },
  {
    label: "Privacy",
    email: "privacy@cloudveil.app",
    description: "Data requests, GDPR/CCPA rights, privacy concerns",
  },
  {
    label: "Legal",
    email: "legal@cloudveil.app",
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
      <Navbar />
      <main
        id="main-content"
        className="mx-auto max-w-4xl px-4 pb-24 pt-32 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <div className="mb-12">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[var(--cv-ink-subtle)]">
            Get in Touch
          </p>
          <h1
            className="text-4xl font-bold text-[var(--cv-ink)] sm:text-5xl"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontStyle: "italic",
            }}
          >
            Contact CloudVeil
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--cv-ink-muted)]">
            We&apos;re here to help. Our support team responds within 24 hours on
            business days (Monday–Friday, 9am–6pm IST).
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div>
            <h2 className="mb-6 text-lg font-semibold text-[var(--cv-ink)]">
              Send Us a Message
            </h2>
            <form
              action="mailto:support@cloudveil.app"
              method="get"
              encType="text/plain"
              className="space-y-5"
              aria-label="Contact form"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block text-sm font-medium text-[var(--cv-ink-muted)]"
                >
                  Full Name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                  className="w-full rounded-xl px-4 py-3 text-sm text-[var(--cv-ink)] placeholder:text-[var(--cv-ink-subtle)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cv-indigo)]"
                  style={{
                    background: "var(--cv-glass)",
                    border: "1px solid var(--cv-border)",
                    backdropFilter: "blur(8px)",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-sm font-medium text-[var(--cv-ink-muted)]"
                >
                  Email Address <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl px-4 py-3 text-sm text-[var(--cv-ink)] placeholder:text-[var(--cv-ink-subtle)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cv-indigo)]"
                  style={{
                    background: "var(--cv-glass)",
                    border: "1px solid var(--cv-border)",
                    backdropFilter: "blur(8px)",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-1.5 block text-sm font-medium text-[var(--cv-ink-muted)]"
                >
                  Subject <span aria-hidden="true">*</span>
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  required
                  className="w-full rounded-xl px-4 py-3 text-sm text-[var(--cv-ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cv-indigo)]"
                  style={{
                    background: "var(--cv-glass)",
                    border: "1px solid var(--cv-border)",
                    backdropFilter: "blur(8px)",
                  }}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a topic
                  </option>
                  <option value="General support">General support</option>
                  <option value="Billing / refund">Billing / refund</option>
                  <option value="Privacy request">Privacy request</option>
                  <option value="Enterprise inquiry">Enterprise inquiry</option>
                  <option value="Bug report">Bug report</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-sm font-medium text-[var(--cv-ink-muted)]"
                >
                  Message <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="body"
                  required
                  rows={5}
                  placeholder="Describe your issue or question..."
                  className="w-full resize-y rounded-xl px-4 py-3 text-sm text-[var(--cv-ink)] placeholder:text-[var(--cv-ink-subtle)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cv-indigo)]"
                  style={{
                    background: "var(--cv-glass)",
                    border: "1px solid var(--cv-border)",
                    backdropFilter: "blur(8px)",
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cv-indigo)] focus-visible:ring-offset-2"
                style={{
                  background:
                    "linear-gradient(135deg, var(--cv-indigo) 0%, #8B5CF6 100%)",
                }}
              >
                Send Message
              </button>

              <p className="text-xs text-[var(--cv-ink-subtle)]">
                By submitting this form, you agree to our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-[var(--cv-indigo)] hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </div>

          {/* Contact info & details */}
          <div className="space-y-8">
            {/* Business info */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "var(--cv-glass)",
                border: "1px solid var(--cv-border)",
                backdropFilter: "blur(8px)",
              }}
            >
              <h2 className="mb-4 text-base font-semibold text-[var(--cv-ink)]">
                Business Information
              </h2>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="font-medium text-[var(--cv-ink-muted)]">
                    Company name
                  </dt>
                  <dd className="mt-0.5 text-[var(--cv-ink-subtle)]">
                    CloudVeil Technologies
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-[var(--cv-ink-muted)]">
                    Registered address
                  </dt>
                  <dd className="mt-0.5 text-[var(--cv-ink-subtle)]">
                    CloudVeil Technologies, India
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-[var(--cv-ink-muted)]">
                    Support hours
                  </dt>
                  <dd className="mt-0.5 text-[var(--cv-ink-subtle)]">
                    Monday–Friday, 9am–6pm IST
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-[var(--cv-ink-muted)]">
                    Response time
                  </dt>
                  <dd className="mt-0.5 text-[var(--cv-ink-subtle)]">
                    Within 24 hours on business days
                  </dd>
                </div>
              </dl>
            </div>

            {/* Email contacts */}
            <div>
              <h2 className="mb-4 text-base font-semibold text-[var(--cv-ink)]">
                Department Emails
              </h2>
              <ul className="space-y-3" role="list">
                {CONTACT_METHODS.map((method) => (
                  <li
                    key={method.email}
                    className="flex flex-col rounded-xl p-4"
                    style={{
                      background: "var(--cv-glass)",
                      border: "1px solid var(--cv-border)",
                    }}
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--cv-indigo)]">
                      {method.label}
                    </span>
                    <a
                      href={`mailto:${method.email}`}
                      className="mt-0.5 text-sm font-medium text-[var(--cv-ink)] hover:text-[var(--cv-indigo)]"
                    >
                      {method.email}
                    </a>
                    <span className="mt-1 text-xs text-[var(--cv-ink-subtle)]">
                      {method.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ shortcuts */}
            <div>
              <h2 className="mb-4 text-base font-semibold text-[var(--cv-ink)]">
                Quick Links
              </h2>
              <ul className="grid grid-cols-2 gap-2" role="list">
                {FAQ_SHORTCUTS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 rounded-xl border border-[var(--cv-border)] px-4 py-3 text-sm text-[var(--cv-ink-muted)] transition-colors hover:border-[var(--cv-indigo)] hover:text-[var(--cv-indigo)]"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                      >
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

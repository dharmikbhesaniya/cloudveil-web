import Link from "next/link";

const PRODUCT_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "How It Works", href: "#how-it-works" },
];

const COMPANY_LINKS = [
  { label: "About", href: "#" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "#" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Data Deletion", href: "/data-deletion" },
];

const CONNECT_LINKS = [
  {
    label: "Twitter / X",
    href: "https://twitter.com/cloudveil",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/cloudveil",
    external: true,
  },
];

function FooterLogo() {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--cv-indigo)] to-[var(--cv-magenta)] shadow-sm">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path
            d="M9 2C5.5 2 3 4.5 3 7.5c0 1.2.4 2.3 1 3.2L9 16l5-5.3c.6-.9 1-2 1-3.2C15 4.5 12.5 2 9 2z"
            fill="rgba(255,255,255,0.9)"
          />
          <circle cx="9" cy="7.5" r="2" fill="rgba(107,76,255,0.6)" />
        </svg>
      </span>
      <span className="text-lg font-semibold tracking-tight text-[var(--cv-ink)]">
        Cloud
        <span className="bg-gradient-to-r from-[var(--cv-indigo)] to-[var(--cv-magenta)] bg-clip-text text-transparent">
          Veil
        </span>
      </span>
    </div>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--cv-ink-subtle)]">
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="border-t border-[var(--cv-border)] bg-[var(--cv-paper)]"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column — takes 2 cols on lg */}
          <div className="lg:col-span-2">
            <FooterLogo />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--cv-ink-subtle)]">
              Browse the web without leaving a trace. Fully isolated cloud
              browser sessions, destroyed the moment you close them.
            </p>
            <a
              href="https://app.cloudveil.app"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center rounded-lg bg-[var(--cv-indigo)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Launch Free Session →
            </a>
          </div>

          {/* Product */}
          <FooterColumn title="Product">
            <ul className="space-y-2.5" role="list">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--cv-ink-muted)] transition-colors hover:text-[var(--cv-ink)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Company */}
          <FooterColumn title="Company">
            <ul className="space-y-2.5" role="list">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("/") ? (
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--cv-ink-muted)] transition-colors hover:text-[var(--cv-ink)]"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-[var(--cv-ink-muted)] transition-colors hover:text-[var(--cv-ink)]"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Legal + Connect stacked */}
          <div className="space-y-8">
            <FooterColumn title="Legal">
              <ul className="space-y-2.5" role="list">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--cv-ink-muted)] transition-colors hover:text-[var(--cv-ink)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn title="Connect">
              <ul className="space-y-2.5" role="list">
                {CONNECT_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-[var(--cv-ink-muted)] transition-colors hover:text-[var(--cv-ink)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--cv-border)] pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-[var(--cv-ink-subtle)]">
            © 2025 CloudVeil. All rights reserved.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-full border border-[var(--cv-border)] bg-[var(--cv-glass)] px-3 py-1 text-xs font-medium text-[var(--cv-ink-muted)]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M6 1L1 3.5v3C1 9.25 3.2 11.2 6 12c2.8-.8 5-2.75 5-5.5v-3L6 1z" fill="var(--cv-indigo)" opacity="0.7" />
              </svg>
              No logs policy
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-[var(--cv-border)] bg-[var(--cv-glass)] px-3 py-1 text-xs font-medium text-[var(--cv-ink-muted)]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <rect x="1.5" y="5.5" width="9" height="6" rx="1" stroke="var(--cv-indigo)" strokeWidth="1.2" fill="none" opacity="0.7" />
                <path d="M3.5 5.5V4a2.5 2.5 0 015 0v1.5" stroke="var(--cv-indigo)" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
              </svg>
              End-to-end encrypted sessions
            </span>
            <span className="text-xs text-[var(--cv-ink-subtle)]">
              Servers in US, EU, India, Singapore
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

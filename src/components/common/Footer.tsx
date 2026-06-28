"use client";

import Link from "next/link";

const COL_PRODUCT = [
  { label: "Features", href: "#features" },
  { label: "Method", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Questions", href: "#faq" },
];

const COL_HOUSE = [
  { label: "Contact", href: "/contact" },
  { label: "Refund policy", href: "/refund-policy" },
  { label: "Data deletion", href: "/data-deletion" },
];

const COL_LEGAL = [
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms-of-service" },
  { label: "Cookies", href: "/privacy-policy#cookies" },
  { label: "DPA", href: "/data-deletion" },
];

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--secondary)",
        padding: "60px 0 40px",
        marginTop: "80px",
        borderTop: "1px solid var(--border)",
      }}
      id="site-footer"
    >
      <div
        className="mx-auto max-w-7xl"
        style={{ padding: "0 clamp(24px, 5vw, 40px)" }}
      >
        {/* 4-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
            gap: "40px",
          }}
          className="footer-grid"
        >
          {/* Colophon */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-display, 'Instrument Serif', Georgia, serif)",
                fontStyle: "italic",
                fontSize: "36px",
                lineHeight: 1,
                color: "var(--foreground)",
              }}
            >
              Intractify
            </div>
            <p
              style={{
                fontFamily: "var(--font-display, 'Instrument Serif', Georgia, serif)",
                fontStyle: "italic",
                fontSize: "16px",
                color: "var(--muted-foreground)",
                margin: "14px 0 0",
                maxWidth: "320px",
                lineHeight: 1.4,
              }}
            >
              A private space in the cloud, built fresh, lived in once, and demolished as you leave.
            </p>
            <div
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--muted-foreground)",
                marginTop: "24px",
              }}
            >
              — Est. 2025 · Mumbai &amp; Bengaluru
            </div>
          </div>

          {/* Product */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--muted-foreground)",
                margin: "0 0 14px",
              }}
            >
              — Product
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {COL_PRODUCT.map((item) => (
                <li key={item.label} style={{ padding: "4px 0" }}>
                  <a
                    href={item.href}
                    style={{
                      fontSize: "14px",
                      color: "var(--foreground)",
                      textDecoration: "none",
                      transition: "color 0.25s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--foreground)")}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* House */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--muted-foreground)",
                margin: "0 0 14px",
              }}
            >
              — House
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {COL_HOUSE.map((item) => (
                <li key={item.label} style={{ padding: "4px 0" }}>
                  <Link
                    href={item.href}
                    style={{
                      fontSize: "14px",
                      color: "var(--foreground)",
                      textDecoration: "none",
                      transition: "color 0.25s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--foreground)")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quietly stated (legal) */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--muted-foreground)",
                margin: "0 0 14px",
              }}
            >
              — Quietly stated
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {COL_LEGAL.map((item) => (
                <li key={item.label} style={{ padding: "4px 0" }}>
                  <Link
                    href={item.href}
                    style={{
                      fontSize: "14px",
                      color: "var(--foreground)",
                      textDecoration: "none",
                      transition: "color 0.25s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--foreground)")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: "40px",
            paddingTop: "24px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "10px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--muted-foreground)",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <span>© Intractify Systems Inc. {new Date().getFullYear()} · All quietly reserved.</span>
          <span>
            <Link href="/contact" style={{ color: "inherit", textDecoration: "none" }}>
              Contact
            </Link>
            {" · "}
            <Link href="/privacy-policy" style={{ color: "inherit", textDecoration: "none" }}>
              Privacy
            </Link>
            {" · "}
            <Link href="/terms-of-service" style={{ color: "inherit", textDecoration: "none" }}>
              Terms
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

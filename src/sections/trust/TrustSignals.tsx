"use client";

import { useRef, useEffect, useState } from "react";

const NAMES = [
  { name: "Northwave", serif: true },
  { name: "CIPHER LABS", serif: false },
  { name: "Obscura", serif: true },
  { name: "QUANTA", serif: false },
  { name: "Raven OS", serif: true },
  { name: "HALCYON", serif: false },
  { name: "Meridian & Bow", serif: true },
  { name: "PRIVATEER", serif: false },
];

const STRIP = [...NAMES, ...NAMES];

const SIGNALS = [
  {
    label: "Zero data retention",
    body: "No browsing data survives after a session ends. Cookies, history, cache — destroyed on terminate.",
  },
  {
    label: "Isolated containers",
    body: "Each session runs in its own dedicated container. No shared state between sessions by construction.",
  },
  {
    label: "No activity logging",
    body: "URLs, passwords, and screen content are never logged. The platform is blind to what you browse.",
  },
  {
    label: "End-to-end proxy",
    body: "Your device never connects directly to the internet. Only the gateway sees your origin, and it forgets.",
  },
];

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function useReveal(threshold = 0.2) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export function TrustSignals() {
  const { ref, visible } = useReveal();

  return (
    <section
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      {/* Marquee strip */}
      <div style={{ padding: "40px 0" }}>
        <div
          style={{
            textAlign: "center",
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "10px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--muted-foreground)",
            marginBottom: "24px",
          }}
        >
          — Quietly trusted by
        </div>

        <div
          className="marquee-wrap"
          style={{ "--marquee-dur": "38s" } as React.CSSProperties}
        >
          <div className="marquee-track" style={{ gap: "64px" }}>
            {STRIP.map(({ name, serif }, i) => (
              <span
                key={`${name}-${i}`}
                style={{
                  fontFamily: serif
                    ? "var(--font-display, 'Instrument Serif', Georgia, serif)"
                    : "var(--font-sans, ui-sans-serif, sans-serif)",
                  fontStyle: serif ? "italic" : "normal",
                  fontWeight: serif ? 400 : 600,
                  fontSize: "24px",
                  color: "var(--muted-foreground)",
                  whiteSpace: "nowrap",
                  letterSpacing: "-0.01em",
                  transition: "color 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "var(--foreground)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "var(--muted-foreground)";
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Trust pillars */}
      <div
        ref={ref}
        className="trust-grid mx-auto max-w-7xl"
        style={{
          padding: "40px clamp(24px, 5vw, 40px) 48px",
          borderTop: "1px solid var(--border)",
          display: "grid",
          gap: "40px",
        }}
      >
        {SIGNALS.map(({ label, body }, i) => (
          <div
            key={label}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.8s ${EASE} ${i * 0.09}s, transform 0.8s ${EASE} ${i * 0.09}s`,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--foreground)",
                marginBottom: "10px",
              }}
            >
              {label}
            </div>
            <p
              style={{
                fontSize: "13.5px",
                lineHeight: 1.55,
                color: "var(--muted-foreground)",
                margin: 0,
                fontFamily: "var(--font-sans)",
              }}
            >
              {body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

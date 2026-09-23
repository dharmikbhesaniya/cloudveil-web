"use client";

import { useRef, useEffect, useState } from "react";

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
    label: "No local egress",
    body: "Your device never connects to the sites you visit. All browsing happens inside the cloud session, so nothing is read from or written to your machine.",
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
      {/* Honesty strip */}
      <div style={{ padding: "40px 0" }}>
        <div
          style={{
            textAlign: "center",
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "10px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--muted-foreground)",
          }}
        >
          — Built for privacy-first people and teams · pre-launch
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

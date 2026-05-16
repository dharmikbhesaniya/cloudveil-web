"use client";

import { useRef, useEffect, useState } from "react";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function useReveal(threshold = 0.2) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
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

export function CTASection() {
  const { ref, visible } = useReveal();

  return (
    <section
      ref={ref}
      style={{
        padding: "120px 0 80px",
        borderTop: "1px solid var(--border)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.9s ${EASE}, transform 0.9s ${EASE}`,
      }}
    >
      <div
        className="mx-auto max-w-7xl"
        style={{ padding: "0 clamp(24px, 5vw, 40px)" }}
      >
        {/* Stamp */}
        <div
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--muted-foreground)",
            marginBottom: "18px",
          }}
        >
          — A closing argument
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "var(--font-sans, ui-sans-serif, sans-serif)",
            fontWeight: 500,
            fontSize: "clamp(48px, 6vw, 76px)",
            lineHeight: 0.98,
            letterSpacing: "-0.035em",
            maxWidth: "880px",
            textWrap: "balance" as React.CSSProperties["textWrap"],
            margin: 0,
            color: "var(--foreground)",
          }}
        >
          Open a browser.{" "}
          <span
            style={{
              fontFamily: "var(--font-display, 'Instrument Serif', Georgia, serif)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "#6F2530",
            }}
          >
            Disappear
          </span>{" "}
          when done.
        </h2>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: "22px",
            alignItems: "baseline",
            marginTop: "40px",
            flexWrap: "wrap",
          }}
        >
          <a
            href="https://app.cloudveil.app/sign-up"
            className="btn-ink"
            id="cta-primary"
          >
            Launch a browser <span>→</span>
          </a>
          <a className="serif-link" href="#pricing">
            view pricing
          </a>
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "11px",
              color: "var(--muted-foreground)",
              marginLeft: "auto",
            }}
          >
            5s to launch · 0s of trace · no card
          </span>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useEffect, useState } from "react";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Stroke-only schematics, one per feature row. Palette: --primary indigo +
 * --muted-foreground ink; no fills except the card colour; stroke-width 1.5.
 */
function FeatureDiagram({ num }: { num: string }) {
  const p = "var(--primary)";
  const m = "var(--muted-foreground)";
  const s = {
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
  } as const;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      style={{ width: 56, height: 56, flexShrink: 0 }}
    >
      {num === "i." && (
        <>
          <rect x="6" y="15" width="16" height="20" rx="2" {...s} stroke={p} />
          <rect x="26" y="15" width="16" height="20" rx="2" {...s} stroke={m} />
        </>
      )}
      {num === "ii." && (
        <>
          <rect
            x="26"
            y="6"
            width="16"
            height="16"
            rx="2"
            {...s}
            stroke={m}
            strokeDasharray="3 3"
          />
          <circle cx="34" cy="14" r="4.5" {...s} stroke={m} />
          <path
            d="M6 38h-1l1-5h16l1 5z"
            {...s}
            stroke={m}
            strokeWidth="1.2"
          />
          <rect x="6" y="24" width="16" height="11" rx="1.5" {...s} stroke={p} />
          <path d="M6 20l8-6 8 6" {...s} stroke={p} strokeWidth="1.2" />
          <line
            x1="22"
            y1="14"
            x2="26"
            y2="14"
            {...s}
            stroke={m}
            strokeDasharray="2 3"
          />
        </>
      )}
      {num === "iii." && (
        <>
          <circle cx="12" cy="24" r="7.5" {...s} stroke={p} />
          <circle cx="10" cy="21" r="1" fill={p} stroke="none" />
          <circle cx="14" cy="26" r="1" fill={p} stroke="none" />
          <line x1="24" y1="24" x2="32" y2="24" {...s} stroke={m} />
          <path d="M29 19l3 5-3 5" {...s} stroke={m} strokeWidth="1.2" />
          <circle cx="39" cy="24" r="6" {...s} stroke={m} />
          <line x1="35" y1="20" x2="43" y2="28" {...s} stroke={m} />
        </>
      )}
      {num === "iv." && (
        <>
          <path
            d="M34 40a14 14 0 1 1 11-13"
            {...s}
            stroke={p}
            strokeWidth="1.2"
          />
          <path d="M45 27l-1 7-7-1" {...s} stroke={p} strokeWidth="1.2" />
          <rect x="6" y="24" width="20" height="16" rx="2" {...s} stroke={m} />
          <line x1="6" y1="29" x2="26" y2="29" {...s} stroke={m} strokeWidth="1.2" />
          <circle cx="10" cy="26.5" r="1" fill={m} stroke="none" />
        </>
      )}
      {num === "v." && (
        <>
          <path
            d="M12 26a5 5 0 0 1 1-9.5 6 6 0 0 1 11 .5 4.5 4.5 0 0 1 1 8.9H12z"
            {...s}
            stroke={m}
          />
          <line x1="26" y1="24" x2="38" y2="12" {...s} stroke={p} />
          <path d="M32 23l6-2-2-6" {...s} stroke={p} />
          <rect
            x="30"
            y="26"
            width="12"
            height="12"
            rx="2"
            {...s}
            stroke={p}
          />
          <path d="M34 30l4 4M38 30l-4 4" {...s} stroke={p} strokeWidth="1.2" />
        </>
      )}
      {num === "vi." && (
        <>
          <circle cx="9" cy="24" r="4" {...s} stroke={m} />
          <circle cx="21" cy="24" r="4" {...s} stroke={m} />
          <line x1="13" y1="24" x2="17" y2="24" {...s} stroke={m} strokeWidth="1.2" />
          <path
            d="M25 24h8a3 3 0 0 1 3 3v0"
            {...s}
            stroke={p}
            strokeWidth="1.2"
          />
          <path d="M36 27l-6 1 2-5" {...s} stroke={p} strokeWidth="1.2" />
          <circle cx="40" cy="33" r="5.5" {...s} stroke={p} />
          <line x1="37" y1="30" x2="43" y2="36" {...s} stroke={p} />
        </>
      )}
    </svg>
  );
}

const FEATURES = [
  {
    num: "i.",
    title: "Container isolation",
    tech: "Dedicated container · isolated filesystem",
    body: (
      <>
        Every browser runs in a dedicated container — its own filesystem,
        its own network. <span className="cv-em">No shared state between sessions</span>, no cross-tenant leakage by
        construction.
      </>
    ),
  },
  {
    num: "ii.",
    title: "Isolated from your device",
    tech: "cloud container · no local footprint",
    body: (
      <>
        Every session is a fresh browser running in a dedicated cloud container —
        completely separate from your device. Websites see the session, not your
        machine.{" "}
        <span className="cv-em">Nothing runs, writes, or lingers on your computer.</span>
      </>
    ),
  },
  {
    num: "iii.",
    title: "Ephemeral by design",
    tech: "no persistent volume",
    body: (
      <>
        Cookies, history, cache, downloads — destroyed when the container terminates.{" "}
        <span className="cv-em">There is no delete, because there is nothing to keep.</span>
      </>
    ),
  },
  {
    num: "iv.",
    title: "Fresh container per session",
    tech: "clean profile every launch",
    body: (
      <>
        Each launch provisions a fresh container with a clean Chromium profile.{" "}
        <span className="cv-em">No warm-up between visits, no leftover state.</span>
      </>
    ),
  },
  {
    num: "v.",
    title: "Cloud egress",
    tech: "traffic exits from the session",
    body: (
      <>
        Site traffic leaves from the cloud session&apos;s network — never from
        your device&apos;s connection.{" "}
        <span className="cv-em">Your local network never carries the page data.</span>
      </>
    ),
  },
  {
    num: "vi.",
    title: "Auto-terminate",
    tech: "launched → running → idle → ended → ∅",
    body: null,
    lifecycle: true,
  },
];

const LIFECYCLE = ["launched", "running", "idle", "ended", "∅ 0 bytes"];

function useReveal(threshold = 0.18) {
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

function FeatureRow({
  feature,
  delay = 0,
}: {
  feature: (typeof FEATURES)[0];
  delay?: number;
}) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gap: "40px",
        padding: "32px 0",
        borderBottom: "1px solid var(--border)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.9s ${EASE} ${delay}s, transform 0.9s ${EASE} ${delay}s`,
      }}
      className="feature-row group"
    >
      {/* Number */}
      <div
        style={{
          fontFamily: "var(--font-display, 'Instrument Serif', Georgia, serif)",
          fontSize: "36px",
          lineHeight: 1,
          color: "var(--muted-foreground)",
          transition: "color 0.3s, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.color = "var(--primary)";
          el.style.transform = "translateX(4px)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.color = "var(--muted-foreground)";
          el.style.transform = "translateX(0)";
        }}
      >
        {feature.num}
      </div>

      {/* Title + tech */}
      <div>
        <h3
          style={{
            fontFamily: "var(--font-display, 'Instrument Serif', Georgia, serif)",
            fontWeight: 400,
            fontSize: "28px",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: "0 0 6px",
            color: "var(--foreground)",
          }}
        >
          {feature.title}
        </h3>
        <div
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "10.5px",
            color: "var(--muted-foreground)",
            letterSpacing: "0.04em",
          }}
        >
          {feature.tech}
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          display: "flex",
          gap: "28px",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          {feature.body ? (
            <p
              style={{
                fontSize: "14.5px",
                lineHeight: 1.55,
                color: "var(--muted-foreground)",
                margin: 0,
              }}
            >
              {feature.body}
            </p>
          ) : (
            <>
              <p
                style={{
                  fontSize: "14.5px",
                  lineHeight: 1.55,
                  color: "var(--muted-foreground)",
                  margin: 0,
                }}
              >
                Sessions end on idle, on tab close, or at a hard cap you set.{" "}
                <span className="cv-em" style={{ color: "var(--foreground)" }}>
                  No forgotten browser leaking overnight.
                </span>
              </p>
              {/* Lifecycle bar */}
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  alignItems: "center",
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "11px",
                  color: "var(--muted-foreground)",
                }}
              >
                {LIFECYCLE.map((step, i) => (
                  <span key={step} style={{ display: "contents" }}>
                    <span
                      style={{
                        whiteSpace: "nowrap",
                        color:
                          i === LIFECYCLE.length - 1
                            ? "var(--muted-foreground)"
                            : "inherit",
                      }}
                    >
                      {step}
                    </span>
                    {i < LIFECYCLE.length - 1 && (
                      <span
                        className="lifecycle-rule"
                        style={
                          { animationDelay: `${i * 1.75}s` } as React.CSSProperties
                        }
                      />
                    )}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Micro-diagram */}
        <div
          style={{
            flexShrink: 0,
            paddingTop: "4px",
            marginLeft: "auto",
          }}
        >
          <FeatureDiagram num={feature.num} />
        </div>
      </div>
    </div>
  );
}

export function Features() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setHeaderVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      style={{
        padding: "100px 0",
        background: "var(--secondary)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
      id="features"
    >
      <div
        className="mx-auto max-w-7xl"
        style={{ padding: "0 clamp(24px, 5vw, 40px)" }}
      >
        {/* Section stamp */}
        <div
          style={{
            color: "var(--muted-foreground)",
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "18px",
          }}
        >
          — Built for privacy
        </div>

        {/* Section heading */}
        <div ref={headerRef} className={headerVisible ? "is-revealed" : ""}>
          <h2
            style={{
              fontFamily: "var(--font-sans, ui-sans-serif, sans-serif)",
              fontWeight: 500,
              fontSize: "clamp(36px, 4.5vw, 56px)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              margin: "0 0 56px",
              maxWidth: "720px",
              color: "var(--foreground)",
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.9s ${EASE}, transform 0.9s ${EASE}`,
            }}
          >
            Six layers of{" "}
            <span
              className="cv-underline"
              style={{
                fontFamily: "var(--font-display, 'Instrument Serif', Georgia, serif)",
                fontWeight: 400,
              }}
            >
              isolation
            </span>
            , in sequence.
          </h2>
        </div>

        {/* Feature rows */}
        {FEATURES.map((f, i) => (
          <FeatureRow key={f.num} feature={f} delay={i * 0.05} />
        ))}
      </div>
    </section>
  );
}

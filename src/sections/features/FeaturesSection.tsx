"use client";

import { useRef, useEffect, useState } from "react";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const FEATURES = [
  {
    num: "i.",
    title: "Container isolation",
    tech: "ECS task · own kernel namespace",
    body: (
      <>
        Every browser runs in a dedicated ECS task — its own kernel namespace, its own filesystem,
        its own network. <i>No shared state between sessions</i>, no cross-tenant leakage by
        construction.
      </>
    ),
  },
  {
    num: "ii.",
    title: "Anti-fingerprint",
    tech: "canvas · WebGL · audio · fonts",
    body: (
      <>
        Canvas, WebGL, audio, fonts and timing are randomised per session.{" "}
        <i>The browser presents a different identity every time</i> — the same person never appears
        twice.
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
        <i>There is no delete, because there is nothing to keep.</i>
      </>
    ),
  },
  {
    num: "iv.",
    title: "Sub-5s boot",
    tech: "pre-warmed pools · stripped Chromium",
    body: (
      <>
        Pre-warmed task pools and a stripped Chromium image bring a fresh session live in under five
        seconds. <i>No spinning, no warm-up screen.</i>
      </>
    ),
  },
  {
    num: "v.",
    title: "Routed exit IPs",
    tech: "14 regions · residential or datacenter",
    body: (
      <>
        Pick from rotating residential or datacenter exits in 14 regions.{" "}
        <i>Your real address never touches the public internet</i> — only the gateway sees it, and
        the gateway forgets.
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
        gridTemplateColumns: "80px 1fr 2fr",
        gap: "40px",
        padding: "32px 0",
        borderBottom: "1px solid var(--border)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.9s ${EASE} ${delay}s, transform 0.9s ${EASE} ${delay}s`,
      }}
      className="group"
    >
      {/* Number */}
      <div
        style={{
          fontFamily: "var(--font-display, 'Instrument Serif', Georgia, serif)",
          fontStyle: "italic",
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
            fontStyle: "italic",
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
      <div>
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
              <i style={{ color: "var(--foreground)", fontStyle: "italic" }}>
                No forgotten browser leaking overnight.
              </i>
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
        <div ref={headerRef}>
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
              style={{
                fontFamily: "var(--font-display, 'Instrument Serif', Georgia, serif)",
                fontStyle: "italic",
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

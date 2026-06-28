"use client";

import { useEffect, useRef, useState } from "react";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const COMPARISONS = [
  {
    vector: "Local Cookies & Cache",
    vpn: "Stored on your device. Ad trackers and cookies accumulate over time.",
    intractify: "Destroyed with the container. Leaves 0 bytes on your physical drive.",
    vpnOk: false,
  },
  {
    vector: "Browser Fingerprinting",
    vpn: "Exposed. Web servers read your real OS, fonts, screen, and canvas hash.",
    intractify: "Normalized. You share an identical generic profile with thousands.",
    vpnOk: false,
  },
  {
    vector: "Script Execution & Malware",
    vpn: "Executed locally. Drive-by exploits and malware run directly on your OS.",
    intractify: "Trapped in the cloud. Your machine only receives a stream of pixels.",
    vpnOk: false,
  },
  {
    vector: "WebRTC & DNS Leaks",
    vpn: "Frequent leak vector. Configuration slips can expose your true IP.",
    intractify: "Architecturally impossible. Your local IP never contacts target servers.",
    vpnOk: false,
  },
  {
    vector: "Session Correlation",
    vpn: "Persistent. Ad networks link visits together to build a profile on you.",
    intractify: "Fresh container per tab. Every session starts with a clean slate.",
    vpnOk: false,
  },
];

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

export function ComparisonSection() {
  const { ref: headerRef, visible: headerVisible } = useReveal(0.3);
  const { ref: tableRef, visible: tableVisible } = useReveal(0.1);

  return (
    <section
      style={{
        padding: "100px 0",
        background: "var(--background)",
        borderBottom: "1px solid var(--border)",
      }}
      id="comparison"
    >
      <div
        className="mx-auto max-w-7xl"
        style={{ padding: "0 clamp(24px, 5vw, 40px)" }}
      >
        {/* Eyebrow */}
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
          — Structural Difference
        </div>

        {/* Heading */}
        <div ref={headerRef}>
          <h2
            style={{
              fontFamily: "var(--font-sans, ui-sans-serif, sans-serif)",
              fontWeight: 500,
              fontSize: "clamp(36px, 4.5vw, 56px)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              margin: "0 0 56px",
              maxWidth: "800px",
              color: "var(--foreground)",
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.9s ${EASE}, transform 0.9s ${EASE}`,
            }}
          >
            VPNs hide your location.{" "}
            <span
              style={{
                fontFamily: "var(--font-display, 'Instrument Serif', Georgia, serif)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              Intractify
            </span>{" "}
            isolates your session.
          </h2>
        </div>

        {/* Comparison Table / Grid */}
        <div
          ref={tableRef}
          style={{
            opacity: tableVisible ? 1 : 0,
            transform: tableVisible ? "translateY(0)" : "translateY(24px)",
            transition: `opacity 0.9s ${EASE}, transform 0.9s ${EASE}`,
            borderTop: "1px solid var(--border)",
          }}
        >
          {/* Header Row - Desktop Only */}
          <div
            className="hidden md:grid"
            style={{
              gridTemplateColumns: "1.2fr 1fr 1fr",
              padding: "20px 0",
              borderBottom: "1px solid var(--border)",
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "11px",
              color: "var(--muted-foreground)",
              letterSpacing: "0.05em",
            }}
          >
            <div>PRIVACY VECTOR</div>
            <div>STANDARD VPN</div>
            <div style={{ color: "var(--foreground)" }}>INTRACTIFY SANDBOX</div>
          </div>

          {/* Comparisons */}
          {COMPARISONS.map((item, idx) => (
            <div
              key={idx}
              style={{
                borderBottom: "1px solid var(--border)",
                padding: "28px 0",
              }}
            >
              {/* Desktop view */}
              <div
                className="hidden md:grid"
                style={{
                  gridTemplateColumns: "1.2fr 1fr 1fr",
                  gap: "32px",
                  alignItems: "start",
                }}
              >
                {/* Vector Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-display, 'Instrument Serif', Georgia, serif)",
                    fontStyle: "italic",
                    fontSize: "22px",
                    fontWeight: 400,
                    margin: 0,
                    color: "var(--foreground)",
                  }}
                >
                  {item.vector}
                </h3>

                {/* VPN Column */}
                <div style={{ fontSize: "14px", lineHeight: 1.5, color: "var(--muted-foreground)" }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "start" }}>
                    <span style={{ color: "#E54B4B", fontFamily: "var(--font-mono, monospace)" }}>✕</span>
                    <span>{item.vpn}</span>
                  </div>
                </div>

                {/* Intractify Column */}
                <div style={{ fontSize: "14px", lineHeight: 1.5, color: "var(--foreground)" }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "start" }}>
                    <span style={{ color: "var(--primary)", fontFamily: "var(--font-mono, monospace)" }}>✓</span>
                    <span>{item.intractify}</span>
                  </div>
                </div>
              </div>

              {/* Mobile View */}
              <div
                className="grid md:hidden"
                style={{
                  gap: "16px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display, 'Instrument Serif', Georgia, serif)",
                    fontStyle: "italic",
                    fontSize: "20px",
                    fontWeight: 400,
                    margin: 0,
                    color: "var(--foreground)",
                  }}
                >
                  {item.vector}
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13.5px", lineHeight: 1.5 }}>
                  <div style={{ background: "var(--cv-card-bg)", padding: "14px", borderRadius: "8px", border: "1px solid var(--border)" }}>
                    <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "9.5px", color: "var(--muted-foreground)", marginBottom: "4px" }}>VPN SERVICE</div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "start", color: "var(--muted-foreground)" }}>
                      <span style={{ color: "#E54B4B" }}>✕</span>
                      <span>{item.vpn}</span>
                    </div>
                  </div>

                  <div style={{ background: "var(--background)", padding: "14px", borderRadius: "8px", border: "1px solid var(--foreground)" }}>
                    <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "9.5px", color: "var(--muted-foreground)", marginBottom: "4px" }}>INTRACTIFY SANDBOX</div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "start", color: "var(--foreground)" }}>
                      <span style={{ color: "var(--primary)" }}>✓</span>
                      <span>{item.intractify}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

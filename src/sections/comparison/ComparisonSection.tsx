"use client";

import { useEffect, useRef, useState } from "react";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

const STEPS = [
  {
    category: "LOCAL STORAGE",
    title: "Persistent Tracking Cookies",
    vpn: "Stored directly on your device. Cookies, session logs, and cache files accumulate over time, allowing ad networks to correlate your identity across visits.",
    intractify:
      "Destroyed instantly on session close. Cookies and cache files exist only in the remote cloud memory, leaving 0 bytes on your physical drive.",
  },
  {
    category: "FINGERPRINTING",
    title: "Hardware Signature Leak",
    vpn: "Exposed. Websites read your real OS version, installed fonts, screen resolution, and WebGL canvas hash to identify you without standard cookies.",
    intractify:
      "Normalized. You share an identical generic profile with thousands of other users. Your true hardware configuration never reaches target trackers.",
  },
  {
    category: "DEVICE SECURITY",
    title: "Script Execution & Zero-Days",
    vpn: "Executed locally on your CPU. Dangerous scripts, zero-day browser exploits, and drive-by malware can target and compromise your host operating system.",
    intractify:
      "Trapped in the remote container. All website scripts execute in disposable cloud pods. Your physical device receives only a clean video stream of pixels.",
  },
  {
    category: "IP & LOCATION LEAKS",
    title: "WebRTC Network Exposure",
    vpn: "Common vulnerability. WebRTC protocols bypass standard proxy rules, leaking your true home ISP IP address directly to target website servers.",
    intractify:
      "Zero local connections. The target site only ever sees the cloud container's gateway IP. Your local interface is completely isolated.",
  },
  {
    category: "SESSION LIFECYCLE",
    title: "Persistent vs. Disposable State",
    vpn: "Persistent environment. Unless you clear browser cache manually, security cookies and history logs sit permanently inside your local files.",
    intractify:
      "Disposable container architecture. Closing the session automatically reaps and destroys the cloud container instance. There is no trace left to recover.",
  },
];

function VisualMockup({
  activeStep,
  isMobile = false,
}: {
  activeStep: number;
  isMobile?: boolean;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: isMobile ? "260px" : "360px",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 20px 40px -20px rgba(0, 0, 0, 0.12)",
        background: "var(--cv-card-bg)",
      }}
    >
      <div style={{ display: "flex", height: "100%" }}>
        {/* Left Half: Standard VPN (Charcoal) */}
        <div
          style={{
            flex: 1,
            background: "#15161A",
            color: "#EDEDED",
            padding: isMobile ? "20px" : "28px",
            borderRight: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {activeStep === 0 && (
            <>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "9px",
                    color: "#E54B4B",
                    marginBottom: "6px",
                  }}
                >
                  ✕ VPN DISK STATE
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "16px",
                    color: "#FFFFFF",
                  }}
                >
                  Cookies Stored Locally
                </div>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "10.5px",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                Data persists across visits
              </div>
            </>
          )}

          {activeStep === 1 && (
            <>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "9px",
                    color: "#E54B4B",
                    marginBottom: "6px",
                  }}
                >
                  ✕ FINGERPRINT SPECS
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "16px",
                    color: "#FFFFFF",
                    marginBottom: "14px",
                  }}
                >
                  Exposed Identifiers
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.4)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div>OS: macOS Catalina</div>
                  <div>Browser: Safari (Unique Canvas)</div>
                  <div>Fonts: 241 Exposed</div>
                </div>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "10.5px",
                  color: "rgba(255,255,255,0.2)",
                }}
              >
                Identity stands out to trackers
              </div>
            </>
          )}

          {activeStep === 2 && (
            <>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "9px",
                    color: "#E54B4B",
                    marginBottom: "6px",
                  }}
                >
                  ✕ EXECUTION VECTOR
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "16px",
                    color: "#FFFFFF",
                    marginBottom: "12px",
                  }}
                >
                  Local Processing
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.4)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div>Host CPU: Processing JS</div>
                  <div>Memory: Active RAM cache</div>
                  <div>Risk: Host browser exploits</div>
                </div>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "10.5px",
                  color: "rgba(255,255,255,0.2)",
                }}
              >
                Zero-days execute directly on OS
              </div>
            </>
          )}

          {activeStep === 3 && (
            <>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "9px",
                    color: "#E54B4B",
                    marginBottom: "6px",
                  }}
                >
                  ✕ WebRTC CONFIG
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "16px",
                    color: "#FFFFFF",
                    marginBottom: "12px",
                  }}
                >
                  Direct IP Leaks
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.4)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div>WebRTC: Querying interface</div>
                  <div>Leaked IP: 185.112.45.12</div>
                  <div>ISP: Target logs home routing</div>
                </div>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "10.5px",
                  color: "rgba(255,255,255,0.2)",
                }}
              >
                Standard VPN routes get bypassed
              </div>
            </>
          )}

          {activeStep === 4 && (
            <>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "9px",
                    color: "#E54B4B",
                    marginBottom: "6px",
                  }}
                >
                  ✕ FILE RETENTION
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "16px",
                    color: "#FFFFFF",
                    marginBottom: "12px",
                  }}
                >
                  Accumulated Storage
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.4)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div>Disk Space: 240 MB</div>
                  <div>Cache files: Persistent</div>
                  <div>State: Forensics can extract</div>
                </div>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "10.5px",
                  color: "rgba(255,255,255,0.2)",
                }}
              >
                No automatic deletion trigger
              </div>
            </>
          )}
        </div>

        {/* Right Half: Intractify Sandbox (Warm White) */}
        <div
          style={{
            flex: 1,
            background: "var(--background)",
            color: "var(--foreground)",
            padding: isMobile ? "20px" : "28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {activeStep === 0 && (
            <>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "9px",
                    color: "var(--primary)",
                    marginBottom: "6px",
                  }}
                >
                  ✓ CLOUD ISOLATION
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "16px",
                    color: "var(--foreground)",
                  }}
                >
                  Cookies Evaporated
                </div>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "10.5px",
                  color: "var(--muted-foreground)",
                }}
              >
                Leaves 0 bytes kept on close
              </div>
            </>
          )}

          {activeStep === 1 && (
            <>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "9px",
                    color: "var(--primary)",
                    marginBottom: "6px",
                  }}
                >
                  ✓ NORMALIZED PROFILE
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "16px",
                    color: "var(--foreground)",
                    marginBottom: "14px",
                  }}
                >
                  Generic Mask
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "10px",
                    color: "var(--muted-foreground)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div>OS: Linux x86_64</div>
                  <div>Browser: Chrome (Anonymized)</div>
                  <div>Fonts: 12 Normalized</div>
                </div>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "10.5px",
                  color: "var(--muted-foreground)",
                }}
              >
                Identical to thousands of users
              </div>
            </>
          )}

          {activeStep === 2 && (
            <>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "9px",
                    color: "var(--primary)",
                    marginBottom: "6px",
                  }}
                >
                  ✓ SANDBOX SHIELD
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "16px",
                    color: "var(--foreground)",
                    marginBottom: "12px",
                  }}
                >
                  Disposable Container
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "10px",
                    color: "var(--muted-foreground)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div>Remote Pod: Executing scripts</div>
                  <div>Local device: Receiving pixels</div>
                  <div>Isolation: 100% exploit-proof</div>
                </div>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "10.5px",
                  color: "var(--muted-foreground)",
                }}
              >
                Exploits trapped inside the cloud
              </div>
            </>
          )}

          {activeStep === 3 && (
            <>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "9px",
                    color: "var(--primary)",
                    marginBottom: "6px",
                  }}
                >
                  ✓ PROXY CLOAK
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "16px",
                    color: "var(--foreground)",
                    marginBottom: "12px",
                  }}
                >
                  Isolated Gateway
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "10px",
                    color: "var(--muted-foreground)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div>WebRTC: Blocked at gateway</div>
                  <div>Spoofed IP: 10.200.0.8</div>
                  <div>Target sees: Cloud endpoint</div>
                </div>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "10.5px",
                  color: "var(--muted-foreground)",
                }}
              >
                Your local home IP never leaves
              </div>
            </>
          )}

          {activeStep === 4 && (
            <>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "9px",
                    color: "var(--primary)",
                    marginBottom: "6px",
                  }}
                >
                  ✓ AUTO-DESTRUCT
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "16px",
                    color: "var(--foreground)",
                    marginBottom: "12px",
                  }}
                >
                  Instance Reaped
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "10px",
                    color: "var(--muted-foreground)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div>Disk State: ∅ 0 bytes</div>
                  <div>Orchestrator: Task terminated</div>
                  <div>History: Wiped from memory</div>
                </div>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "10.5px",
                  color: "var(--muted-foreground)",
                }}
              >
                Container destroyed on tab close
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function ComparisonSection() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mobileStickyRefs = useRef<Array<HTMLDivElement | null>>([]);
  const headingRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const [headingHeight, setHeadingHeight] = useState(140); // measured height of sticky heading block
  const [scrollOffset, setScrollOffset] = useState(0); // dynamic offset when scrolling away

  // Measure sticky heading height dynamically (updates on resize)
  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() =>
      setHeadingHeight(el.offsetHeight),
    );
    observer.observe(el);
    setHeadingHeight(el.offsetHeight);
    return () => observer.disconnect();
  }, []);

  // Scroll listener — checks both desktop and mobile refs, skips hidden elements
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const handleScroll = () => {
      const midpoint = window.innerHeight / 2;
      let closestIdx = 0;
      let closestDist = Infinity;

      const allRefs = [
        ...stepRefs.current.map((el, i) => ({ el, i })),
        ...mobileStickyRefs.current.map((el, i) => ({ el, i })),
      ];

      allRefs.forEach(({ el, i }) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.height === 0) return; // skip hidden (display:none) elements
        const elementCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elementCenter - midpoint);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }
      });

      setActiveStep(closestIdx);

      // Measure mobile scroll offset to scroll away together
      const container = mobileContainerRef.current;
      if (container) {
        const containerBottom = container.getBoundingClientRect().bottom;
        const lastCard = mobileStickyRefs.current[STEPS.length - 1];
        const headingEl = headingRef.current;
        if (lastCard && headingEl) {
          const measuredHeadingHeight = headingEl.offsetHeight;
          const currentCardTopBase = NAVBAR_HEIGHT + measuredHeadingHeight;
          const lastCardHeight = lastCard.offsetHeight;
          const targetStackBottom =
            currentCardTopBase +
            (STEPS.length - 1) * CARD_STACK_OFFSET +
            lastCardHeight;
          const pushDelta = Math.max(0, targetStackBottom - containerBottom);
          console.log("DEBUG SCROLL:", {
            containerBottom,
            measuredHeadingHeight,
            lastCardHeight,
            targetStackBottom,
            pushDelta,
          });
          setScrollOffset(pushDelta);
        } else {
          console.log("DEBUG SCROLL: Missing refs", {
            lastCard: !!lastCard,
            headingEl: !!headingEl,
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NAVBAR_HEIGHT = 76; // px — height of sticky navbar
  const CARD_STACK_OFFSET = 14; // px — how much each stacked card peeks out
  // Cards start below sticky heading (navbar + heading block height)
  const CARD_TOP_BASE = NAVBAR_HEIGHT + headingHeight;

  return (
    <section
      style={{
        padding: "120px 0",
        background: "var(--secondary)",
        borderBottom: "1px solid var(--border)",
      }}
      id="comparison"
    >
      <div
        className="mx-auto max-w-7xl"
        style={{ padding: "0 clamp(24px, 5vw, 40px)" }}
      >
        {/* DESKTOP-ONLY HEADING */}
        <div className="hidden lg:block pb-12">
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
            — Comparison
          </div>

          {/* Heading */}
          <h2
            style={{
              fontFamily: "var(--font-sans, ui-sans-serif, sans-serif)",
              fontWeight: 500,
              fontSize: "clamp(32px, 4.5vw, 54px)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              margin: "0 0 80px",
              maxWidth: "800px",
              color: "var(--foreground)",
            }}
          >
            VPNs hide your location.{" "}
            <span
              style={{
                fontFamily:
                  "var(--font-display, 'Instrument Serif', Georgia, serif)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              Intractify
            </span>{" "}
            isolates your session.
          </h2>
        </div>

        {/* MOBILE-ONLY SECTION CONTAINER (wraps sticky title + sticky cards so they scroll away together!) */}
        <div
          ref={mobileContainerRef}
          className="block lg:hidden"
          style={{ marginBottom: "16px" }}
        >
          {/* Eyebrow + Heading — sticky on mobile */}
          <div
            ref={headingRef}
            style={{
              position: "sticky",
              top: `${NAVBAR_HEIGHT - scrollOffset}px`,
              zIndex: 50,
              background: "var(--secondary)",
              paddingBottom: "24px",
              paddingTop: "4px",
              marginBottom: "8px",
            }}
          >
            {/* Eyebrow */}
            <div
              style={{
                color: "var(--muted-foreground)",
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              — Comparison
            </div>

            {/* Heading */}
            <h2
              style={{
                fontFamily: "var(--font-sans, ui-sans-serif, sans-serif)",
                fontWeight: 500,
                fontSize: "clamp(36px, 4.5vw, 56px)",
                lineHeight: 1.06,
                letterSpacing: "-0.03em",
                margin: 0,
                maxWidth: "800px",
                color: "var(--foreground)",
              }}
            >
              VPNs hide your location.{" "}
              <span
                style={{
                  fontFamily:
                    "var(--font-display, 'Instrument Serif', Georgia, serif)",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                Intractify
              </span>{" "}
              isolates your session.
            </h2>
          </div>

          {/* MOBILE: Sticky Card Stack */}
          {STEPS.map((step, idx) => {
            const stackDepth = Math.max(0, activeStep - idx);
            const isBehind = idx < activeStep;
            const isActive = activeStep === idx;
            // Cards behind shrink subtly to create depth
            const scale = isBehind ? Math.max(0.88, 1 - stackDepth * 0.03) : 1;

            return (
              <div
                key={idx}
                ref={(el) => {
                  mobileStickyRefs.current[idx] = el;
                }}
                style={{
                  position: "sticky",
                  top: `${CARD_TOP_BASE + idx * CARD_STACK_OFFSET - scrollOffset}px`,
                  zIndex: idx + 1,
                  // card appearance
                  background: "var(--background)",
                  border: `1px solid ${isActive ? "var(--primary)" : "var(--border)"}`,
                  borderRadius: "16px",
                  padding: "22px 20px",
                  marginBottom: idx < STEPS.length - 1 ? "16px" : "0",
                  // depth effect
                  transform: `scale(${scale})`,
                  transformOrigin: "top center",
                  transition:
                    "transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
                  boxShadow: isActive
                    ? "0 16px 48px rgba(0,0,0,0.14)"
                    : isBehind
                      ? "0 4px 16px rgba(0,0,0,0.08)"
                      : "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                {/* Step indicator */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: isActive ? "var(--primary)" : "var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "9px",
                      fontFamily: "var(--font-mono, monospace)",
                      color: isActive
                        ? "var(--primary-foreground)"
                        : "var(--muted-foreground)",
                      fontWeight: 700,
                      flexShrink: 0,
                      transition: "background 0.3s ease",
                    }}
                  >
                    0{idx + 1}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "9px",
                      color: isActive
                        ? "var(--primary)"
                        : "var(--muted-foreground)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {step.category}
                  </div>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: "17px",
                    margin: "0 0 14px",
                    color: "var(--foreground)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.25,
                  }}
                >
                  {step.title}
                </h3>

                {/* VPN vs Intractify */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12.5px",
                      lineHeight: 1.55,
                      color: "var(--muted-foreground)",
                      padding: "10px 12px",
                      background: "oklch(0.4 0.08 20 / 7%)",
                      borderRadius: "8px",
                      borderLeft: "2px solid #E54B4B",
                    }}
                  >
                    <span
                      style={{
                        color: "#E54B4B",
                        fontWeight: 700,
                        marginRight: "5px",
                      }}
                    >
                      ✕ VPN:
                    </span>
                    {step.vpn}
                  </div>
                  <div
                    style={{
                      fontSize: "12.5px",
                      lineHeight: 1.55,
                      color: "var(--foreground)",
                      fontWeight: 500,
                      padding: "10px 12px",
                      background: "oklch(0.55 0.1 160 / 6%)",
                      borderRadius: "8px",
                      borderLeft: "2px solid var(--primary)",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--primary)",
                        fontWeight: 700,
                        marginRight: "5px",
                      }}
                    >
                      ✓ Intractify:
                    </span>
                    {step.intractify}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── DESKTOP: Two-Column Focal Stepper ─────────────────────── */}
        <div
          className="hidden lg:grid lg:grid-cols-12 gap-16"
          style={{ position: "relative" }}
        >
          {/* Left Column: Text Stepper cards */}
          <div
            className="lg:col-span-6 flex flex-col gap-40"
            style={{ paddingBottom: prefersReducedMotion() ? "0" : "20vh" }}
          >
            {STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={idx}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  style={{
                    opacity: isActive || prefersReducedMotion() ? 1 : 0.3,
                    transform:
                      isActive || prefersReducedMotion()
                        ? "translateX(0)"
                        : "translateX(-6px)",
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                    borderLeft: `2px solid ${isActive ? "var(--primary)" : "var(--border)"}`,
                    paddingLeft: "24px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "10px",
                      color: isActive
                        ? "var(--primary)"
                        : "var(--muted-foreground)",
                      marginBottom: "10px",
                      letterSpacing: "0.08em",
                    }}
                  >
                    0{idx + 1}. {step.category}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 500,
                      fontSize: "clamp(19px, 2.5vw, 25px)",
                      margin: "0 0 14px",
                      color: "var(--foreground)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      fontSize: "14px",
                      lineHeight: 1.6,
                    }}
                  >
                    <div style={{ color: "var(--muted-foreground)" }}>
                      <span
                        style={{
                          color: "#E54B4B",
                          marginRight: "8px",
                          fontWeight: "bold",
                        }}
                      >
                        ✕ VPN:
                      </span>
                      {step.vpn}
                    </div>
                    <div
                      style={{ color: "var(--foreground)", fontWeight: 500 }}
                    >
                      <span
                        style={{
                          color: "var(--primary)",
                          marginRight: "8px",
                          fontWeight: "bold",
                        }}
                      >
                        ✓ Intractify:
                      </span>
                      {step.intractify}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Visual Mockup */}
          <div
            className="lg:col-span-6"
            style={{
              position: "sticky",
              top: "22vh",
              height: "fit-content",
            }}
          >
            <VisualMockup activeStep={activeStep} />
          </div>
        </div>
      </div>
    </section>
  );
}

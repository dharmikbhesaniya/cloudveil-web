"use client";

import { useEffect, useRef, useState } from "react";
import { Shield } from "lucide-react";

const URL_TARGET = "session.intractify.com/s/8f4a2c1e";
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function useUrlTypewriter(target: string, startDelay = 500) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (prefersReducedMotion()) {
      setText(target);
      return;
    }
    let i = 0;
    let iv: ReturnType<typeof setInterval> | undefined;
    const t = setTimeout(() => {
      iv = setInterval(() => {
        i++;
        setText(target.slice(0, i));
        if (i >= target.length) clearInterval(iv);
      }, 30);
    }, startDelay);
    return () => {
      clearTimeout(t);
      if (iv) clearInterval(iv);
    };
  }, [target, startDelay]);
  return text;
}

function useCountdown(initialMin: number, initialSec: number) {
  const [time, setTime] = useState({ m: initialMin, s: initialSec });
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const iv = setInterval(() => {
      setTime((prev) => {
        if (prev.s > 0) return { m: prev.m, s: prev.s - 1 };
        if (prev.m > 0) return { m: prev.m - 1, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, []);
  return `${time.m}:${String(time.s).padStart(2, "0")} left`;
}

function useCounter(target: number, decimals: number, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion()) {
      setVal(target);
      return;
    }
    const dur = 1800;
    const start = performance.now();
    let frame = 0;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const raf = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setVal(parseFloat((ease(p) * target).toFixed(decimals)));
      if (p < 1) frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(frame);
  }, [active, target, decimals]);
  return val;
}

const WORDS: Array<{ text: string; italic?: boolean; break?: boolean }> = [
  { text: "Your" },
  { text: "private", italic: true },
  { break: true, text: "" },
  { text: "space," },
  { text: "kept" },
  { break: true, text: "" },
  { text: "elsewhere.", italic: true },
];

const META = [
  { target: 1, unit: "", decimals: 0, label: "container per session" },
  { target: 0, unit: "", decimals: 0, label: "bytes retained" },
  { target: 5, unit: "", decimals: 0, label: "max concurrent sessions" },
];

function MetaNum({
  target,
  unit,
  decimals,
  label,
  active,
}: (typeof META)[0] & { active: boolean }) {
  const val = useCounter(target, decimals, active);
  return (
    <span>
      <b
        style={{
          color: "var(--foreground)",
          fontWeight: 500,
          fontFamily: "var(--font-mono, monospace)",
        }}
      >
        {val}
        {unit}
      </b>{" "}
      · {label}
    </span>
  );
}

const STEPS = [
  { id: "provision", num: "01", label: "BOOT", dot: "var(--border)" },
  { id: "stream", num: "02", label: "STREAM", dot: "var(--primary)" },
  { id: "active", num: "03", label: "ACTIVE", dot: "var(--foreground)" },
  {
    id: "cleared",
    num: "04",
    label: "DESTROYED",
    dot: "var(--muted-foreground)",
  },
] as const;

export function Hero() {
  const [metaActive, setMetaActive] = useState(false);
  const [bootPhase, setBootPhase] = useState(0);
  const [scanPhase, setScanPhase] = useState<
    "idle" | "stream" | "active" | "cleared"
  >("idle");
  const [activeStep, setActiveStep] = useState<
    "provision" | "stream" | "active" | "cleared"
  >("provision");
  const metaRef = useRef<HTMLDivElement>(null);
  const urlText = useUrlTypewriter(URL_TARGET);
  const timer = useCountdown(12, 48);
  const timeoutsRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  const goToStep = (step: (typeof STEPS)[number]["id"]) => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (step === "provision") {
      setBootPhase(3);
      setScanPhase("idle");
    } else {
      setBootPhase(4);
      setScanPhase(step);
    }
    setActiveStep(step);
  };

  useEffect(() => {
    const t = setTimeout(() => setMetaActive(true), 400);
    timeoutsRef.current.push(t);

    if (prefersReducedMotion()) {
      setBootPhase(4);
      setScanPhase("active");
      setActiveStep("active");
      return () => clearTimeout(t);
    }

    setActiveStep("provision");

    const t1 = setTimeout(() => setBootPhase(1), 500);
    const t2 = setTimeout(() => setBootPhase(2), 900);
    const t3 = setTimeout(() => setBootPhase(3), 1300);
    const t4 = setTimeout(() => {
      setBootPhase(4);
      setScanPhase("stream");
      setActiveStep("stream");
    }, 1700);
    const t5 = setTimeout(() => {
      setScanPhase("active");
      setActiveStep("active");
    }, 3200);
    const t6 = setTimeout(() => {
      setScanPhase("cleared");
      setActiveStep("cleared");
    }, 5000);

    timeoutsRef.current.push(t1, t2, t3, t4, t5, t6);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const wordDelay = [0.1, 0.18, 0.26, 0.34, 0.42];
  let wordIdx = 0;

  return (
    <section
      className="relative overflow-hidden"
      style={{ padding: "80px 0 100px" }}
      id="hero"
    >
      <div
        className="relative z-10 mx-auto max-w-7xl"
        style={{ padding: "0 clamp(24px, 5vw, 40px)" }}
      >
        <div
          className="grid items-center gap-16 hero-two-col"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          {/* Left column */}
          <div>
            {/* Eyebrow */}
            <div
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "11px",
                letterSpacing: "0.20em",
                textTransform: "uppercase",
                color: "var(--muted-foreground)",
                marginBottom: "28px",
                opacity: 0,
                animation: `fade-up 0.8s ${EASE} 0.05s forwards`,
              }}
            >
              — N° 01 / Cloud privacy / Est. 2025
            </div>

            {/* Staggered headline */}
            <h1
              aria-label="Your private space, kept elsewhere."
              style={{
                fontFamily: "var(--font-sans, ui-sans-serif, sans-serif)",
                fontWeight: 500,
                fontSize: "clamp(48px, 7vw, 88px)",
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                margin: 0,
                color: "var(--foreground)",
              }}
            >
              {WORDS.map((w, i) => {
                if (w.break) return <br key={`br-${i}`} />;
                const delay = wordDelay[wordIdx++] ?? 0.1;
                if (w.italic) {
                  return (
                    <span
                      key={i}
                      className="hero-word"
                      aria-hidden="true"
                      style={{
                        animationDelay: `${delay}s`,
                        fontFamily:
                          "var(--font-display, 'Instrument Serif', Georgia, serif)",
                        fontStyle: "italic",
                        fontWeight: 400,
                        color: "var(--primary)",
                        position: "relative",
                        marginRight: "0.25em",
                        paddingLeft: "0.08em",
                        marginLeft: "-0.08em",
                        paddingRight: "0.08em",
                      }}
                    >
                      {w.text}{" "}
                      <span
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          left: "4%",
                          right: "8%",
                          bottom: "8%",
                          height: "2px",
                          background: "var(--primary)",
                          transform: "scaleX(0)",
                          transformOrigin: "left",
                          animation: `underline-draw 0.8s ${EASE} 0.7s forwards`,
                        }}
                      />
                    </span>
                  );
                }
                return (
                  <span
                    key={i}
                    className="hero-word"
                    aria-hidden="true"
                    style={{
                      animationDelay: `${delay}s`,
                      marginRight: "0.25em",
                    }}
                  >
                    {w.text}{" "}
                  </span>
                );
              })}
            </h1>

            {/* Lede */}
            <p
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--muted-foreground)",
                fontSize: "16.5px",
                lineHeight: 1.55,
                maxWidth: "460px",
                margin: "28px 0 0",
                opacity: 0,
                animation: `fade-up 0.8s ${EASE} 0.5s forwards`,
              }}
            >
              A complete browser, lent to you in the cloud for a session, then
              taken apart. No cookies survive. No history is written. No record
              returns.
            </p>

            {/* Actions */}
            <div
              style={{
                display: "flex",
                gap: "22px",
                alignItems: "baseline",
                marginTop: "36px",
                opacity: 0,
                animation: `fade-up 0.8s ${EASE} 0.6s forwards`,
              }}
            >
              {/* 
              <a
                href="https://app.intractify.com/sign-up"
                className="btn-ink"
                id="hero-cta-primary"
              >
                Launch a browser <span>→</span>
              </a>
              */}
              <a
                href="#pricing"
                className="btn-ink"
                id="hero-cta-primary"
              >
                Join Waitlist <span>→</span>
              </a>
              <a
                className="serif-link"
                href="#features"
                id="hero-cta-secondary"
              >
                read the method
              </a>
            </div>

            {/* Meta row */}
            <div
              ref={metaRef}
              style={{
                marginTop: "48px",
                paddingTop: "18px",
                borderTop: "1px solid var(--border)",
                display: "flex",
                gap: "40px",
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "11.5px",
                color: "var(--muted-foreground)",
                opacity: 0,
                animation: `fade-up 0.8s ${EASE} 0.7s forwards`,
              }}
            >
              {META.map((m) => (
                <MetaNum key={m.label} {...m} active={metaActive} />
              ))}
            </div>
          </div>

          {/* Right column: browser preview */}
          <div
            className="preview-in hidden lg:block"
            style={{ perspective: "1200px" }}
          >
            <div
              style={{
                background: "var(--cv-card-bg)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                boxShadow: "none",
              }}
            >
              {/* Chrome bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 14px",
                  borderBottom: "1px solid var(--border)",
                  background: "var(--cv-preview-chrome)",
                }}
              >
                <div style={{ display: "flex", gap: "5px", flexShrink: 0 }}>
                  <span
                    style={{
                      width: "9px",
                      height: "9px",
                      borderRadius: "50%",
                      background: "var(--border)",
                      display: "block",
                    }}
                  />
                  <span
                    style={{
                      width: "9px",
                      height: "9px",
                      borderRadius: "50%",
                      background: "var(--border)",
                      display: "block",
                    }}
                  />
                  <span
                    style={{
                      width: "9px",
                      height: "9px",
                      borderRadius: "50%",
                      background: "var(--border)",
                      display: "block",
                    }}
                  />
                </div>

                {/* URL bar */}
                <div
                  style={{
                    flex: 1,
                    background: "var(--background)",
                    border: "1px solid var(--border)",
                    padding: "5px 12px",
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "10.5px",
                    color: "var(--muted-foreground)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    overflow: "hidden",
                  }}
                >
                  <span
                    className="animate-pulse-dot"
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#4B5C3A",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      flex: 1,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {urlText || " "}
                  </span>
                  <span
                    style={{
                      width: "7px",
                      height: "13px",
                      background: "var(--foreground)",
                      flexShrink: 0,
                      animation: "caret-blink 1.1s steps(2) infinite",
                      animationDelay: "1.2s",
                      opacity: 0,
                    }}
                  />
                </div>
              </div>

              {/* Body */}
              <div
                style={{
                  padding: "28px 22px",
                  minHeight: "280px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "14px",
                  position: "relative",
                }}
              >
                <style
                  dangerouslySetInnerHTML={{
                    __html: `
                  @keyframes scan-sweep {
                    0% { top: 0%; opacity: 0.8; }
                    50% { top: 100%; opacity: 0.8; }
                    100% { top: 0%; opacity: 0.8; }
                  }
                  @keyframes pulse-red {
                    0% { opacity: 1; }
                    50% { opacity: 0.3; }
                    100% { opacity: 1; }
                  }
                  @keyframes progress-fill {
                    0% { width: 0%; }
                    100% { width: 100%; }
                  }
                `,
                  }}
                />

                {bootPhase < 4 ? (
                  <div
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "11.5px",
                      color: "var(--muted-foreground)",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      gap: "12px",
                      padding: "0 10%",
                    }}
                  >
                    <div
                      style={{
                        opacity: bootPhase >= 0 ? 1 : 0,
                        transition: "opacity 0.2s",
                      }}
                    >
                      {">"} Allocating sandbox environment...
                    </div>
                    <div
                      style={{
                        opacity: bootPhase >= 1 ? 1 : 0,
                        transition: "opacity 0.2s",
                      }}
                    >
                      {">"} Initializing zero-trust node...
                    </div>
                    <div
                      style={{
                        opacity: bootPhase >= 2 ? 1 : 0,
                        transition: "opacity 0.2s",
                      }}
                    >
                      {">"} Establishing ephemeral tunnel...
                    </div>
                    <div
                      style={{
                        opacity: bootPhase >= 3 ? 1 : 0,
                        transition: "opacity 0.2s",
                        color: "var(--foreground)",
                      }}
                    >
                      {">"} Session live.
                    </div>
                  </div>
                ) : (
                  <>
                    {scanPhase === "stream" && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "12px",
                          width: "100%",
                          padding: "0 10%",
                          fontFamily: "var(--font-mono, monospace)",
                          fontSize: "11px",
                          color: "var(--muted-foreground)",
                        }}
                      >
                        <div>{">"} Opening secure stream to your container...</div>
                        <div>
                          {">"} Browser running in the cloud, pixels reaching your
                          screen.
                        </div>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "2px",
                            background: "var(--border)",
                            marginTop: "12px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              top: 0,
                              height: "100%",
                              background: "var(--foreground)",
                              animation: "progress-fill 1.5s linear forwards",
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {scanPhase === "active" && (
                      <>
                        <div
                          className="animate-floaty animate-fade-up"
                          style={{
                            width: "48px",
                            height: "48px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--primary)",
                          }}
                        >
                          <Shield
                            style={{ width: "48px", height: "48px" }}
                            strokeWidth={1.2}
                          />
                        </div>

                        <div
                          className="animate-fade-up"
                          style={{
                            fontFamily:
                              "var(--font-display, 'Instrument Serif', Georgia, serif)",
                            fontStyle: "italic",
                            fontSize: "20px",
                            color: "var(--foreground)",
                            textAlign: "center",
                          }}
                        >
                          Isolated · session active
                        </div>

                        <div
                          className="animate-fade-up"
                          style={{
                            fontFamily: "var(--font-mono, monospace)",
                            fontSize: "11px",
                            color: "var(--muted-foreground)",
                            width: "100%",
                            padding: "0 10%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px",
                          }}
                        >
                          <div>
                            IP ADDRESS:{" "}
                            <span style={{ color: "var(--foreground)" }}>
                              Cloud egress
                            </span>
                          </div>
                          <div>
                            PLATFORM:{" "}
                            <span style={{ color: "var(--foreground)" }}>
                              Linux container
                            </span>
                          </div>
                          <div>
                            BROWSER:{" "}
                            <span style={{ color: "var(--foreground)" }}>
                              Chromium
                            </span>
                          </div>
                          <div>
                            SESSION:{" "}
                            <span style={{ color: "var(--foreground)" }}>
                              Ephemeral — destroyed on close
                            </span>
                          </div>
                        </div>
                      </>
                    )}

                    {scanPhase === "cleared" && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "12px",
                          width: "100%",
                          padding: "0 10%",
                          fontFamily: "var(--font-mono, monospace)",
                          fontSize: "11px",
                          color: "var(--muted-foreground)",
                        }}
                      >
                        <div style={{ color: "var(--foreground)" }}>
                          {">"} Container destroyed.
                        </div>
                        <div>{">"} No local traces written.</div>
                        <div>{">"} Nothing survives the session.</div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Footer */}
              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  padding: "10px 14px",
                  display: "flex",
                  gap: "14px",
                  alignItems: "center",
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "10.5px",
                  color: "var(--muted-foreground)",
                }}
              >
                <span>1 vCPU · 2 GB</span>
                <span style={{ color: "var(--foreground)" }}>{timer}</span>
                <span
                  style={{
                    marginLeft: "auto",
                    color: "var(--muted-foreground)",
                  }}
                >
                  ephemeral session
                </span>
              </div>
            </div>

            {/* Step Snapshots (Gallery Tabs) */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {STEPS.map((s) => {
                const isActive = activeStep === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => goToStep(s.id)}
                    style={{
                      flex: 1,
                      padding: "10px 8px",
                      background: isActive
                        ? "var(--background)"
                        : "var(--cv-card-bg)",
                      border: isActive
                        ? "1px solid var(--foreground)"
                        : "1px solid var(--border)",
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "4px",
                      textAlign: "left",
                      opacity: isActive ? 1 : 0.65,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.opacity = "0.65";
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "9px",
                        letterSpacing: "0.05em",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {s.num}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: s.dot,
                          display: "inline-block",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--font-mono, monospace)",
                          fontSize: "10px",
                          fontWeight: 500,
                          color: "var(--foreground)",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {s.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile browser preview */}
        <div className="mt-12 lg:hidden">
          <div
            style={{
              background: "var(--cv-card-bg)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 12px",
                borderBottom: "1px solid var(--border)",
                background: "var(--cv-preview-chrome)",
              }}
            >
              <div style={{ display: "flex", gap: "4px" }}>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "var(--border)",
                      display: "block",
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  flex: 1,
                  background: "var(--background)",
                  border: "1px solid var(--border)",
                  padding: "4px 10px",
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "10px",
                  color: "var(--muted-foreground)",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                session.intractify.com/s/8f4a2c1e
              </div>
            </div>
            <div
              style={{
                padding: "24px",
                minHeight: "240px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                position: "relative",
              }}
            >
              {bootPhase < 4 ? (
                <div
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "10px",
                    color: "var(--muted-foreground)",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "10px",
                    padding: "0 5%",
                  }}
                >
                  <div
                    style={{
                      opacity: bootPhase >= 0 ? 1 : 0,
                      transition: "opacity 0.2s",
                    }}
                  >
                    {">"} Allocating sandbox environment...
                  </div>
                  <div
                    style={{
                      opacity: bootPhase >= 1 ? 1 : 0,
                      transition: "opacity 0.2s",
                    }}
                  >
                    {">"} Initializing zero-trust node...
                  </div>
                  <div
                    style={{
                      opacity: bootPhase >= 2 ? 1 : 0,
                      transition: "opacity 0.2s",
                    }}
                  >
                    {">"} Establishing ephemeral tunnel...
                  </div>
                  <div
                    style={{
                      opacity: bootPhase >= 3 ? 1 : 0,
                      transition: "opacity 0.2s",
                      color: "var(--foreground)",
                    }}
                  >
                    {">"} Session live.
                  </div>
                </div>
              ) : (
                <>
                  {scanPhase === "stream" && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "10px",
                        width: "100%",
                        padding: "0 5%",
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "10px",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      <div>{">"} Opening secure stream to your container...</div>
                      <div>{">"} Browser running in the cloud, not your device.</div>
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "2px",
                          background: "var(--border)",
                          marginTop: "8px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            height: "100%",
                            background: "var(--foreground)",
                            animation: "progress-fill 1.5s linear forwards",
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {scanPhase === "active" && (
                    <>
                      <Shield
                        className="animate-floaty animate-fade-up"
                        style={{
                          width: "40px",
                          height: "40px",
                          color: "var(--primary)",
                        }}
                        strokeWidth={1.2}
                      />
                      <p
                        className="animate-fade-up"
                        style={{
                          fontFamily: "var(--font-display, Georgia, serif)",
                          fontStyle: "italic",
                          fontSize: "16px",
                          color: "var(--foreground)",
                          margin: 0,
                          textAlign: "center",
                        }}
                      >
                        Isolated · session active
                      </p>
                      <div
                        className="animate-fade-up"
                        style={{
                          fontFamily: "var(--font-mono, monospace)",
                          fontSize: "10px",
                          color: "var(--muted-foreground)",
                          width: "100%",
                          padding: "0 5%",
                          display: "flex",
                          flexDirection: "column",
                          gap: "4px",
                        }}
                      >
                        <div>
                          IP:{" "}
                          <span style={{ color: "var(--foreground)" }}>
                            Cloud egress
                          </span>
                        </div>
                        <div>
                          OS:{" "}
                          <span style={{ color: "var(--foreground)" }}>
                            Linux container
                          </span>
                        </div>
                        <div>
                          BROWSER:{" "}
                          <span style={{ color: "var(--foreground)" }}>
                            Chromium
                          </span>
                        </div>
                        <div>
                          SESSION:{" "}
                          <span style={{ color: "var(--foreground)" }}>
                            Ephemeral — destroyed on close
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  {scanPhase === "cleared" && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "10px",
                        width: "100%",
                        padding: "0 5%",
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "10px",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      <div style={{ color: "var(--foreground)" }}>
                        {">"} Container destroyed.
                      </div>
                      <div>{">"} No local traces written.</div>
                      <div>{">"} Nothing survives the session.</div>
                    </div>
                  )}
                </>
              )}
            </div>
            <div
              style={{
                borderTop: "1px solid var(--border)",
                padding: "8px 12px",
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "10px",
                color: "var(--muted-foreground)",
              }}
            >
              <span>1 vCPU · 2 GB</span>
              <span style={{ color: "var(--foreground)" }}>{timer}</span>
            </div>
          </div>

          {/* Step Snapshots (Gallery Tabs) */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginTop: "16px",
              justifyContent: "space-between",
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            {STEPS.map((s) => {
              const isActive = activeStep === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => goToStep(s.id)}
                  style={{
                    flex: "1 1 0px",
                    minWidth: "60px",
                    padding: "8px 6px",
                    background: isActive
                      ? "var(--background)"
                      : "var(--cv-card-bg)",
                    border: isActive
                      ? "1px solid var(--foreground)"
                      : "1px solid var(--border)",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "2px",
                    textAlign: "left",
                    opacity: isActive ? 1 : 0.65,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "8px",
                      letterSpacing: "0.05em",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {s.num}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      width: "100%",
                    }}
                  >
                    <span
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: s.dot,
                        display: "inline-block",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "9px",
                        fontWeight: 500,
                        color: "var(--foreground)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {s.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

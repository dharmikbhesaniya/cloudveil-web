"use client";

import { useEffect, useRef, useState } from "react";
import { Shield } from "lucide-react";

const URL_TARGET = "session.intractify.com/s/8f4a2c1e";
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useUrlTypewriter(target: string, startDelay = 1200) {
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
      }, 55);
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
  { target: 4.2, unit: "s", decimals: 1, label: "boot to live" },
  { target: 14, unit: "", decimals: 0, label: "exit regions" },
  { target: 0, unit: "", decimals: 0, label: "bytes kept" },
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

export function Hero() {
  const [metaActive, setMetaActive] = useState(false);
  const metaRef = useRef<HTMLDivElement>(null);
  const urlText = useUrlTypewriter(URL_TARGET);
  const timer = useCountdown(12, 48);

  useEffect(() => {
    const t = setTimeout(() => setMetaActive(true), 800);
    return () => clearTimeout(t);
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
          style={{ gridTemplateColumns: "1.1fr 0.9fr" }}
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
                    style={{ animationDelay: `${delay}s`, marginRight: "0.25em" }}
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
              A complete browser, lent to you in the cloud for a session, then taken apart. No
              cookies survive. No history is written. No record returns.
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
              <a
                href="https://app.intractify.com/sign-up"
                className="btn-ink"
                id="hero-cta-primary"
              >
                Launch a browser <span>→</span>
              </a>
              <a className="serif-link" href="#features" id="hero-cta-secondary">
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
                boxShadow: "0 1px 0 #00000008, 0 30px 60px -30px #15161A1A",
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
                  <span style={{ flex: 1, overflow: "hidden", whiteSpace: "nowrap" }}>
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
                }}
              >
                <div
                  className="animate-floaty"
                  style={{
                    width: "56px",
                    height: "56px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--primary)",
                  }}
                >
                  <Shield style={{ width: "56px", height: "56px" }} strokeWidth={1.2} />
                </div>

                <div
                  style={{
                    fontFamily:
                      "var(--font-display, 'Instrument Serif', Georgia, serif)",
                    fontStyle: "italic",
                    fontSize: "22px",
                    color: "var(--foreground)",
                    textAlign: "center",
                  }}
                >
                  Isolated · session running
                </div>

                <div
                  style={{
                    width: "240px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div className="skeleton-line" style={{ width: "78%" }} />
                  <div
                    className="skeleton-line"
                    style={{ width: "55%", animationDelay: "0.4s" }}
                  />
                  <div
                    className="skeleton-line"
                    style={{ width: "70%", animationDelay: "0.8s" }}
                  />
                </div>
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
                <span style={{ marginLeft: "auto", color: "var(--muted-foreground)" }}>
                  us-east-1
                </span>
              </div>
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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <Shield
                style={{ width: "48px", height: "48px", color: "var(--primary)" }}
                strokeWidth={1.2}
              />
              <p
                style={{
                  fontFamily: "var(--font-display, Georgia, serif)",
                  fontStyle: "italic",
                  fontSize: "18px",
                  color: "var(--foreground)",
                  margin: 0,
                  textAlign: "center",
                }}
              >
                Isolated · session running
              </p>
              <div
                style={{
                  width: "200px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <div className="skeleton-line" style={{ width: "78%" }} />
                <div className="skeleton-line" style={{ width: "55%" }} />
                <div className="skeleton-line" style={{ width: "70%" }} />
              </div>
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
        </div>
      </div>
    </section>
  );
}

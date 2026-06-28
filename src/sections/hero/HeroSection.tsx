"use client";

import { useEffect, useRef, useState } from "react";
import { Shield } from "lucide-react";

const URL_TARGET = "session.intractify.com/s/8f4a2c1e";
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getClientSpecs() {
  if (typeof window === "undefined") {
    return { os: "macOS", browser: "Safari", ip: "185.112.45.12", hash: "9F2A7E1C" };
  }
  
  const ua = window.navigator.userAgent;
  let os = "Linux";
  let browser = "Chrome";
  
  if (ua.indexOf("Win") !== -1) os = "Windows";
  else if (ua.indexOf("Mac") !== -1) os = "macOS";
  else if (ua.indexOf("Linux") !== -1) os = "Linux";
  else if (ua.indexOf("Android") !== -1) os = "Android";
  else if (ua.indexOf("like Mac") !== -1) os = "iOS";
  
  if (ua.indexOf("Firefox") !== -1) browser = "Firefox";
  else if (ua.indexOf("SamsungBrowser") !== -1) browser = "Samsung Browser";
  else if (ua.indexOf("Opera") !== -1 || ua.indexOf("OPR") !== -1) browser = "Opera";
  else if (ua.indexOf("Trident") !== -1) browser = "Internet Explorer";
  else if (ua.indexOf("Edge") !== -1 || ua.indexOf("Edg") !== -1) browser = "Edge";
  else if (ua.indexOf("Chrome") !== -1) browser = "Chrome";
  else if (ua.indexOf("Safari") !== -1) browser = "Safari";
  
  let hashVal = 0;
  for (let i = 0; i < ua.length; i++) {
    hashVal = (hashVal << 5) - hashVal + ua.charCodeAt(i);
    hashVal |= 0;
  }
  const hash = Math.abs(hashVal).toString(16).toUpperCase().substring(0, 8);
  const ip = `185.112.${(window.screen.width % 250) + 1}.${(window.screen.height % 250) + 1}`;
  
  return { os, browser, ip, hash };
}

function FingerprintSVG() {
  return (
    <svg
      viewBox="0 0 100 100"
      style={{
        width: "72px",
        height: "72px",
        color: "var(--muted-foreground)",
        opacity: 0.65,
        display: "block",
      }}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
    >
      <path strokeDasharray="1 3" d="M30 70 C30 50, 40 40, 50 40 C60 40, 70 50, 70 70" />
      <path strokeDasharray="3 3" d="M25 75 C25 45, 35 30, 50 30 C65 30, 75 45, 75 75" />
      <path strokeDasharray="1 4" d="M20 80 C20 40, 30 20, 50 20 C70 20, 80 40, 80 80" />
      <path strokeDasharray="2 3" d="M15 85 C15 35, 25 10, 50 10 C75 10, 85 35, 85 85" />
      <path d="M45 55 C45 50, 50 48, 52 48 C54 48, 55 50, 55 55 L55 70" />
      <path strokeDasharray="1 2" d="M35 80 L35 70 C35 60, 40 55, 45 55" />
      <path d="M65 80 L65 70 C65 60, 60 55, 55 55" />
    </svg>
  );
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
  const [bootPhase, setBootPhase] = useState(0);
  const [scanPhase, setScanPhase] = useState<"idle" | "scanning" | "exposed" | "obfuscating" | "isolated">("idle");
  const [clientSpecs, setClientSpecs] = useState({ os: "macOS", browser: "Safari", ip: "185.112.45.12", hash: "9F2A7E1C" });
  const metaRef = useRef<HTMLDivElement>(null);
  const urlText = useUrlTypewriter(URL_TARGET);
  const timer = useCountdown(12, 48);

  useEffect(() => {
    setClientSpecs(getClientSpecs());
    const t = setTimeout(() => setMetaActive(true), 800);
    
    if (prefersReducedMotion()) {
      setBootPhase(4);
      setScanPhase("isolated");
      return () => clearTimeout(t);
    }
    
    const t1 = setTimeout(() => setBootPhase(1), 1000);
    const t2 = setTimeout(() => setBootPhase(2), 1700);
    const t3 = setTimeout(() => setBootPhase(3), 2300);
    const t4 = setTimeout(() => {
      setBootPhase(4);
      setScanPhase("scanning");
    }, 2800);
    const t5 = setTimeout(() => setScanPhase("exposed"), 5300);
    const t6 = setTimeout(() => setScanPhase("obfuscating"), 8300);
    const t7 = setTimeout(() => setScanPhase("isolated"), 10300);
    
    return () => {
      clearTimeout(t);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
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
                  position: "relative",
                }}
              >
                <style dangerouslySetInnerHTML={{ __html: `
                  @keyframes scan-sweep {
                    0% { top: 0%; opacity: 0.8; }
                    50% { top: 100%; opacity: 0.8; }
                    100% { top: 0%; opacity: 0.8; }
                  }
                  @keyframes pulse-red {
                    0% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(229, 75, 75, 0.4); }
                    70% { transform: scale(1); opacity: 0.6; box-shadow: 0 0 0 6px rgba(229, 75, 75, 0); }
                    100% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(229, 75, 75, 0); }
                  }
                  @keyframes progress-fill {
                    0% { width: 0%; }
                    100% { width: 100%; }
                  }
                `}} />

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
                    <div style={{ opacity: bootPhase >= 0 ? 1 : 0, transition: "opacity 0.2s" }}>{">"} Allocating sandbox environment...</div>
                    <div style={{ opacity: bootPhase >= 1 ? 1 : 0, transition: "opacity 0.2s" }}>{">"} Initializing zero-trust node...</div>
                    <div style={{ opacity: bootPhase >= 2 ? 1 : 0, transition: "opacity 0.2s" }}>{">"} Establishing ephemeral tunnel...</div>
                    <div style={{ opacity: bootPhase >= 3 ? 1 : 0, transition: "opacity 0.2s", color: "var(--foreground)" }}>{">"} Session live.</div>
                  </div>
                ) : (
                  <>
                    {scanPhase === "scanning" && (
                      <div
                        style={{
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "16px",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <div style={{ position: "relative", padding: "10px", border: "1px solid var(--border)", borderRadius: "8px", overflow: "hidden" }}>
                          <FingerprintSVG />
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              right: 0,
                              height: "2px",
                              background: "var(--primary)",
                              boxShadow: "0 0 8px var(--primary)",
                              animation: "scan-sweep 2s ease-in-out infinite",
                            }}
                          />
                        </div>
                        <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "11px", color: "var(--muted-foreground)" }}>
                          {">"} Scanning local specs...
                        </div>
                      </div>
                    )}

                    {scanPhase === "exposed" && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "#E54B4B",
                            fontFamily: "var(--font-mono, monospace)",
                            fontSize: "11px",
                            marginBottom: "16px",
                            padding: "0 10%",
                          }}
                        >
                          <span
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background: "#E54B4B",
                              display: "inline-block",
                              animation: "pulse-red 1.2s infinite",
                            }}
                          />
                          <span>WARNING: FINGERPRINT EXPOSED</span>
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-mono, monospace)",
                            fontSize: "11px",
                            color: "var(--foreground)",
                            width: "100%",
                            padding: "0 10%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                          }}
                        >
                          <div>IP ADDRESS: <span style={{ color: "#E54B4B" }}>{clientSpecs.ip}</span></div>
                          <div>PLATFORM:   <span style={{ color: "#E54B4B" }}>{clientSpecs.os}</span></div>
                          <div>BROWSER:    <span style={{ color: "#E54B4B" }}>{clientSpecs.browser}</span></div>
                          <div>HASH ID:     <span style={{ color: "#E54B4B" }}>{clientSpecs.hash}</span></div>
                        </div>
                      </div>
                    )}

                    {scanPhase === "obfuscating" && (
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
                        <div>{">"} Purging local session traces...</div>
                        <div>{">"} Spoofing canvas hardware tokens...</div>
                        <div>{">"} Launching isolated sandbox tunnel...</div>
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
                              animation: "progress-fill 2s linear forwards",
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {scanPhase === "isolated" && (
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
                          <Shield style={{ width: "48px", height: "48px" }} strokeWidth={1.2} />
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
                          <div>IP ADDRESS: <span style={{ color: "var(--foreground)" }}>10.200.0.8 (Spoofed)</span></div>
                          <div>PLATFORM:   <span style={{ color: "var(--foreground)" }}>Linux x86_64</span></div>
                          <div>BROWSER:    <span style={{ color: "var(--foreground)" }}>Chrome / Headless</span></div>
                          <div>HASH ID:     <span style={{ color: "var(--foreground)" }}>00000000 (Anonymized)</span></div>
                        </div>
                      </>
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
                  <div style={{ opacity: bootPhase >= 0 ? 1 : 0, transition: "opacity 0.2s" }}>{">"} Allocating sandbox environment...</div>
                  <div style={{ opacity: bootPhase >= 1 ? 1 : 0, transition: "opacity 0.2s" }}>{">"} Initializing zero-trust node...</div>
                  <div style={{ opacity: bootPhase >= 2 ? 1 : 0, transition: "opacity 0.2s" }}>{">"} Establishing ephemeral tunnel...</div>
                  <div style={{ opacity: bootPhase >= 3 ? 1 : 0, transition: "opacity 0.2s", color: "var(--foreground)" }}>{">"} Session live.</div>
                </div>
              ) : (
                <>
                  {scanPhase === "scanning" && (
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "12px",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <div style={{ position: "relative", padding: "6px", border: "1px solid var(--border)", borderRadius: "6px", overflow: "hidden" }}>
                        <FingerprintSVG />
                        <div
                          style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            height: "2px",
                            background: "var(--primary)",
                            boxShadow: "0 0 8px var(--primary)",
                            animation: "scan-sweep 2s ease-in-out infinite",
                          }}
                        />
                      </div>
                      <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", color: "var(--muted-foreground)" }}>
                        {">"} Scanning local specs...
                      </div>
                    </div>
                  )}

                  {scanPhase === "exposed" && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          color: "#E54B4B",
                          fontFamily: "var(--font-mono, monospace)",
                          fontSize: "10px",
                          marginBottom: "12px",
                          padding: "0 5%",
                        }}
                      >
                        <span
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "#E54B4B",
                            display: "inline-block",
                            animation: "pulse-red 1.2s infinite",
                          }}
                        />
                        <span>WARNING: FINGERPRINT EXPOSED</span>
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono, monospace)",
                          fontSize: "10px",
                          color: "var(--foreground)",
                          width: "100%",
                          padding: "0 5%",
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px",
                        }}
                      >
                        <div>IP: <span style={{ color: "#E54B4B" }}>{clientSpecs.ip}</span></div>
                        <div>OS: <span style={{ color: "#E54B4B" }}>{clientSpecs.os}</span></div>
                        <div>BROWSER: <span style={{ color: "#E54B4B" }}>{clientSpecs.browser}</span></div>
                        <div>HASH: <span style={{ color: "#E54B4B" }}>{clientSpecs.hash}</span></div>
                      </div>
                    </div>
                  )}

                  {scanPhase === "obfuscating" && (
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
                      <div>{">"} Purging trace...</div>
                      <div>{">"} Spoofing tokens...</div>
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
                            animation: "progress-fill 2s linear forwards",
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {scanPhase === "isolated" && (
                    <>
                      <Shield
                        className="animate-floaty animate-fade-up"
                        style={{ width: "40px", height: "40px", color: "var(--primary)" }}
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
                        <div>IP: <span style={{ color: "var(--foreground)" }}>10.200.0.8 (Spoofed)</span></div>
                        <div>OS: <span style={{ color: "var(--foreground)" }}>Linux x86_64</span></div>
                        <div>BROWSER: <span style={{ color: "var(--foreground)" }}>Chrome / Headless</span></div>
                        <div>HASH: <span style={{ color: "var(--foreground)" }}>00000000 (Anonymized)</span></div>
                      </div>
                    </>
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
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface Cookie {
  x: number;
  y: number;
  active: boolean;
  size: number;
}

class SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  decay: number;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = -Math.random() * 2 - 1.2;
    this.alpha = 1;
    this.size = Math.random() * 6 + 3;
    this.decay = Math.random() * 0.015 + 0.015;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = "rgba(180, 180, 180, 0.35)"; // Soft grey digital smoke
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

const STEPS = [
  {
    category: "LOCAL STORAGE",
    title: "Persistent Tracking Cookies",
    vpn: "Stored directly on your device. Cookies, session logs, and cache files accumulate over time, allowing ad networks to correlate your identity across visits.",
    intractify: "Destroyed instantly on session close. Cookies and cache files exist only in the remote cloud memory, leaving 0 bytes on your physical drive.",
  },
  {
    category: "FINGERPRINTING",
    title: "Hardware Signature Leak",
    vpn: "Exposed. Websites read your real OS version, installed fonts, screen resolution, and WebGL canvas hash to identify you without standard cookies.",
    intractify: "Normalized. You share an identical generic profile with thousands of other users. Your true hardware configuration never reaches target trackers.",
  },
  {
    category: "DEVICE SECURITY",
    title: "Script Execution & Zero-Days",
    vpn: "Executed locally on your CPU. Dangerous scripts, zero-day browser exploits, and drive-by malware can target and compromise your host operating system.",
    intractify: "Trapped in the remote container. All website scripts execute in disposable cloud pods. Your physical device receives only a clean video stream of pixels.",
  },
  {
    category: "IP & LOCATION LEAKS",
    title: "WebRTC Network Exposure",
    vpn: "Common vulnerability. WebRTC protocols bypass standard proxy rules, leaking your true home ISP IP address directly to target website servers.",
    intractify: "Zero local connections. The target site only ever sees the cloud container's gateway IP. Your local interface is completely isolated.",
  },
  {
    category: "SESSION LIFECYCLE",
    title: "Persistent vs. Disposable State",
    vpn: "Persistent environment. Unless you clear browser cache manually, security cookies and history logs sit permanently inside your local files.",
    intractify: "Disposable container architecture. Closing the session automatically reaps and destroys the cloud container instance. There is no trace left to recover.",
  },
];

function VisualMockup({ activeStep, isMobile = false }: { activeStep: number; isMobile?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<SmokeParticle[]>([]);
  const cookiesRef = useRef<Cookie[]>([]);
  const activeStepRef = useRef(activeStep);

  useEffect(() => {
    activeStepRef.current = activeStep;
  }, [activeStep]);

  // Canvas cookie animation inside Step 0
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      
      const rows = 5;
      const cols = 6;
      const arr: Cookie[] = [];
      const rowGap = canvas.height / (rows + 1);
      const colGap = (canvas.width * 0.45) / (cols + 1);
      
      for (let r = 1; r <= rows; r++) {
        for (let c = 1; c <= cols; c++) {
          arr.push({
            x: c * colGap + (Math.random() - 0.5) * 4,
            y: r * rowGap + (Math.random() - 0.5) * 4,
            active: true,
            size: 6 + Math.random() * 3,
          });
        }
      }
      cookiesRef.current = arr;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let frameId: number;
    let sweepX = 0;
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (activeStepRef.current === 0) {
        sweepX += 2.5;
        if (sweepX > canvas.width * 1.5) {
          sweepX = 0;
          cookiesRef.current.forEach(c => c.active = true);
        }
        
        cookiesRef.current.forEach((cookie) => {
          if (cookie.active) {
            if (cookie.x < sweepX && sweepX < canvas.width * 0.75) {
              cookie.active = false;
              for (let i = 0; i < 6; i++) {
                particlesRef.current.push(new SmokeParticle(cookie.x, cookie.y));
              }
            } else {
              ctx.beginPath();
              ctx.arc(cookie.x, cookie.y, cookie.size / 2, 0, Math.PI * 2);
              ctx.fillStyle = "rgba(229, 75, 75, 0.15)";
              ctx.strokeStyle = "rgba(229, 75, 75, 0.7)";
              ctx.lineWidth = 1;
              ctx.fill();
              ctx.stroke();
            }
          }
        });
      } else {
        sweepX = 0;
        cookiesRef.current = [];
      }

      particlesRef.current = particlesRef.current.filter((p) => {
        p.update();
        p.draw(ctx);
        return p.alpha > 0;
      });

      frameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

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
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "9px", color: "#E54B4B", marginBottom: "6px" }}>✕ VPN DISK STATE</div>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "16px", color: "#FFFFFF" }}>Cookies Stored Locally</div>
              </div>
              <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10.5px", color: "rgba(255,255,255,0.4)" }}>
                Data persists across visits
              </div>
            </>
          )}

          {activeStep === 1 && (
            <>
              <div>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "9px", color: "#E54B4B", marginBottom: "6px" }}>✕ FINGERPRINT SPECS</div>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "16px", color: "#FFFFFF", marginBottom: "14px" }}>Exposed Identifiers</div>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", color: "rgba(255,255,255,0.4)", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div>OS: macOS Catalina</div>
                  <div>Browser: Safari (Unique Canvas)</div>
                  <div>Fonts: 241 Exposed</div>
                </div>
              </div>
              <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10.5px", color: "rgba(255,255,255,0.2)" }}>
                Identity stands out to trackers
              </div>
            </>
          )}

          {activeStep === 2 && (
            <>
              <div>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "9px", color: "#E54B4B", marginBottom: "6px" }}>✕ EXECUTION VECTOR</div>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "16px", color: "#FFFFFF", marginBottom: "12px" }}>Local Processing</div>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", color: "rgba(255,255,255,0.4)", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div>Host CPU: Processing JS</div>
                  <div>Memory: Active RAM cache</div>
                  <div>Risk: Host browser exploits</div>
                </div>
              </div>
              <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10.5px", color: "rgba(255,255,255,0.2)" }}>
                Zero-days execute directly on OS
              </div>
            </>
          )}

          {activeStep === 3 && (
            <>
              <div>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "9px", color: "#E54B4B", marginBottom: "6px" }}>✕ WebRTC CONFIG</div>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "16px", color: "#FFFFFF", marginBottom: "12px" }}>Direct IP Leaks</div>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", color: "rgba(255,255,255,0.4)", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div>WebRTC: Querying interface</div>
                  <div>Leaked IP: 185.112.45.12</div>
                  <div>ISP: Target logs home routing</div>
                </div>
              </div>
              <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10.5px", color: "rgba(255,255,255,0.2)" }}>
                Standard VPN routes get bypassed
              </div>
            </>
          )}

          {activeStep === 4 && (
            <>
              <div>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "9px", color: "#E54B4B", marginBottom: "6px" }}>✕ FILE RETENTION</div>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "16px", color: "#FFFFFF", marginBottom: "12px" }}>Accumulated Storage</div>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", color: "rgba(255,255,255,0.4)", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div>Disk Space: 240 MB</div>
                  <div>Cache files: Persistent</div>
                  <div>State: Forensics can extract</div>
                </div>
              </div>
              <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10.5px", color: "rgba(255,255,255,0.2)" }}>
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
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "9px", color: "var(--primary)", marginBottom: "6px" }}>✓ CLOUD ISOLATION</div>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "16px", color: "var(--foreground)" }}>Cookies Evaporated</div>
              </div>
              <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10.5px", color: "var(--muted-foreground)" }}>
                Leaves 0 bytes kept on close
              </div>
            </>
          )}

          {activeStep === 1 && (
            <>
              <div>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "9px", color: "var(--primary)", marginBottom: "6px" }}>✓ NORMALIZED PROFILE</div>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "16px", color: "var(--foreground)", marginBottom: "14px" }}>Generic Mask</div>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", color: "var(--muted-foreground)", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div>OS: Linux x86_64</div>
                  <div>Browser: Chrome (Anonymized)</div>
                  <div>Fonts: 12 Normalized</div>
                </div>
              </div>
              <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10.5px", color: "var(--muted-foreground)" }}>
                Identical to thousands of users
              </div>
            </>
          )}

          {activeStep === 2 && (
            <>
              <div>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "9px", color: "var(--primary)", marginBottom: "6px" }}>✓ SANDBOX SHIELD</div>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "16px", color: "var(--foreground)", marginBottom: "12px" }}>Disposable Container</div>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", color: "var(--muted-foreground)", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div>Remote Pod: Executing scripts</div>
                  <div>Local device: Receiving pixels</div>
                  <div>Isolation: 100% exploit-proof</div>
                </div>
              </div>
              <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10.5px", color: "var(--muted-foreground)" }}>
                Exploits trapped inside the cloud
              </div>
            </>
          )}

          {activeStep === 3 && (
            <>
              <div>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "9px", color: "var(--primary)", marginBottom: "6px" }}>✓ PROXY CLOAK</div>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "16px", color: "var(--foreground)", marginBottom: "12px" }}>Isolated Gateway</div>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", color: "var(--muted-foreground)", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div>WebRTC: Blocked at gateway</div>
                  <div>Spoofed IP: 10.200.0.8</div>
                  <div>Target sees: Cloud endpoint</div>
                </div>
              </div>
              <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10.5px", color: "var(--muted-foreground)" }}>
                Your local home IP never leaves
              </div>
            </>
          )}

          {activeStep === 4 && (
            <>
              <div>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "9px", color: "var(--primary)", marginBottom: "6px" }}>✓ AUTO-DESTRUCT</div>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "16px", color: "var(--foreground)", marginBottom: "12px" }}>Instance Reaped</div>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", color: "var(--muted-foreground)", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div>Disk State: ∅ 0 bytes</div>
                  <div>Orchestrator: Task terminated</div>
                  <div>History: Wiped from memory</div>
                </div>
              </div>
              <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10.5px", color: "var(--muted-foreground)" }}>
                Container destroyed on tab close
              </div>
            </>
          )}
        </div>
      </div>

      {/* Canvas Overlay for Step 0 (Cookie Evaporation) */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
    </div>
  );
}

export function ComparisonSection() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Scroll listener to detect active step centered in viewport
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const handleScroll = () => {
      const midpoint = window.innerHeight / 2;
      let closestIdx = 0;
      let closestDist = Infinity;

      stepRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elementCenter - midpoint);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = idx;
        }
      });

      setActiveStep(closestIdx);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            margin: "0 0 72px",
            maxWidth: "800px",
            color: "var(--foreground)",
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

        {/* Two-Column Focal Stepper Layout */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-16"
          style={{ position: "relative" }}
        >
          {/* Left Column: Text Stepper cards */}
          <div
            className="lg:col-span-6 flex flex-col gap-24 lg:gap-40"
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
                    transform: isActive || prefersReducedMotion() ? "translateX(0)" : "translateX(-6px)",
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                    borderLeft: `2px solid ${isActive ? "var(--primary)" : "var(--border)"}`,
                    paddingLeft: "24px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "10px",
                      color: isActive ? "var(--primary)" : "var(--muted-foreground)",
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
                      <span style={{ color: "#E54B4B", marginRight: "8px", fontWeight: "bold" }}>✕ VPN:</span>
                      {step.vpn}
                    </div>
                    <div style={{ color: "var(--foreground)", fontWeight: 500 }}>
                      <span style={{ color: "var(--primary)", marginRight: "8px", fontWeight: "bold" }}>✓ Intractify:</span>
                      {step.intractify}
                    </div>
                  </div>

                  {/* Mobile Embedded Visual Mockup (Visible on Mobile Viewports only) */}
                  <div className="lg:hidden mt-8">
                    <VisualMockup activeStep={idx} isMobile />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Visual Mockup (Visible on Desktop Viewports only) */}
          <div
            className="lg:col-span-6 hidden lg:block"
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

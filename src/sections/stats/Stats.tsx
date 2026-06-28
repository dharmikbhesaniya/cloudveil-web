"use client";

import { useRef, useEffect, useState } from "react";

const STATS = [
  { target: 4.2, decimals: 1, unit: "s", label: "Average boot", sub: "click to live browser" },
  { target: 14, decimals: 0, unit: "", label: "Exit regions", sub: "residential & datacenter", navy: false },
  { target: 0, decimals: 0, unit: "", label: "Bytes retained", sub: "after a session ends", navy: true },
  { target: 99.98, decimals: 2, unit: "%", label: "90-day uptime", sub: "availability SLA" },
];

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useScrollCounter(target: number, decimals: number) {
  const [val, setVal] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const dur = 1800;
    const start = performance.now();
    const raf = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setVal(parseFloat((easeOutCubic(p) * target).toFixed(decimals)));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [visible, target, decimals]);

  return { ref, val, visible };
}

function StatItem({ stat }: { stat: (typeof STATS)[0] }) {
  const { ref, val, visible } = useScrollCounter(stat.target, stat.decimals);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 1s ${EASE}, transform 1s ${EASE}`,
      }}
    >
      {/* Big italic serif numeral */}
      <div
        style={{
          fontFamily: "var(--font-display, 'Instrument Serif', Georgia, serif)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "84px",
          lineHeight: 0.9,
          letterSpacing: "-0.04em",
          color: (stat as { navy?: boolean }).navy ? "var(--primary)" : "var(--foreground)",
        }}
      >
        {val}
        {stat.unit && (
          <span
            style={{
              fontSize: "36px",
              verticalAlign: "18px",
              color: "var(--muted-foreground)",
              marginLeft: "2px",
            }}
          >
            {stat.unit}
          </span>
        )}
      </div>
      <div
        style={{
          fontWeight: 500,
          fontSize: "13px",
          marginTop: "14px",
          color: "var(--foreground)",
        }}
      >
        {stat.label}
      </div>
      <div style={{ fontSize: "12px", color: "var(--muted-foreground)", marginTop: "2px" }}>
        {stat.sub}
      </div>
    </div>
  );
}

function useReveal() {
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
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

export function Stats() {
  const { ref: closerRef, visible: closerVisible } = useReveal();

  return (
    <section style={{ padding: "100px 0 80px" }}>
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
            borderBottom: "1px solid var(--border)",
            paddingBottom: "12px",
            marginBottom: "28px",
          }}
        >
          — By the numbers, as of May 2026
        </div>

        {/* 4-col stat grid */}
        <div
          style={{
            display: "grid",
            gap: "48px",
            paddingBottom: "32px",
            borderBottom: "1px solid var(--border)",
          }}
          className="stats-grid"
        >
          {STATS.map((s) => (
            <StatItem key={s.label} stat={s} />
          ))}
        </div>

        {/* Closer paragraph */}
        <p
          ref={closerRef as React.RefObject<HTMLParagraphElement>}
          style={{
            fontFamily: "var(--font-display, 'Instrument Serif', Georgia, serif)",
            fontStyle: "italic",
            fontSize: "26px",
            lineHeight: 1.3,
            letterSpacing: "-0.02em",
            textWrap: "balance" as React.CSSProperties["textWrap"],
            margin: "32px 0 0",
            maxWidth: "800px",
            opacity: closerVisible ? 1 : 0,
            transform: closerVisible ? "translateY(0)" : "translateY(16px)",
            transition: `opacity 1s ${EASE} 0.3s, transform 1s ${EASE} 0.3s`,
          }}
        >
          Every session is its own room — kernel-isolated, fingerprint-scrambled, never logged, and
          demolished as you leave.{" "}
          <span style={{ color: "var(--muted-foreground)" }}>That is the entire product.</span>
        </p>
      </div>
    </section>
  );
}

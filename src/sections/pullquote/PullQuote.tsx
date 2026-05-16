"use client";

import { useRef, useEffect, useState } from "react";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

type QuoteWord = { text: string; red?: boolean; br?: boolean };

const LINES: QuoteWord[] = [
  { text: "A " }, { text: "private " }, { text: "browser " },
  { text: "tab " }, { text: "is " }, { text: "a " }, { text: "curtain." },
  { br: true, text: "" },
  { text: "Intractify ", red: true }, { text: "is ", red: true },
  { text: "a ", red: true }, { text: "different ", red: true },
  { text: "room ", red: true }, { text: "—" },
  { br: true, text: "" },
  { text: "built " }, { text: "fresh, " }, { text: "lived " },
  { text: "in " }, { text: "once, " }, { text: "demolished " },
  { text: "as " }, { text: "you " }, { text: "leave." },
];

export function PullQuote() {
  const [visible, setVisible] = useState(false);
  const [attrVisible, setAttrVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          setTimeout(() => setAttrVisible(true), 1500);
          io.disconnect();
        }
      },
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let wordIdx = 0;

  return (
    <section
      ref={ref}
      style={{ padding: "140px 0", textAlign: "center", position: "relative" }}
      id="method"
    >
      {/* Decorative large quote mark */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "70px",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-display, 'Instrument Serif', Georgia, serif)",
          fontStyle: "italic",
          fontSize: "220px",
          lineHeight: 0.7,
          color: "#6F2530",
          opacity: 0.16,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        &ldquo;
      </div>

      <div
        className="mx-auto max-w-7xl"
        style={{ padding: "0 clamp(24px, 5vw, 40px)", position: "relative", zIndex: 1 }}
      >
        <p
          style={{
            fontFamily: "var(--font-display, 'Instrument Serif', Georgia, serif)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(28px, 3.6vw, 44px)",
            lineHeight: 1.2,
            letterSpacing: "-0.022em",
            textWrap: "balance" as React.CSSProperties["textWrap"],
            color: "var(--foreground)",
            maxWidth: "780px",
            margin: "0 auto",
          }}
        >
          {LINES.map((w, i) => {
            if (w.br) return <br key={`br-${i}`} />;
            const delay = wordIdx * 0.07;
            wordIdx++;
            return (
              <span key={i} style={{ display: "inline" }}>
                <span
                  style={{
                    display: "inline-block",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(12px)",
                    transition: `opacity 0.7s ${EASE} ${delay}s, transform 0.7s ${EASE} ${delay}s`,
                    color: w.red ? "#6F2530" : "inherit",
                  }}
                >
                  {w.text.trimEnd()}
                </span>
                {" "}
              </span>
            );
          })}
        </p>

        {/* Attribution */}
        <div
          style={{
            marginTop: "36px",
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--muted-foreground)",
            opacity: attrVisible ? 1 : 0,
            transition: `opacity 1s ${EASE}`,
          }}
        >
          — Anika Rao · co-founder &amp; head of platform
        </div>
      </div>
    </section>
  );
}

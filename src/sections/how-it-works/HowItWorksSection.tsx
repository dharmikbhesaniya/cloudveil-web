"use client";

import { MousePointerClick, Cloud, Monitor, Trash2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const steps = [
  {
    label: "CLICK",
    icon: MousePointerClick,
    title: "Launch a session",
    description:
      "One click in the dashboard. Choose a region and a duration cap, or accept the defaults. No setup, no installs.",
  },
  {
    label: "PROVISION",
    icon: Cloud,
    title: "Container spins up",
    description:
      "A fresh ECS task boots a stripped Chromium with randomized fingerprints. Streams over WebRTC to your viewport in under five seconds.",
  },
  {
    label: "BROWSE",
    icon: Monitor,
    title: "Browse, then vanish",
    description:
      "End the session — the container is destroyed and its volume zeroed. There is no log, no replay, no recoverable history.",
  },
  {
    label: "DONE",
    icon: Trash2,
    title: "Nothing survives",
    description:
      "Cookies, history, cache, downloads — all destroyed when the container terminates. The next session always starts completely fresh.",
  },
];

export function HowItWorks() {
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();
  const { ref: gridRef, isRevealed: gridRevealed } = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="relative py-24" id="how-it-works">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent, var(--cv-section-tint) 30%, var(--cv-section-tint) 70%, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`reveal-start mx-auto mb-20 max-w-2xl text-center ${headerRevealed ? "is-revealed" : ""}`}
        >
          <span className="cv-eyebrow mb-4 block">How it works</span>
          <h2 className="font-bold">
            Three steps. One <span className="cv-display">disposable</span> browser.
          </h2>
          <p className="text-muted-foreground mt-4 text-base sm:text-lg">
            Click. We provision. You browse. Everything in between is the platform&apos;s problem,
            not yours.
          </p>
        </div>

        {/* Steps grid with connectors */}
        <div ref={gridRef} className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Desktop connector line */}
          <div
            className="pointer-events-none absolute right-0 left-0 hidden h-px lg:block"
            style={{
              top: "20px",
              background:
                "linear-gradient(90deg, transparent 6%, oklch(0.65 0.22 268 / 22%) 14%, oklch(0.65 0.22 268 / 22%) 86%, transparent 94%)",
            }}
          />

          {steps.map((step, i) => (
            <div
              key={step.label}
              className={`reveal-start flex flex-col ${gridRevealed ? "is-revealed" : ""}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Step number circle */}
              <div className="mb-5 flex items-center lg:justify-center">
                <div
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold text-white ring-4"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.50 0.28 265), oklch(0.55 0.24 320))",
                    boxShadow:
                      "0 0 0 4px var(--cv-step-ring), 0 0 20px oklch(0.65 0.22 268 / 25%)",
                  }}
                >
                  {i + 1}
                </div>
                <span className="text-muted-foreground/40 ml-3 font-mono text-[10px] tracking-[0.06em] lg:hidden">
                  {step.label}
                </span>
              </div>

              {/* Card */}
              <div
                className="hover-lift flex flex-1 cursor-default flex-col overflow-hidden rounded-2xl border transition-all duration-200"
                style={{
                  background: "var(--cv-card-bg)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="p-6">
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border"
                    style={{
                      borderColor: "oklch(0.50 0.28 265 / 20%)",
                      color: "var(--primary)",
                      background:
                        "linear-gradient(135deg, oklch(0.50 0.28 265 / 18%), oklch(0.55 0.24 320 / 12%))",
                    }}
                  >
                    <step.icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>

                  <h3 className="mb-2 text-[17px] font-semibold tracking-[-0.01em]">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div
                  className="mt-auto h-0.5 w-full"
                  style={{
                    background: `linear-gradient(90deg, oklch(0.50 0.28 265 / ${(i + 1) * 25}%), oklch(0.55 0.24 320 / ${(i + 1) * 20}%), transparent)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

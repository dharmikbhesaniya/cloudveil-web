"use client";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const LOGOS = [
  "Acme Corp",
  "Globex",
  "Soylent Corp",
  "Initech",
  "Umbrella",
];

export function TrustLogos() {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section className="py-24" id="trusted-by" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`reveal-start text-center ${isRevealed ? "is-revealed" : ""}`}
        >
          <p className="cv-eyebrow mb-12">Trusted by security teams at</p>
          <div className="flex flex-wrap justify-center gap-12 sm:gap-20 items-center opacity-60 grayscale">
            {LOGOS.map((logo) => (
              <div
                key={logo}
                style={{
                  fontFamily: "var(--font-display, Georgia, serif)",
                  fontSize: "24px",
                  fontWeight: 600,
                  color: "var(--foreground)",
                }}
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

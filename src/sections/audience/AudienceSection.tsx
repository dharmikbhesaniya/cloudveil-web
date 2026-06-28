"use client";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const AUDIENCES = [
  {
    title: "Developers",
    description: "Safely test unverified code, run isolated local environments, and debug without contaminating your primary machine.",
  },
  {
    title: "Security Teams",
    description: "Investigate suspicious links and sandbox malware with zero risk to the corporate network.",
  },
  {
    title: "Journalists & Researchers",
    description: "Conduct sensitive OSINT investigations and communicate securely without leaving a digital footprint.",
  },
  {
    title: "Crypto Users",
    description: "Interact with Web3 dApps and wallets in an airtight environment, safe from browser extensions and keyloggers.",
  },
];

export function AudienceSection() {
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();
  const { ref: gridRef, isRevealed: gridRevealed } = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="py-24" id="audience" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`reveal-start mx-auto mb-16 max-w-2xl text-center ${headerRevealed ? "is-revealed" : ""}`}
        >
          <span className="cv-eyebrow mb-4 block">Who is it for?</span>
          <h2 className="font-bold">
            Built for the <span className="cv-display">paranoid</span>.
          </h2>
          <p className="text-muted-foreground mt-4 text-base sm:text-lg">
            Whether you are protecting corporate secrets, personal wealth, or simply value your right to absolute privacy.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map((audience, i) => (
            <div
              key={audience.title}
              className={`reveal-start ${gridRevealed ? "is-revealed" : ""}`}
              style={{
                transitionDelay: `${i * 0.1}s`,
                padding: "24px",
                background: "var(--cv-card-bg)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
              }}
            >
              <h3 style={{ fontSize: "16px", fontWeight: 600, margin: "0 0 12px", color: "var(--foreground)" }}>
                {audience.title}
              </h3>
              <p style={{ fontSize: "13.5px", color: "var(--muted-foreground)", lineHeight: 1.6, margin: 0 }}>
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

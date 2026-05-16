import { FEATURES } from "@/content/features";

export default function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative py-24"
      style={{ backgroundColor: "var(--cv-bg)" }}
    >
      {/* Background orb */}
      <div
        className="animate-aurora-pulse pointer-events-none absolute top-0 right-0 h-[400px] w-[400px]"
        style={{
          background:
            "radial-gradient(circle, rgba(240,138,62,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--cv-border)] bg-[var(--cv-glass)] px-4 py-1.5 backdrop-blur-sm">
            <span className="text-xs font-medium text-[var(--cv-ink-muted)]">
              Privacy by architecture · Not just policy
            </span>
          </div>
          <h2
            id="features-heading"
            className="text-4xl font-bold tracking-tight text-[var(--cv-ink)] sm:text-5xl"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontStyle: "italic",
            }}
          >
            Everything you need to browse
            <br />
            without a trace
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--cv-ink-muted)]">
            CloudVeil is built from the ground up for privacy — not retrofitted.
            Every feature exists to eliminate your digital footprint.
          </p>
        </div>

        {/* Features grid */}
        <ul
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {FEATURES.map((feature) => (
            <li key={feature.id}>
              <div
                className="group relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  background: "var(--cv-glass)",
                  border: "1px solid var(--cv-border)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Spotlight hover effect */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 0%, rgba(107,76,255,0.08) 0%, transparent 60%)",
                  }}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(107,76,255,0.12) 0%, rgba(224,71,155,0.08) 100%)",
                    border: "1px solid rgba(107,76,255,0.15)",
                  }}
                  aria-hidden="true"
                >
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="mb-2 text-base font-semibold text-[var(--cv-ink)]">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--cv-ink-muted)]">
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className="absolute inset-x-0 bottom-0 h-0.5 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--cv-indigo), var(--cv-magenta))",
                  }}
                  aria-hidden="true"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

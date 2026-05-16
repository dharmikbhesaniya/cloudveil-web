import { HOW_IT_WORKS } from "@/content/how-it-works";

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="relative overflow-hidden py-24"
      style={{ backgroundColor: "var(--cv-paper)" }}
    >
      {/* Subtle top border gradient */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(107,76,255,0.3), rgba(224,71,155,0.2), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--cv-border)] bg-[var(--cv-glass)] px-4 py-1.5 backdrop-blur-sm">
            <span className="text-xs font-medium text-[var(--cv-ink-muted)]">
              Three steps · Seconds to private
            </span>
          </div>
          <h2
            id="how-it-works-heading"
            className="text-4xl font-bold tracking-tight text-[var(--cv-ink)] sm:text-5xl"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontStyle: "italic",
            }}
          >
            How CloudVeil Works
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--cv-ink-muted)]">
            No configuration. No VPN clients. No browser extensions. Just
            instant, isolated privacy in three steps.
          </p>
        </div>

        {/* Steps grid */}
        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Connecting dashed line — desktop only */}
          <div
            className="pointer-events-none absolute top-12 left-0 right-0 hidden md:block"
            aria-hidden="true"
          >
            <div
              className="mx-auto h-px"
              style={{
                width: "calc(100% - 120px)",
                marginLeft: "60px",
                background:
                  "repeating-linear-gradient(90deg, rgba(107,76,255,0.25) 0, rgba(107,76,255,0.25) 8px, transparent 8px, transparent 16px)",
              }}
            />
          </div>

          {HOW_IT_WORKS.map((step) => (
            <div
              key={step.step}
              className="animate-reveal relative flex flex-col items-center text-center"
            >
              {/* Step number circle */}
              <div
                className="relative z-10 mb-6 flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, var(--cv-paper) 0%, rgba(255,253,243,0.8) 100%)",
                  borderColor: "rgba(107,76,255,0.2)",
                  boxShadow:
                    "0 8px 32px rgba(107,76,255,0.12), 0 2px 8px rgba(20,17,13,0.06)",
                }}
              >
                <span
                  className="text-3xl font-bold"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    background:
                      "linear-gradient(135deg, var(--cv-indigo) 0%, var(--cv-magenta) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {String(step.step).padStart(2, "0")}
                </span>
                <span className="mt-0.5 text-xs font-medium text-[var(--cv-ink-subtle)]">
                  Step
                </span>
              </div>

              {/* Content */}
              <div
                className="rounded-2xl p-6 text-left"
                style={{
                  background: "var(--cv-glass)",
                  border: "1px solid var(--cv-border)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <h3 className="mb-3 text-lg font-semibold text-[var(--cv-ink)]">
                  {step.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-[var(--cv-ink-muted)]">
                  {step.description}
                </p>
                {/* Technical detail */}
                <div
                  className="rounded-lg p-3"
                  style={{
                    background: "rgba(107,76,255,0.05)",
                    border: "1px solid rgba(107,76,255,0.1)",
                  }}
                >
                  <p
                    className="text-xs leading-relaxed text-[var(--cv-ink-subtle)]"
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    {step.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom border gradient */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(107,76,255,0.3), rgba(224,71,155,0.2), transparent)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}

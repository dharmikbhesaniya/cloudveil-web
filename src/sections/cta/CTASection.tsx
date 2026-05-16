export default function CTASection() {
  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="relative overflow-hidden py-24"
      style={{ backgroundColor: "var(--cv-paper)" }}
    >
      {/* Gradient background overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(107,76,255,0.06) 0%, rgba(224,71,155,0.04) 50%, rgba(240,138,62,0.03) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Aurora orbs */}
      <div aria-hidden="true" className="pointer-events-none">
        <div
          className="animate-aurora-pulse absolute -top-20 left-1/4 h-[400px] w-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(107,76,255,0.14) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="animate-aurora-pulse absolute -bottom-20 right-1/4 h-[350px] w-[350px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(224,71,155,0.10) 0%, transparent 70%)",
            filter: "blur(60px)",
            animationDelay: "2s",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--cv-border)] bg-[var(--cv-glass)] px-4 py-1.5 backdrop-blur-sm">
          <span
            className="h-2 w-2 animate-aurora-pulse rounded-full"
            style={{ background: "var(--cv-indigo)" }}
            aria-hidden="true"
          />
          <span className="text-xs font-medium text-[var(--cv-ink-muted)]">
            Free to start · No credit card required
          </span>
        </div>

        {/* Headline */}
        <h2
          id="cta-heading"
          className="mb-5 text-4xl font-bold tracking-tight text-[var(--cv-ink)] sm:text-5xl lg:text-6xl"
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontStyle: "italic",
          }}
        >
          Start Browsing Privately Today
        </h2>

        {/* Sub-copy */}
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[var(--cv-ink-muted)]">
          Join 2,400+ privacy-first teams who have switched to CloudVeil.
          Your first session starts in under 3 seconds — and leaves no trace.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://app.cloudveil.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white shadow-xl transition-all hover:shadow-2xl hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cv-indigo)] focus-visible:ring-offset-2"
            style={{
              background:
                "linear-gradient(135deg, var(--cv-indigo) 0%, #8B5CF6 100%)",
            }}
          >
            Launch Free Session
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8.22 2.97a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06l2.97-2.97H3.75a.75.75 0 010-1.5h7.44L8.22 4.03a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          <a
            href="mailto:sales@cloudveil.app"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--cv-border)] bg-[var(--cv-glass)] px-8 py-4 text-base font-semibold text-[var(--cv-ink)] backdrop-blur-sm transition-all hover:border-[var(--cv-indigo)] hover:text-[var(--cv-indigo)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cv-indigo)] focus-visible:ring-offset-2"
          >
            Talk to Enterprise Sales
          </a>
        </div>

        {/* Trust signals */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          {[
            "No credit card required",
            "Cancel anytime",
            "GDPR & CCPA compliant",
          ].map((signal) => (
            <span
              key={signal}
              className="flex items-center gap-2 text-sm text-[var(--cv-ink-subtle)]"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7 0.5L1 3.5v4C1 10.75 3.6 13.1 7 14c3.4-.9 6-3.25 6-6.5v-4L7 0.5z"
                  fill="var(--cv-indigo)"
                  opacity="0.4"
                />
                <path
                  d="M4.5 7l1.8 1.8L9.5 5.5"
                  stroke="var(--cv-indigo)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {signal}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

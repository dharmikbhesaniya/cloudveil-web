import { HERO } from "@/content/hero";

function BrowserMockup() {
  return (
    <div
      className="relative"
      style={{
        perspective: "1200px",
      }}
    >
      {/* Aurora glow behind mockup */}
      <div
        className="animate-aurora-pulse pointer-events-none absolute inset-0 -z-10 scale-110"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(107,76,255,0.18) 0%, rgba(224,71,155,0.10) 60%, transparent 100%)",
          filter: "blur(32px)",
        }}
        aria-hidden="true"
      />

      {/* Browser window */}
      <div
        className="animate-aurora-float w-full max-w-[480px] overflow-hidden rounded-2xl shadow-2xl"
        style={{
          transform: "rotateY(-8deg) rotateX(3deg)",
          transformStyle: "preserve-3d",
          boxShadow:
            "0 40px 80px rgba(20,17,13,0.18), 0 0 0 1px rgba(20,17,13,0.08)",
        }}
        role="img"
        aria-label="CloudVeil browser session interface mockup"
      >
        {/* Browser chrome bar */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,253,243,0.98) 0%, rgba(255,253,243,0.95) 100%)",
            borderBottom: "1px solid rgba(20,17,13,0.08)",
          }}
        >
          {/* Traffic light dots */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
            <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
          </div>

          {/* URL bar */}
          <div
            className="flex flex-1 items-center gap-2 rounded-md px-3 py-1.5"
            style={{
              background: "rgba(20,17,13,0.05)",
              border: "1px solid rgba(20,17,13,0.08)",
            }}
          >
            {/* Lock icon */}
            <svg
              width="10"
              height="12"
              viewBox="0 0 10 12"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="0.5"
                y="5.5"
                width="9"
                height="6"
                rx="1"
                stroke="#27C93F"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M2.5 5.5V4a2.5 2.5 0 015 0v1.5"
                stroke="#27C93F"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
            <span
              className="flex-1 truncate text-xs"
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                color: "var(--cv-ink-muted)",
              }}
            >
              session-a3f8b2.cloudveil.app
            </span>
          </div>

          {/* Tab indicator */}
          <div
            className="hidden items-center gap-1 rounded px-2 py-1 sm:flex"
            style={{
              background: "rgba(107,76,255,0.08)",
              border: "1px solid rgba(107,76,255,0.15)",
            }}
            aria-hidden="true"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M5 1L1 3.5v2.5C1 8.05 2.75 9.7 5 10.5c2.25-.8 4-2.45 4-4.5V3.5L5 1z"
                fill="var(--cv-indigo)"
                opacity="0.6"
              />
            </svg>
            <span
              className="text-xs text-[var(--cv-indigo)]"
              style={{ fontSize: "10px" }}
            >
              Private
            </span>
          </div>
        </div>

        {/* Browser content area */}
        <div
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, #F8F7F0 0%, #F2F1E8 100%)",
            minHeight: "280px",
          }}
          aria-hidden="true"
        >
          {/* Simulated page header */}
          <div className="px-5 py-4">
            <div
              className="h-4 w-32 rounded-full"
              style={{ background: "rgba(107,76,255,0.15)" }}
            />
            <div className="mt-3 flex items-center gap-3">
              <div
                className="h-3 w-48 rounded-full"
                style={{ background: "rgba(20,17,13,0.08)" }}
              />
              <div
                className="h-3 w-20 rounded-full"
                style={{ background: "rgba(20,17,13,0.05)" }}
              />
            </div>
          </div>

          {/* Simulated content blocks */}
          <div className="grid grid-cols-3 gap-3 px-5 pb-4">
            {[0.18, 0.12, 0.14].map((opacity, i) => (
              <div
                key={i}
                className="h-24 rounded-lg"
                style={{
                  background: `rgba(107,76,255,${opacity})`,
                  backdropFilter: "blur(4px)",
                }}
              />
            ))}
          </div>

          {/* Simulated text lines */}
          <div className="space-y-2 px-5 pb-5">
            {[1, 0.7, 0.9, 0.6].map((w, i) => (
              <div
                key={i}
                className="h-2.5 rounded-full"
                style={{
                  width: `${w * 100}%`,
                  background: "rgba(20,17,13,0.07)",
                }}
              />
            ))}
          </div>

          {/* Privacy shield overlay */}
          <div
            className="absolute inset-0 flex items-end justify-end p-4"
            aria-hidden="true"
          >
            <div
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium"
              style={{
                background: "rgba(39,201,63,0.12)",
                border: "1px solid rgba(39,201,63,0.25)",
                color: "#1a7a28",
              }}
            >
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                <path
                  d="M5 0.5L0.5 2.75v3C0.5 9.25 2.5 11.5 5 12.5c2.5-1 4.5-3.25 4.5-6.75v-3L5 0.5z"
                  fill="#27C93F"
                  opacity="0.8"
                />
              </svg>
              Session protected
            </div>
          </div>

          {/* Blur overlay at top to simulate privacy */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-8"
            style={{
              background:
                "linear-gradient(180deg, rgba(248,247,240,0.8) 0%, transparent 100%)",
            }}
          />
        </div>

        {/* Status bar */}
        <div
          className="flex items-center justify-between px-4 py-2"
          style={{
            background: "rgba(255,253,243,0.96)",
            borderTop: "1px solid rgba(20,17,13,0.06)",
          }}
          aria-hidden="true"
        >
          <span
            className="text-xs"
            style={{
              color: "var(--cv-ink-subtle)",
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "10px",
            }}
          >
            🟢 Isolated · Zero logs
          </span>
          <span
            className="text-xs"
            style={{
              color: "var(--cv-ink-subtle)",
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "10px",
            }}
          >
            US-EAST-1 · Chromium
          </span>
        </div>
      </div>

      {/* Decorative dots */}
      <div
        className="pointer-events-none absolute -bottom-6 -right-6 grid grid-cols-5 gap-1.5"
        aria-hidden="true"
      >
        {Array.from({ length: 25 }).map((_, i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "rgba(107,76,255,0.2)" }}
          />
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
      style={{ backgroundColor: "var(--cv-bg)" }}
    >
      {/* Background orbs */}
      <div aria-hidden="true" className="pointer-events-none">
        <div
          className="animate-aurora-pulse absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(107,76,255,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="animate-aurora-pulse absolute -bottom-20 -right-20 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(224,71,155,0.10) 0%, transparent 70%)",
            filter: "blur(60px)",
            animationDelay: "1.5s",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left — copy */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow badge */}
            <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--cv-border)] bg-[var(--cv-glass)] px-4 py-1.5 backdrop-blur-sm">
              <span
                className="h-1.5 w-1.5 animate-aurora-pulse rounded-full"
                style={{ background: "var(--cv-indigo)" }}
                aria-hidden="true"
              />
              <span className="text-xs font-medium text-[var(--cv-ink-muted)]">
                {HERO.eyebrow}
              </span>
            </div>

            {/* Headline */}
            <h1
              id="hero-heading"
              className="animate-fade-in-up mb-6 text-5xl leading-tight tracking-tight text-[var(--cv-ink)] sm:text-6xl"
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontStyle: "italic",
                animationDelay: "0.1s",
                whiteSpace: "pre-line",
              }}
            >
              {HERO.headline}
            </h1>

            {/* Subheadline */}
            <p
              className="animate-fade-in-up mb-8 max-w-lg text-lg leading-relaxed text-[var(--cv-ink-muted)]"
              style={{ animationDelay: "0.2s" }}
            >
              {HERO.subheadline}
            </p>

            {/* CTAs */}
            <div
              className="animate-fade-in-up mb-8 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "0.3s" }}
            >
              <a
                href={HERO.primaryCTAHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cv-indigo)] focus-visible:ring-offset-2"
                style={{
                  background:
                    "linear-gradient(135deg, var(--cv-indigo) 0%, #8B5CF6 100%)",
                }}
              >
                {HERO.primaryCTA}
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
                href={HERO.secondaryCTAHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--cv-border)] bg-[var(--cv-glass)] px-6 py-3.5 text-base font-semibold text-[var(--cv-ink)] backdrop-blur-sm transition-all hover:border-[var(--cv-indigo)] hover:text-[var(--cv-indigo)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cv-indigo)] focus-visible:ring-offset-2"
              >
                {HERO.secondaryCTA}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 15A7 7 0 108 1a7 7 0 000 14zm3.25-7.5a.75.75 0 000-1.5H7.56l1.22-1.22a.75.75 0 10-1.06-1.06l-2.5 2.5a.75.75 0 000 1.06l2.5 2.5a.75.75 0 101.06-1.06L7.56 7.5h3.69z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>

            {/* Social proof */}
            <p
              className="animate-fade-in-up flex items-center gap-2 text-sm text-[var(--cv-ink-subtle)]"
              style={{ animationDelay: "0.4s" }}
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
                  opacity="0.5"
                />
                <path
                  d="M4.5 7l1.8 1.8L9.5 5.5"
                  stroke="var(--cv-indigo)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {HERO.socialProof}
            </p>
          </div>

          {/* Right — browser mockup */}
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <BrowserMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

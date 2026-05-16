"use client";

import { useState } from "react";
import { PRICING } from "@/content/pricing";
import { cn } from "@/lib/cn";

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative py-24"
      style={{ backgroundColor: "var(--cv-paper)" }}
    >
      {/* Background orb */}
      <div
        className="animate-aurora-pulse pointer-events-none absolute bottom-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(107,76,255,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--cv-border)] bg-[var(--cv-glass)] px-4 py-1.5 backdrop-blur-sm">
            <span className="text-xs font-medium text-[var(--cv-ink-muted)]">
              Simple, transparent pricing
            </span>
          </div>
          <h2
            id="pricing-heading"
            className="text-4xl font-bold tracking-tight text-[var(--cv-ink)] sm:text-5xl"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontStyle: "italic",
            }}
          >
            Privacy that fits your budget
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[var(--cv-ink-muted)]">
            Start free. Upgrade when you need more sessions, browsers, or
            regions. No hidden fees.
          </p>

          {/* Billing toggle */}
          <div
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-[var(--cv-border)] bg-[var(--cv-glass)] p-1 backdrop-blur-sm"
            role="group"
            aria-label="Billing period"
          >
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cv-indigo)]",
                !annual
                  ? "bg-[var(--cv-indigo)] text-white shadow-sm"
                  : "text-[var(--cv-ink-muted)] hover:text-[var(--cv-ink)]"
              )}
              aria-pressed={!annual}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cv-indigo)]",
                annual
                  ? "bg-[var(--cv-indigo)] text-white shadow-sm"
                  : "text-[var(--cv-ink-muted)] hover:text-[var(--cv-ink)]"
              )}
              aria-pressed={annual}
            >
              Annual
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-semibold",
                  annual
                    ? "bg-white/20 text-white"
                    : "bg-[rgba(107,76,255,0.1)] text-[var(--cv-indigo)]"
                )}
              >
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PRICING.map((tier) => {
            const displayPrice =
              tier.priceMonthly === null
                ? "Custom"
                : annual && tier.priceAnnual !== null
                ? `$${tier.priceAnnual}`
                : `$${tier.priceMonthly}`;

            return (
              <div
                key={tier.id}
                className={cn(
                  "relative flex flex-col rounded-2xl p-8 transition-all duration-300",
                  tier.featured
                    ? "shadow-2xl"
                    : "border border-[var(--cv-border)]"
                )}
                style={
                  tier.featured
                    ? {
                        background: "var(--cv-paper)",
                        backgroundClip: "padding-box",
                        border: "2px solid transparent",
                        backgroundImage:
                          "linear-gradient(var(--cv-paper), var(--cv-paper)), linear-gradient(135deg, #6B4CFF, #E0479B)",
                        backgroundOrigin: "border-box",
                      }
                    : { background: "var(--cv-glass)", backdropFilter: "blur(8px)" }
                }
              >
                {/* Popular badge */}
                {tier.badge && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-semibold text-white shadow-md"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--cv-indigo), var(--cv-magenta))",
                    }}
                  >
                    {tier.badge}
                  </div>
                )}

                {/* Tier name */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[var(--cv-ink)]">
                    {tier.name}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--cv-ink-muted)]">
                    {tier.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span
                      className="text-4xl font-bold text-[var(--cv-ink)]"
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    >
                      {displayPrice}
                    </span>
                    {tier.priceMonthly !== null && tier.priceMonthly > 0 && (
                      <span className="mb-1 text-sm text-[var(--cv-ink-subtle)]">
                        /mo
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-[var(--cv-ink-subtle)]">
                    {annual && tier.priceAnnual !== null && tier.priceMonthly !== null && tier.priceMonthly > 0
                      ? `Billed $${tier.priceAnnual * 12}/year`
                      : tier.billingNote}
                  </p>
                </div>

                {/* Features list */}
                <ul className="mb-8 flex-1 space-y-3" role="list">
                  {tier.features.map((feature) => (
                    <li
                      key={feature.text}
                      className={cn(
                        "flex items-start gap-3 text-sm",
                        feature.included
                          ? "text-[var(--cv-ink-muted)]"
                          : "text-[var(--cv-ink-subtle)] line-through opacity-60"
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full",
                          feature.included
                            ? "bg-[rgba(107,76,255,0.12)]"
                            : "bg-[rgba(20,17,13,0.05)]"
                        )}
                        aria-hidden="true"
                      >
                        {feature.included ? (
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill="none"
                          >
                            <path
                              d="M1 4l2.2 2.2L7 1.5"
                              stroke="var(--cv-indigo)"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill="none"
                          >
                            <path
                              d="M1.5 1.5l5 5M6.5 1.5l-5 5"
                              stroke="var(--cv-ink-subtle)"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                      </span>
                      {feature.text}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={tier.ctaHref}
                  target={tier.ctaHref.startsWith("http") ? "_blank" : undefined}
                  rel={tier.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={cn(
                    "flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cv-indigo)] focus-visible:ring-offset-2",
                    tier.featured
                      ? "bg-[var(--cv-indigo)] text-white shadow-lg hover:opacity-90 hover:shadow-xl"
                      : "border border-[var(--cv-border)] bg-[var(--cv-glass)] text-[var(--cv-ink)] hover:border-[var(--cv-indigo)] hover:text-[var(--cv-indigo)]"
                  )}
                >
                  {tier.cta}
                </a>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="mt-10 text-center text-sm text-[var(--cv-ink-subtle)]">
          All plans include zero-log sessions, encrypted streaming, and GDPR-compliant data handling.
          <br />
          Prices in USD. VAT may apply.
        </p>
      </div>
    </section>
  );
}

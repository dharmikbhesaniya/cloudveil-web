"use client";

import { PLANS } from "@/lib/constants";
import { Check, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function PricingSection() {
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();
  const { ref: gridRef, isRevealed: gridRevealed } = useScrollReveal({ threshold: 0.05 });

  return (
    <section className="py-24" id="pricing" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`reveal-start mx-auto mb-16 max-w-2xl text-center ${headerRevealed ? "is-revealed" : ""}`}
        >
          <span className="cv-eyebrow mb-4 block">Pricing</span>
          <h2 className="font-bold">
            Pay for sessions. Not <span className="cv-display">surveillance</span>.
          </h2>
          <p className="text-muted-foreground mt-4 text-base sm:text-lg">
            Free to try. No credit card. Cancel any time — your plan stays active until the period
            ends.
          </p>
        </div>

        {/* Plans Grid */}
        <div ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan, i) => (
            <div
              key={plan.id}
              className={`reveal-start ${gridRevealed ? "is-revealed" : ""}`}
              style={{
                transitionDelay: `${i * 0.08}s`,
                background: "var(--cv-card-bg)",
                border: plan.popular
                  ? "2px solid var(--primary)"
                  : "1px solid var(--border)",
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                overflow: "visible",
                position: "relative",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                boxShadow: plan.popular
                  ? "0 8px 32px oklch(0.1 0.01 265 / 12%)"
                  : "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {plan.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--primary)",
                    color: "var(--primary-foreground)",
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "4px 16px",
                    borderRadius: "100px",
                    whiteSpace: "nowrap",
                    letterSpacing: "0.04em",
                  }}
                >
                  Most Popular
                </div>
              )}

              {/* Card header */}
              <div style={{ padding: "24px 24px 16px" }}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    margin: "0 0 6px",
                    color: "var(--foreground)",
                  }}
                >
                  {plan.name}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--muted-foreground)",
                    margin: "0 0 16px",
                    minHeight: "40px",
                    lineHeight: 1.5,
                  }}
                >
                  {plan.description}
                </p>

                {/* Price */}
                <div style={{ marginTop: "16px" }}>
                  {plan.price === 0 ? (
                    <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                      <span
                        style={{
                          fontSize: "36px",
                          fontWeight: 700,
                          color: "var(--foreground)",
                          lineHeight: 1,
                        }}
                      >
                        Free
                      </span>
                    </div>
                  ) : plan.price === -1 ? (
                    <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                      <span
                        style={{
                          fontSize: "36px",
                          fontWeight: 700,
                          color: "var(--foreground)",
                          lineHeight: 1,
                        }}
                      >
                        Custom
                      </span>
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "var(--muted-foreground)",
                          marginBottom: "2px",
                        }}
                      >
                        ₹
                      </span>
                      <span
                        style={{
                          fontSize: "36px",
                          fontWeight: 700,
                          color: "var(--foreground)",
                          lineHeight: 1,
                        }}
                      >
                        {plan.price}
                      </span>
                      <span style={{ fontSize: "14px", color: "var(--muted-foreground)" }}>
                        /{plan.interval}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card content */}
              <div
                style={{
                  padding: "0 24px 24px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    flex: 1,
                  }}
                >
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}
                    >
                      <Check
                        style={{
                          width: "16px",
                          height: "16px",
                          color: "var(--primary)",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "13px",
                          color: "var(--muted-foreground)",
                          lineHeight: 1.5,
                        }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={
                    plan.price === -1
                      ? "mailto:billing@intractify.com"
                      : "https://app.intractify.com/sign-up"
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "10px 18px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                    background: plan.popular ? "var(--primary)" : "transparent",
                    color: plan.popular ? "var(--primary-foreground)" : "var(--foreground)",
                    border: plan.popular ? "none" : "1px solid var(--border)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "0.85";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                  }}
                >
                  {plan.price === 0
                    ? "Get started free"
                    : plan.price === -1
                      ? "Contact us"
                      : "Subscribe"}
                  <ArrowRight style={{ width: "16px", height: "16px" }} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

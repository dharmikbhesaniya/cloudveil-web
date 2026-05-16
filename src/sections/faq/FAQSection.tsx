"use client";

import { useState } from "react";
import { FAQ } from "@/content/faq";
import { faqSchema } from "@/content/schema";

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative py-24"
      style={{ backgroundColor: "var(--cv-bg)" }}
    >
      {/* Inject FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema()) }}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--cv-border)] bg-[var(--cv-glass)] px-4 py-1.5 backdrop-blur-sm">
            <span className="text-xs font-medium text-[var(--cv-ink-muted)]">
              Got questions? We have answers.
            </span>
          </div>
          <h2
            id="faq-heading"
            className="text-4xl font-bold tracking-tight text-[var(--cv-ink)] sm:text-5xl"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontStyle: "italic",
            }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQ.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-2xl transition-all duration-200"
                style={{
                  border: isOpen
                    ? "1px solid rgba(107,76,255,0.25)"
                    : "1px solid var(--cv-border)",
                  background: isOpen
                    ? "rgba(107,76,255,0.03)"
                    : "var(--cv-glass)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <button
                  id={`faq-btn-${item.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  onClick={() => toggle(item.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cv-indigo)] focus-visible:ring-inset rounded-2xl"
                >
                  <span className="text-base font-medium text-[var(--cv-ink)]">
                    {item.question}
                  </span>
                  <span
                    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-all duration-200"
                    style={{
                      background: isOpen
                        ? "rgba(107,76,255,0.12)"
                        : "rgba(20,17,13,0.05)",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                    aria-hidden="true"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M7 2v10M2 7h10"
                        stroke={isOpen ? "var(--cv-indigo)" : "var(--cv-ink-muted)"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>

                {/* Answer panel */}
                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${item.id}`}
                  style={{
                    maxHeight: isOpen ? "400px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                  }}
                >
                  <p className="px-6 pb-5 text-sm leading-relaxed text-[var(--cv-ink-muted)]">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[var(--cv-ink-subtle)]">
            Still have questions?{" "}
            <a
              href="/contact"
              className="font-medium text-[var(--cv-indigo)] underline-offset-2 hover:underline"
            >
              Contact our support team →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

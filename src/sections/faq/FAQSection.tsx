"use client";

import { useState } from "react";
import { FAQ_DATA } from "@/lib/constants";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24" id="faq">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="cv-eyebrow mb-4 block">FAQ</span>
          <h2 className="font-bold">Honest answers.</h2>
          <p className="text-muted-foreground mt-4 text-base sm:text-lg">
            Common questions about the platform, privacy, and how sessions work.
          </p>
        </div>

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-button-${index}`;
            const panelId = `faq-panel-${index}`;
            return (
              <div
                key={index}
                style={{
                  background: isOpen ? "var(--cv-card-bg)" : "oklch(0.97 0.005 265 / 30%)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  transition: "background 0.25s",
                }}
                >
                  <button
                    id={buttonId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "20px 24px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "16px",
                    color: "var(--foreground)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: 1.5,
                    }}
                  >
                    {faq.question}
                  </span>
                  <span
                    style={{
                      flexShrink: 0,
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      color: "var(--muted-foreground)",
                      fontSize: "20px",
                      lineHeight: 1,
                    }}
                  >
                    +
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  style={{
                    maxHeight: isOpen ? "800px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <div
                    style={{
                      padding: "0 24px 20px",
                      fontSize: "13.5px",
                      lineHeight: 1.65,
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

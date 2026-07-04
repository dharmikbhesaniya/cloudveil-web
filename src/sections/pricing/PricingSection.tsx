"use client";

import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function PricingSection() {
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();
  const { ref: formRevealRef, isRevealed: formRevealed } = useScrollReveal({ threshold: 0.05 });

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <section className="py-24" id="pricing" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`reveal-start mx-auto mb-16 max-w-2xl text-center ${headerRevealed ? "is-revealed" : ""}`}
        >
          <span className="cv-eyebrow mb-4 block">Early Access</span>
          <h2 className="font-bold">
            Completely free at <span className="cv-display">launch</span>.
          </h2>
          <p className="text-muted-foreground mt-4 text-base sm:text-lg">
            We are building the ultimate privacy browser in the cloud. Join the private beta today — all features will be completely free for early adopters.
          </p>
        </div>

        {/* Waitlist Form Section */}
        <div
          ref={formRevealRef}
          className={`reveal-start mx-auto max-w-xl ${formRevealed ? "is-revealed" : ""}`}
          style={{
            background: "var(--glass-bg)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "32px 24px",
            boxShadow: "0 8px 32px oklch(0.1 0.01 265 / 6%)",
            position: "relative",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 600, color: "var(--foreground)", margin: "0 0 8px" }}>
              Join the Priority Waitlist
            </h3>
            <p style={{ fontSize: "13px", color: "var(--muted-foreground)", margin: 0, lineHeight: 1.5 }}>
              Enter your email to secure early access. We activate slots on a rolling basis.
            </p>
          </div>

          {status === "success" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "16px 0",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "oklch(0.85 0.15 140 / 15%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                  color: "oklch(0.45 0.15 140)",
                }}
              >
                <Check style={{ width: "20px", height: "20px" }} />
              </div>
              <h4 style={{ fontSize: "16px", fontWeight: 600, color: "var(--foreground)", margin: "0 0 6px" }}>
                You&apos;re on the list!
              </h4>
              <p style={{ fontSize: "13px", color: "var(--muted-foreground)", maxWidth: "340px", margin: 0, lineHeight: 1.5 }}>
                We&apos;ve reserved your spot. We will email you once your early access invite is ready.
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setEmail("");
                }}
                style={{
                  marginTop: "20px",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "var(--primary)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Register another email
              </button>
            </div>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const trimmedEmail = email.trim();
                if (!trimmedEmail) return;

                setStatus("submitting");
                setErrorMessage("");

                let tracking = {};
                let visitorId = null;
                let sessionId = null;
                try {
                  const trackingStr = localStorage.getItem("intractify_attribution");
                  if (trackingStr) {
                    tracking = JSON.parse(trackingStr);
                  }
                  visitorId = localStorage.getItem("intractify_visitor_id");
                  sessionId = sessionStorage.getItem("intractify_session_id");
                } catch (err) {
                  console.error("Attribution fetch failed inside waitlist submit:", err);
                }

                try {
                  const res = await fetch("/api/waitlist", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      email: trimmedEmail,
                      plan: "free",
                      ...tracking,
                      visitor_id: visitorId,
                      session_id: sessionId,
                    }),
                  });

                  const data = await res.json();
                  if (!res.ok) {
                    throw new Error(data.error || "Failed to join waitlist.");
                  }

                  setStatus("success");
                } catch (err: unknown) {
                  setStatus("error");
                  const errMsg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
                  setErrorMessage(errMsg);
                }
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              {/* Email input */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label
                  htmlFor="waitlist-email"
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "var(--muted-foreground)",
                  }}
                >
                  Email Address
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "6px",
                    border: "1px solid var(--border)",
                    background: "var(--card)",
                    color: "var(--foreground)",
                    fontSize: "13px",
                    outline: "none",
                  }}
                />
              </div>

              {/* Error display */}
              {status === "error" && (
                <div
                  style={{
                    fontSize: "12px",
                    color: "#D93F3F",
                    background: "rgba(217, 63, 63, 0.08)",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    border: "1px solid rgba(217, 63, 63, 0.16)",
                  }}
                >
                  {errorMessage}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === "submitting"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px 18px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: status === "submitting" ? "not-allowed" : "pointer",
                  transition: "opacity 0.2s",
                  background: "var(--primary)",
                  color: "var(--primary-foreground)",
                  border: "none",
                  width: "100%",
                  marginTop: "6px",
                }}
                onMouseEnter={(e) => {
                  if (status !== "submitting") {
                    (e.currentTarget as HTMLElement).style.opacity = "0.9";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                }}
              >
                {status === "submitting" ? "Registering spot..." : "Join Priority Waitlist"}
                <ArrowRight style={{ width: "16px", height: "16px" }} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

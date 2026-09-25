"use client";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { MediaSlot } from "@/components/common/MediaSlot";

/**
 * DemoVideo — 90-second "watch a session disappear" proof, placed immediately
 * below the hero so a visitor is converted into a waitlist sign-up before
 * reaching the feature list. Real screen recording pending; the glass slot
 * holds the position (see VISUAL_CONTENT_PLACEMENT_PLAN.md).
 */
export function DemoVideoSection() {
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();
  const { ref: videoRef, isRevealed: videoRevealed } = useScrollReveal({
    threshold: 0.05,
  });

  return (
    <section
      style={{
        padding: "0 0 96px",
        borderBottom: "1px solid var(--border)",
      }}
      id="demo"
    >
      <div
        className="mx-auto max-w-7xl"
        style={{ padding: "0 clamp(24px, 5vw, 40px)" }}
      >
        <div
          ref={headerRef}
          className={`reveal-start mx-auto max-w-2xl text-center ${
            headerRevealed ? "is-revealed" : ""
          }`}
        >
          <div
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
              marginBottom: "18px",
            }}
          >
            — The 60-second proof
          </div>
          <h2
            style={{
              fontFamily: "var(--font-sans, ui-sans-serif, sans-serif)",
              fontWeight: 500,
              fontSize: "clamp(32px, 4vw, 52px)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              margin: "0 0 16px",
              color: "var(--foreground)",
            }}
          >
            Watch a session{" "}
            <span
              style={{
                fontFamily:
                  "var(--font-display, 'Instrument Serif', Georgia, serif)",
                fontWeight: 400,
                color: "var(--primary)",
              }}
              className="cv-underline"
            >
              disappear
            </span>
            .
          </h2>
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.55,
              color: "var(--muted-foreground)",
              margin: "0 0 32px",
              fontFamily: "var(--font-sans)",
            }}
          >
            One click. A fresh browser in the cloud. End the session — the
            container is destroyed, nothing survives on your device. This is
            the whole product, on film.
          </p>
        </div>

        <div
          ref={videoRef}
          className={`reveal-start ${videoRevealed ? "is-revealed" : ""}`}
          style={{ maxWidth: "1040px", marginInline: "auto" }}
        >
          <div className="cv-paper-band" style={{ padding: "10px" }}>
          <MediaSlot
            type="video"
            aspect="16/9"
            label="Watch launch → browse → vanish"
            hint="~60 s muted screen recording of a real session · poster frame · play on click"
          />
          </div>
          <div
            style={{
              marginTop: "12px",
              textAlign: "center",
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "10.5px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
            }}
          >
            <span
              className="animate-pulse-dot"
              style={{
                display: "inline-block",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#4B5C3A",
                marginRight: "8px",
                verticalAlign: "middle",
              }}
            />
            Real session · recorded on a live container
            <span
              className="cv-wave"
              aria-hidden="true"
              style={{ marginLeft: "10px", verticalAlign: "middle", color: "var(--primary)" }}
            >
              <span /><span /><span /><span /><span /><span /><span />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
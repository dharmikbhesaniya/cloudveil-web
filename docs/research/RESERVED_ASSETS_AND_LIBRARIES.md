# Reserved Assets & Libraries — "The Letter"

> Status: **PENDING** — nothing in this file is shipped yet. These are the
> spaces we reserved on the page in code (2026-09-25) while we wait for real
> assets. Replace the placeholders, not the structure. Commit anything you add
> here back into this file so the reservation stays honest.

The whole site update ran **CSS-only, zero new npm dependencies**. Everything
visible was achieved with tokens, `@keyframes`, and class utilities in
`src/app/globals.css` plus small section edits. No animation library was
required. The list below is the shopping list for when we're ready to go
raster/video.

---

## 1. Animation library — recommendation: none (yet)

| Decision | Detail |
|---|---|
| **Verdict** | Keep zero-dep. All scroll reveals already run on `IntersectionObserver` (`src/hooks/use-scroll-reveal.ts`); all hover/scrub/wave motion is pure CSS. |
| **If we ever need** | `framer-motion` (Motion) — but only for the optional sticky How-It-Works + drag interaction on the comparison section, or a route-transition overlay. It is not needed for anything currently on the page. |
| **Do NOT add** | GSAP, Lenis, or a scroll-jacking lib for this landing page — the reveal cadence would fight them and they add bundle weight for no visible gain. |
| **Poster-frame ask** | For the two `<video>` slots we need a **poster frame** (a real screenshot of the in-cloud Chrome session) so the play button has honest art before the video loads. |

## 2. Media/washes (they're all honest-or-empty today)

### 2.1 Real session screen recording — the demo slot

| Slot | Component | Aspect | Spec |
|---|---|---|---|
| Hero-to-features proof | `DemoVideoSection.tsx` (`#demo`) | 16/9 | ~60 s muted screen recording: launch → browse → *end session* → container destroyed. Play on click. |

The second slot (the 16/6.5 "Click → browse → vanished" strip in
`HowItWorksSection.tsx`) was **removed 2026-09-25** at the user's request — the
page now has exactly one video slot. What's listed above is the currently-live
`cv-paper-band` + glass `MediaSlot` placeholder. Recording recipe: real session
on **our** infra, cap 1080p, no credentials or personal data visible, cut at
exact "nothing survives" beat.

### 2.2 CTA "dematerialize" wash

| Slot | Component | Spec |
|---|---|---|
| CTA text backdrop | `CTASection.tsx` (absolute, opacity 0.35) | Looping ~3 s smoke/dusk clip **or** a duotone photo at 5–8 % opacity behind the headline. |

Currently a `MediaSlot type="wash"`. The `cv-wave` bars we added under the demo
caption are the audio-reactive *intent* — if we ship a real recording with
audio-reactive visuals, replace them with the real waveform element (or keep
both as a decorative accent).

### 2.3 Photo slots (already glass-reserved from `VISUAL_CONTENT_PLACEMENT_PLAN.md`)

- Stats band "21h life to date" — place only when the number is real.
- Founder portrait in PullQuote — real person, real quote, or skip.

## 3. What MVP content never goes on the page

- **Fake logos / fake "as seen on" walls** — there is no press; a logo marquee
  is contradicted by `TrustSignals.tsx`, which only ships honest claims.
- **Fake testimonials** — the PullQuote slot stays glass until a real founder
  /beta user quote exists.
- **Screenshots of a UI that doesn't exist** — the feature diagrams are
  stroke-only schematics on purpose; never replace them with mock dashboard
  renders.

## 4. Space reservations implemented in code (2026-09-25)

| Reservation | CSS / component | Notes |
|---|---|---|
| Underline word-scrub on serif accent words | `.cv-underline` (draws when parent `.is-revealed`, or `.is-on` for static) | Applied to: Features "isolation", Audience "paranoid", HowItWorks "disposable", Demo "disappear", Pricing "launch", FAQ "answers". |
| Mono section stamp | `.cv-stamp` | Replaced `cv-eyebrow` in Audience / HowItWorks / Pricing / FAQ. Stays mono index above copy (paper.design / indianic pattern). |
| Unified action radius | `--radius-action: 0.625rem` | `.btn-ink`, Pricing submit, (inputs 8 px). Anything clickable == pill-ish 10 px; panels keep their larger radius. |
| Paper band around media | `.cv-paper-band` / `.cv-paper-band-inner` | Frames both demo media slots (rescript dark-canvas + paper-card pattern, kept in our cream palette). |
| Card hover: lift + icon inversion | `.hover-lift` + `.cv-hover-card` / `.cv-card-icon` | Audience + How-It-Works cards: icon chip flips to primary indigo on hover (indianic molecule pattern). |
| Audio-wave pulses (reserved) | `.cv-wave` + `@keyframes wave-bars` | Placed under the demo caption as a reserved live-mock accent. Reduced-motion: frozen at 0.6 scale. |
| Button sweep shine | `.btn-shimmer-wrap` | Added to Pricing waitlist submit; `btn-ink` already swept. |
| Feather/section joins | `.cv-section-tint` gradient bands | Kept as-is (HowItWorks band); not elevated to full hero-blend because our palette is a single cream family. |
| Primary-font swap (DEFERRED) | Geist Sans → **Instrument Sans** | User doesn't love Geist Sans. Recommended 2026-09-25: Instrument Sans (same foundry family as our Instrument Serif display face — designed companion, Google Fonts). Acceptable alternatives: Bricolage Grotesque, Hanken Grotesk, Manrope. *Decided to defer; do not swap yet.* Only note here in case it comes back: swap the `--font-sans` face in `layout.tsx`, update the `font-family` fallback chain, and re-check `Navbar`/body mono usage. |

All motion honours `prefers-reduced-motion` (see the reduced-motion block in
`globals.css`).

## 5. Definition of done

1. One real recording + poster frame lands in `public/`.
2. `MediaSlot` in `DemoVideoSection` swapped to `<video>`.
3. If we ever add Motion: gate it behind reduced-motion and lazy-load the
   module.
4. Update this file + `SESSION_LOG` + `VISUAL_CONTENT_PLACEMENT_PLAN` in one
   commit so the reservation story stays coherent.
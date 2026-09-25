# Intractify Landing — Improvement & Implementation Plan

> What we adopt from `docs/research/COMPETITIVE_REFERENCE_RD.md`
> (paper.design · indianic.com · wisprflow.ai) adapted to our cream/ink/burgundy
> design lock, pre-launch honesty constraints, and Next.js 15.5 / Tailwind v4
> stack. Companion to the R&D doc. **Date:** 2026-09-25.
>
> Scope discipline: items are labeled **adopt** (do now), **pilot** (do when
> the behind-item exists), **skip** (resist — breaks honesty or brand). None of
> these touch `app/` or `backend/`; `web/` is a standalone showcase.

---

## 0. Current state (baseline — where we are today)

- Sections committed on `develop`: Hero → DemoVideoSection → TrustSignals →
  Features → Audience → CaseStudy(eventual) → HowItWorks → Stats → PullQuote →
  Pricing → CTA → Footer. (See `docs/reviews/COMPONENTS_WALKTHROUGH.md`.)
- Type: Instrument Serif (normal weight only, by design) + Geist + mono
  (JetBrains Mono). Cream `#F4EFE3` paper-fill base with defined fills/secondary
  fills; ink buttons; burgundy `#6F2530` + indigo `#1F2C58` accents.
- Motion currently: hover scale/lift + CSS reveals; **no scroll-choreography,
  no sticky sections, no word-scrub headers, no counters.**
- Hero: honest "LIVE SESSION — app.intractify.com" caption with a panel mock
  (no fake product screenshots).
- DemoVideoSection: 16:9 "The 60-second proof" glass slot (poster + muted).
- TrustSignals / Features / Audience / Pricing all use inline SVG schematics or
  line-art — never real infrastructure images. Good. No logo walls (per
  brand constraint).
- Files: `src/app/page.tsx`, `src/components/common/MediaSlot.tsx`,
  `src/sections/*`.

---

## 1. Typography — "two-font rhythm" (adopt, partially existing)

**Do now**
- Strengthen the **sans-display + serif-accent contrast** without adding italics
  (IS is normal-only by lock): use Instrument Serif at larger sizes/scale for
  the *accent word* already done in Hero; extend the same trick to section
  headers (Features, HowItWorks, Pricing) — one serifed word per H2 in our
  sizes, in ink (`#15161A`) or burgundy for the accent word only.
- Introduce a **mono "stamp" line** at the top of each section (e.g.
  `INTRA.` + `HOT-PUCK`/`robes/`-style placeholder, `Sec 03`) mirroring
  IndiaNIC's stamp headers and paper's mono bylines. Detail: `select-none`,
  tracking-wide, 8–10px, `#15161A/55` (soft stamp, not loud label).

**Skip**
- Converting body to two unrelated font pairs — our Geist+Serif+mono triad
  already satisfies "two-font system"; don't add a fourth family.

---

## 2. Component "paper" fills & drawn look (adopt lightly)

**Do now**
- Bring back a **single-material sheet discipline** like paper.design: prefer
  the existing secondary-fill bands over introducing more band colors.
- Give small, repeated **paper-card/** component tiles a visible "written
  corner": subtle 1px `#15161A/10` border + 6–10px radius + the monogram/"HOT"
  SS mark already used in Features — cheap, not fake.
- Normalize **CTA pill shaping** across the page: audit every `border-radius`
  on buttons so *all* primary/secondary actions share one radius token
  (~10px), gently rounded, not the current sharp 2px. This is the user-called
  "smooth non-sharp CTA shape" from IndiaNIC.

**Pilot (only when the product exists)**
- Replace the DemoVideoSection poster with an **in-page live transcript mock**
  (wispr-style "clean-up-typo demo") once a real session stream is demoable;
  until then keep the poster — never fake the stream.

**Skip**
- Making our whole hero look like a written letter on paper — our cream fill +
  text + panel already reads as a sheet; adding paper grain/scribbles is the
  kind of pretend-craft that doesn't match a security brand.

---

## 3. Content placement & spacing (adopt)

**Do now**
- **Mono stamp headers** (item 1) → gives every section a paper.design /
  IndiaNIC-style "document node" that we currently lack.
- **Keep numbered methodology:** we already number Features (`i. .. vi.`) and
  HowItWorks (`01–04`); formalize each numbered tile's hover state so numbers
  read as a methodology, not decoration.
- **Repeatable card molecule:** our `Card` / `FeatureDiagram` components are
  already the molecule; make sure Audience cards (`Code2`/`Lock`/`Search`/
  `Wallet`) and Pricing cards share padding/radius tokens the same way
  IndiaNIC's product tiles do.
- **Empty-space discipline:** run a spacing pass on section vertical rhythm
  (aim consistent 48–100px section padding, 24px tile gutters) so no CTA dead
  zone and no cramming appears — audit `SECTION_GAP` style tokens in
  `globals.css`.

---

## 4. Motion & scroll (adopt a subset, honest version)

**Adopt now (CSS/ease only, no scroll-jacking)**
1. **Hover lift with cache-friendly transforms** on Cards/Audience/Pricing:
   `translateY(-4px)` + stronger shadow + icon accent on the hover target
   (casefold `will-change: transform`), matching IndiaNIC's motion.
2. **Word-scrub headers** (wispr) implemented as a *small* CSS-only underline
   reveal on the H2 accent word during scroll-into-view (we can build this with
   `animation-timeline: view()` in Tailwind v4 / CSS `@keyframes`), keeping
   `prefers-reduced-motion` guards.
3. **Counters bound to a comparison** (Wispr 45→220 wpm): our Stats section
   should animate numbers **into an honest baseline** (e.g. `"Typical cloud
   VNC ~45 fps vs our < 120ms gate"`) — but only if the number is real; else
   keep static. Mark this **pilot** until backend latency is measured.
4. **Scroll-time section keynote:** keep the already-shipped reveals; add a
   subtle clip-path/page-flip on the section header entrance — a paper-like
   edge — as a signature motif (this is our own translation of the paper
   theme, SKIP the IndiaNIC logo mega-menu entirely — desktop has no needed
   mega-menu).

**Pilot (label experimental, honor reduced-motion)**
- **Sticky "How it works"** (wispr 3.2): pin the 4-step card column on the
  left while a scroll panel walks steps on the right. This is the biggest
  behavioral add; implement only with `prefers-reduced-motion: reduce` fully
  static fallback, and visually labeled `[scroll]` affordance.
- **Panel re-animation on tab/step change** in HowItWorks: re-trigger the
  step diagram animation per active step (pure state-key remount, no deps).

**Skip**
- Cinematic full-bleed background crossfades per scroll position (loses our
  clean sheet, adds LCP cost).
- Hero transcript scramble animation until we have a real session mock.
- Any scroll-jacking / velocity bias — banned for a "hardened" brand.

---

## 5. Credibility & social proof (align with honesty constraints)

**Do now / keep**
- Keep the **"LIVE SESSION — app.intractify.com"** caption in the hero — this
  is our wispr-style "proof in the hero" but honest: it attests to our own
  running platform, not fiction.
- Expand **PullQuote / CaseStudy section** only when a real customer exists;
  until then the section's honest placeholder text ("early access") stays the
  correct posture.

**Skip (until marketing reality)**
- Press/logo walls, testimonial avatars, SOC2/HIPAA badge strips, "27 years"
  style doctrine — borrowed genre straight out of IndiaNIC/Wispr and forbidden
  by our pre-launch honesty rule.

---

## 6. Concrete to-do list (gating order)

| # | Action | Type | File(s) |
|---|---|---|---|
| 1 | Unify CTA radius across all buttons to one ~10px token | adopt | `globals.css` tokens + `src/components/ui/*`, section buttons |
| 2 | Add mono stamp header to each section | adopt | `src/sections/**` (Hero, Features, Audience, HowItWorks, Stats, Pricing, CTA, Footer) |
| 3 | Serif-accent-word treatment on all H2s | adopt | section headers + `page.tsx` copy |
| 4 | Numbered-tile hover state + same molecule padding audit | adopt | `src/components/**`, section CSS |
| 5 | Word-scrub underline reveal on H2 accents (view() animation + reduced-motion guard) | adopt | `globals.css` + headers |
| 6 | Stats counters — implement only if number is real | pilot | `src/sections/stats` |
| 7 | Sticky scroll "How it works" walk (static fallback) | pilot | `src/sections/how-it-works` |
| 8 | Re-animate step diagram on step change | pilot | `src/sections/how-it-works`, `FeatureDiagram` |
| 9 | Paper-style clip-path on section slider reveal | adopt | `src/sections/**` headers |
| 10 | Data-driven counter latency (needs backend measurement) | pilot | beyond web; signpost doc |

Legend: **adopt** = safe now · **pilot** = do when the underlying product/measure exists · **skip** = don't.

---

## 7. Rejected explicitly (recorded for future reviewers)

- Borrowing logo walls / press badges / fake testimonials — conflicts with
  PRODUCT.md honesty stance and the open `press` limitation.
- Italic serif accents — conflicts with the intentional `font-style: normal`
  Instrument Serif lock (`docs/reviews/WEB_FULL_REVIEW.md`).
- Cinematic per-scroll background crossfades — LCP + off-brand.
- Adding a fourth typeface family — a serif+sans+mono lock is enough.
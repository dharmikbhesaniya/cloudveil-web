# Visual Content Placement Plan — Intractify Landing Page

> The page currently has **zero photographic/video media**: every section is
> typography + CSS motion. This plan places real visuals (product screenshots,
> demo video, editorial photography, technical SVG schematics) without breaking
> the editorial, "luxury publication" tone the page is known for (see
> `docs/solved/Intractify_Landing_Page_Full_Verdict.md`, score 9.4/10).
>
> **Date:** 2026-09-24 · **Status:** PARTIALLY IMPLEMENTED — Phase 1 (inline
> SVG schematics + glass media slots) landed 2026-09-24; raster/video assets
> still pending.
> Scope: `web/` only.

---

## 0. Ground rules (design lock)

Keep unchanged while adding media:

1. **Palette:** cream bg (`#F4EFE3` family), ink `#15161A`, accent burgundy
   `#6F2530`, primary indigo `#1F2C58`. No gradients, no candy colors, no
   drop-shadow-heavy UI chrome.
2. **Type roles:** serif display for emphasis (`.cv-em` / Instrument Serif),
   mono for technical stamps/labels, sans for body. Media captions use mono.
3. **Honesty:** the product is **pre-launch**. Show only real product surfaces
   (the dashboard/live-session UI from `app/`, or the hero's honest session
   mockup). **Never** fabricate screenshots of features that don't exist
   (anti-fingerprinting toggles, pricing, billing).
4. **Motion hygiene:** keep `prefers-reduced-motion` support; videos autoplay
   muted + loop or play-on-click; no autoplay sound. Maintain a still poster
   frame for every video.
5. **Performance:** all raster media via `next/image` (AVIF/WebP), lazy +
   priority-aware; videos ≤ 3–4 MB, streamed `.webm`/`.mp4(H.264)`; lazy
   IntersectionObserver mount. Target Lighthouse ≥ 90 perf / ≥ 95 LCP-free.

---

## 1. Placement map (section by section)

Sections run top-to-bottom as in `src/app/page.tsx`.

### 1.1 Hero — `src/sections/hero/HeroSection.tsx` (existing browser mock)
**What's here:** animated session mockup (boot → stream → active → destroyed)
that already sells the product. Good. Don't replace — augment.

**Add (priority HIGH):**
- **Ambient editorial backdrop:** a faint, large-scale SVG "privacy schematic"
  (radar rings / dashed container outline / node graph in `--primary` at 4–6%
  opacity) behind the right-hand mockup column. Pure `currentColor` stroke, no
  fills. This is the "tactility over decoration" idea from the Immersive
  Experience concepts doc (concepts #7 radar, #11 cleanroom).
- **Product proof chip:** small framed still `next/image` of a real session
  inside the URL bar area is **not** appropriate; instead add a thin
  "LIVE SESSION — app.intractify.com" mono caption under the mockup that links
  to the app dashboard screenshot gallery (§1.7). Low cost, high trust.
- Optional: a **1-second macro video** of the hero mockup itself (boot->destroy)
  as background on the right column, autoplay muted loop, when
  `prefers-reduced-motion` is off. Keep the existing DOM mock as poster cover.

### 1.2 TrustSignals — `src/sections/trust/TrustSignals.tsx`
**What's here:** 4 text pillars + honesty strip. No logos.

**Add (priority LOW — do not fake press):**
- **Real "as featured in" strip:** only if real press exists. Today the parent
  repo's `lis.todo` shows press mentions are **not validated**; the review
  flagged TrustSignals logos as placeholder. Recommended: **do not add logo
  wall.** Instead add a small inline diagram: a 4-tile "privacy shield" SVG
  (mono stroke, one accent) behind each pillar label. Subtle, honest.

### 1.3 Features — `src/sections/features/FeaturesSection.tsx`
**What's here:** index list rows i.–vi. + lifecycle bar. Textual.

**Add (priority HIGH):**
- **Micro-diagrams per row** — small SVG "schematic" thumbnails aligned left of
  each numbered row (matches existing 3-column grid; row 1 of 3 is num/title).
  Suggested 6 diagrams (stroke-only, `--primary` + `--muted-foreground`):
  - i. *Container isolation* — two boxes, non-overlapping.
  - ii. *Isolated from device* — laptop icon + cloud box, dashed boundary.
  - iii. *Ephemeral* — cookie glyph → ∅.
  - iv. *Fresh container* — refresh circle + browser tile.
  - v. *Cloud egress* — arrow out of cloud, X on home router.
  - vi. *Auto-terminate* — lifecycle arc ending in ∅ (mirrors `LIFECYCLE`).
- These replace nothing; they sit in the empty middle/right of each row and
  animate in with the row reveal. Hydration cost ~0 (inline SVG).

### 1.4 Comparison — `src/sections/comparison/ComparisonSection.tsx`
**What's here:** the richest visual already — sticky stepper + split
`VisualMockup` (dark VPN half vs. ivory Intractify half) that morphs per step.

**Add (priority MEDIUM):**
- **Split-screen product stills:** replace/overlay the text-only halves with a
  framed `next/image` on the Intractify side showing the actual session UI for
  the active step (e.g., step 0 shows the "container destroyed" dashboard
  state). Fallback to existing mock text if no real capture exists yet.
- **Scroll-linked "packet sandbox" micro-video** (§1.8 video 2) could replace
  the right sticky mock on one step — optional A/B.

### 1.5 How It Works — `src/sections/how-it-works/HowItWorksSection.tsx`
**What's here:** 4 cards with lucide icons + connector line.

**Add (priority HIGH):**
- **Video #1 — "Click → browse → vanished" (very short, ~6s loop):** a real
  screen recording of the app: launch session → a few clicks → end → container
  cleared. Place **horizontally between steps 2 and 3** or as a **full-width
  strip under the 4 cards** with play-on-hover (muted, poster frame). This is
  the single highest-converting visual for a product like this.
- Keep Icons; add **photo texture to the connector line** (subtle dash → is
  already dashed; fine).

### 1.6 Stats — `src/sections/stats/Stats.tsx`
**What's here:** 4 numbered stats (placeholder-safe numbers) + serif closer.

**Add (priority MEDIUM):**
- A **single wide editorial photograph** above the 4-col stat grid (aspect
  21:9, muted duotone graded to palette, e.g., a fog/empty-room/industrial
  motif) used as a quiet visual break. All stats already animate; photo
  provides the "screenful of white" the review wanted changed.
- Keep stats honest: do **not** turn these into inflated photo claims.

### 1.7 PullQuote — `src/sections/pullquote/PullQuote.tsx`
**What's here:** big serif quote + founder attribution, decorative `"`.

**Add (priority MEDIUM):**
- **Founder portrait** (small, circular, duotone-inked to match palette) beside
  the attribution line. Humanizes the founder-voice copy ("— Dharmik").
- Optional: subtle paper-grain SVG overlay for texture (very low opacity).

### 1.8 Audience — `src/sections/audience/AudienceSection.tsx`
**What's here:** 4 audience cards, icons, text.

**Add (priority LOW):**
- **Avatar/use-case photo** strip per card: small mono-styled thumbnail
  (28–32px) — e.g., code window (dev), lock (sec teams), magnifier (journalist),
  wallet (crypto). Use lucide + duotone tint; no external imagery needed.
  Keep editorial; do not cartoon.

### 1.9 Pricing — `src/sections/pricing/PricingSection.tsx`
**What's here:** honest waitlist card ("completely free at launch"), form.

**Add (priority LOW):**
- **Privacy-policy line-art accent** behind the form (seal SVG at 5% opacity)
  reinforces trust. No product/pricing mockups (pre-launch honesty).

### 1.10 FAQ — `src/sections/faq/FAQSection.tsx`
**What's here:** accordion.

**Add (priority LOW):**
- Keep text-only. Optionally a small **"compare" line-art** at the section top
  tying to §1.4 (no new assets).

### 1.11 CTA — `src/sections/cta/CTASection.tsx`
**What's here:** "Disappear when done." + waitlist button.

**Add (priority MEDIUM):**
- **Full-width background editorial photo** (duotone ink, 5–8% opacity, behind
  text only) or a **looping 3s "dematerialize" clip** (smoke/dust) as a wash.
  Rationale: closes the page on the same "lived in once, demolished as you
  leave" note. Must stay quiet; keep contrast for the headline.

### 1.12 Navbar / Footer
**Add (priority LOW when brand asset ready):** `public/brand/intractify-logo.png`
exists. Swap the text wordmark in `Navbar.tsx`/`Footer.tsx` for a constrained
`next/image` of the mark ONLY if it reads well at 26–36px; otherwise keep text.
Also reuse the mark in `logo.png`/`og-image.png` routes once the design system
lands (see §2).

---

## 2. Cross-cutting additions

- **`react.next/image` poster + gallery page:** create
  `src/app/product/page.tsx` (`/product` or `/gallery`) hosting 3–5 framed
  product screenshots copied honestly from the app dashboard. Navbar link
  "Product" → gallery. Every section can then reference these stills without
  duplicating blobs. (Alternative: place stills under `public/screenshots/`.)
- **`og-image` / `logo`:** once the brand asset is approved at small sizes,
  switch `logo.png/route.ts` to serve `public/brand/intractify-logo.png`
  (via `next/image` static import) instead of the programmatic "I" monogram;
  keep `og-image` as curated 1200×630 with the real screenshot + mark.

---

## 3. Asset recipes (format & size)

| Slot            | Type      | Format             | Max size / dims            | Loading           |
|-----------------|-----------|--------------------|----------------------------|-------------------|
| Product stills  | raster    | WebP/AVIF           | 1600px×1000px, ~150–250 KB | lazy (below fold) |
| Hero backdrop   | vector    | inline SVG          | < 2 KB                     | instant           |
| Feature diagrams| vector    | inline SVG          | < 1.5 KB each              | instant           |
| HowItWorks video| video     | webm(+mp4 fallback) | ≤ 8 s, ≤ 4 MB, 1280×720    | IO-triggered      |
| CTA wash video  | video     | webm                | ≤ 3 s, ≤ 2 MB              | IO-triggered      |
| Stats photo     | raster    | WebP                | 2000px×520px, ~180 KB      | lazy               |
| Founder portrait| raster    | WebP                | 160px×160px, ~20 KB        | lazy               |

All raster via `next/image` (`fill`/`sizes`), `priority` on hero only.
SVG colour tokens: `var(--primary)`, `var(--foreground)`,
`var(--muted-foreground)`; stroke-width 1.5; no fills except `--cv-card-bg`.

---

## 3.5 Implementation status (2026-09-24)

Built and shipped in the working tree (Phase 1):

| Section | What's in place | Status |
|---|---|---|
| Hero | Ambient privacy SVG behind the mock (radar rings, dashed container, node graph, `--primary` @ 7%) + mono "LIVE SESSION — app.intractify.com" caption under the step tabs | ✅ SVG + caption |
| Demo video (NEW) | Dedicated `DemoVideoSection` ("The 60-second proof") between Hero and TrustSignals — glass 16/9 slot "Watch launch → browse → vanish" + mono caption. Highest-conversion position, below the fold line split. | ⏳ glass slot |
| TrustSignals | Inline shield+check SVG (15px, `--primary`) next to each pillar label | ✅ SVG |
| Features | `FeatureDiagram` — 6 stroke-only SVGs (viewBox 48) per row: isolation boxes, laptop+cloud, cookie→∅, refresh+window, cloud+arrow+router, lifecycle arc→∅ | ✅ SVG |
| HowItWorks | Full-width `MediaSlot` video placeholder under the 4 cards ("Click → browse → vanished", aspect 16/6.5) | ⏳ glass slot |
| Stats | `MediaSlot` image placeholder above the stat grid (aspect 21/7, "Wide editorial photograph") | ⏳ glass slot |
| PullQuote | Circular `MediaSlot` portrait placeholder (56px) beside the founder attribution | ⏳ glass slot |
| Audience | Duotone icon chips added per card (Code2 / Lock / Search / Wallet, 40px `--cv-bg-deep` tile) | ✅ SVG icons |
| Pricing | Trust-seal line-art (viewBox 120, shield+check+rings, 5% opacity, bottom-right of form card) | ✅ SVG |
| CTA | Full-width `MediaSlot` wash behind the headline (aspect 21/8, wrapper opacity 0.35) | ⏳ glass slot |

**Glass placeholder component:** `src/components/common/MediaSlot.tsx` — one
component, four variants (`image | video | portrait | wash`); renders a
`--glass-bg` + dashed `--glass-border` card with mono "IMAGE SLOT / VIDEO SLOT
/ PORTRAIT SLOT / MEDIA WASH" label + a reminder line naming the exact asset to
add. Swap it out for the real `next/image` / `<video>` when each asset exists.

**Demo section (NEW, 2026-09-24):** `src/sections/demo/DemoVideoSection.tsx` sits
between Hero and TrustSignals — the highest-conversion position, a 16/9 glass
slot ("Watch launch → browse → vanish") with its own heading "Watch a session
disappear." and pulse-dot caption. Placing a product demo here helps push
sign-ups; the section uses `MediaSlot` so replacing it with a real `<video>`
(muted, poster frame, play-on-click per the motion-hygiene rule) is a two-line
swap.

**Remaining (needs real media):** demo video (highest priority — it sits above
the fold split), `/product` gallery page + framed screen stills; HowItWorks
screen recording; CTA wash clip/photo; Stats editorial photograph; founder
portrait; `logo.png`/`og-image.png` brand-asset swap.

---

## 4. Phasing (effort-ordered)

- **Phase 1 (unicorn effort < 1 day):** inline SVG schematics — hero backdrop,
  all 6 feature diagrams, audience thumbnails, pricing seal. Zero new
  dependencies, honors existing motion.
- **Phase 2 (med; needs app screenshots):** `/product` gallery + framed stills
  → HowItWorks video strip → hero caption link.
- **Phase 3 (content production):** CTA wash video, Stats photo, founder
  portrait, logo/og-image swap.
- **Phase 4 (validation):** Lighthouse + reduced-motion + mobile pass; A/B the
  Comparison video step if desired.

---

## 5. Do-not list

- ❌ No cartoon illustrations/videogame assets.
- ❌ No fake dashboard screenshots for unimplemented features.
- ❌ No logo wall until press mentions are validated (parent `lis.todo`).
- ❌ No cookie-consent/banner visuals (marketing uses storage, per privacy doc).
- ❌ No autoplay-with-sound; no video heavier than §3 budget.
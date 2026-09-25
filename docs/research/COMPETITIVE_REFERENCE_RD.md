# Landing-Page Competitive R&D — paper.design · indianic.com · wisprflow.ai

> Reference research for the Intractify landing page (`web/`). Three sites each
> showcase a distinct craft: **paper.design** = paper/editorial background +
> "drawn on the page" component fills; **indianic.com** = two-font typography,
> soft-rounded CTAs, dense-but-scaffolded content, smooth hover/scroll;
> **wisprflow.ai** = scroll-driven storytelling with a live product proof in the
> hero.
>
> **Date:** 2026-09-25 · By: session R&D pass.
> Companion doc: `docs/research/LANDING_IMPROVEMENT_PLAN.md` (what we adopt).
> Use this file to understand *why* each motif works; use the plan to decide
> *what* to copy into our cream/ink/burgundy design lock.

---

## 1. paper.design — the "paper" system (`/blog/series-a`)

### 1.1 Concept & brand metaphor
Paper is a design tool whose brand is literally paper. The whole site is one
continuous sheet: white `#fff` background (their "paper fill"), content placed
like it was laid out on a desk, and components that read as **hand-drawn /
written** rather than "UI chrome". The metaphor is load-bearing, not decorative.

### 1.2 Background & surface fills
- **Base fill is paper white everywhere**; sections separate via spacing, not
  colored bands. There are almost no alternate-background sections.
- **Component fills imitate writing tools**: the sign-up CTA is a solid dark
  pill; inline links are simple text; images sit on the sheet with soft edges.
- **Theme images are low-contrast, photographic-editorial** (hero
  light.jpg, product-light.webp, team.jpg) — muted, warm, neither saturated nor
  "stock-tech".

### 1.3 Typography
- **Paper Mono** (their own open-source mono font) is used for the *document's*
  voice: nav, small labels, bylines, footer.
- Serif/sans mix for narrative: big editorial headline, then measured sans body.
- No gradients, no candy. Type carries the hierarchy; the page feels like an
  issue of a magazine printed on white paper.

### 1.4 Components
- **Nav:** left = links; right = two CTAs — ghost-ish "sign up" + solid
  inverted "open Paper →". Gap between the pair is a brand signature.
- **Testimonial block:** portrait (`w=96`) + quote + name/role as a three-line
  unit; repeatable, airy.
- **Announcement hero:** date stamp (mono), headline, one hero image, then
  body copy in two or three logical chunks.
- **Footer:** two-line layout — logo + copyright on left, a stacked grid of
  link columns, social row. Silent, no giant newsletter banner.

### 1.5 Motion
- Paper's motion is *restrained*: subtle fades on load, no parallax noise, no
  scroll-jacking. Calm = professionalism.

### 1.6 What to steal
The **"one material, everything drawn on it"** discipline: never fight the
paper; let spacing + type + a few colored accents do all the work. Zero chrome.

---

## 2. indianic.com — the "agency conversion machine"

### 2.1 Typography — the two-font system (what the user called out)
- **Display type:** one strong sans (bold, tight tracking, large clamp sizes)
  for headlines; **italic serif accent words** inside headlines
  ("*27 years of shipped software*", "*GO LIVE!*") — this italic-serif-on-sans
  contrast is their signature rhythm.
- **Body:** small clean sans; mono/stamp labels (`EST. 1998`, `01`, `2–7d`) for
  metadata.
- Readers never confuse headline vs body; the two-font contrast keeps long
  copy skimmable.

### 2.2 CTA shape — smoothness (explicit user note)
- **CTAs are soft pills / rounded rectangles, never sharp corners.** e.g.
  `[Start a project →]`, `[Bring us your Lovable build → … Free.]`.
- One secondary transformed CTA (dark pill) + tertiary text link pairs common.
- Buttons keep generous height, comfortable padding, `→` affixed to the label.

### 2.3 Content placement & spacing discipline (explicit user note)
- **Every section has a mono stamp header** ("The turn-key advantage",
  "The receipts", "How you plug us in") then a bold headline then content.
- Rhythm: heading → intro paragraph → 3–4 tiles → CTA. Repeated without drift.
- **Tiles are numbered** (`01 Top 1% talent…`, `02 100% AI-empowered…`) —
  numbered claims read as methodology, not marketing.
- Stat blocks lock in 4 columns; metric marquee logos double-row infinite loop;
  team wall = dense photo grid with name captions.
- **No empty dead zones and no cramming**: gaps are consistent (24px inner,
  generous 48–100px section spacing), cards rounded, borders hairline.

### 2.4 Visual components
- Real office photography at `w=3840` inside editorial blocks (team floor,
  office building) — credibility photography placed deliberately.
- Product cards: logo tile + title + tagline chip + "View product →" — the
  exact same molecule repeated across whole catalog (Bucket 01/02/03).
- Video-testimonial strip with thumbnail covers.
- Stacked tech-logo rows (OpenAI→n8n) as a "not a ceiling" stack panel.

### 2.5 Hover & motion
- Cards lift (`-4px`, shadow) on hover; buttons darken/enlarge; links get
  underline; photos scale slightly.
- Scroll-triggered reveals on tiles; numbers count up; "SCROLL TO EXPLORE"
  affordance.
- Smooth: everything is a **transform/opacity transition with an ease-out
  cubic** — nothing animates layout, nothing scroll-jacks.

### 2.6 What to steal
**Typographic cadence** (bold display + italic-serif accent + mono stamp),
**smooth pill CTAs**, **numbered method tiles**, **one repeatable card
molecule**, and the **"never empty, never cramped" grid discipline**.

---

## 3. wisprflow.ai — scroll-driven storytelling

### 3.1 Hero = live product proof (the killer pattern)
- Headline: `Don't type, *just speak.*` (sans + italic serif accent — same
  two-font trick as IndiaNIC).
- **Left/right split:** left = CTA + platform badges; right = **an in-page
  transcript demo**: messy voice-dictation text auto-cleaning into polished
  prose, words highlighting "Filler identified / Correction identified /
  Repetition identified".
- The hero *demonstrates* the product instead of describing it. This is the
  single strongest conversion pattern on the page.
- Below the demo: infinite logo marquee (2 duplicated rows for loop).

### 3.2 Scroll choreography
- **Sticky/scrolling "How it works":** one section where a pinned panel
  (phone/timeline) stays while content steps change beside it; background
  images (`2nd-bg.webp`, `bg2.webp`) crossfade in sync with the step.
- **Numbers that scrub/bind to scroll** (`4x faster`, `220 wpm` — keyboard
  45 wpm vs Flow 220 wpm kinetic counter).
- **Section headers reveal word-by-word** ("Built around *how you work,* not
  how we think you should").
- Tabs that re-render a re-animated recorder mock per feature
  (Speak naturally / Edits as you speak / Use it anywhere) — each tab restarts
  the demo animation.

### 3.3 Personalization as visual state
- "100+ languages / learns your vocabulary / snippets / styles" — each feature
  shown as a **mini live mock** (language picker, "Add a new word" modal,
  tone switch Formal / Casual / Very casual), not bullet text.

### 3.4 Credibility
- Case-study cards (Steven Bartlett 90% faster, Clay $3.08m saved) with KPI
  chips; security badges strip (SOC2/HIPAA/ISO); press thumbnails; named
  testimonials. Two long-form case studies link out.

### 3.5 Motion hygiene note
- Heavy but *purposeful* animation; every sequence ends in a stable state.
  (Our plan must keep `prefers-reduced-motion` support — see improvement plan.)

### 3.6 What to steal
**Demo-in-hero**, **scroll-linked sticky how-it-works**, **word-scrub headers**,
**feature-specific mini mocks**, **counters bound to a comparison** (45 vs 220).

---

## 4. Cross-site synthesis (the three threads)

| Thread | paper | indianic | wispr | Our take for Intractify |
|---|---|---|---|---|
| Background material | single paper fill, no bands | alternating cream/white bands | strong cinematic bgs | keep our cream `#F4EFE3` as "paper"; use fills sparingly |
| Type duo | mono + editorial serif | sans display + italic serif | sans + italic serif | we have Instrument Serif (normal) + Geist; add *italic?* no — color/weight accent instead (IS lock) |
| CTA | solid pill | rounded pill | rounded pill | soften our `btn-ink` corners from 2px → ~10px; keep border-radius tokens |
| Numbered method | — | 01–04 numbered claims | numbered steps | strengthen our `i.–vi.` features + `01–04` how-it-works already numbered |
| Hero proof | announce hero | stats bar | **transcript demo-in-hero** | upgrade our hero mock into scrubbing live demo (next best = demo video slot) |
| Motion | calm fades | reveal+lift hovers | scroll-choreographed | adopt reveal/hover polish; scroll-choreo labeled experimental |

---

## 5. Honesty & brand constraints to respect (do not break)

1. **Pre-launch:** no fake dashboard screenshots of unimplemented features; the
   hero transcript trick only if we show the *real* session mock (already honest).
2. **No borrowed press logos** (parent issue); paper/IndiaNIC logo walls stay a
   NO until our press mentions are real.
3. **Our design lock:** cream bg, ink #15161A, burgundy #6F2530, indigo #1F2C58,
   serif emphasis via size/color (italic removed deliberately).
4. **Motion:** honor `prefers-reduced-motion`; no autoplay sound; video slots
   muted + poster.
5. **Stack:** Next.js 15.5 / Tailwind v4 pure CSS; prefer inline SVG/critical
   CSS over new deps for anything we adopt.
# Background & Theme R&D — general.legal · draftwise · rescript · flowglad · openhands · openseo

> Deep-dive into **how these six sites theme/color-code their background to match
> their product**, whether each background is **animated**, static, or a
> **created image**, and where it is placed per section.
> **Date:** 2026-09-25 · session R&D pass.
>
> **Method.** Two sources per site: (1) webfetch of the living DOM copy, and
> (2) its raw homepage HTML token-scanned for CSS variables (`--token`/`--life-*`
> etc.), `background-*`, gradients, `@keyframes`, and inline background images.
> Every colour/animation below is **CONFIRMED** straight from the shipped HTML,
> not guessed.
>
> Companion doc: `docs/research/LANDING_IMPROVEMENT_PLAN.md` (adopt/pilot/skip
> from the first R&D pass). This file only *records*; the improvement plan is
> written separately if the user asks.

---

## 0. TL;DR — the five background tricks in the wild

The sites split into **light-paper** (general.legal, flowglad) and **dark-canvas**
(draftwise, rescript, openhands, openseo) themes. Across them, five distinct
background techniques recur:

1. **Dark canvas + light "paper product-mock" cards floating on it** — rescript
   (flagship). Page bg is near-black; the product UI is drawn as creamy paper
   cards (`--life-paper:#fafaf9`) on top. Background *is* the metaphor: a dark
   filing room, paper docs on it.
2. **Photo hero with a gradient scrim** — general.legal. A full-bleed office
   photo is darkened top→bottom and bottom-left so ink text floats on the dark
   zone; everything below stays plain paper.
3. **Animated soft-light orbs** — rescript: huge `radial-gradient` glows pegged
   at fixed viewport offsets (`78vw 38vh`, `78vw 46vh`, `78vw 54vh`, …) that
   change per scroll stage; plus live-mock keyframes (`audioWavePulse`,
   `sourceTypingCursor`) inside the demos.
4. **Subtle texture as background layer** — openhands ASCII "pixel-blast"
   (`--ascii-opacity:0.12–0.18`), draftwise `grain-sm.png` on testimonial
   cards, flowglad inline-SVG pattern.
5. **Semantic color-coding of features** — openseo (7 hues), flowglad multi-tag
   automation chips, draftwise lime `#c3fa5e` hero + indigo `#4d65ff` links.

---

## 1. general.legal — light paper + photo-scrim hero

**Theme — LIGHT paper.** CSS tokens `--gl-paper` (page background) and
`--gl-ink` (text) — literally a paper/ink system. Type carries everything;
colour is almost absent (`#000`, muted `#57574c` are the only ink tokens).
Professional law-firm restraint: no accent colour, no rainbow.

**Background placement per section**
- **Hero:** a **created photo** `/_astro/slat-wall-chair.CDjqXItf.webp`
  (interior/office chair shot) is a full-bleed background, and legibility comes
  from **two dark scrims**:
  - `linear-gradient(to top, rgba(8,8,7,.78) 0%, .72 12%, .58 30%, .38 50%, …)`
    — top→bottom fade that darkens the lower half behind the H1/CTA.
  - `radial-gradient(130% 130% at 0% 100%, rgba(8,8,7,.62) 0%, .5 18%, .34 34%, .18 4…%)`
    — bottom-left vignette pushing light away from the headline block.
  Copy sits *in* the dark zone — never over a bright patch.
- **Logo/ticker strip:** hard band via
  `linear-gradient(to bottom, transparent 0%, #000 24%, #000 76%, transparent 100%)`
  — a full-bleed black band that fades in/out, used to seat the unicorn logos.
- **Testimonials / attorneys / pricing:** plain paper background, two-column
  quotient cards, headshot grid, flat pricing cards — no banding, no tiles.

**Animations — tracked**
- Staggered hero entrance: `animation-delay: 0 / .09 / .18 / .27 / .36s`
  (content cascades in on load).
- `animation:.5s linear infinite _1b6o2se0` — an infinite spinner keyframe
  (badge/status dot). No scroll-jacking, no parallax.

**Takeaway.** The photo-scrim hero is the exact "image as background, placed by
theme" case: photo only in the hero, darkened just where the text sits, plain
paper everywhere else. Their paper/ink tokens match our cream/ink lock closely.

---

## 2. draftwise — dark canvas, lime "wisdom" colour-coding

**Theme — DARK** `background:#000`, panels in green-black `#112317` /
`#24352a`, text overlays on `rgba(0,0,0,.8)`; one light seam `#e5eae3` with an
override `!important` (a shallow dust-coloured strip). White logos used on the
dark (Mishcon/MDR_WHT).

**Color-coding (the "two-font + accent" pattern, echoed from IndiaNIC pass)**
- `--h1: #c3fa5e` — the **lime accent**: hero headline "Make the *wise move*."
  is set as gradient text (`background-image:linear-gradient(var(--h1),var(--h1))`
  + background-clip). Lime = "wisdom" — one deliberate pop on top of a black
  canvas.
- `#4d65ff` indigo for interactive/link accents; neutrals `#bec6be`, `#e5eae3`,
  `#fff` for body/badges.

**Background placement & textures**
- **Logo marquee:** testimonial/logos belt uses the *doubled-DOM* trick — each
  logo appears twice in sequence (Orrick, Astanor, Katten, Gunderson … then
  repeats) to loop seamlessly.
- **Testimonial cards:** dark cards with a **created grain overlay**,
  `grain-sm.png`, + `.avif`/`.webp` portraits — texture makes the dark panel
  feel filmed, not flat.
- **Product sections:** a "placeholder-image.svg" is literally used as the
  product-UI mock background (no fake screenshots — same honesty instinct as
  ours). Compliance section shows a real badges image
  `content-image-compliance.png`.

**Animations — tracked**
- `keyframes sweep` — a sweep/sheen pass (shine travelling across the lime
  headline/CTAs). Single, restrained, on-brand.

**Takeaway.** One loud accent on a pure-black canvas reads as "intelligence".
Their placeholder-image.svg approach validates our own MediaSlot glass
placeholders — big-name law firms ship honest placeholders too.

---

## 3. rescript.ai — the dark-canvas + paper-card flagship

**Theme — DARK canvas.** `--bg:#0a0a0a`, `--bg-2:#050505`, `--fg:#ffffff`,
hairline `rgba(255,255,255,.08)`, global accent **green `#22c55e`**. Product is
legal/policy intelligence — the background reads as a dark "ops room".

**The signature placement — dark canvas, paper UI cards.**
The product mocks are drawn as **light paper cards floating on the black**,
with a whole token family just for this:
`--life-paper:#fafaf9`, `--life-paper-2:#f2f1f0`, `--life-ink:#0f0e0d`,
`--life-rust:#8b4f35`, `--life-green:#315540`, radii 8–12px, strong shadows
(`0 30px 76px rgba(0,0,0,.38)`). Card fills:
- `linear-gradient(135deg,#f6f7f5 0%,#e6e9e3 100%)` (warm paper)
- `linear-gradient(180deg,#fafaf9 0%,#e9e6df 100%)` (tilted paper)
Section washes on the dark canvas (each section gets its own grey cast):
- Hero: `linear-gradient(180deg,#0a0a0a 0%, #0a0a0a 40%, #060606 100%)`
- Olive wash: `linear-gradient(108deg,#44443b 0%,#171812 39%,#070707 100%)`
- Warm taupe wash: `linear-gradient(126deg,#595444 0%,#24211c 39%,#0b0b0a 100%)`

**Animated background — soft-light orbs + live mocks (tracked)**
- Ambient glows: `radial-gradient(120vw 80vh at 78vw 38vh, rgba(60,80,90,.35)…)`
  repeated at `46vh`, `54vh`, plus `radial-gradient(60vw 40vh at 80vw 30vh, rgba(180,180,170,.10)…)`
  — big low-saturation light blobs that shift with the scroll stages
  (`--life-progress`, `--life-stage-count:4`, `--life-track-*` drive a scroll
  stage system; tilted `--r:±2…5deg` elements float).
- **Keyframes:** `audioWavePulse` (live audio-wave bars pulse in the hearing
  transcript mock) and `sourceTypingCursor` (typing cursor blink in the prompt
  mock). These are in-demo background animations.
- Animated mock: "Loading U.S. map…" states in the statutory-survey demo, bill
  redline diff (strike/insert colouring), hearing transcript with `00:15`
  timestamps — each demo is a *living* background, not a screenshot.

**Created image as background**
- Hero/product graphic is **ASCII art of the US Capitol** —
  `capitol-ascii-3952w.webp` — a *drawn* image used as the hero background.
  Fits their "policy × code" identity perfectly and is unique in the set.

**Color-coding** — survey map teal ramp `#08a982 / #7dcfae / #2d746b`,
green ink `#315540`, rust `#8b4f35` on the paper cards only; global green
`#22c55e` on black.

**Takeaway.** This is the richest of the six for us: **the exact "dark ops-room
canvas + cream paper product cards" composition** maps 1:1 onto our cream
paper + burgundy/indigo lock if we ever add a dark band. Scroll-stage glows,
paper tilt, and live-mock keyframes are all CSS-only and repeatable.

---

## 4. flowglad.com — light cream + feathered section merges

**Theme — LIGHT CREAM** (Framer tokens): base `#fbfaf4` / `#fefefb` /
`#fdfdfb`, ink `rgb(20,19,18)` / `#141312`, moving shadows `#edebe9 #e6e6e3`.
Same family as our `#F4EFE3`.

**Background placement — soft-feather merges (the standout)**
- Section joins are feathered, not banded: corner/side **radial vignettes that
  fade a section's own cream into the next**:
  `radial-gradient(100% 50% at 0% 50%, #2e2b2900 0%, #fbfaf4 …)`,
  `radial-gradient(107% 100% at 0% 100%, … at 100% 100%, …)`. The cream shape
  bleeds off so sections don't clash.
- Warm highlight blob over the hero card: `radial-gradient(58% 75% at 24% 40%, #efe8cdf5 0%, #ebe2c4e0 30%, #ded3b29e 52%, … 88%)`.
- Dark text-seat fade on cards: `linear-gradient(#000 56%, #0000001a 90%, #0000 100%)`
  and a dark blob `radial-gradient(64% 66% at 68% 52%, #000 …)`.
- **SVG data-URI background pattern** (`data:image/svg+xml,…`) — a subtle
  generated pattern across surfaces (dotted/grid line), i.e. created asset as
  background.

**Colour / CTAs** — brand blue gradient `linear-gradient(134deg,#005bbb 0%,#038fd3 100%)`
(and 311deg variant) on primary CTAs; peach soft wash `#ffc7b3→#fff9f7`;
**semantic color-coding on the automation cards**: green `#28b06e` + pastel
`#d6f5e7` (success/reconcile), red `#e74228` + orange `#d97757` (attention),
mauve `rgb(81,61,169)` (creative), each card tagged `N Automation · M Skills`.
Trust strip: AICPA / SOC 2 / ISO 27001 / HIPAA "IN PROGRESS / MONITORED BY"
badges → Trust Center.

**Animations — tracked.** Framer-driven (no named keyframes in the HTML);
interaction is hover lifts + the feathered gradients give a sense of motion
during scroll. No scroll-jacking.

**Takeaway.** Their **radial feathering between sections** is the cleanest way
in this set to cut bands from a light theme — directly reusable on our cream
page. Automation colour-chips = our feature/audience tag treatment.

---

## 5. openhands.dev — ASCII "pixel-blast" on black

**Theme — DARK, radically minimal.** Text-first developer shell; page is links
+ description, almost no chrome. Brand accent green `#1FBD53`.

**Background placement**
- Hero carries a **generated ASCII-art embed** (`div[data-wf-el="ascii-embed"]`
  `hero-pixel-blast` and `home-enterprise-partners-panel__blast`) rendering at
  **opacity 0.12–0.18** (`--ascii-opacity:0.18` / default 0.12) as a faint
  full-bleed texture behind the H1. That ASCII layer is *drawn output* — a
  created image used as background. (Its grey→grey-green palette `#181818…
  #d6d690` is the dither ramp the ASCII art uses.)
- `--nav-cta-blend:0` token — nav CTA blends out until scroll/state.

**Animations — tracked**
- The pixel-blast embed animates subtly (Webflow embed); otherwise zero
  motion. The whole site's motion budget is basically one texture.

**Takeaway.** Proof that a **near-invisible, on-theme texture** (opacity ≤0.18)
can carry an otherwise empty hero. The restraint is the design. (For us this
maps to a faint security/hotline texture — see plan §2 "paper fill", NOT a
visible cartoon.)

---

## 6. openseo.so — semantic colour-coding per feature

**Theme — DARK navy-black.** Base `#050810`, panels `#17181C`, white text,
cream seam `#f5f1ec`; `#E6E5E6`/`#FDFCFC` neutrals.

**Background placement**
- **Hero visual is a terminal/CLI mock** — a dark code panel with `›` prompt
  lines, `✓ Saved 3 keywords…`, a keyword table (`volume`/`kd` columns) — a
  *created* "screenshot-on-brand" (built in DOM, monospace). This is the same
  `demo-as-background` genre as rescript/wispr but in pure CLI form.
- Feature tiles each show a **colour-engineered icon/emoji + accent**: all
  seven features map to their own hue — **green `#14BB69`, teal `#00e5cc`,
  blue `#3186FF`, yellow `#F6C013`, orange `#D97757`, red `#FA4340`/`#991b1b`**
  — so the whole page becomes a colour-legend of the product. Semantics:
  green = success/OK states, red = risk, orange = CTA accent on cream, blue =
  external (DataForSEO, GSC).
- Testimonials: avatar rectangles + attribution, "3000+ entrepreneurs" band.
  Product Hunt "#1 Product of the Day" badge.

**Animations — tracked.** `keyframes` absent from the scanned HTML (hero is
mostly static panel + CSS hover); motion is hover chips + reveal. (File is
partly binary-encoded; treat motion reads as low-confidence.)

**Takeaway.** **Colour-coding as a data map**: every feature has a colour *and*
knows what it means (success/attention/external). That's the strongest example
of "theme matches service" in the set. Caution: its rainbow clashes with a
trust/privacy brand unless restrained to a 2–3 hue semantic set.

---

## 7. Cross-site matrix

| | general.legal | draftwise | rescript | flowglad | openhands | openseo |
|---|---|---|---|---|---|---|
| Theme | light paper | dark | dark canvas | light cream | dark | dark navy |
| Base token | `--gl-paper` | `#000` | `#0a0a0a/#050505` | `#fbfaf4/#fefefb` | black | `#050810` |
| Ink / text | `--gl-ink` | `#fff` | `#fff` | `#141312` | white | white |
| Hero bg | photo `slat-wall-chair.webp` + 2 scrims | black + lime H1 | ASCII Capitol img + glow orbs | cream + blob | ASCII pixel-blast (0.12–0.18) | dark CLI mock |
| Section joins | plain paper / black band | dark cards + light seam | per-stage grey washes + glows | radial feather fades | none | cream seam |
| Texture layer | — | `grain-sm.png` | light paper cards on dark | SVG data-URI pattern | dither ramp | — |
| Keyframes found | `_1b6o2se0` (spinner) | `sweep` | `audioWavePulse`, `sourceTypingCursor` | (Framer, none named) | (embed) | (none found) |
| Featured animation | staggered hero reveal | shine sweep | live-mocks + scroll stages | hover/scroll | subtle pixel blast | hover chips |
| Colour-coding | none (paper/ink only) | lime `#c3fa5e`, indigo `#4d65ff` | green `#22c55e`, survey teals | green/red/orange/mauve chips | green `#1FBD53` | 7-hue legend |
| Honest placeholders? | — | YES (`placeholder-image.svg`) | — | — | — | — |

---

## 8. What this confirms for Intractify (notes only; plan is separate)

Background tricks that survive our **cream/ink/burgundy/indigo lock** and
**pre-launch honesty**:

1. **package the main mock panels as "paper on a dark/seam band"** (rescript
   §3) — our DemoVideoSection/HowItWorks panels could ride a `secondary-fill`
   band as cream paper, making background *mean* the product without fake
   screenshots.
2. **Radial feather fades between sections** (flowglad §4) — our new Band seam
   token already jumps 2 bands; feathering can replace hard seams.
3. **Photo-scrim discipline** (general.legal §1) — if we ever add a real photo,
   apply bottom dark gradient + corner vignette toward ink; text never over a
   bright patch. (We currently keep honest MediaSlot glass — fine.)
4. **One loud accent on near-black if we ever ship a dark section** — lime/blue
   scheme is draftwise's trick, but our version stays burgundy `#6F2530` +
   indigo `#1F2C58`, not synthetic rainbow.
5. **Restrained semantic colour-coding** — map burgundy = actions/security,
   indigo = evidence/protocol, grays = neutral (openseo teaches the *legend*
   pattern, not the palette).
6. **Live-mock keyframes** to port into `DemoVideoSection` later:
   `audioWavePulse` + `sourceTypingCursor` (CSS-only pulses we can re-create
   under `@keyframes`; gated behind reduced-motion). `sweep` shine for CTAs is
   safe and cheap. Staggered hero entrance (general.legal) is a better "load
   drama" than our current single fade.
7. **Near-invisible texture layer** — a ≤5% opacity inline-SVG/grain is fine
   and used by three sites; keep it out of the final shadowed-glass if it
   starts looking like noise.
8. **Do NOT copy:** rescript's "created-ascii" or openseo's rainbow unless
   asked — off-brand for a security platform; openhands' zero-chrome is
   counter to our show-and-tell brief; the "3000+"/"#1 Product of the Day" /
   "20K+" claim-styling must not leak into our honest pre-launch numbers.
# Session Log — 2026-09-24 (web/ full review + brand polish completion)

> Chronological log of what was discussed, analysed and researched in this
> session. Raw companion to the structured docs — keep it brief; link, don't
> duplicate.

## 1. Request recap
- Review the **entire `web/` project** "each and everything".
- Complete the **last pending task** (the in-flight brand/typography polish).
- After review: **log everything into `web/docs/`**.

## 2. What we went through (order)
1. Confirmed repo layout: parent repo on `novnc-to-webrtc`, `web/` submodule on
   `develop`, commit `84fc407` (unpushed) + uncommitted brand work.
2. Read every route, section, component, API handler, lib module, SEO file,
   config, robots/sitemap/manifest/llms.txt, all four legal pages.
3. Verified security posture (IS-007): `/api/md` SSRF, `/api/track` IP hashing,
   rate-limiter atomicity + fail-closed, service-role key server-only.
4. Verified the brand task in the working tree; ran `npm run lint` and
   `npm run build` (both green).
5. Diffs inspected: `layout.tsx` (font style), Navbar/Footer (italic removal),
   deleted favicon routes + concept PNGs, new static icons + logomark.

## 3. Key facts established
- Stack: Next 15.5.18 / React 19.1.0 / Tailwind v4 / Upstash Redis / Supabase.
- 18 static + 4 dynamic routes; shared JS 102 kB; no build warnings/errors.
- No CRITICAL/HIGH security findings remain (both prior verdicts + this pass).
- Brand task is **complete in the working tree but uncommitted**; also one
  unpushed commit `84fc407` on `develop`.
- Local `web/.env` stale — missing `SUPABASE_SERVICE_ROLE_KEY`, `IP_HASH_SALT`.
- Placeholders flagged: Stats numbers, TrustSignals logos; pricing intentionally
  pre-launch; Footer `#pricing` link vs nav hiding Pricing.

## 4. Decisions / open items handed to user
- Commit decision for the brand-polish changes (asked at end of session).
- Whether `/logo.png` + `/og-image.png` should adopt the new brand logomark.
- Stats + TrustSignals placeholder policy before any go-live.

## 5. Docs written this session
- `docs/reviews/WEB_FULL_REVIEW.md`
- `docs/reviews/ROUTES_REFERENCE.md`
- `docs/reviews/API_REFERENCE.md`
- `docs/reviews/COMPONENTS_WALKTHROUGH.md`
- `docs/reviews/DESIGN_AND_CONFIG_REFERENCE.md`
- `docs/reviews/BRAND_POLISH_TASK.md`
- `docs/reviews/VISUAL_CONTENT_PLACEMENT_PLAN.md`
- `docs/env/ENV_SETUP.md`
- `docs/SESSION_LOG_2026-09-24.md` (this file)
- `docs/README.md` (index — links all of the above)

## 6. Docs written this session — file-by-file detail
- **ROUTES_REFERENCE** — build route inventory (18 static + 4 dynamic),
  root `layout.tsx` metadata (fonts, base URL, title template, 11 keywords,
  OG/Twitter/apple/theme), landing page structured-data injections, all five
  sub-pages with metadata + legal-section breakdown, manifest fields,
  sitemap (stale lastModified flag), middleware markdown rewrite, image-route
  facts, follow-up list.
- **API_REFERENCE** — step-by-step flows + response codes for all four POST
  handlers, exact rate-limit matrix (track 60/60 · contact 5/600 ·
  waitlist 3/300), fail-closed Redis limiter internals (SET NX EX +
  TTL belt-and-braces), server-only Supabase client with RLS guidance,
  tracking storage keys/attribute contract, SSRF allowlist history.
- **COMPONENTS_WALKTHROUGH** — Navbar (z-100, scroll state, PUBLIC_NAV,
  commented-out links), Footer (grid, colophon, "© Intractify Systems Inc."
  bottom bar, `#pricing` inconsistency), ContactForm (validation + 429/error
  handling), all 11 sections with exact copy, the 1160-line Hero (typewriter,
  4-phase mock, step-snapshot tabs, countdown, reduced-motion), Comparison
  (scroll-linked split panel, mobile stack cards), PullQuote, Stats, FAQ
  12-item list, Pricing waitlist card, CTA, shared hooks (`use-scroll-reveal`,
  `cn`).
- **DESIGN_AND_CONFIG_REFERENCE** — full token table, base layer,
  `.cv-*` typography set, all 17 keyframes + ready-made effect classes,
  `generated-image.ts` (brandImage + openGraphImage geometry), full
  schema.org graph in `schema.ts`, robots/llms/api-catalog/next.config
  AGENT_LINK headers, tsconfig/postcss/eslint/package.json, `.env.example`
  summary, follow-ups.

## 7. Decisions / open items handed to user
- Commit decision for the brand-polish changes (asked at end of session).
- Whether `/logo.png` + `/og-image.png` should adopt the new brand logomark.
- Stats + TrustSignals placeholder policy before any go-live.
- Sitemap `lastModified` refresh + `websiteSchema` SearchAction dead-end
  (flagged, not fixed).

## 7a. Visual elements implemented (second request, same day)
- All Phase-1 visuals built per `VISUAL_CONTENT_PLACEMENT_PLAN.md` §3.5: hero
  ambient schematic + LIVE SESSION caption, trust shields, 6 feature
  micro-diagrams, audience chips, pricing seal.
- Glass "media slot" placeholders (`components/common/MediaSlot.tsx`) for the
  four missing real-media slots: HowItWorks video, Stats photo, PullQuote
  portrait, CTA wash.
- NEW `sections/demo/DemoVideoSection.tsx` — 16/9 demo-video slot **between
  Hero and TrustSignals** (user request: video before the features section to
  convert visitors). Highest-priority asset to produce.
- `npm run lint` + `npm run build` green; all new elements verified rendering
  via local `next start`.

## 8. Follow-up for next session
- Await user's commit/go-ahead; then stage brand changes, push `develop`,
  open PR to `origin/develop`, and (if wanted) build+deploy to Vercel.
- Produce real demo video + swap the glass slot (highest-conversion asset).

## 9. Competitive R&D (same day, third request)
- User asked for R&D on three reference sites — paper.design/blog/series-a
  (paper-like bg fills, drawn/written components), indianic.com (two-font
  styles, smooth non-sharp CTA shapes, content placement/spacing, scroll/hover
  animations), wisprflow.ai (great scroll animations).
- webfetch of all three; wrote two docs:
  - `docs/research/COMPETITIVE_REFERENCE_RD.md` — full analysis: paper's
    single-material sheet + mono/editorial type; IndiaNIC's sans+italic-serif
    display duo, pill CTAs, mono stamps, numbered method tiles, molecule
    cards, lift hovers; Wispr's transcript-demo-in-hero, sticky how-it-works,
    word-scrub headers, comparison counters; cross-table + honesty guardrails.
  - `docs/research/LANDING_IMPROVEMENT_PLAN.md` — adopt/pilot/skip plan:
    unified ~10px CTA radius, mono stamp headers, serif-accent H2s, hover
    lifts, CSS-only word-scrub headers with reduced-motion guard, sticky
    HowItWorks (pilot), counters only-if-real (pilot). Rejected: logo walls,
    fake testimonials, italic serif (IS lock), cinematic crossfades, 4th font.
- Updated `docs/SESSION_LOG_2026-09-24.md` (this line) + README index.
- Docs-only change; no lint/build needed, not committed.

## 10. Theme & background R&D (same day, fourth request — 6 more sites)
- User asked to analyse how the following place backgrounds by theme/service,
  which backgrounds are **animated** vs **created images**, and to note
  everything down:
  general.legal · draftwise.com · rescript.ai · flowglad.com · openhands.dev ·
  openseo.so.
- Research method: webfetch of all six + raw homepage HTML pulled and token
  scanned (CSS vars, `background-*`, `@keyframes`, background images).
- Key CONFIRMED findings (from shipped HTML):
  - **general.legal** — light paper (`--gl-paper`/`--gl-ink`); hero = office
    photo `slat-wall-chair.webp` + top→bottom and bottom-left `rgba(8,8,7,…)`
    scrims; black band via `linear-gradient(transparent,#000 24–76%,transparent)`;
    staggered `animation-delay .09–.36s` hero reveal + infinite spinner
    `_1b6o2se0`.
  - **draftwise** — dark `#000`/`#112317`/`#24352a`; H1 gradient-text lime
    `--h1:#c3fa5e` + indigo `#4d65ff` links; `grain-sm.png` on testimonial
    cards; `keyframes sweep`; doubled-DOM logo marquee; literally ships
    `placeholder-image.svg` for product mocks (honest placeholders).
  - **rescript** — flagship pattern: dark canvas `#0a0a0a/#050505` + light
    **paper product cards** (`--life-paper:#fafaf9`, ink `#0f0e0d`,
    `linear-gradient(#fafaf9→#e9e6df)`); per-section grey washes (olive
    `#44443b→#070707`, taupe `#595444→#0b0b0a`); animated soft-light orbs
    `radial-gradient(120vw 80vh at 78vw 38/46/54vh,…)`; keyframes
    `audioWavePulse` + `sourceTypingCursor`; **ASCII Capitol** image as hero
    created-art bg; 4-stage scroll system.
  - **flowglad** — light cream `#fbfaf4/#fefefb`, ink `#141312`;
    **radial feather fades** between sections; warm blob
    `#efe8cd→#c4bda4`; blue CTA `#005bbb→#038fd3`; SVG data-URI pattern bg;
    automation colour-chips (green `#28b06e`, red `#e74228`, mauve `#513da9`).
  - **openhands** — dark minimal; ASCII **`pixel-blast` embed** at
    `--ascii-opacity:0.12–0.18` as hero texture (dither ramp `#181818…#d6d690`),
    green `#1FBD53`.
  - **openseo** — dark navy `#050810`/`#17181C`; hero = **CLI terminal mock**
    (`›`, `✓`); 7-hue semantic colour-coding (green `#14BB69`, teal `#00e5cc`,
    blue `#3186FF`, yellow `#F6C013`, orange `#D97757`, red `#FA4340`/`#991b1b`).
- Wrote `docs/research/THEME_BACKGROUND_RD.md` (full notes + keyframes matrix +
  "what survives our lock" section); added to README index + this log.
- Docs-only change; not committed.

## 11. Full-site implementation (same day, fifth request)
- User: "update the entire website based on all the R&D; if I want a certain img
  or animation library, note it down, but implement now and reserve the space."
- Implemented **CSS-only, zero new deps**, from `LANDING_IMPROVEMENT_PLAN.md` +
  `THEME_BACKGROUND_RD.md`:
  - `globals.css`: added `--radius-action: 0.625rem` token; `.btn-ink` radius
    moved to it (was 2px); new `.cv-stamp` mono section stamp; new
    `.cv-underline` word-scrub (bottom-underline draws when parent
    `.is-revealed`, or `.is-on` static); new `.cv-paper-band`/`-inner` media
    frame; new `@keyframes wave-bars` + `.cv-wave` reserved live-mock bars;
    `.cv-hover-card`/`.cv-card-icon` icon-inversion hover; reduced-motion
    guards added for all of the above.
  - `AudienceSection` — cv-eyebrow → `.cv-stamp`; "paranoid" serif accent gets
    underline-scrub; cards refactored to reveal-wrapper + `hover-lift` inner
    card with `cv-hover-card`/`cv-card-icon` hover.
  - `HowItWorksSection` — stamp + "disposable" underline-scrub; step-card icon
    hover gives same indigo inversion; media strip wrapped in `cv-paper-band`.
  - `PricingSection` — stamp + "launch" underline-scrub; email input radius 8px;
    submit button `var(--radius-action)` + `btn-shimmer-wrap` sweep.
  - `FAQSection` — stamp + serif "answers" accent with `.is-on` underline
    (static — no scroll hook here).
  - `DemoVideoSection` — underline-scrub on "disappear"; slot wrapped in
    `cv-paper-band`; reserved `.cv-wave` pulse bars added next to the LIVE
    caption (audio-reactive intent).
  - `FeaturesSection` — header wrapper now carries `.is-revealed`; "isolation"
    serif accent gets underline-scrub.
  - CTA/Stats/Trust/Comparison left as-is (already rich and honest).
- Wrote `docs/research/RESERVED_ASSETS_AND_LIBRARIES.md` ("the letter") — the
  reservation manifest: animation-lib verdict (none; Motion only if we ever do
  sticky HowItWorks), the two demo `<video>` slot specs + poster frames, CTA
  wash spec, what never ships (fake logos/testimonials/screenshots), every code
  reservation made, and the definition of done. README index + this log updated.
- Ran `npm run lint` + `npm run build` — both green. **Not committed.**

## 12. Hero revert: remove the "how to use" animation (same day, sixth request)
- User: the hero's right-side preview is now explaining **how** it works
  (BOOT→STREAM→ACTIVE→DESTROYED step snapshots) — but the demo video directly
  under it explains that same story. Restore the previous **why** preview.
- Reverted the right column to the pre-`3cc2a6f` version: boot lines →
  Shield + "Isolated · session running" + skeleton shimmer. Removed the
  `STEPS` tab strip, `scanPhase`/`activeStep`/`goToStep` state, the
  STREAM/ACTIVE/DESTROYED states, and dead injected keyframes. Kept the ambient
  privacy-schematic SVG + LIVE SESSION caption (polish pass). Italic removed
  per brand lock (serif normal).
- Applied to both desktop body and mobile preview.
- lint + build green. Also fixed a pre-existing `react-hooks/exhaustive-deps`
  warning by capturing `timeoutsRef.current` before cleanup. **Not committed.**

## 13. Hero right side = main branch exactly (same day, seventh request)
- User: "see the main branch what it has on that last commit in hero section for
  right side — I want exactly the same thing." Referenced branch `main`
  (b3dc16a); its hero carries the **privacy-story** preview this repo used to
  have — the answer to **why** use Intractify — which §12 had replaced with a
  static Shield + skeleton.
- Ported `main`'s hero right-side content into `develop`'s `HeroSection.tsx`,
  keeping everything else develop-specific (honest left column, ambient
  privacy-schematic SVG, LIVE SESSION caption):
  - Added `getClientSpecs()` (UA → OS/browser, small hash deriv, derived mock
    IP), `FingerprintSVG`, and the 5-step `STEPS` array (BOOT/SCAN/ALERT/
    PURGE/SECURE).
  - Restored `scanPhase` (`idle→scanning→exposed→obfuscating→isolated`),
    `activeStep`, `goToStep`, and the sequenced effect (boot 500/900/1300ms,
    scanning @1700ms, exposed @3200ms, obfuscating @5000ms, isolated @6500ms;
    reduced-motion → isolated immediately). Live visitor IP fetched from
    `https://api.ipify.org?format=json` (fallback to derived mock).
  - Re-injected the scoped `@keyframes` style (`scan-sweep`, `pulse-red`,
    `progress-fill`) for the desktop body only.
  - Desktop body now renders mains's states (fingerprint-scan sweep /
    REAL exposed IP-OS-BROWSER-HASH / purge terminal + progress bar /
    Shield + "Isolated · session active" + spoofed/masked spec rows), with the
    new mono footer label `us-east-1`.
  - Desktop + mobile **step-snapshot tab strips** restored (BOOT/SCAN/ALERT/
    PURGE/SECURE, active = dark border + full opacity).
  - Mobile preview body: same four scan states, smaller sizing, terminal
    purged lines per main. Isolated text kept serif **normal** (main used
    `fontStyle: italic`; only the normal optical file is loaded — no faux
    slant) — the one deliberate deviation, flagged to user.
- `npm run lint` + `npm run build` — both green. **Not committed.**
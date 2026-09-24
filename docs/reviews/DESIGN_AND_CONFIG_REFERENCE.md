# web/ — Design System & Config Reference

> The complete design-token system (`globals.css`), typography, motion, SEO
> image generation, and every project config file, captured detail-for-detail
> during the 2026-09-24 review.

---

## 1. Design tokens — `src/app/globals.css` (354 lines)

### Tailwind v4 wiring
- `@import "tailwindcss";`
- `@custom-variant dark (&:is(.dark *));` — dark is wired but **unused** (site is light-only via `color-scheme: light`).
- `@theme inline` maps: `--color-background`, `--color-foreground`,
  `--font-sans`, `--font-mono`, `--font-heading`.

### `:root` — core palette
| Token | Value |
|---|---|
| `--background` | `#F4EFE3` (cream) |
| `--foreground` | `#15161A` (ink) |
| `--card` / `--popover` | `#FBF8F0` |
| `--primary` | `#1F2C58` (navy/indigo) |
| `--primary-foreground` | `#F4EFE3` |
| `--secondary` / `--muted` | `#EEE7D6` |
| `--muted-foreground` | `#403E39` |
| `--accent` | `#F7F2E5` |
| `--destructive` | `#6F2530` (oxblood) |
| `--border` | `oklch(0.1 0.01 265 / 9%)` |
| `--input` | `oklch(0.1 0.01 265 / 6%)` |
| `--ring` | `#1F2C58` |
| `--radius` | `0.25rem` |

### Navbar / glass
- `--navbar-bg` `#F4EFE3C8`, scrolled `#F4EFE3F0`; borders 10% / 20%;
  shadows 8% / layered 12%+6%.
- `--glass-bg` `#FBF8F0C0`, `--glass-bg-strong` `#FBF8F0F0`,
  `--glass-border` 8%.

### Aurora orbs
- Three radial-gradient orbs (indigo 14% / magenta 10% / teal 7%),
  `--aurora-opacity 0.25`, `--aurora-filter: blur(90px) saturate(100%)`.
- Fixed full-viewport `.aurora-wrap` (`inset: -10vh -10vw`, `z-index:0`,
  pointer-events none) behind everything; 26s/30s/36s drift loops.

### Editorial brand palette (`--cv-*`)
- `--cv-bg #F4EFE3`, `--cv-bg-deep #EEE7D6`
- `--cv-indigo #1F2C58` · `--cv-magenta #6F2530` · `--cv-rose #9A6B5B` ·
  `--cv-gold #9C7A3C`
- `--cv-section-tint`, `--cv-card-bg #FBF8F0`, `--cv-card-border`
- Preview mockup: `--cv-preview-chrome`, dual radial-gradient body
- Tabs, skeleton, quote mark opacity, dot-inactive.

### Motion / effect tokens
- `--reveal-y 28px`, `--reveal-dur .72s`, ease `cubic-bezier(0.16,1,0.3,1)`
- `--marquee-dur 30s`, `--marquee-gap 3.5rem`
- `--spotlight-radius 200px`, `--spotlight-color oklch(0.65 0.22 268 / 10%)`
- `--tilt-*` (8deg max, 1200px perspective, .1s linear / .5s reset).

---

## 2. Base layer (`@layer base`)

- Global `border-color: var(--border)`;
  `outline-color: color-mix(in oklab, var(--ring) 50%, transparent)`.
- Body: 0.875rem, weight 400, `-0.005em`, lh 1.65, `optimizeLegibility`,
  `font-feature-settings: "kern" 1, "liga" 1, "calt" 1`,
  `scroll-behavior: smooth`.
- Headings: `--font-sans`, 700, `-0.025em`, lh 1.1, `text-wrap: balance`;
  h1 `clamp(2.25rem,5.5vw,4.5rem)`; h2 `clamp(1.75rem,3.5vw,3rem)`.
- `code,kbd,pre`: mono + `tabular-nums slashed-zero`.
- `button`: weight 550, `-0.012em`.

---

## 3. Typography utilities

- **`.cv-serif` / `.cv-display`** — Instrument Serif fallback stack
  (`--font-display`, ui-serif, Georgia); 400, `-0.022em`, lh 1.15, `"kern" 1
  "liga" 1 "dlig" 1`.
- **`.cv-em`** — display-family emphasis, **`font-style: normal`** (italic was
  removed across the app; comment explains serif contrast replaces italics).
- **`.cv-eyebrow`** — 0.6875rem, 600, `0.12em`, uppercase, primary color.
- **`.cv-mono`** — mono + tabular slashed-zero.
- **`.hero-serif`** — gradient text (lavender→violet), clip.
- **`.pullquote-grad`** / **`.hero-serif-line`** — gradient/light variants.
- `.serif-link` — underlined serif 16px link; border animates to foreground.

---

## 4. Effects (complete keyframe inventory, 17 total)

`float` (4s ±8px) · `pulse-glow` (3s) · `shimmer` (3s 200%) · `fade-up` ·
`grain` (8s steps(10) jitter) · `aurora-drift-1/2/3` (26/30/36s) ·
`marquee-scroll` · `word-reveal` (28px) · `underline-draw` · `preview-in`
(rotateX) · `floaty` (5s) · `traverse` (lifecycle shimmer 7s) ·
`caret-blink` · `pulse-dot` (2.4s, green) · `skeleton-shimmer` ·
`btn-shimmer`.

Notable ready-made classes: `.animate-float`, `.animate-pulse-dot`,
`.noise-overlay::after` (SVG feTurbulence, opacity .03, z-index 1),
`.spotlight-card` (mouse-tracked radial), `.btn-shimmer-wrap`,
`.nav-underline`, `.btn-ink` (ink pill + hover sheen), `.skeleton-line`,
`.hero-word` stagger, `.lifecycle-rule`, `.marquee-wrap` with edge mask &
pause-on-hover, custom webkit scrollbar (6px).

**Responsive grids:** `.trust-grid`/`.stats-grid` 4→2→1 cols; `.feature-row`
`80px 1fr 2fr` → 2-col → 1-col (feature number emphasized via `!important`
overrides).

**Accessibility:** `prefers-reduced-motion` block kills every animation
(animation none, transition 0.01ms, opacity 1, transform none — including
scroll-reveal).

---

## 5. SEO image generation — `src/lib/seo/generated-image.ts`

- `COLORS` map duplicates the brand tokens (cream/ink/indigo/muted/card/border).
- `brandImage(size=512)` — cream square + rounded bordered card with bold
  serif/700 **"I"** monogram (rounded rect border = `max(2, size*0.012)`,
  fontSize `size*0.44`).
- `openGraphImage()` — 1200×630: grid backdrop (72px cell, 8%/6% indigo
  lines), left 56%: "Intractify" wordmark, headline "Private cloud browser.",
  subtitle, footer tagline; right 38%: **browser window card (390×290) with
  chrome bar + "I"**.
- Served by edge routes `/logo.png` (`brandImage(512)`) and `/og-image.png`.
- **Both are programmatic monograms** — not the new static brand logomark
  (`public/brand/intractify-logo.png`). Swap flagged in `VISUAL_CONTENT_PLACEMENT_PLAN.md`.

---

## 6. Structured data — `src/lib/seo/structured-data.tsx` + `schema.ts`

- `StructuredData` component: serializes `object | object[]`, **escapes `<`
  → `\u003c`** (Next.js XSS defence) and injects via
  `dangerouslySetInnerHTML` into `<script type="application/ld+json">`.
- `schema.ts` exports (all `@context: schema.org`):
  - `organizationSchema` — Organization @id `/#organization`,
    legalName "Intractify Technologies", Mumbai+Bengaluru addresses, 3
    contactPoints (support/privacy DPO/billing), sameAs (twitter, github,
    linkedin), knowsAbout (7 privacy terms), funding 2025.
  - `websiteSchema` — WebSite + SearchAction (search template quirk: points at
    `/?q=…` even though there is no on-site search) + hasPart (home,
    contact, privacy, terms).
  - `softwareApplicationSchema` — SoftwareApplication/WebApplication,
    SecurityApplication/PrivacyApplication, 7 honest featureList entries.
  - `howItWorksSchema` — HowTo, 4 steps (click/provision/browse/done).
  - `homePageSchema` — WebPage + SpeakableSpecification (`h1,#faq,#features,
    #how-it-works`) + breadcrumb Home-only.
  - `definedTermSetSchema` — glossary of 5 DefinedTerms (browser isolation,
    ephemeral browser, container isolation, zero-log, RBI).
  - Factories: `generateBreadcrumbSchema`, `generateFAQSchema`,
    `generateWebPageSchema`.

Injected on the landing page: organization, website, softwareApplication,
howItWorks, homePage, definedTermSet + generated FAQ (12). Sub-pages add
WebPage + breadcrumb via `generateWebPageSchema`.

---

## 7. AI/agent discovery (`next.config.ts`, `robots.txt`, `llms.txt`, `api-catalog`)

- **`next.config.ts`** — single `headers()` rule on `/(.*)`: a `Link` header
  advertising:
  - `</.well-known/api-catalog>; rel="api-catalog"`
  - `</llms.txt>; rel="describedby"; type="text/plain"`
  - `</llms-full.txt>; rel="service-doc"; type="text/plain"`
- **`robots.txt`** — default `*` allow `/`, disallow `/api/`, `/_next/`,
  `/private/`; then GPTBot, ChatGPT-User, ClaudeBot, anthropic-ai,
  PerplexityBot, Applebot, Googlebot-Extended each **Allow:**`/` (AI-friendly);
  `Content-Signal: ai-train=no, search=yes, ai-input=yes` (contentsignals.org
  draft); Sitemap + Host directives.
- **`llms.txt`** — product summary, how-it-works, privacy architecture, tech
  specs, VPN/Incognito/Tor differences (with explicit "does not hide remote
  browser use" honesty note), pre-launch status, retention, TOS/security
  lines, companies/Clerk+Upstash processors, 8-question FAQ, contact table,
  page list.
- **`public/.well-known/api-catalog`** — JSON catalog: 4 endpoints
  (llms-compact, llms-full, sitemap, robots) with `type` + `relation` + URLs;
  contact table (support@/privacy@); org link.
- **`llms-full.txt`** — full technical reference (33 sections: identity,
  lifecycle, isolation model, comparison tables, glossary, full FAQ, site
  index). `wc -l` head read; full content strategic for SEO/AI reach.

---

## 8. Build tooling

- **`tsconfig.json`** — strict, `lib` dom+esnext, `moduleResolution bundler`,
  `jsx preserve`, Next plugin, `@/* → ./src/*`; includes `.next/types`.
- **`postcss.config.mjs`** — `["@tailwindcss/postcss"]`.
- **`eslint.config.mjs`** — FlatCompat extends `next/core-web-vitals` +
  `next/typescript`; ignores node_modules/.next/out/build/next-env.
- **`package.json`** — next 15.5.18, react 19.1.0, @supabase/supabase-js
  ^2.108.2, @upstash/redis ^1.38.0, turndown ^7.2.0, lucide-react ^1.16.0,
  clsx ^2.1.1, tailwind-merge ^3.6.0; dev: tailwindcss ^4,
  @tailwindcss/postcss ^4, eslint ^9, typescript ^5.
  Scripts: `dev`, `build`, `start`, `lint` — **no `format`, no `test`**.
- **`.env.example`** — documents Upstash REST URL/token, CONTACT_WEBHOOK_URL,
  NEXT_PUBLIC_APP_URL, Supabase URL + **service-role key** (server-only,
  never NEXT_PUBLIC), IP_HASH_SALT (openssl command shown). RLS guidance
  comment included.

---

## 9. Known follow-ups (design/config)

1. `/logo.png` + `/og-image.png` dynamic monograms should be replaced by the
   new static brand logomark (see visual plan phases).
2. `websiteSchema` SearchAction points to `/?q=` with no on-site search —
   either remove or wire up.
3. Dark-mode custom-variant + `color-scheme: light` conflict — dark is dead
   code.
4. No `format`/`test` npm scripts.
5. Sitemap timestamp staleness (see ROUTES_REFERENCE §9).
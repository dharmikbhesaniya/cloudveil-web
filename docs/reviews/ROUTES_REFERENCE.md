# web/ — Routes & Pages Reference

> Everything about routing, pages, and their metadata in the `web/` submodule.
> Part of the full session documentation; see `docs/README.md` for the index.

**Date:** 2026-09-24 · **Verified against:** build output & source.

---

## 1. Route inventory (from `npm run build`)

```
○ /                         static  (landing page, 15 kB page / 125 kB first load)
○ /contact                  static  (2.12 kB)
○ /privacy-policy           static  (182 B)
○ /terms-of-service         static  (175 B)
○ /refund-policy            static  (175 B)
○ /data-deletion            static  (175 B)
○ /apple-icon.png           static  (0 B – static file)
○ /icon.png                 static  (0 B – static file)
○ /manifest.webmanifest     static  (142 B)
○ /sitemap.xml              static  (142 B)
ƒ /logo.png                 dynamic (edge runtime, next/og)
ƒ /og-image.png             dynamic (edge runtime, next/og)
ƒ /api/contact              dynamic
ƒ /api/md                   dynamic
ƒ /api/track                dynamic
ƒ /api/waitlist             dynamic
ƒ Middleware                34.5 kB
```

- Shared JS across app: **102 kB** (chunks `255`, `4bd1b696`, + 1.93 kB).
- No build warnings/errors; `lint` clean.

---

## 2. Root layout — `src/app/layout.tsx`

**Fonts** (`next/font/google`):
- `Geist` → `--font-sans`
- `Geist_Mono` → `--font-geist-mono`
- `Instrument_Serif` (weight 400, **`style: ["normal"]`** — italic optical files
  never loaded) → `--font-display`, `display: "swap"`.

**Global metadata:**
- `metadataBase` = `https://intractify.com`; canonical `/`.
- Title template: `"%s | Intractify"`; default title
  `"Intractify — Private Cloud Browser | Browse Without a Trace"`.
- 11 keywords (cloud browser, private browser, browser isolation, ephemeral
  browser, zero-log browsing, anonymous browser cloud, remote browser
  isolation, private browsing cloud, cloud-based browser, disposable browser,
  Intractify).
- OpenGraph: 1200×630 `/og-image.png`, siteName Intractify, locale en_US.
- Twitter: `summary_large_image`, `@intractify`.
- `robots`: index+follow for all + googleBot.
- `appleWebApp` capable, black-translucent, title "Intractify".
- `other`: `theme-color #1F2C58`, `color-scheme light`,
  `mobile-web-app-capable yes`.
- Google search console `verification` left as a **comment** (not configured).

**Body composition:**
- `<html lang="en" suppressHydrationWarning>` with font classes + `antialiased`.
- `<body>` has `.noise-overlay`, `bg-background text-foreground`,
  `flex min-h-full flex-col`.
- Renders `<UTMTracker/>` then `<StructuredData data={[organizationSchema,
  websiteSchema]}/>` before `{children}`.

---

## 3. Landing page — `src/app/page.tsx`

**Metadata:** title `"Intractify — Isolated Cloud Browser | Browse Without a
Trace"`, OG trailing with "Pre-launch, join the waitlist."

**Section order (in `<main>`):**
Hero → TrustSignals → Features → ComparisonSection → HowItWorks → Stats →
PullQuote → Audience → PricingSection → FAQ → CTA.

**Structured data injected (5 objects):**
`softwareApplicationSchema`, `howItWorksSchema`, `homePageSchema`,
`definedTermSetSchema`, `generateFAQSchema(FAQ_DATA)`.

---

## 4. Static sub-pages

### `/contact` — `src/app/contact/page.tsx`
- Metadata: title `"Contact | Intractify"`, canonical `/contact`.
- Header with serif "Contact Intractify", support hours (Mon–Fri 9am–6pm IST,
  24h response).
- Left column: `<ContactForm/>`.
- Right column: Business info card (Company: Intractify Technologies,
  Registered address "Intractify Technologies, India"), Department Emails
  (support / privacy / legal), Quick Links grid (refund, privacy, terms,
  data deletion) with arrow glyphs.
- WebPage schema with breadcrumb Home → Contact.

### `/privacy-policy` — `src/app/privacy-policy/page.tsx` (505 lines)
- 12 sections: Who We Are; What Data We Collect; App Permissions (Google
  Play); How We Use Data; Data Retention; Third-Party Processors; Your Rights
  (GDPR & CCPA); Cookies; Data Deletion; Security; Changes; Contact DPO.
- Honest statements baked in: no browsing logs, first-party analytics (visitor
  ID + salted IP hash), pre-launch = no payments, containers destroyed,
  retention rules.
- WebPage + breadcrumb schema.

### `/terms-of-service` — (342 lines)
Governed by India / Gujarat courts; min age 16 (13 w/ COPPA); pre-launch no
plans/no billing; DPAs with sub-processors.

### `/refund-policy` — (243 lines)
Nothing to refund pre-launch; update-before-billing promise; erroneous-charge
correction via billing@.

### `/data-deletion` — (379 lines)
GDPR Art.17 / CCPA 1798.105 / Google Play compliance; deletion of account +
session metadata + sub-processor data; what can't be deleted (hashed fraud
identifiers up to 2 yrs); request via privacy@ with 30-day timeframe.

---

## 5. PWA manifest — `src/app/manifest.ts`

- name `"Intractify — Private Cloud Browser"`, short_name `"Intractify"`,
  `start_url: "/?source=pwa"`, `display: standalone`.
- `background_color #F4EFE3`, `theme_color #1F2C58`, lang `en`.
- categories: productivity, utilities, security.
- Icons: `/favicon/icon-192x192.png` (192, maskable) +
  `/favicon/icon-512x512.png` (512, any) — **both resolve to new static files**
  under `public/favicon/`.

---

## 6. Sitemap — `src/app/sitemap.ts`

6 URLs, all `lastModified: 2026-05-21` **(stale — flagged)**:
- `/` weekly, priority 1.0
- `/contact` monthly, 0.8
- `/privacy-policy` yearly, 0.5
- `/terms-of-service` yearly, 0.5
- `/refund-policy` yearly, 0.5
- `/data-deletion` yearly, 0.4

---

## 7. Middleware — `src/middleware.ts`

- `MARKDOWN_PAGES` set (/, privacy, terms, refund, data-deletion, contact).
- If `Accept: text/markdown` **and** path in set → rewrite to `/api/md?path=…`.
- Otherwise passthrough.
- Matcher list mirrors `MARKDOWN_PAGES`.

## 8. Image/metadata routes

- `/logo.png` → `brandImage(512)` (programmatic "I" monogram, edge runtime).
- `/og-image.png` → `openGraphImage()` (1200×630, edge runtime).
- `src/app/apple-icon.png` (180×180, static) and `src/app/icon.png`
  (512×512, static) — **new static files, no route handler** (build lists them
  as 0 B static routes).

---

## 9. Known follow-ups (routes)

1. Sitemap `lastModified` stuck at 2026-05-21 — bump.
2. `/logo.png` + `/og-image.png` are programmatic monograms, not the new brand
   asset (see `VISUAL_CONTENT_PLACEMENT_PLAN.md` §2).
3. Google `webmasterVerification` commented out.
4. No `/product` gallery route yet (proposed in visual plan).
5. Mobile menu: "Join Priority Waitlist" targets `#pricing` (fine).
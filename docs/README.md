# web/ — Docs Index

> Living index for the landing-page (`web/`) documentation. Keep this table in
> sync with the folders below.

## Review / Analysis
- `reviews/WEB_FULL_REVIEW.md` — complete line-level review: architecture,
  every route, component, API, lib module, SEO, config, security (2026-09-24).
- `reviews/ROUTES_REFERENCE.md` — every route + page + layout, with exact
  metadata, build-inventory numbers, sitemap/manifest/middleware detail.
- `reviews/API_REFERENCE.md` — exact behaviour of `/api/track`, `/api/contact`,
  `/api/waitlist`, `/api/md`, the rate limiter, Redis/Supabase clients, and the
  tracking contract (incl. IS-007 security notes).
- `reviews/COMPONENTS_WALKTHROUGH.md` — every common component + all 11
  sections with exact copy/motion/interaction details.
- `reviews/DESIGN_AND_CONFIG_REFERENCE.md` — every CSS token + 17 keyframes,
  typography system, SEO image generation, schema.org graph, AI/agent
  discovery files (robots/llms/api-catalog), and all build configs.
- `reviews/BRAND_POLISH_TASK.md` — the de-italic serif + static favicon +
  new-logomark task log; state COMPLETE, uncommitted.
- `reviews/VISUAL_CONTENT_PLACEMENT_PLAN.md` — placement of images / video /
  SVG schematics across every section; effort-ordered phases + asset recipes +
  do-not list. **Phase 1 (SVG + glass slots) implemented 2026-09-24** — see
  §3.5 for per-section status; real raster/video still pending.

## Environment
- `env/ENV_SETUP.md` — every `web/` env var, current stale `.env` state, how to
  add `SUPABASE_SERVICE_ROLE_KEY` + `IP_HASH_SALT`, prod checklist.

## History / Prior Verdicts
- `solved/Intractify_Landing_Page_Full_Verdict.md` — design review (PDF-era, 9.4/10).
- `solved/Intractify_Second_Verdict_Originality_Review.md` — originality review.

## Concepts & Research
- `uniq implementation idea/` — deep-research reports, immersive-experience
  ideas, landing-page concepts, thumb-stopping notes.
- `heroSectionSpotlight/implementation_plan.md` — "Cleanroom Air Shower"
  particle-repeller hero idea.
- `vpnVsProduactComparition/implementation_plan.md` — VPN vs Incognito vs
  Intractify comparison section plan.

## Related (parent repo)
- `../docs/Tickets/issues/IS-007-landing-site-security-and-privacy.md` — source
  of the security fixes verified in `WEB_FULL_REVIEW.md`.
- `../docs/reviews/CODE_REVIEW.md` — parent-platform open findings.
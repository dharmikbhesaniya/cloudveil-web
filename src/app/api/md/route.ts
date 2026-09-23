import { NextRequest, NextResponse } from "next/server";
import TurndownService from "turndown";

// Must match middleware.ts. Any path not in this set is refused outright.
const MARKDOWN_PAGES = new Set([
  "/",
  "/privacy-policy",
  "/terms-of-service",
  "/refund-policy",
  "/data-deletion",
  "/contact",
]);

const BASE_URL = "https://intractify.com";

const PAGE_MARKDOWN: Record<string, string> = {
  "/": `# Intractify — Private Cloud Browser Platform

> Launch a fully isolated cloud browser. Container-level isolation, zero logs. Browser destroyed when your session ends. Pre-launch — join the waitlist.

Full reference: [llms.txt](${BASE_URL}/llms.txt) | [llms-full.txt](${BASE_URL}/llms-full.txt)

## What Is Intractify

Intractify is a SaaS privacy platform that provides fully isolated cloud browser sessions. The browser runs entirely on secure cloud infrastructure — your device is only a viewer. No browsing data, history, cookies, or activity is ever stored. When your session ends, the container is permanently destroyed.

## How It Works

1. Open ${BASE_URL}/app and click "Launch a browser"
2. A fresh container boots a Chromium browser on our infrastructure
3. The session streams to your viewport over a secure WebSocket
4. Browse normally — the cloud browser is your screen, not your device
5. End the session — the container is permanently destroyed

## Pricing

Intractify is pre-launch. There are no paid plans yet and no way to purchase —
join the waitlist at the site above. Any tier or price quoted elsewhere is not current.

## Privacy Guarantees

- Container isolation: each session has its own filesystem and network namespace
- Zero persistence: no persistent volume — ephemeral by architecture
- No activity logging: URLs, passwords, screen content, input are never recorded
- Auto-terminate: sessions end on idle, tab close, or user-set hard cap

## Contact

- Support: support@intractify.com
- Privacy: privacy@intractify.com
- Security: security@intractify.com

[Privacy Policy](${BASE_URL}/privacy-policy) | [Terms of Service](${BASE_URL}/terms-of-service) | [Refund Policy](${BASE_URL}/refund-policy) | [Contact](${BASE_URL}/contact)
`,

  "/privacy-policy": `# Privacy Policy — Intractify

**Last updated:** September 23, 2026
**Canonical:** [${BASE_URL}/privacy-policy](${BASE_URL}/privacy-policy)

## What We Collect

- Account profile (name, email) via Clerk authentication
- Session metadata (start time, end time, duration), kept while your account is active
- Marketing analytics on this website: a first-party visitor ID and session ID stored in your browser's local/session storage, plus pages visited, referrer, UTM parameters, and a salted hash of your IP (the raw IP is never stored)

## What We Never Collect

- URLs visited in sessions, search queries, browsing history
- Passwords or form inputs
- Screen content, keyboard/mouse input
- Downloaded files
- Payment or billing records — Intractify is pre-launch and processes no payments

## Your Rights

GDPR (EU), CCPA (California), and Indian data protection rights apply. Contact privacy@intractify.com.

[Data Deletion Request](${BASE_URL}/data-deletion) | [Contact](${BASE_URL}/contact)
`,

  "/terms-of-service": `# Terms of Service — Intractify

**Last updated:** September 23, 2026
**Canonical:** [${BASE_URL}/terms-of-service](${BASE_URL}/terms-of-service)

## Key Terms

- Governing law: India; jurisdiction: Gujarat courts
- Minimum age: 16 (or 13 with COPPA parental consent)
- Pre-launch status: no paid plans, no subscriptions, no payment processing — you will not be charged
- If paid plans are introduced later, billing and refund terms will be updated on this page first

[Refund Policy](${BASE_URL}/refund-policy) | [Privacy Policy](${BASE_URL}/privacy-policy)
`,

  "/refund-policy": `# Refund Policy — Intractify

**Last updated:** September 23, 2026
**Canonical:** [${BASE_URL}/refund-policy](${BASE_URL}/refund-policy)

## Summary

Intractify is pre-launch. We do not accept payments, there are no paid plans or subscriptions, and no charges are made — so there is nothing to refund yet.

## When Payments Begin

When paid plans are introduced, this page will be updated with the refund eligibility rules, how to request a refund, and processing times before any payment is taken.

## Corrections and Errors

If an erroneous charge ever appears, contact billing@intractify.com and we will investigate and correct it, including refunding any incorrect charge.

Contact billing@intractify.com with questions about this policy.
`,

  "/data-deletion": `# Data Deletion Request — Intractify

**Last updated:** May 16, 2025
**Canonical:** [${BASE_URL}/data-deletion](${BASE_URL}/data-deletion)

This page is the official data deletion URL for Intractify, compliant with GDPR Article 17, CCPA Section 1798.105, and Google Play Store data safety requirements.

## What We Delete

- Account profile (name, email, photo)
- Session metadata
- All associated personal data from sub-processors (Clerk, Upstash)

## What Cannot Be Deleted

- Payment or billing records — none exist (pre-launch, no payments accepted)
- Fraud prevention records (hashed identifiers, up to 2 years)

## How to Request

Email privacy@intractify.com with subject "Data Deletion Request" and include your full name and account email.

**Timeframe:** Verified requests completed within 30 calendar days.
`,

  "/contact": `# Contact Intractify

**Canonical:** [${BASE_URL}/contact](${BASE_URL}/contact)

## Support Hours

Monday–Friday, 9am–6pm IST. Response within 24 business hours.

## Department Emails

| Department | Email | For |
|-----------|-------|-----|
| General Support | support@intractify.com | Account issues, technical problems |
| Billing | billing@intractify.com | Payment issues, refunds, invoices |
| Privacy | privacy@intractify.com | GDPR/CCPA requests, data concerns |
| Legal | legal@intractify.com | Terms, legal notices, compliance |
| Security | security@intractify.com | Vulnerability disclosures |

## Business Information

- **Company:** Intractify Technologies
- **Location:** India
- **Website:** ${BASE_URL}
`,
};

function htmlToMarkdown(html: string): string {
  // 1. Extract content between <main>...</main> (or <body>...</body>)
  let contentHtml = "";
  const mainMatch = html.match(/<main[\s\S]*?>([\s\S]*?)<\/main>/i);
  if (mainMatch) {
    contentHtml = mainMatch[1];
  } else {
    const bodyMatch = html.match(/<body[\s\S]*?>([\s\S]*?)<\/body>/i);
    contentHtml = bodyMatch ? bodyMatch[1] : html;
  }

  // 2. Setup Turndown service
  const turndownService = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
  });

  // 3. Custom rule for mapping relative links to absolute URL schemas
  turndownService.addRule("absoluteLinks", {
    filter: "a",
    replacement: function (content, node) {
      const href = (node as HTMLElement).getAttribute("href") || "";
      let absoluteHref = href;
      if (href.startsWith("/")) {
        absoluteHref = `https://intractify.com${href}`;
      }
      return `[${content.trim()}](${absoluteHref})`;
    },
  });

  // 4. Strip out unnecessary style, script, and graphics DOM wrappers
  ["script", "style", "svg", "iframe", "noscript", "head"].forEach((tag) => {
    turndownService.remove(tag as TurndownService.Filter);
  });

  // 5. Convert HTML content to clean Markdown string
  let markdown = turndownService.turndown(contentHtml);

  // 6. Post-processing normalization of excess spacing/newlines
  markdown = markdown
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return markdown;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") ?? "/";

  // Strict allowlist. The previous check rejected any path containing a dot,
  // which stopped dotted hostnames but not single-label ones — so
  // `?path=//localhost:6379/` resolved through new URL() to a different host,
  // was fetched server-side, and its body was returned to the caller. That is an
  // SSRF; see docs/Tickets/issues/IS-007.
  //
  // An allowlist is used rather than a smarter parser because the set of valid
  // paths is small, fixed, and already declared in middleware.ts. There is no
  // input here that needs to be clever about.
  if (!MARKDOWN_PAGES.has(path)) {
    return NextResponse.json({ error: "Invalid path target" }, { status: 400 });
  }

  let markdown = "";
  let isDynamic = false;

  try {
    const targetUrl = new URL(path, BASE_URL).toString();
    const fetchResponse = await fetch(targetUrl, {
      headers: {
        "Accept": "text/html",
      },
      signal: AbortSignal.timeout(5000),
    });

    if (fetchResponse.ok) {
      const html = await fetchResponse.text();
      markdown = htmlToMarkdown(html);
      isDynamic = true;
    }
  } catch (err) {
    console.error(`Dynamic markdown generation failed for path ${path}:`, err);
  }

  // Fallback to static pre-rendered markdown if dynamic retrieval fails
  if (!markdown) {
    markdown = PAGE_MARKDOWN[path] ?? PAGE_MARKDOWN["/"];
  }

  const tokenCount = Math.ceil(markdown.length / 4);

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(tokenCount),
      "x-markdown-dynamic": String(isDynamic),
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "Vary": "Accept",
    },
  });
}

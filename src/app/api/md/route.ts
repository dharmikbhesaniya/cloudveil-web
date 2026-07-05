import { NextRequest, NextResponse } from "next/server";
import TurndownService from "turndown";

const BASE_URL = "https://intractify.com";

const PAGE_MARKDOWN: Record<string, string> = {
  "/": `# Intractify — Private Cloud Browser Platform

> Launch a fully isolated cloud browser in under 5 seconds. Container-level isolation, zero fingerprint, zero logs. Browser destroyed when your session ends. Free to start.

Full reference: [llms.txt](${BASE_URL}/llms.txt) | [llms-full.txt](${BASE_URL}/llms-full.txt)

## What Is Intractify

Intractify is a SaaS privacy platform that provides fully isolated cloud browser sessions. The browser runs entirely on secure cloud infrastructure — your device is only a viewer. No browsing data, history, cookies, or activity is ever stored. When your session ends, the container is permanently destroyed.

## How It Works

1. Open ${BASE_URL}/app and click "Launch a browser"
2. A fresh ECS task boots a stripped Chromium with randomized fingerprints
3. The session streams to your viewport over WebRTC in under 5 seconds
4. Browse normally — the cloud browser is your screen, not your device
5. End the session — the container is permanently destroyed

## Pricing (INR, 2026)

| Plan | Price | Sessions | Duration | Concurrent |
|------|-------|----------|----------|------------|
| Free | ₹0/mo | 5 shared | 10 min | 1 |
| Starter | ₹499/mo | 30 shared + 10 dedicated | 30 min | 1 |
| Pro | ₹1,999/mo | 100 shared + 50 dedicated | 60 min | 3 |
| Enterprise | Custom | Unlimited | Custom | 10+ |

## Privacy Guarantees

- Container isolation: each session has its own kernel namespace, filesystem, and network
- Anti-fingerprinting: canvas, WebGL, audio, fonts, timing randomized per session
- Zero persistence: no persistent volume — ephemeral by architecture
- No activity logging: URLs, passwords, screen content, input are never recorded
- Auto-terminate: sessions end on idle, tab close, or user-set hard cap

## Contact

- Support: support@intractify.com
- Billing: billing@intractify.com
- Privacy: privacy@intractify.com
- Security: security@intractify.com

[Privacy Policy](${BASE_URL}/privacy-policy) | [Terms of Service](${BASE_URL}/terms-of-service) | [Refund Policy](${BASE_URL}/refund-policy) | [Contact](${BASE_URL}/contact)
`,

  "/privacy-policy": `# Privacy Policy — Intractify

**Last updated:** May 16, 2025
**Canonical:** [${BASE_URL}/privacy-policy](${BASE_URL}/privacy-policy)

## What We Collect

- Account profile (name, email) via Clerk authentication
- Session metadata (start time, end time, duration) for billing — 90-day retention
- Financial transaction records — 7-year retention (India GST)

## What We Never Collect

- URLs visited, search queries, browsing history
- Passwords or form inputs
- Screen content, keyboard/mouse input
- Cookies, local storage, downloaded files

## Your Rights

GDPR (EU), CCPA (California), and Indian data protection rights apply. Contact privacy@intractify.com.

[Data Deletion Request](${BASE_URL}/data-deletion) | [Contact](${BASE_URL}/contact)
`,

  "/terms-of-service": `# Terms of Service — Intractify

**Last updated:** May 16, 2025
**Canonical:** [${BASE_URL}/terms-of-service](${BASE_URL}/terms-of-service)

## Key Terms

- Governing law: India; jurisdiction: Gujarat courts
- Minimum age: 16 (or 13 with COPPA parental consent)
- Payment processor: Cashfree Payments India Pvt. Ltd.
- Monthly billing, cancel anytime, 7-day refund window for new subscribers

[Refund Policy](${BASE_URL}/refund-policy) | [Privacy Policy](${BASE_URL}/privacy-policy)
`,

  "/refund-policy": `# Refund & Cancellation Policy — Intractify

**Last updated:** May 16, 2025
**Canonical:** [${BASE_URL}/refund-policy](${BASE_URL}/refund-policy)

## Summary

Cancel anytime. New subscribers can request a full refund within 7 days if the service has not been significantly used (≤ 3 sessions). Refunds processed within 5–7 business days.

## Eligibility

- **Monthly — 7-day window:** First subscription only, ≤ 3 sessions used
- **Annual — pro-rated within 3 months:** Unused whole months minus 10% fee
- **Service outage >24h:** Pro-rated credit for affected period

## Non-Refundable

Requests after 7-day window, suspended accounts, renewals, annual plans after 3 months, Enterprise contracts.

Contact billing@intractify.com with subject "Refund Request — [Order ID]".
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

- Financial transaction records (7-year legal retention — India GST)
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

  // Prevent routing request loops or file path injection
  if (path.startsWith("/api") || path.includes(".")) {
    return NextResponse.json({ error: "Invalid path target" }, { status: 400 });
  }

  let markdown = "";
  let isDynamic = false;

  try {
    const targetUrl = new URL(path, request.url).toString();
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

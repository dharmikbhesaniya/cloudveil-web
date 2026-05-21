import type { Metadata } from "next";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { StructuredData } from "@/lib/seo/structured-data";
import { generateWebPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Data Deletion Request — GDPR & Google Play Compliant | Intractify",
  description:
    "Request deletion of your Intractify account and associated data. GDPR/CCPA/Google Play compliant. Verified and completed within 30 days. Email privacy@intractify.com.",
  alternates: { canonical: "https://intractify.com/data-deletion" },
  openGraph: {
    title: "Data Deletion Request — GDPR & Google Play Compliant | Intractify",
    description:
      "Request deletion of your Intractify account and data. Completed within 30 days. GDPR/CCPA/Google Play compliant.",
    url: "https://intractify.com/data-deletion",
    type: "website",
  },
};

const pageSchema = generateWebPageSchema({
  name: "Data Deletion Request — GDPR & Google Play Compliant",
  description:
    "Request deletion of your Intractify account and data. Completed within 30 days. GDPR, CCPA, and Google Play data safety compliant.",
  url: "https://intractify.com/data-deletion",
  breadcrumb: [
    { name: "Home", url: "https://intractify.com" },
    { name: "Data Deletion", url: "https://intractify.com/data-deletion" },
  ],
});

export default function DataDeletionPage() {
  return (
    <>
      <StructuredData data={pageSchema} />
      <Navbar />
      <main
        id="main-content"
        className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[var(--cv-ink-subtle)]">
            Your Rights
          </p>
          <h1
            className="text-4xl font-bold text-[var(--cv-ink)] sm:text-5xl"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontStyle: "italic",
            }}
          >
            Data Deletion Request
          </h1>
          <p className="mt-3 text-sm text-[var(--cv-ink-subtle)]">
            Last updated: May 16, 2025
          </p>
        </div>

        {/* Google Play / App Store note */}
        <div
          className="mb-8 rounded-2xl p-5"
          style={{
            background: "rgba(107,76,255,0.04)",
            border: "1px solid rgba(107,76,255,0.15)",
          }}
        >
          <p className="text-sm font-medium text-[var(--cv-ink-muted)]">
            This page exists to comply with Google Play Console data safety
            requirements and app store data deletion policies. If you installed
            Intractify from the Google Play Store, this is the official page to
            request deletion of your account and associated data.
          </p>
        </div>

        <div className="space-y-10 text-[var(--cv-ink-muted)]">

          {/* 1. What Data We Store */}
          <section aria-labelledby="deletion-what-we-store">
            <h2
              id="deletion-what-we-store"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              1. What Data Intractify Stores About You
            </h2>
            <p className="mb-3 text-sm leading-relaxed">
              Before requesting deletion, it is important to understand what data
              we actually hold. Intractify is designed to minimise data collection:
            </p>
            <ul className="ml-5 list-disc space-y-2 text-sm leading-relaxed">
              <li>
                <strong>Account profile (via Clerk):</strong> Your name, email
                address, and profile photo as provided when you created your
                account. This is the primary personal data we hold.
              </li>
              <li>
                <strong>Subscription status:</strong> Your current plan (Free,
                Pro, Enterprise) and billing history (for legally required
                financial record-keeping).
              </li>
              <li>
                <strong>Session count:</strong> A running count of sessions used
                in the current billing period, used for quota enforcement. This
                is a number only — it does not contain any browsing data.
              </li>
              <li>
                <strong>What we do NOT store:</strong> Intractify does not store
                your browsing history, URLs visited, search queries, cookies,
                page content, screenshots, or any content from inside a browser
                session. This data is architecturally impossible for us to
                collect because containers are ephemeral and have no persistent
                storage.
              </li>
            </ul>
          </section>

          {/* 2. How to Request */}
          <section aria-labelledby="deletion-how-to-request">
            <h2
              id="deletion-how-to-request"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              2. How to Request Data Deletion
            </h2>
            <p className="mb-4 text-sm leading-relaxed">
              You can request deletion of your Intractify account and all
              associated personal data through two methods:
            </p>

            <div className="mb-6">
              <h3 className="mb-3 text-base font-semibold text-[var(--cv-ink)]">
                Option A: Submit a Request via Email
              </h3>
              <p className="mb-3 text-sm leading-relaxed">
                Send an email to{" "}
                <a
                  href="mailto:privacy@intractify.com"
                  className="text-[var(--cv-indigo)] hover:underline"
                >
                  privacy@intractify.com
                </a>{" "}
                with the subject line <strong>&ldquo;Data Deletion Request&rdquo;</strong>
                and include:
              </p>
              <ul className="ml-5 list-disc space-y-1 text-sm leading-relaxed">
                <li>Your full name</li>
                <li>The email address associated with your Intractify account</li>
                <li>A brief reason for the request (optional)</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-base font-semibold text-[var(--cv-ink)]">
                Option B: Use the Request Form Below
              </h3>
              <form
                action="mailto:privacy@intractify.com"
                method="get"
                encType="text/plain"
                className="space-y-4"
                aria-label="Data deletion request form"
              >
                <div>
                  <label
                    htmlFor="deletion-name"
                    className="mb-1.5 block text-sm font-medium text-[var(--cv-ink-muted)]"
                  >
                    Full Name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="deletion-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your full name"
                    className="w-full rounded-xl px-4 py-3 text-sm text-[var(--cv-ink)] placeholder:text-[var(--cv-ink-subtle)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cv-indigo)]"
                    style={{
                      background: "var(--cv-glass)",
                      border: "1px solid var(--cv-border)",
                      backdropFilter: "blur(8px)",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="deletion-email"
                    className="mb-1.5 block text-sm font-medium text-[var(--cv-ink-muted)]"
                  >
                    Account Email Address <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="deletion-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="The email on your Intractify account"
                    className="w-full rounded-xl px-4 py-3 text-sm text-[var(--cv-ink)] placeholder:text-[var(--cv-ink-subtle)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cv-indigo)]"
                    style={{
                      background: "var(--cv-glass)",
                      border: "1px solid var(--cv-border)",
                      backdropFilter: "blur(8px)",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="deletion-reason"
                    className="mb-1.5 block text-sm font-medium text-[var(--cv-ink-muted)]"
                  >
                    Reason (optional)
                  </label>
                  <textarea
                    id="deletion-reason"
                    name="body"
                    rows={3}
                    placeholder="Why are you requesting deletion? (optional)"
                    className="w-full resize-y rounded-xl px-4 py-3 text-sm text-[var(--cv-ink)] placeholder:text-[var(--cv-ink-subtle)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cv-indigo)]"
                    style={{
                      background: "var(--cv-glass)",
                      border: "1px solid var(--cv-border)",
                      backdropFilter: "blur(8px)",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cv-indigo)] focus-visible:ring-offset-2"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--cv-indigo) 0%, #8B5CF6 100%)",
                  }}
                >
                  Submit Deletion Request
                </button>
              </form>
            </div>
          </section>

          {/* 3. What Happens Next */}
          <section aria-labelledby="deletion-what-happens">
            <h2
              id="deletion-what-happens"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              3. What Happens After You Submit a Request
            </h2>
            <ol className="ml-5 list-decimal space-y-3 text-sm leading-relaxed">
              <li>
                <strong>Acknowledgement (within 2 business days):</strong> We
                will send a confirmation email acknowledging receipt of your
                deletion request and verifying your identity.
              </li>
              <li>
                <strong>Identity verification:</strong> To protect your account
                from unauthorised deletion, we may ask you to verify ownership
                by clicking a link sent to your registered email address.
              </li>
              <li>
                <strong>Data deletion (within 30 days):</strong> After
                verification, we will delete your account profile, session
                metadata, and all associated personal data from our systems and
                from our sub-processors (Clerk, Upstash) within 30 days.
              </li>
              <li>
                <strong>Confirmation email:</strong> Once deletion is complete,
                we will send you a final confirmation that your data has been
                erased.
              </li>
            </ol>
          </section>

          {/* 4. What Cannot Be Deleted */}
          <section aria-labelledby="deletion-exceptions">
            <h2
              id="deletion-exceptions"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              4. Data That Cannot Be Deleted
            </h2>
            <p className="mb-3 text-sm leading-relaxed">
              Certain records must be retained by law, even after a deletion
              request:
            </p>
            <ul className="ml-5 list-disc space-y-2 text-sm leading-relaxed">
              <li>
                <strong>Financial transaction records:</strong> Payment
                transaction records (order IDs, amounts, dates) are legally
                required to be retained for 7 years under Indian financial
                regulations and Goods and Services Tax (GST) law. These records
                do not contain browsing data or personal content.
              </li>
              <li>
                <strong>Fraud prevention records:</strong> If your account was
                involved in confirmed fraud or security incidents, minimal records
                (hashed identifiers) may be retained for up to 2 years to prevent
                re-registration.
              </li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed">
              All other personal data, including your name, email, profile, and
              session metadata, will be permanently and irrecoverably deleted
              within 30 days of your verified request.
            </p>
          </section>

          {/* 5. Timeframe */}
          <section aria-labelledby="deletion-timeframe">
            <h2
              id="deletion-timeframe"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              5. Deletion Timeframe
            </h2>
            <p className="text-sm leading-relaxed">
              Intractify commits to processing all verified data deletion requests
              within <strong>30 calendar days</strong> of identity verification.
              This timeframe complies with GDPR Article 17, CCPA Section 1798.105,
              and Google Play Store data safety requirements. If we are unable to
              process the request within 30 days (for example, due to exceptional
              volume), we will notify you with the reason and a revised timeline.
            </p>
          </section>

          {/* 6. Google Play Compliance */}
          <section aria-labelledby="deletion-google-play">
            <h2
              id="deletion-google-play"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              6. Google Play Store &amp; App Data Safety Compliance
            </h2>
            <p className="text-sm leading-relaxed">
              This page serves as the official data deletion URL for Intractify
              applications distributed through the Google Play Store, in
              compliance with Google Play&apos;s data safety section requirements.
              Users who installed Intractify via Google Play can use this page to
              request deletion of their account and all associated data,
              regardless of whether the account was created on a mobile device
              or via the web. The data types collected by Intractify mobile apps
              (account info, app activity) are described in our{" "}
              <a
                href="/privacy-policy#privacy-app-permissions"
                className="text-[var(--cv-indigo)] hover:underline"
              >
                Privacy Policy — App Permissions section
              </a>
              .
            </p>
          </section>

          {/* 7. Contact */}
          <section aria-labelledby="deletion-contact">
            <h2
              id="deletion-contact"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              7. Contact Our Privacy Team
            </h2>
            <p className="text-sm leading-relaxed">
              For any questions about data deletion or your privacy rights,
              contact us at{" "}
              <a
                href="mailto:privacy@intractify.com"
                className="text-[var(--cv-indigo)] hover:underline"
              >
                privacy@intractify.com
              </a>
              . We respond within 2 business days.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

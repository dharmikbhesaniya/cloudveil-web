import type { Metadata } from "next";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { StructuredData } from "@/lib/seo/structured-data";
import { generateWebPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Refund Policy — Pre-Launch (No Payments Yet) | Intractify",
  description:
    "Intractify is pre-launch and does not accept payments, so there is nothing to refund yet. This page will be updated if paid plans are introduced.",
  alternates: { canonical: "https://intractify.com/refund-policy" },
  openGraph: {
    title: "Refund Policy — Pre-Launch (No Payments Yet) | Intractify",
    description:
      "Intractify is pre-launch and does not accept payments, so there is nothing to refund yet.",
    url: "https://intractify.com/refund-policy",
    type: "website",
  },
};

const pageSchema = generateWebPageSchema({
  name: "Refund Policy — Pre-Launch (No Payments Yet)",
  description:
    "Intractify is pre-launch and does not accept payments, so there is nothing to refund yet.",
  url: "https://intractify.com/refund-policy",
  breadcrumb: [
    { name: "Home", url: "https://intractify.com" },
    { name: "Refund Policy", url: "https://intractify.com/refund-policy" },
  ],
});

export default function RefundPolicyPage() {
  return (
    <>
      <StructuredData data={pageSchema} />
      <Navbar />
      <main
        id="main-content"
        className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6 lg:px-8"
      >
        <div className="mb-10">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[var(--cv-ink-subtle)]">
            Legal
          </p>
          <h1
            className="text-4xl font-bold text-[var(--cv-ink)] sm:text-5xl"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontStyle: "italic",
            }}
          >
            Refund Policy
          </h1>
          <p className="mt-3 text-sm text-[var(--cv-ink-subtle)]">
            Last updated: September 23, 2026
          </p>
        </div>

        <div
          className="mb-8 rounded-2xl p-5"
          style={{
            background: "rgba(107,76,255,0.05)",
            border: "1px solid rgba(107,76,255,0.15)",
          }}
        >
          <p className="text-sm leading-relaxed text-[var(--cv-ink-muted)]">
<strong className="text-[var(--cv-ink)]">Summary:</strong>{" "}
              Intractify is in pre-launch. We do not accept payments, there are
              no paid plans or subscriptions, and no charges are made — so there
              is nothing to refund yet. If paid plans are introduced, refund
              terms will be added to this page. For questions, email{" "}
            <a
              href="mailto:billing@intractify.com"
              className="text-[var(--cv-indigo)] hover:underline"
            >
              billing@intractify.com
            </a>
            .
          </p>
        </div>

        <div className="space-y-10 text-[var(--cv-ink-muted)]">

          {/* 1. Pre-Launch Status */}
          <section aria-labelledby="refund-digital">
            <h2
              id="refund-digital"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              1. Pre-Launch Status
            </h2>
            <p className="text-sm leading-relaxed">
              Intractify is a digital Software-as-a-Service (SaaS) product now in
              pre-launch. No physical goods are shipped. During pre-launch we do
              not accept payments: there are no paid plans, no subscriptions, and
              no transactions. You will not be charged for using the service, and
              no billing or tax records relating to you are created.
            </p>
          </section>

          {/* 2. Cancellation */}
          <section aria-labelledby="refund-cancellation">
            <h2
              id="refund-cancellation"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              2. Cancellation
            </h2>
            <p className="text-sm leading-relaxed">
              There are no subscriptions to cancel: Intractify does not accept
              payments and no recurring charges exist. You may stop using the
              service at any time and delete your account through our{" "}
              <a
                href="/data-deletion"
                className="text-[var(--cv-indigo)] hover:underline"
              >
                Data Deletion page
              </a>
              . No fees or penalties apply.
            </p>
          </section>

          {/* 3. Refunds */}
          <section aria-labelledby="refund-eligibility">
            <h2
              id="refund-eligibility"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              3. Refunds
            </h2>
            <p className="text-sm leading-relaxed">
              There is nothing to refund yet — no payments are accepted and no
              charges are made to you. When paid plans are introduced, this
              section will set out the refund eligibility rules for those plans,
              and those details will be published on this page before any payment
              is taken.
            </p>
          </section>

          {/* 4. Corrections and Errors */}
          <section aria-labelledby="refund-no-refund">
            <h2
              id="refund-no-refund"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              4. Corrections and Errors
            </h2>
            <p className="text-sm leading-relaxed">
              Because we do not accept payments during pre-launch, there are no
              charges that could be disputed. If an erroneous charge nonetheless
              appears on your account or your card statement, or if we make a
              mistake that costs you money, contact us at{" "}
              <a
                href="mailto:billing@intractify.com"
                className="text-[var(--cv-indigo)] hover:underline"
              >
                billing@intractify.com
              </a>{" "}
              and we will investigate promptly and correct the error, including
              refunding any incorrect charge.
            </p>
          </section>

          {/* 5. When Payments Begin */}
          <section aria-labelledby="refund-how-to">
            <h2
              id="refund-how-to"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              5. When Payments Begin
            </h2>
            <p className="text-sm leading-relaxed">
              When Intractify launches paid plans, this page will be updated with
              the refund policy for those plans, including how to request a
              refund and how long processing takes. Before any paid launch, we
              will notify existing users of the effective date and terms. The
              same details will be available on request at{" "}
              <a
                href="mailto:billing@intractify.com"
                className="text-[var(--cv-indigo)] hover:underline"
              >
                billing@intractify.com
              </a>
              .
            </p>
          </section>

          {/* 6. Processing Time */}
          <section aria-labelledby="refund-processing">
            <h2
              id="refund-processing"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              6. Refund Processing Time
            </h2>
            <p className="text-sm leading-relaxed">
              No refunds are currently processed because no payments are accepted.
              When paid plans are introduced, this section will describe how long
              refunds take to be approved and credited back to you.
            </p>
          </section>

          {/* 7. Payment Processor */}
          <section aria-labelledby="refund-processor">
            <h2
              id="refund-processor"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              7. Payment Processing
            </h2>
            <p className="text-sm leading-relaxed">
              Intractify does not currently use a payment processor: during
              pre-launch there is nothing to pay for and no charges are made. If
              a payment processor is engaged at launch, its name and details will
              be published here and in our Privacy Policy.
            </p>
          </section>

          {/* 8. Contact */}
          <section aria-labelledby="refund-contact">
            <h2
              id="refund-contact"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              8. Contact Us
            </h2>
            <p className="text-sm leading-relaxed">
              For any questions about this policy, contact us at{" "}
              <a
                href="mailto:billing@intractify.com"
                className="text-[var(--cv-indigo)] hover:underline"
              >
                billing@intractify.com
              </a>
              . We aim to respond within 1 business day (Monday–Friday, 9am–6pm
              IST).
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

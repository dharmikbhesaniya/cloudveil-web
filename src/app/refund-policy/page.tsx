import type { Metadata } from "next";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Intractify",
  description: "Intractify refund and cancellation policy for subscriptions.",
};

export default function RefundPolicyPage() {
  return (
    <>
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
            Refund &amp; Cancellation Policy
          </h1>
          <p className="mt-3 text-sm text-[var(--cv-ink-subtle)]">
            Last updated: May 16, 2025
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
            <strong className="text-[var(--cv-ink)]">Summary:</strong> You may
            cancel anytime and keep access until the end of your billing period.
            New subscribers can request a full refund within 7 days if the
            service has not been significantly used. Refunds are processed within
            5–7 business days. For questions, email{" "}
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

          {/* 1. Digital Service */}
          <section aria-labelledby="refund-digital">
            <h2
              id="refund-digital"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              1. Nature of the Service
            </h2>
            <p className="text-sm leading-relaxed">
              Intractify is a digital Software-as-a-Service (SaaS) product. No
              physical goods are shipped. Upon successful payment, you receive
              immediate access to the features of your chosen plan. All
              transactions are processed by Cashfree Payments India Pvt. Ltd.
              (&ldquo;Cashfree&rdquo;), our authorised payment gateway. By subscribing,
              you acknowledge the digital nature of the product and agree to this
              refund policy.
            </p>
          </section>

          {/* 2. Cancellation */}
          <section aria-labelledby="refund-cancellation">
            <h2
              id="refund-cancellation"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              2. Subscription Cancellation
            </h2>
            <p className="text-sm leading-relaxed">
              You may cancel your Intractify subscription at any time by visiting
              the Billing section of your account dashboard and clicking
              &ldquo;Cancel Subscription&rdquo;. Upon cancellation:
            </p>
            <ul className="ml-5 mt-3 list-disc space-y-2 text-sm leading-relaxed">
              <li>
                Your subscription will not renew at the end of the current
                billing period.
              </li>
              <li>
                You will retain full access to your plan features until the end
                of the paid billing period.
              </li>
              <li>
                No cancellation fees are charged for any plan.
              </li>
              <li>
                Your account data will be retained for 30 days after cancellation
                in case you wish to reactivate, then deleted in accordance with
                our Privacy Policy.
              </li>
            </ul>
          </section>

          {/* 3. Refund Eligibility */}
          <section aria-labelledby="refund-eligibility">
            <h2
              id="refund-eligibility"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              3. Refund Eligibility
            </h2>
            <p className="mb-3 text-sm leading-relaxed">
              We offer refunds under the following conditions:
            </p>
            <ul className="ml-5 list-disc space-y-3 text-sm leading-relaxed">
              <li>
                <strong>7-day refund window for new monthly subscribers:</strong>{" "}
                If you subscribe to the Pro plan for the first time and request a
                refund within 7 days of your initial payment, you are eligible
                for a full refund, provided you have not used more than 3
                sessions during that period. This is a one-time offer for first
                subscriptions only.
              </li>
              <li>
                <strong>Annual plan partial refunds:</strong> If you subscribe to
                an annual plan and cancel within 3 months of your annual payment,
                you may be eligible for a pro-rated refund for unused whole
                months (calculated from the date of your cancellation request),
                minus a 10% processing fee. After 3 months, annual plans are
                non-refundable.
              </li>
              <li>
                <strong>Service outages:</strong> If Intractify experiences a
                verified service outage affecting your ability to use the service
                for more than 24 continuous hours within a billing period, you
                may request a pro-rated credit for the affected period.
              </li>
            </ul>
          </section>

          {/* 4. No Refund Situations */}
          <section aria-labelledby="refund-no-refund">
            <h2
              id="refund-no-refund"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              4. Non-Refundable Situations
            </h2>
            <p className="mb-3 text-sm leading-relaxed">
              Refunds will not be issued in the following circumstances:
            </p>
            <ul className="ml-5 list-disc space-y-2 text-sm leading-relaxed">
              <li>
                Requests made after the 7-day refund window has expired for
                monthly plans
              </li>
              <li>
                Accounts that have been suspended for violation of our Acceptable
                Use Policy
              </li>
              <li>
                Free plan accounts (the Free tier has no associated charge)
              </li>
              <li>
                Renewals — only the first billing period of a new subscription is
                eligible for the 7-day refund; renewals are not eligible
              </li>
              <li>
                Annual plans cancelled after 3 months of the subscription
                start date
              </li>
              <li>
                Enterprise plan subscriptions (Enterprise contracts are governed
                by separate agreements with their own cancellation terms)
              </li>
            </ul>
          </section>

          {/* 5. How to Request */}
          <section aria-labelledby="refund-how-to">
            <h2
              id="refund-how-to"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              5. How to Request a Refund
            </h2>
            <p className="mb-3 text-sm leading-relaxed">
              To request a refund, email{" "}
              <a
                href="mailto:billing@intractify.com"
                className="text-[var(--cv-indigo)] hover:underline"
              >
                billing@intractify.com
              </a>{" "}
              with:
            </p>
            <ul className="ml-5 list-disc space-y-2 text-sm leading-relaxed">
              <li>Subject line: &ldquo;Refund Request — [Your Order ID]&rdquo;</li>
              <li>Your registered email address</li>
              <li>The Cashfree Order ID from your payment receipt</li>
              <li>A brief reason for the refund request</li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed">
              We will acknowledge your request within 1 business day and process
              eligible refunds within 5–7 business days. The refund will be
              returned to the original payment method used at checkout.
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
              Once a refund is approved, Cashfree (our payment processor) will
              process the refund within 5–7 business days. Depending on your
              bank or card issuer, the credit may take an additional 3–5 business
              days to appear on your statement. Total time from approval to
              receipt: typically 7–14 business days. We will notify you by email
              when the refund has been initiated.
            </p>
          </section>

          {/* 7. Payment Processor */}
          <section aria-labelledby="refund-processor">
            <h2
              id="refund-processor"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              7. Payment Processor
            </h2>
            <p className="text-sm leading-relaxed">
              All payments for Intractify subscriptions are processed by Cashfree
              Payments India Pvt. Ltd. (CIN: U74999KA2015PTC082912), a licensed
              payment aggregator regulated by the Reserve Bank of India.
              Intractify does not store payment card information. If you have a
              dispute regarding a charge processed by Cashfree, you may also
              contact your card issuer directly. For Cashfree-related payment
              issues, you can reach Cashfree support at cashfree.com/contact.
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
              For any billing or refund questions, contact us at{" "}
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

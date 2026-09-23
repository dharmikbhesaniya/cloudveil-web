import type { Metadata } from "next";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { StructuredData } from "@/lib/seo/structured-data";
import { generateWebPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Terms of Service — Intractify Usage Terms & Conditions",
  description:
    "Intractify Terms of Service covering acceptable use, pre-launch service status, liability limits, and governing law. Minimum age 16. Governed by Indian law.",
  alternates: { canonical: "https://intractify.com/terms-of-service" },
  openGraph: {
    title: "Terms of Service — Intractify Usage Terms & Conditions",
    description:
      "Intractify Terms of Service covering acceptable use, pre-launch service status, liability limits, and governing law.",
    url: "https://intractify.com/terms-of-service",
    type: "website",
  },
};

const pageSchema = generateWebPageSchema({
  name: "Terms of Service — Intractify Usage Terms & Conditions",
  description:
    "Intractify Terms of Service covering acceptable use, pre-launch service status, liability limits, and governing law.",
  url: "https://intractify.com/terms-of-service",
  breadcrumb: [
    { name: "Home", url: "https://intractify.com" },
    { name: "Terms of Service", url: "https://intractify.com/terms-of-service" },
  ],
});

export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-[var(--cv-ink-subtle)]">
            Last updated: September 23, 2026
          </p>
        </div>

        <div className="space-y-10 text-[var(--cv-ink-muted)]">

          {/* 1. Acceptance */}
          <section aria-labelledby="tos-acceptance">
            <h2
              id="tos-acceptance"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              1. Acceptance of Terms
            </h2>
            <p className="text-sm leading-relaxed">
              By accessing or using the Intractify platform (available at
              intractify.com and app.intractify.com), you agree to be bound by
              these Terms of Service and our Privacy Policy. If you do not agree
              to these terms, do not use our service. These terms constitute a
              legally binding agreement between you and Intractify Technologies,
              a company incorporated in India (&ldquo;Intractify&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;).
            </p>
          </section>

          {/* 2. Service Description */}
          <section aria-labelledby="tos-service">
            <h2
              id="tos-service"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              2. Service Description
            </h2>
            <p className="text-sm leading-relaxed">
              Intractify provides a Software-as-a-Service (SaaS) cloud browser
              platform. The service allows you to launch isolated, ephemeral
              browser sessions running in cloud infrastructure managed by
              Intractify. Sessions are streamed to your device over an encrypted
              connection. Intractify is a digital service — no physical goods are
              delivered. All features described on our website are provided as
              software capabilities accessible through your web browser or our
              mobile application.
            </p>
            <p className="mt-3 text-sm leading-relaxed">
              Intractify is currently in pre-launch. The service is provided free
              of charge, there are no paid plans, and we do not accept payments.
              If we introduce paid plans, we will update these Terms first.
            </p>
          </section>

          {/* 3. Acceptable Use */}
          <section aria-labelledby="tos-acceptable-use">
            <h2
              id="tos-acceptable-use"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              3. Acceptable Use Policy
            </h2>
            <p className="mb-3 text-sm leading-relaxed">
              You agree to use Intractify only for lawful purposes. You must not:
            </p>
            <ul className="ml-5 list-disc space-y-2 text-sm leading-relaxed">
              <li>
                Use the service for any illegal activity under applicable law
              </li>
              <li>
                Use the service to access, download, or distribute child sexual
                abuse material or any other illegal content
              </li>
              <li>
                Use the service to conduct automated large-scale web scraping for
                commercial resale without the consent of the scraped websites
              </li>
              <li>
                Use the service to send spam, conduct phishing attacks, or
                distribute malware
              </li>
              <li>
                Attempt to circumvent, reverse-engineer, or interfere with the
                Intractify platform infrastructure
              </li>
              <li>
                Share account credentials with others or allow third parties to
                use your account
              </li>
              <li>
                Violate the intellectual property rights of any third party
              </li>
              <li>
                Use the service in a manner that imposes an unreasonable load on
                our infrastructure (e.g., scripted session abuse)
              </li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed">
              Intractify reserves the right to suspend or terminate accounts
              that violate this policy.
            </p>
          </section>

          {/* 4. Account Responsibilities */}
          <section aria-labelledby="tos-account">
            <h2
              id="tos-account"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              4. Account Responsibilities
            </h2>
            <p className="text-sm leading-relaxed">
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities that occur under your
              account. You must provide accurate registration information and
              promptly notify us of any unauthorised use of your account at{" "}
              <a
                href="mailto:support@intractify.com"
                className="text-[var(--cv-indigo)] hover:underline"
              >
                support@intractify.com
              </a>
              . You must be at least 16 years of age to use Intractify (or 13
              years if COPPA applies and you have verifiable parental consent).
            </p>
          </section>

          {/* 5. Pre-Launch Status */}
          <section aria-labelledby="tos-payment">
            <h2
              id="tos-payment"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              5. Pre-Launch Status and Future Payments
            </h2>
            <p className="mb-3 text-sm leading-relaxed">
              Intractify is in pre-launch. There are no paid plans, no
              subscriptions, and no payment processing. You will not be charged
              for using the service. If we introduce paid plans in the future, we
              will update these Terms and our Refund Policy at least 30 days
              before any charge applies, including the price, billing terms, and
              applicable taxes, and you may choose whether to continue using the
              service.
            </p>
          </section>

          {/* 6. Cancellation */}
          <section aria-labelledby="tos-cancellation">
            <h2
              id="tos-cancellation"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              6. Cancellation and Refunds
            </h2>
            <p className="text-sm leading-relaxed">
              There is nothing to cancel or refund today: Intractify does not
              accept payments and no charges are made. You may stop using the
              service or delete your account at any time. If paid plans are
              introduced, cancellation and refund terms will be set out in our{" "}
              <a
                href="/refund-policy"
                className="text-[var(--cv-indigo)] hover:underline"
              >
                Refund Policy
              </a>
              .
            </p>
          </section>

          {/* 7. Intellectual Property */}
          <section aria-labelledby="tos-ip">
            <h2
              id="tos-ip"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              7. Intellectual Property
            </h2>
            <p className="text-sm leading-relaxed">
              All rights, title, and interest in and to the Intractify platform,
              including its software, design, trademarks, and documentation, are
              owned by Intractify Technologies. You are granted a limited,
              non-exclusive, non-transferable licence to use the service while
              you have an account with us. You may not copy, modify, distribute,
              sell, or sublicense the Intractify software.
            </p>
          </section>

          {/* 8. Limitation of Liability */}
          <section aria-labelledby="tos-liability">
            <h2
              id="tos-liability"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              8. Limitation of Liability
            </h2>
            <p className="text-sm leading-relaxed">
              To the maximum extent permitted by applicable law, Intractify
              Technologies and its officers, directors, employees, and agents
              will not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising from your use of the
              service. Intractify&apos;s total cumulative liability to you for any
              claim arising from these terms or your use of the service shall not
              exceed the amount you have paid to Intractify in the 3 months
              preceding the claim. Because the service is free during pre-launch
              and no payments are accepted, this amount is nil unless you have a
              separate written agreement with us. Some jurisdictions do not allow the exclusion of certain
              warranties or limitation of liability — in such cases, these
              exclusions apply to the fullest extent permitted by law.
            </p>
          </section>

          {/* 9. Governing Law */}
          <section aria-labelledby="tos-law">
            <h2
              id="tos-law"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              9. Governing Law
            </h2>
            <p className="text-sm leading-relaxed">
              These Terms of Service are governed by and construed in accordance
              with the laws of India, without regard to its conflict of law
              provisions. You consent to the exclusive jurisdiction of the courts
              located in India for the resolution of any disputes arising under
              these terms.
            </p>
          </section>

          {/* 10. Dispute Resolution */}
          <section aria-labelledby="tos-dispute">
            <h2
              id="tos-dispute"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              10. Dispute Resolution
            </h2>
            <p className="text-sm leading-relaxed">
              We encourage you to contact us first at{" "}
              <a
                href="mailto:legal@intractify.com"
                className="text-[var(--cv-indigo)] hover:underline"
              >
                legal@intractify.com
              </a>{" "}
              to resolve any dispute informally. If we cannot resolve the dispute
              within 30 days, either party may initiate formal proceedings. For
              consumers in the EU, the European Online Dispute Resolution
              platform is available at ec.europa.eu/consumers/odr.
            </p>
          </section>

          {/* 11. Changes */}
          <section aria-labelledby="tos-changes">
            <h2
              id="tos-changes"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              11. Changes to These Terms
            </h2>
            <p className="text-sm leading-relaxed">
              We may update these Terms of Service to reflect changes in our
              service or legal requirements. We will notify you of material
              changes by email at least 14 days in advance. Continued use of
              Intractify after the effective date constitutes acceptance of the
              updated terms. If you do not agree to the revised terms, you should
              stop using the service before the changes take effect.
            </p>
          </section>

          {/* 12. Contact */}
          <section aria-labelledby="tos-contact">
            <h2
              id="tos-contact"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              12. Contact
            </h2>
            <p className="text-sm leading-relaxed">
              For legal inquiries, contact us at{" "}
              <a
                href="mailto:legal@intractify.com"
                className="text-[var(--cv-indigo)] hover:underline"
              >
                legal@intractify.com
              </a>
              . Intractify Technologies, India.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Intractify",
  description: "How Intractify collects, uses, and protects your data.",
};

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-[var(--cv-ink-subtle)]">
            Last updated: May 16, 2025
          </p>
        </div>

        <div className="prose-cv space-y-10 text-[var(--cv-ink-muted)]">

          {/* 1. Who We Are */}
          <section aria-labelledby="privacy-who-we-are">
            <h2
              id="privacy-who-we-are"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              1. Who We Are
            </h2>
            <p className="text-sm leading-relaxed">
              Intractify Technologies (&ldquo;Intractify&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the
              Intractify cloud browser platform at{" "}
              <a
                href="https://intractify.com"
                className="text-[var(--cv-indigo)] hover:underline"
              >
                intractify.com
              </a>{" "}
              and the web application at{" "}
              <a
                href="https://app.intractify.com"
                className="text-[var(--cv-indigo)] hover:underline"
              >
                app.intractify.com
              </a>
              . We are the data controller for personal data collected through
              our website and services. Our registered address is Intractify
              Technologies, India. For privacy matters, you may contact our Data
              Protection Officer at{" "}
              <a
                href="mailto:privacy@intractify.com"
                className="text-[var(--cv-indigo)] hover:underline"
              >
                privacy@intractify.com
              </a>
              .
            </p>
          </section>

          {/* 2. Data We Collect */}
          <section aria-labelledby="privacy-data-collected">
            <h2
              id="privacy-data-collected"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              2. What Data We Collect
            </h2>
            <p className="mb-3 text-sm leading-relaxed">
              Intractify collects only the minimum data necessary to provide the
              service. We collect:
            </p>
            <ul className="ml-5 list-disc space-y-2 text-sm leading-relaxed">
              <li>
                <strong>Account information:</strong> Your name, email address,
                and profile photo provided via Clerk (our authentication
                provider) when you create an account. We do not store your
                password — Clerk handles authentication securely.
              </li>
              <li>
                <strong>Session metadata:</strong> Session duration, session
                count per billing period, and the selected browser type and
                region. We do not store URLs visited, search queries, page
                content, cookies, or any browsing activity.
              </li>
              <li>
                <strong>Payment information:</strong> Subscription plan and
                transaction status. We do not store card numbers or bank details
                — all payment processing is handled by Cashfree, our PCI-DSS
                compliant payment gateway.
              </li>
              <li>
                <strong>Usage data:</strong> Aggregate, anonymised usage
                statistics (such as session volume trends) for service
                improvement. This data is never linked to individual users.
              </li>
              <li>
                <strong>Technical data:</strong> IP address (used only for rate
                limiting and fraud prevention, discarded after the request is
                processed), browser type, and operating system (from HTTP
                headers, used for compatibility).
              </li>
            </ul>
            <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--cv-ink)]">
              We never collect, store, or have access to your browsing activity,
              visited URLs, search queries, cookies set during sessions, or any
              content you view inside a Intractify browser session.
            </p>
          </section>

          {/* App Permissions (Google Play) */}
          <section aria-labelledby="privacy-app-permissions">
            <h2
              id="privacy-app-permissions"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              3. App Permissions (Google Play / Mobile Clients)
            </h2>
            <p className="mb-3 text-sm leading-relaxed">
              If you access Intractify through a mobile application distributed
              via Google Play, the app may request the following permissions:
            </p>
            <ul className="ml-5 list-disc space-y-2 text-sm leading-relaxed">
              <li>
                <strong>Internet access:</strong> Required to establish encrypted
                WebSocket connections to Intractify session servers and stream
                your browser session to your device.
              </li>
              <li>
                <strong>Network state:</strong> Used to detect connectivity
                changes and gracefully reconnect sessions when your network
                switches (e.g., Wi-Fi to cellular).
              </li>
              <li>
                <strong>Camera / Microphone (optional, user-granted):</strong>{" "}
                Only requested if you enable media passthrough features in a
                session. These streams are sent to the cloud container and are
                never stored by Intractify.
              </li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed">
              No permission data is shared with third parties or used for
              advertising purposes.
            </p>
          </section>

          {/* 4. How We Use Data */}
          <section aria-labelledby="privacy-how-used">
            <h2
              id="privacy-how-used"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              4. How We Use Your Data
            </h2>
            <p className="mb-3 text-sm leading-relaxed">
              We use the data we collect for the following purposes:
            </p>
            <ul className="ml-5 list-disc space-y-2 text-sm leading-relaxed">
              <li>Providing and maintaining the Intractify service</li>
              <li>
                Enforcing plan quotas (session count and duration limits)
              </li>
              <li>
                Processing payments and managing subscription status via Cashfree
              </li>
              <li>
                Sending transactional emails (account confirmation, billing
                receipts, password reset) via Clerk
              </li>
              <li>Detecting and preventing fraud and abuse</li>
              <li>
                Responding to support requests and legal inquiries
              </li>
              <li>
                Improving and developing new features based on anonymised
                aggregate usage patterns
              </li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed">
              We do not use your data for targeted advertising. We do not sell
              your data to any third party.
            </p>
          </section>

          {/* 5. Data Retention */}
          <section aria-labelledby="privacy-retention">
            <h2
              id="privacy-retention"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              5. Data Retention
            </h2>
            <p className="mb-3 text-sm leading-relaxed">
              We retain data for the shortest time necessary:
            </p>
            <ul className="ml-5 list-disc space-y-2 text-sm leading-relaxed">
              <li>
                <strong>Session data (browsing content):</strong> Never stored.
                Container and all contents are permanently destroyed at session
                end with no recovery possible.
              </li>
              <li>
                <strong>Session metadata (duration, count):</strong> Retained for
                the current billing period for quota enforcement. Anonymised
                after 90 days.
              </li>
              <li>
                <strong>Account information:</strong> Retained while your account
                is active. Deleted within 30 days of account deletion request.
              </li>
              <li>
                <strong>Payment transaction records:</strong> Retained for 7 years
                as required by Indian financial regulations (Cashfree compliance).
              </li>
              <li>
                <strong>Audit logs:</strong> Retained for 12 months for security
                and compliance purposes, then automatically deleted.
              </li>
            </ul>
          </section>

          {/* 6. Third-Party Processors */}
          <section aria-labelledby="privacy-processors">
            <h2
              id="privacy-processors"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              6. Third-Party Data Processors
            </h2>
            <p className="mb-3 text-sm leading-relaxed">
              We work with the following sub-processors, each bound by data
              processing agreements:
            </p>
            <ul className="ml-5 list-disc space-y-2 text-sm leading-relaxed">
              <li>
                <strong>Clerk (clerk.com):</strong> Authentication, user
                management, and transactional email. Stores your name, email,
                and authentication credentials in compliance with SOC 2 and
                GDPR.
              </li>
              <li>
                <strong>Cashfree (cashfree.com):</strong> Payment processing and
                subscription management. PCI-DSS Level 1 certified. Processes
                payment card data — Intractify never sees raw card numbers.
              </li>
              <li>
                <strong>Cloud infrastructure providers (AWS, GCP, Azure):</strong>{" "}
                Run the ephemeral session containers. No personal data is
                persisted on these providers beyond the duration of a session.
              </li>
              <li>
                <strong>Upstash (upstash.com):</strong> Serverless Redis used for
                session state during active sessions. Data is automatically
                expired at session end.
              </li>
            </ul>
          </section>

          {/* 7. Your Rights */}
          <section aria-labelledby="privacy-rights">
            <h2
              id="privacy-rights"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              7. Your Rights (GDPR &amp; CCPA)
            </h2>
            <p className="mb-3 text-sm leading-relaxed">
              Depending on your jurisdiction, you have the following rights
              regarding your personal data:
            </p>
            <ul className="ml-5 list-disc space-y-2 text-sm leading-relaxed">
              <li>
                <strong>Right of access:</strong> Request a copy of the personal
                data we hold about you.
              </li>
              <li>
                <strong>Right to rectification:</strong> Request correction of
                inaccurate or incomplete data.
              </li>
              <li>
                <strong>Right to erasure:</strong> Request deletion of your
                personal data. See our{" "}
                <Link
                  href="/data-deletion"
                  className="text-[var(--cv-indigo)] hover:underline"
                >
                  Data Deletion page
                </Link>{" "}
                for the process.
              </li>
              <li>
                <strong>Right to data portability:</strong> Receive your data in
                a structured, machine-readable format.
              </li>
              <li>
                <strong>Right to object:</strong> Object to processing based on
                legitimate interests.
              </li>
              <li>
                <strong>Right to opt-out of sale (CCPA):</strong> We do not sell
                personal data. California residents may submit requests to{" "}
                <a
                  href="mailto:privacy@intractify.com"
                  className="text-[var(--cv-indigo)] hover:underline"
                >
                  privacy@intractify.com
                </a>
                .
              </li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed">
              To exercise any of these rights, contact us at{" "}
              <a
                href="mailto:privacy@intractify.com"
                className="text-[var(--cv-indigo)] hover:underline"
              >
                privacy@intractify.com
              </a>
              . We will respond within 30 days.
            </p>
          </section>

          {/* 8. Cookies */}
          <section aria-labelledby="privacy-cookies">
            <h2
              id="privacy-cookies"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              8. Cookies
            </h2>
            <p className="mb-3 text-sm leading-relaxed">
              The Intractify marketing website uses minimal cookies:
            </p>
            <ul className="ml-5 list-disc space-y-2 text-sm leading-relaxed">
              <li>
                <strong>Essential cookies:</strong> Required for session
                authentication (set by Clerk) and security (CSRF protection).
                Cannot be disabled without breaking the service.
              </li>
              <li>
                <strong>Preference cookies:</strong> Remember your display
                preferences. Expire after 1 year.
              </li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed">
              We do not use advertising cookies, tracking pixels, or third-party
              analytics that profile individual users. Aggregate page view
              counts may be tracked using privacy-preserving analytics that do
              not set cookies.
            </p>
          </section>

          {/* 9. Data Deletion */}
          <section aria-labelledby="privacy-deletion">
            <h2
              id="privacy-deletion"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              9. Data Deletion
            </h2>
            <p className="text-sm leading-relaxed">
              You may request deletion of your account and all associated
              personal data at any time. Requests are processed within 30 days.
              Visit our{" "}
              <Link
                href="/data-deletion"
                className="text-[var(--cv-indigo)] hover:underline"
              >
                Data Deletion Request page
              </Link>{" "}
              or email{" "}
              <a
                href="mailto:privacy@intractify.com"
                className="text-[var(--cv-indigo)] hover:underline"
              >
                privacy@intractify.com
              </a>{" "}
              with subject &ldquo;Data Deletion Request&rdquo;.
            </p>
          </section>

          {/* 10. Security */}
          <section aria-labelledby="privacy-security">
            <h2
              id="privacy-security"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              10. Security
            </h2>
            <p className="text-sm leading-relaxed">
              Intractify uses TLS 1.3 for all data in transit. Session streams are
              end-to-end encrypted. Data at rest (account information and
              subscription records in our PostgreSQL database) is encrypted using
              AES-256. We conduct regular security reviews and follow responsible
              disclosure principles. To report a security vulnerability, email{" "}
              <a
                href="mailto:security@intractify.com"
                className="text-[var(--cv-indigo)] hover:underline"
              >
                security@intractify.com
              </a>
              .
            </p>
          </section>

          {/* 11. Changes */}
          <section aria-labelledby="privacy-changes">
            <h2
              id="privacy-changes"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              11. Changes to This Policy
            </h2>
            <p className="text-sm leading-relaxed">
              We will notify you of material changes to this Privacy Policy via
              email (to the address associated with your account) at least 14
              days before changes take effect. The updated policy will also be
              posted on this page with a revised &ldquo;Last updated&rdquo; date.
            </p>
          </section>

          {/* 12. Contact */}
          <section aria-labelledby="privacy-contact">
            <h2
              id="privacy-contact"
              className="mb-3 text-xl font-semibold text-[var(--cv-ink)]"
            >
              12. Contact Our DPO
            </h2>
            <p className="text-sm leading-relaxed">
              For all privacy-related inquiries, contact our Data Protection
              Officer at{" "}
              <a
                href="mailto:privacy@intractify.com"
                className="text-[var(--cv-indigo)] hover:underline"
              >
                privacy@intractify.com
              </a>
              . If you are in the EU and believe we have not adequately addressed
              your privacy concern, you have the right to lodge a complaint with
              your local Data Protection Authority.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

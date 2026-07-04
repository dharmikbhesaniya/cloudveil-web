"use client";

import { useState } from "react";
import Link from "next/link";

type FormState = "idle" | "submitting" | "success" | "error";

const SUBJECTS = [
  "General support",
  "Billing / refund",
  "Privacy request",
  "Enterprise inquiry",
  "Bug report",
  "Other",
] as const;

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fields, setFields] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    setErrorMessage("");

    let tracking = {};
    let visitorId = null;
    let sessionId = null;
    try {
      const trackingStr = localStorage.getItem("intractify_attribution");
      if (trackingStr) {
        tracking = JSON.parse(trackingStr);
      }
      visitorId = localStorage.getItem("intractify_visitor_id");
      sessionId = sessionStorage.getItem("intractify_session_id");
    } catch (err) {
      console.error("Attribution fetch failed inside contact submit:", err);
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          ...tracking,
          visitor_id: visitorId,
          session_id: sessionId,
        }),
      });

      if (res.status === 429) {
        setErrorMessage("Too many requests. Please wait a few minutes and try again.");
        setState("error");
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        setState("error");
        return;
      }

      setState("success");
      setFields({ name: "", email: "", subject: "", message: "" });
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setState("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    background: "var(--cv-card-bg)",
    border: "1px solid var(--border)",
  };

  const inputClass =
    "w-full rounded-xl px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]";

  if (state === "success") {
    return (
      <div
        style={{
          background: "var(--cv-card-bg)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "40px 32px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M4 10l4.5 4.5L16 6"
              stroke="var(--primary-foreground)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "var(--foreground)",
            marginBottom: "8px",
          }}
        >
          Message sent
        </h3>
        <p style={{ fontSize: "14px", color: "var(--muted-foreground)" }}>
          We&apos;ll get back to you within 24 hours on business days.
        </p>
        <button
          onClick={() => setState("idle")}
          style={{
            marginTop: "20px",
            fontSize: "13px",
            color: "var(--primary)",
            background: "none",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form">
      <div>
        <label
          htmlFor="contact-name"
          className="mb-1.5 block text-sm font-medium text-[var(--muted-foreground)]"
        >
          Full Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your full name"
          value={fields.name}
          onChange={handleChange}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="mb-1.5 block text-sm font-medium text-[var(--muted-foreground)]"
        >
          Email Address <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={fields.email}
          onChange={handleChange}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="mb-1.5 block text-sm font-medium text-[var(--muted-foreground)]"
        >
          Subject <span aria-hidden="true">*</span>
        </label>
        <select
          id="contact-subject"
          name="subject"
          required
          value={fields.subject}
          onChange={handleChange}
          className={inputClass}
          style={inputStyle}
        >
          <option value="" disabled>
            Select a topic
          </option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-medium text-[var(--muted-foreground)]"
        >
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Describe your issue or question..."
          value={fields.message}
          onChange={handleChange}
          className={`${inputClass} resize-y`}
          style={inputStyle}
        />
      </div>

      {state === "error" && (
        <p
          role="alert"
          style={{
            fontSize: "13px",
            color: "var(--destructive)",
            background: "oklch(0.4 0.1 20 / 8%)",
            border: "1px solid oklch(0.4 0.1 20 / 20%)",
            borderRadius: "8px",
            padding: "10px 14px",
          }}
        >
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full rounded-xl px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        style={{
          background: "var(--primary)",
          color: "var(--primary-foreground)",
        }}
      >
        {state === "submitting" ? "Sending…" : "Send Message"}
      </button>

      <p className="text-xs text-[var(--muted-foreground)]">
        By submitting this form, you agree to our{" "}
        <Link href="/privacy-policy" className="text-[var(--primary)] hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}

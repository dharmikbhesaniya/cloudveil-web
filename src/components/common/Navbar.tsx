"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PUBLIC_NAV } from "@/lib/constants";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "var(--navbar-bg-scrolled)" : "var(--navbar-bg)",
          borderBottom: `1px solid ${scrolled ? "var(--navbar-border-scrolled)" : "var(--navbar-border)"}`,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div
          className="mx-auto flex max-w-7xl items-baseline justify-between py-[18px]"
          style={{ paddingLeft: "clamp(24px, 5vw, 40px)", paddingRight: "clamp(24px, 5vw, 40px)" }}
        >
          {/* Wordmark */}
          <Link href="/" className="cursor-pointer" id="navbar-logo">
            <span
              style={{
                fontFamily: "var(--font-display, 'Instrument Serif', Georgia, serif)",
                fontStyle: "italic",
                fontSize: "26px",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                color: "var(--foreground)",
              }}
            >
              Intractify
              <span
                className="animate-pulse-dot"
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#4B5C3A",
                  margin: "0 6px 2px",
                  verticalAlign: "middle",
                }}
              />
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden items-center gap-7 lg:flex" id="navbar-desktop-nav">
            {PUBLIC_NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-underline text-sm font-medium"
                style={{ color: "var(--foreground)", textDecoration: "none" }}
              >
                {item.title}
              </a>
            ))}
          </nav>

          {/* Auth CTA */}
          <div className="flex items-center gap-[18px]">
            {/* 
            <a
              href="https://app.intractify.com/sign-in"
              className="serif-link hidden lg:inline"
              id="navbar-sign-in"
            >
              sign in
            </a>
            <a
              href="https://app.intractify.com/sign-up"
              className="btn-ink navbar-desktop-cta"
              id="navbar-get-started"
            >
              Launch a browser <span>→</span>
            </a>
            */}
            <a
              href="#pricing"
              className="btn-ink navbar-desktop-cta"
              id="navbar-get-started"
            >
              Join Waitlist <span>→</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              className="navbar-mobile-toggle cursor-pointer"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              style={{
                background: "none",
                border: "none",
                padding: "4px",
                color: "var(--foreground)",
                alignItems: "center",
              }}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileOpen && (
          <div
            id="mobile-navigation"
            style={{
              background: "var(--background)",
              borderTop: "1px solid var(--border)",
              padding: "16px clamp(24px, 5vw, 40px) 24px",
            }}
          >
            <nav className="flex flex-col gap-1 mb-6">
              {PUBLIC_NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontSize: "14px",
                    color: "var(--muted-foreground)",
                    textDecoration: "none",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    fontWeight: 500,
                    display: "block",
                  }}
                >
                  {item.title}
                </a>
              ))}
            </nav>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {/* 
              <a
                href="https://app.intractify.com/sign-in"
                style={{
                  display: "block",
                  padding: "10px 16px",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--foreground)",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                Sign in
              </a>
              <a
                href="https://app.intractify.com/sign-up"
                className="btn-ink"
                style={{ justifyContent: "center" }}
              >
                Get started free
              </a>
              */}
              <a
                href="#pricing"
                onClick={() => setMobileOpen(false)}
                className="btn-ink"
                style={{ justifyContent: "center" }}
              >
                Join Priority Waitlist <span>→</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

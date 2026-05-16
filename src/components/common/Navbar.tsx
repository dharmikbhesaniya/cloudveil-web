"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
] as const;

function CloudVeilLogo() {
  return (
    <Link
      href="/"
      aria-label="CloudVeil home"
      className="flex items-center gap-2 focus-visible:outline-none group"
    >
      {/* Icon mark */}
      <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--cv-indigo)] to-[var(--cv-magenta)] shadow-sm">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M9 2C5.5 2 3 4.5 3 7.5c0 1.2.4 2.3 1 3.2L9 16l5-5.3c.6-.9 1-2 1-3.2C15 4.5 12.5 2 9 2z"
            fill="rgba(255,255,255,0.9)"
          />
          <circle cx="9" cy="7.5" r="2" fill="rgba(107,76,255,0.6)" />
        </svg>
      </span>
      {/* Wordmark */}
      <span className="text-lg font-semibold tracking-tight text-[var(--cv-ink)]">
        Cloud
        <span className="bg-gradient-to-r from-[var(--cv-indigo)] to-[var(--cv-magenta)] bg-clip-text text-transparent">
          Veil
        </span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target as Node)
      ) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  // Close on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--cv-border)] shadow-sm"
          : "border-b border-transparent"
      )}
      style={{
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        backgroundColor: scrolled
          ? "rgba(255, 253, 243, 0.92)"
          : "rgba(255, 253, 243, 0.72)",
      }}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
      >
        <CloudVeilLogo />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className="rounded-md px-3 py-2 text-sm font-medium text-[var(--cv-ink-muted)] transition-colors hover:bg-[var(--cv-border)] hover:text-[var(--cv-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cv-indigo)]"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="https://app.cloudveil.app"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-lg bg-[var(--cv-indigo)] px-4 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cv-indigo)] focus-visible:ring-offset-2 md:inline-flex"
        >
          Start Free
        </a>

        {/* Hamburger */}
        <button
          ref={hamburgerRef}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--cv-ink-muted)] transition-colors hover:bg-[var(--cv-border)] hover:text-[var(--cv-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cv-indigo)] md:hidden"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            {mobileOpen ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          ref={mobileMenuRef}
          className="animate-slide-down border-t border-[var(--cv-border)] bg-[var(--cv-paper)] px-4 pb-4 pt-2 md:hidden"
          role="dialog"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="w-full rounded-md px-3 py-2.5 text-left text-sm font-medium text-[var(--cv-ink-muted)] transition-colors hover:bg-[var(--cv-border)] hover:text-[var(--cv-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cv-indigo)]"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-[var(--cv-border)] pt-3">
            <a
              href="https://app.cloudveil.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-lg bg-[var(--cv-indigo)] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cv-indigo)]"
              onClick={() => setMobileOpen(false)}
            >
              Start Free
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

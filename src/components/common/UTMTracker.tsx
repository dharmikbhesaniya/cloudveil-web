"use client";

import { useEffect } from "react";

// Simple and robust random identifier generator
function generateId(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    "_" +
    Math.random().toString(36).substring(2, 15)
  );
}

export function UTMTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const searchParams = new URLSearchParams(window.location.search);
      const trackingKeys = [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_term",
        "utm_content",
        "gclid",
        "gbraid",
        "wbraid",
        "gad_source",
      ];

      const parsedAttribution: Record<string, string> = {};
      let hasNewParameters = false;

      // Extract tracking parameters from URL
      trackingKeys.forEach((key) => {
        const val = searchParams.get(key);
        if (val) {
          parsedAttribution[key] = val.trim();
          hasNewParameters = true;
        }
      });

      // Track referrer if it is external
      const referrer = document.referrer;
      if (referrer) {
        try {
          const referrerUrl = new URL(referrer);
          if (referrerUrl.hostname !== window.location.hostname) {
            parsedAttribution["referrer"] = referrer;
            hasNewParameters = true;
          }
        } catch {
          // ignore malformed referrers
        }
      }

      // Initialize or retrieve persistent visitor ID
      let visitorId = localStorage.getItem("intractify_visitor_id");
      if (!visitorId) {
        visitorId = "v_" + generateId();
        localStorage.setItem("intractify_visitor_id", visitorId);
      }

      // Initialize or retrieve session ID
      let sessionId = sessionStorage.getItem("intractify_session_id");
      if (!sessionId) {
        sessionId = "s_" + generateId();
        sessionStorage.setItem("intractify_session_id", sessionId);
      }

      // Load existing attribution from localStorage
      let existingAttribution: Record<string, string> = {};
      const existingStr = localStorage.getItem("intractify_attribution");
      if (existingStr) {
        try {
          existingAttribution = JSON.parse(existingStr);
        } catch {
          // fallback on parse error
        }
      }

      // Merge new parameters over existing parameters
      const mergedAttribution = {
        ...existingAttribution,
        ...parsedAttribution,
      };

      // Save updated attribution back to localStorage
      if (hasNewParameters || !existingStr) {
        localStorage.setItem(
          "intractify_attribution",
          JSON.stringify(mergedAttribution)
        );
      }

      // Fire visit track event in background
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitor_id: visitorId,
          session_id: sessionId,
          path: window.location.pathname,
          referrer: parsedAttribution.referrer || existingAttribution.referrer || null,
          ...mergedAttribution,
        }),
      }).catch((err) => {
        // silently catch tracking dispatch errors to prevent breaking user flow
        console.error("Tracking dispatch error:", err);
      });

    } catch (e) {
      console.error("Marketing tracking initialization failed:", e);
    }
  }, []);

  return null;
}

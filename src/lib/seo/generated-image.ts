import { ImageResponse } from "next/og";
import { createElement } from "react";

const COLORS = {
  background: "#F4EFE3",
  foreground: "#15161A",
  primary: "#1F2C58",
  muted: "#4B4A45",
  card: "#FBF8F0",
  border: "#DED7C7",
};

function h(type: string, props: Record<string, unknown>, ...children: React.ReactNode[]) {
  return createElement(type, props, ...children);
}

export function brandImage(size = 512) {
  return new ImageResponse(
    h(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: COLORS.background,
        },
      },
      h(
        "div",
        {
          style: {
            width: size * 0.72,
            height: size * 0.72,
            borderRadius: size * 0.1,
            border: `${Math.max(2, size * 0.012)}px solid ${COLORS.primary}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: COLORS.card,
          },
        },
        h(
          "div",
          {
            style: {
              color: COLORS.primary,
              fontSize: size * 0.44,
              fontWeight: 700,
              letterSpacing: "-0.04em",
            },
          },
          "I",
        ),
      ),
    ),
    { width: size, height: size },
  );
}

export function openGraphImage() {
  return new ImageResponse(
    h(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          background: COLORS.background,
          color: COLORS.foreground,
          padding: 72,
          position: "relative",
        },
      },
      h("div", {
        style: {
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(31,44,88,0.08) 1px, transparent 1px), linear-gradient(180deg, rgba(31,44,88,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        },
      }),
      h(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "56%",
            zIndex: 1,
          },
        },
        h(
          "div",
          {
            style: {
              fontSize: 34,
              fontWeight: 700,
              color: COLORS.primary,
            },
          },
          "Intractify",
        ),
        h(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: 24,
            },
          },
          h(
            "div",
            {
              style: {
                fontSize: 76,
                lineHeight: 0.95,
                fontWeight: 700,
                letterSpacing: "-0.04em",
              },
            },
            "Private cloud browser.",
          ),
          h(
            "div",
            {
              style: {
                fontSize: 28,
                lineHeight: 1.3,
                color: COLORS.muted,
                maxWidth: 560,
              },
            },
            "Launch an isolated session. Browse without local fingerprints. Leave nothing behind.",
          ),
        ),
        h(
          "div",
          {
            style: {
              fontSize: 22,
              color: COLORS.primary,
            },
          },
          "Container isolation · zero activity logs · ephemeral sessions",
        ),
      ),
      h(
        "div",
        {
          style: {
            marginLeft: "auto",
            width: "38%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          },
        },
        h(
          "div",
          {
            style: {
              width: 390,
              height: 290,
              border: `2px solid ${COLORS.border}`,
              borderRadius: 12,
              background: COLORS.card,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0 26px 80px rgba(21,22,26,0.14)",
            },
          },
          h("div", {
            style: {
              height: 42,
              borderBottom: `2px solid ${COLORS.border}`,
              background: "#EEE7D6",
            },
          }),
          h(
            "div",
            {
              style: {
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: COLORS.primary,
                fontSize: 92,
                fontWeight: 500,
              },
            },
            "I",
          ),
        ),
      ),
    ),
    { width: 1200, height: 630 },
  );
}

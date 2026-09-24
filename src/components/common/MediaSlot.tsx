import { ImageIcon, Video, User, Waves } from "lucide-react";

/**
 * MediaSlot — a quiet glass placeholder standing in for a not-yet-produced
 * image / video / portrait / background asset. Language on the card is the
 * exact reminder of what to add, so the slot can be hunted down and replaced.
 *
 * Usage:
 *   <MediaSlot type="video" aspect="16/7" label="Click → browse → vanished"
 *     hint="~6 s screen recording, muted loop, poster frame" />
 */
const VARIANTS = {
  image: { Icon: ImageIcon, title: "IMAGE SLOT" },
  video: { Icon: Video, title: "VIDEO SLOT" },
  portrait: { Icon: User, title: "PORTRAIT SLOT" },
  wash: { Icon: Waves, title: "MEDIA WASH" },
} as const;

type MediaSlotProps = {
  type?: keyof typeof VARIANTS;
  label: string;
  hint?: string;
  aspect?: string;
  circular?: boolean;
  className?: string;
};

export function MediaSlot({
  type = "image",
  label,
  hint,
  aspect = "16/7",
  circular = false,
  className,
}: MediaSlotProps) {
  const { Icon, title } = VARIANTS[type];

  return (
    <div
      role="note"
      aria-label={`Media placeholder: ${label}`}
      className={className}
      style={{
        aspectRatio: circular ? "1 / 1" : aspect,
        width: circular ? "56px" : "100%",
        borderRadius: circular ? "50%" : "12px",
        background: "var(--glass-bg)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px dashed var(--glass-border)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: circular ? 0 : "8px",
        textAlign: "center",
        padding: circular ? 0 : "16px 12px",
        color: "var(--muted-foreground)",
        overflow: "hidden",
      }}
    >
      <Icon
        style={{
          width: circular ? 18 : 22,
          height: circular ? 18 : 22,
          opacity: 0.45,
        }}
        strokeWidth={1.4}
      />
      {!circular && (
        <div
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "9px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          {title}
        </div>
      )}
      <div
        style={{
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "11px",
          color: "var(--foreground)",
          fontWeight: 500,
          lineHeight: 1.4,
          maxWidth: "420px",
          display: circular ? "none" : undefined,
        }}
      >
        {label}
      </div>
      {hint && !circular && (
        <div
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "9.5px",
            opacity: 0.7,
          }}
        >
          {hint}
        </div>
      )}
    </div>
  );
}
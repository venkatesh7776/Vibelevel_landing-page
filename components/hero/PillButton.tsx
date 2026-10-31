import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

const base =
  "relative isolate inline-flex shrink-0 overflow-hidden items-center justify-center whitespace-nowrap rounded-pill font-body font-medium " +
  "leading-[20.4px] tracking-[-0.51px] transition-[background-color,border-color,color,box-shadow,translate,scale,width] duration-200 " +
  "ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green active:scale-[0.98]";

const variants: Record<Variant, string> = {
  // Figma: #080808 pill with inset white sheen; green fills in on hover (see Fill). No border, so the fill
  // reaches the edge; the extra 1px of vertical padding keeps the secondary button's height.
  primary: "bg-ink-900 text-white shadow-btn-sheen hover:-translate-y-px active:translate-y-0",
  // Figma: white fill, 1px #080808 border; green fills in on hover (no glow), text turns white.
  secondary:
    "border border-ink-900 bg-white text-ink-900 [transition-duration:200ms,200ms,400ms,200ms,200ms,200ms,200ms] " +
    "hover:-translate-y-px hover:border-brand-green hover:text-white focus-visible:text-white active:translate-y-0 active:border-brand-green-press",
};

// Hero primary is the Figma 143px; nav CTA is 120px. Primary buttons grow by the arrow's width
// (16px + 8px gap) on hover/focus instead of squeezing it in.
const sizes: Record<Variant, Record<Size, string>> = {
  primary: {
    md: "w-[143px] py-[11px] text-[16px] hover:w-[167px] focus-visible:w-[167px]",
    sm: "w-[120px] px-[20px] py-[8px] text-[14px] hover:w-[144px] focus-visible:w-[144px]",
    // Section CTAs: sized to the label, with an arrow that is always shown.
    lg: "gap-2.5 px-[27px] py-[14px] text-[17px]",
  },
  secondary: {
    md: "px-[18px] py-[10px] text-[16px] sm:px-[20px]",
    sm: "px-[16px] py-[7px] text-[14px]",
    lg: "gap-2.5 px-[26px] py-[13px] text-[17px]",
  },
};

type PillButtonProps = ComponentPropsWithoutRef<"a"> & {
  variant: Variant;
  size?: Size;
};

const fillColor: Record<Variant, string> = { primary: "bg-cta", secondary: "bg-brand-green" };

/**
 * Hover fill: a wide ellipse parked off the right edge slides in to cover the button, so the colour
 * travels right → left with a rounded, curved leading edge.
 */
function Fill({ variant }: { variant: Variant }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-[-110%] -right-[60%] -z-10 w-[220%] translate-x-[75%] rounded-[50%] ${fillColor[variant]} transition-transform duration-[650ms] ease-[cubic-bezier(0.33,0,0.2,1)] group-hover/btn:translate-x-0 group-focus-visible/btn:translate-x-0`}
    />
  );
}

/** Arrow that slides in beside the label on hover/focus while the button widens to fit it. */
function HoverArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-0 -translate-x-1.5 opacity-0 transition-[width,margin,opacity,translate] duration-200 ease-out group-hover/btn:ml-2 group-hover/btn:w-4 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 group-focus-visible/btn:ml-2 group-focus-visible/btn:w-4 group-focus-visible/btn:translate-x-0 group-focus-visible/btn:opacity-100"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

/** Always-visible arrow for large CTAs; nudges forward on hover. */
function StaticArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 transition-transform duration-200 ease-out group-hover/btn:translate-x-1 group-focus-visible/btn:translate-x-1"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function PillButton({
  variant,
  size = "md",
  className = "",
  children,
  ...props
}: PillButtonProps) {
  // Primary CTAs (hero and navbar) reveal an arrow on hover.
  const withArrow = variant === "primary";
  const large = size === "lg";
  return (
    <a
      className={`group/btn ${base} ${variants[variant]} ${sizes[variant][size]} ${className}`}
      {...props}
    >
      <Fill variant={variant} />
      {children}
      {large ? <StaticArrow /> : withArrow && <HoverArrow />}
    </a>
  );
}

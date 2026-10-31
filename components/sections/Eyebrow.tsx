/** Small uppercase label above a heading, led by a pixel square (the hero's pixel motif). */
export default function Eyebrow({
  children,
  tone = "brand",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "brand" | "muted";
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-2.5 font-body text-[12px] font-medium uppercase tracking-[0.16em] text-black/50 sm:text-[13px] ${className}`}
    >
      <span
        aria-hidden="true"
        className={`size-[6px] shrink-0 ${tone === "brand" ? "bg-brand-green" : "bg-black/30"}`}
      />
      {children}
    </p>
  );
}

import Image from "next/image";

// Transparent logo marks, shown muted in greyscale and brought to full colour on hover.
// Heights are balanced optically so each logo carries similar visual weight.
const tools = [
  { name: "Claude Code", src: "/logos/claude-code-mark.png", width: 600, height: 162, className: "h-[30px] sm:h-[34px]" },
  { name: "GitHub Copilot", src: "/logos/github-copilot-mark.png", width: 600, height: 212, className: "h-[34px] sm:h-[40px]" },
  { name: "Perplexity", src: "/logos/perplexity-mark.png", width: 600, height: 145, className: "h-[26px] sm:h-[30px]" },
  { name: "ChatGPT", src: "/logos/chatgpt-mark.png", width: 600, height: 142, className: "h-[24px] sm:h-[28px]" },
];

/** One run of the sequence. Repeated twice per copy so a copy is always wider than the 1200px strip. */
function LogoRun({ hidden }: { hidden?: boolean }) {
  const items = [...tools, ...tools];
  return (
    <ul
      className="flex shrink-0 items-center gap-x-14 pr-14 sm:gap-x-20 sm:pr-20"
      aria-label={hidden ? undefined : "Supported AI tools"}
      aria-hidden={hidden || undefined}
    >
      {items.map((t, i) => (
        <li key={`${t.name}-${i}`} className="shrink-0">
          <Image
            src={t.src}
            alt={hidden || i >= tools.length ? "" : t.name}
            width={t.width}
            height={t.height}
            unoptimized
            loading="eager"
            draggable={false}
            className={`w-auto max-w-none opacity-55 grayscale transition-[filter,opacity] duration-300 ease-out hover:opacity-100 hover:grayscale-0 ${t.className}`}
          />
        </li>
      ))}
    </ul>
  );
}

export default function HeroToolStrip({ title = "Technical screening using" }: { title?: string } = {}) {
  return (
    <div className="hero-rise flex w-full flex-col items-center gap-7 font-body sm:gap-9" style={{ animationDelay: "600ms" }}>
      <p className="text-center text-[16px] font-medium text-black sm:text-[18px]">
        {title}
      </p>

      {/* Horizontal loop, capped at 1200px, with soft fades so logos drift in and out. Hover pauses it. */}
      <div
        className="marquee w-full max-w-[1200px] overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <div className="marquee-track flex w-max">
          <LogoRun />
          <LogoRun hidden />
        </div>
      </div>
    </div>
  );
}

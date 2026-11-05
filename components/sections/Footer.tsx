import Image from "next/image";
import { Logo } from "@/components/hero/HeroNavigation";
import mountains from "@/public/images/screening-mountains.jpg";

type FooterLink = { label: string; href?: string };

// Links point at pages and home-page sections. Items without a URL yet render as plain text.
const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Products",
    links: [
      { label: "Screening", href: "/#screening-heading" },
      { label: "Aura", href: "/#aura" },
      { label: "Campus", href: "/#campus" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "How it works", href: "/#screening-heading" },
      { label: "Features", href: "/#features-heading" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/request-demo" },
      { label: "FAQ", href: "/#faq-heading" },
    ],
  },
  { title: "Legal", links: [{ label: "Privacy Policy" }, { label: "Terms of Service" }] },
];

const linkClass = "font-body text-[15px] text-black/55";

/** Section 9 — footer: brand on the left, four link columns, copyright underneath. */
export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-dashed border-black/10 bg-white px-4 sm:px-8">
      {/* The mountain landscape, faint, rising from the bottom and fading into white at the top. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[360px] md:h-[440px]">
        <Image
          src={mountains}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-[50%_80%] opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/30 to-transparent" />
      </div>

      <div className="mx-auto max-w-[1200px] border-x border-black/[0.06] px-5 pb-28 sm:px-10 md:pb-40 lg:px-16">
        <div className="grid gap-12 py-14 md:py-20 lg:grid-cols-[1.2fr_2fr] lg:gap-16">
          <div>
            <Logo />
            <p className="mt-5 max-w-[340px] text-pretty font-body text-[15px] leading-[1.6] text-black/50">
              An AI-powered assessment platform that helps companies evaluate candidates through real-world tasks, AI
              collaboration, and evidence-backed skill assessment.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="font-body text-[12px] font-medium uppercase tracking-[0.16em] text-black/40">{col.title}</p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.href ? (
                        <a
                          href={l.href}
                          className={`${linkClass} transition-colors duration-200 hover:text-brand-green focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green`}
                        >
                          {l.label}
                        </a>
                      ) : (
                        <span className={linkClass}>{l.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-dashed border-black/10 py-6 font-body text-[13px] text-black/40 sm:flex-row sm:items-center sm:justify-between">
          <p>VibeLevel.ai is a product of GPTSocial LLC — © 2026 All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

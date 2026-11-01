"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import PrimaryButton from "./PrimaryButton";

const links = [
  { label: "Products", href: "#products", hasMenu: true },
  { label: "Platform", href: "#platform", hasMenu: true },
  { label: "Resources", href: "#resources" },
  { label: "Pricing", href: "#pricing" },
];

export function Logo() {
  // Figma crops the full logo raster to just the star mark, then sets the wordmark beside it.
  return (
    <Link href="/" aria-label="VibeLevel home" className="flex h-[25.769px] w-[163.61px] shrink-0 items-center gap-[1.175px] rounded-[4.52px]">
      <span className="relative h-[26.214px] w-[32.541px] shrink-0 overflow-hidden">
        <Image
          src="/images/logo-mark.png"
          alt=""
          width={2167}
          height={725}
          preload
          className="absolute left-[-27.87%] top-[-68.97%] h-[238.39%] w-[573.98%] max-w-none"
        />
      </span>
      <span className="relative h-[26.214px] w-[127.453px] shrink-0">
        <Image src="/images/logo-wordmark.png" alt="" fill sizes="128px" preload className="object-fill" />
      </span>
    </Link>
  );
}

function Chevron() {
  return <Image src="/images/icon-chevron-down.svg" alt="" width={24} height={14} className="h-[14px] w-[24px]" />;
}

export default function HeroNavigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Only re-renders when crossing the threshold, not on every scroll event.
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`hero-fade fixed inset-x-0 top-0 z-50 w-full px-4 py-4 sm:px-8 lg:px-[80px] ${
        scrolled || open ? "bg-white shadow-[0_1px_0_rgba(0,0,0,0.06),0_8px_24px_-16px_rgba(6,36,24,0.18)]" : "bg-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex w-full max-w-[1280px] items-center justify-between">
        <div className="flex items-center gap-[32px]">
          <Logo />
          <ul className="hidden items-center gap-[24px] lg:flex">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="flex items-center text-[14px] leading-[14px] font-medium text-ink transition-colors duration-200 hover:text-brand-green focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green"
                >
                  <span className={l.hasMenu ? "mr-[-3px]" : undefined}>{l.label}</span>
                  {l.hasMenu && <Chevron />}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden items-center gap-[18px] lg:flex">
          <a
            href="#sign-in"
            className="text-[14px] leading-[14px] font-medium text-ink transition-colors duration-200 hover:text-brand-green focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green"
          >
            Sign in
          </a>
          <PrimaryButton href="#book-demo" size="sm">
            Book a demo
          </PrimaryButton>
        </div>

        <button
          type="button"
          className="-mr-2 flex size-10 items-center justify-center rounded-full text-ink focus-visible:outline-2 focus-visible:outline-brand-green lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M5 5l12 12M17 5L5 17" /> : <path d="M3 6.5h16M3 11h16M3 15.5h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-4 top-full rounded-2xl border border-black/5 bg-white p-5 shadow-[0_20px_50px_-20px_rgba(6,36,24,0.25)] sm:inset-x-8 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-lg px-2 py-3 text-[16px] font-medium text-ink hover:text-brand-green">
                  {l.label}
                  {l.hasMenu && <Chevron />}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between gap-4 border-t border-black/5 pt-4">
            <a href="#sign-in" className="px-2 text-[16px] font-medium text-ink hover:text-brand-green">
              Sign in
            </a>
            <PrimaryButton href="#book-demo" size="sm">
              Book a demo
            </PrimaryButton>
          </div>
        </div>
      )}
    </header>
  );
}

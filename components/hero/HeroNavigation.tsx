"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PRODUCTS, RESOURCES, type MenuLink } from "@/components/site/menus";
import { IconTile } from "@/components/ui/PixelIcon";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

type MenuId = "products" | "resources";

const LINKS: { label: string; menu?: MenuId; href?: string }[] = [
  { label: "Products", menu: "products" },
  // No assessments library page yet: shown, but not linked.
  { label: "Browse Assessments" },
  { label: "Resources", menu: "resources" },
  { label: "Pricing", href: "/pricing" },
];

const FOCUS = "focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green";
const LINK = `flex items-center text-[14px] leading-[14px] font-medium text-ink transition-colors duration-200 hover:text-brand-green ${FOCUS}`;

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

function Chevron({ open = false }: { open?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={`ml-1 size-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
      <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A link when it has a destination, plain text otherwise. */
function MaybeLink({ href, className, children, onClick }: { href?: string; className: string; children: React.ReactNode; onClick?: () => void }) {
  return href ? (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  ) : (
    <span className={className}>{children}</span>
  );
}

/* ---------- Desktop panels ---------- */

function ProductsPanel({ onPick }: { onPick: () => void }) {
  return (
    <div className="grid grid-cols-4">
      {PRODUCTS.map((p, i) => (
        <div key={p.name} className={`px-6 py-6 ${i ? "border-l border-dashed border-black/10" : ""}`}>
          <MaybeLink href={p.href} onClick={onPick} className={`group/head flex gap-3 ${p.href ? FOCUS : ""}`}>
            <IconTile name={p.icon} />
            <span>
              <span className={`block font-display text-[16px] font-medium text-ink-900 ${p.href ? "transition-colors group-hover/head:text-brand-green" : ""}`}>
                {p.name}
              </span>
              <span className="mt-1 block font-body text-[13px] leading-[1.45] text-black/50">{p.description}</span>
            </span>
          </MaybeLink>
          <ul className="mt-5 space-y-3 border-t border-dashed border-black/10 pt-5">
            {p.features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 font-body text-[14px] text-black/70">
                <span aria-hidden="true" className="size-[5px] shrink-0 bg-brand-green/70" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ResourceItem({ l, onPick }: { l: MenuLink; onPick: () => void }) {
  return (
    <MaybeLink
      href={l.href}
      onClick={onPick}
      className={`group/item flex items-center gap-3.5 rounded-[14px] p-2.5 transition-colors ${l.href ? `hover:bg-brand-green-50/70 ${FOCUS}` : ""}`}
    >
      {l.icon && <IconTile name={l.icon} />}
      <span>
        <span className={`block font-display text-[15px] font-medium text-ink-900 ${l.href ? "transition-colors group-hover/item:text-brand-green" : ""}`}>
          {l.label}
        </span>
        <span className="mt-0.5 block font-body text-[13px] text-black/50">{l.description}</span>
      </span>
    </MaybeLink>
  );
}

function ResourcesPanel({ onPick }: { onPick: () => void }) {
  return (
    <div className="grid grid-cols-2">
      {RESOURCES.map((col, i) => (
        <div key={col.title} className={`px-5 py-6 ${i ? "border-l border-dashed border-black/10" : ""}`}>
          <p className="px-2.5 font-body text-[12px] font-medium uppercase tracking-[0.16em] text-black/40">{col.title}</p>
          <ul className="mt-3 space-y-1">
            {col.links.map((l) => (
              <li key={l.label}>
                <ResourceItem l={l} onPick={onPick} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ---------- Mobile ---------- */

function MobileGroup({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg px-2 py-3 text-[16px] font-medium text-ink"
      >
        {label}
        <Chevron open={open} />
      </button>
      <div className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden" inert={!open}>
          <div className="space-y-1 pb-2 pl-2">{children}</div>
        </div>
      </div>
    </li>
  );
}

/* ---------- Navbar ---------- */

export default function HeroNavigation() {
  const [open, setOpen] = useState(false); // mobile menu
  const [menu, setMenu] = useState<MenuId | null>(null); // desktop dropdown
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number>(0);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Only re-renders when crossing the threshold, not on every scroll event.
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape or a click outside closes the dropdown.
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    const onDown = (e: PointerEvent) => !headerRef.current?.contains(e.target as Node) && setMenu(null);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [menu]);

  const show = (id: MenuId) => {
    clearTimeout(closeTimer.current);
    setMenu(id);
  };
  const hideSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMenu(null), 140);
  };
  const close = () => setMenu(null);

  return (
    <header
      ref={headerRef}
      onPointerLeave={(e) => e.pointerType === "mouse" && hideSoon()}
      className={`hero-fade fixed inset-x-0 top-0 z-50 w-full px-4 py-4 transition-[background-color,box-shadow] duration-300 sm:px-8 lg:px-[80px] ${
        scrolled || open || menu ? "bg-white shadow-[0_1px_0_rgba(0,0,0,0.06),0_8px_24px_-16px_rgba(6,36,24,0.18)]" : "bg-transparent"
      }`}
    >
      <nav aria-label="Main" className="relative mx-auto flex w-full max-w-[1280px] items-center justify-between">
        <div className="flex items-center gap-[32px]">
          <Logo />
          <ul className="hidden items-center gap-[24px] lg:flex">
            {LINKS.map((l) => (
              <li key={l.label} onPointerEnter={(e) => e.pointerType === "mouse" && (l.menu ? show(l.menu) : hideSoon())}>
                {l.menu ? (
                  <button
                    type="button"
                    aria-expanded={menu === l.menu}
                    aria-controls={`menu-${l.menu}`}
                    onClick={() => setMenu((m) => (m === l.menu ? null : l.menu!))}
                    className={`${LINK} py-2 ${menu === l.menu ? "text-brand-green" : ""}`}
                  >
                    {l.label}
                    <Chevron open={menu === l.menu} />
                  </button>
                ) : (
                  <MaybeLink href={l.href} className={`${LINK} py-2`}>
                    {l.label}
                  </MaybeLink>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden items-center gap-[14px] lg:flex" onPointerEnter={hideSoon}>
          <a href="/signin" className={`${LINK} px-1`}>
            Sign in
          </a>
          <SecondaryButton href="/request-demo" size="sm">
            Book a demo
          </SecondaryButton>
          <PrimaryButton href="/signup" size="sm">
            Start a free trial
          </PrimaryButton>
        </div>

        {/* Dropdown panels (desktop) */}
        {(["products", "resources"] as const).map((id) => (
          <div
            key={id}
            id={`menu-${id}`}
            inert={menu !== id}
            onPointerEnter={(e) => e.pointerType === "mouse" && show(id)}
            className={`absolute top-full hidden pt-4 transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:block ${
              id === "products" ? "left-0 right-0" : "left-[180px] w-[640px]"
            } ${menu === id ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1.5 opacity-0"}`}
          >
            <div className="overflow-hidden rounded-[22px] bg-white shadow-[0_32px_64px_-32px_rgba(6,36,24,0.4),0_8px_20px_-12px_rgba(6,36,24,0.15)] ring-1 ring-black/[0.06]">
              {id === "products" ? <ProductsPanel onPick={close} /> : <ResourcesPanel onPick={close} />}
            </div>
          </div>
        ))}

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
          className="absolute inset-x-4 top-full max-h-[calc(100dvh-90px)] overflow-y-auto rounded-2xl border border-black/5 bg-white p-5 shadow-[0_20px_50px_-20px_rgba(6,36,24,0.25)] sm:inset-x-8 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            <MobileGroup label="Products">
              {PRODUCTS.map((p) => (
                <MaybeLink key={p.name} href={p.href} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-lg p-2">
                  <IconTile name={p.icon} size="sm" />
                  <span>
                    <span className="block text-[15px] font-medium text-ink">{p.name}</span>
                    <span className="block text-[13px] text-black/50">{p.description}</span>
                  </span>
                </MaybeLink>
              ))}
            </MobileGroup>
            <li>
              <span className="flex px-2 py-3 text-[16px] font-medium text-ink">Browse Assessments</span>
            </li>
            <MobileGroup label="Resources">
              {RESOURCES.flatMap((c) => c.links).map((l) => (
                <MaybeLink key={l.label} href={l.href} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-lg p-2">
                  {l.icon && <IconTile name={l.icon} size="sm" />}
                  <span>
                    <span className="block text-[15px] font-medium text-ink">{l.label}</span>
                    <span className="block text-[13px] text-black/50">{l.description}</span>
                  </span>
                </MaybeLink>
              ))}
            </MobileGroup>
            <li>
              <a href="/pricing" className="flex px-2 py-3 text-[16px] font-medium text-ink hover:text-brand-green">
                Pricing
              </a>
            </li>
          </ul>
          <div className="mt-4 grid gap-3 border-t border-black/5 pt-4">
            <a href="/signin" className="px-2 py-1 text-[16px] font-medium text-ink hover:text-brand-green">
              Sign in
            </a>
            <SecondaryButton href="/request-demo" className="w-full">
              Book a demo
            </SecondaryButton>
            <PrimaryButton href="/signup" className="w-full">
              Start a free trial
            </PrimaryButton>
          </div>
        </div>
      )}
    </header>
  );
}

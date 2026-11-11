import Link from "next/link";
import type { ReactNode } from "react";
import { GRADIENT } from "@/components/hiring/parts";
import ScreeningPixels from "@/components/sections/screening/ScreeningPixels";
import PageShell from "@/components/site/PageShell";
import PixelIcon, { type PixelIconName } from "@/components/ui/PixelIcon";
import ProductAuthForm, { type AuthField } from "./ProductAuthForm";

export type AuthProduct = "aura" | "campus" | "teams";
type Mode = "signin" | "signup";

const NAME: AuthField[] = [
  { name: "first", label: "First name", placeholder: "Jane", autoComplete: "given-name", half: true },
  { name: "last", label: "Last name", placeholder: "Doe", autoComplete: "family-name", half: true },
];
const PASSWORD = (mode: Mode): AuthField => ({
  name: "password",
  label: "Password",
  type: "password",
  placeholder: "••••••••",
  autoComplete: mode === "signup" ? "new-password" : "current-password",
});

const CONFIG: Record<
  AuthProduct,
  {
    label: string;
    icon: PixelIconName;
    page: string;
    email: AuthField;
    extra?: AuthField[];
    signup: { title: ReactNode; lead: string; submit: string };
    signin: { title: ReactNode; lead: string };
    showcase: { eyebrow: string; title: ReactNode; visual: ReactNode };
  }
> = {
  aura: {
    label: "Aura",
    icon: "aura",
    page: "/products/aura",
    email: { name: "email", label: "Email", type: "email", placeholder: "you@example.com", autoComplete: "email" },
    signup: {
      title: (
        <>
          Discover your <em className="text-headline-accent italic">AI Style.</em>
        </>
      ),
      lead: "Score your AI sessions, take challenges and track your skills growth. Free, no credit card.",
      submit: "Discover your Aura",
    },
    signin: {
      title: (
        <>
          Welcome back to <em className="text-headline-accent italic">Aura.</em>
        </>
      ),
      lead: "Pick up where you left off: your score, archetype and challenges.",
    },
    showcase: {
      eyebrow: "Your Aura",
      title: (
        <>
          See how you <em className="text-headline-accent italic">work with AI.</em>
        </>
      ),
      visual: <AuraCard />,
    },
  },
  campus: {
    label: "Campus",
    icon: "campus",
    page: "/products/campus",
    email: {
      name: "email",
      label: "Campus email",
      type: "email",
      placeholder: "you@university.edu",
      autoComplete: "email",
      hint: "Campus emails (.edu) are detected automatically.",
    },
    signup: {
      title: (
        <>
          Join your <em className="text-headline-accent italic">campus vibeathon.</em>
        </>
      ),
      lead: "Get your Aura profile, compete in vibeathons and showcase your skills to recruiters.",
      submit: "Join Campus",
    },
    signin: {
      title: (
        <>
          Welcome back, <em className="text-headline-accent italic">builder.</em>
        </>
      ),
      lead: "Sign in with your campus email to see your tracks and the leaderboard.",
    },
    showcase: {
      eyebrow: "Live leaderboard",
      title: (
        <>
          Compete. Climb. <em className="text-headline-accent italic">Get noticed.</em>
        </>
      ),
      visual: <BoardCard />,
    },
  },
  teams: {
    label: "Teams",
    icon: "team",
    page: "/products/teams",
    email: {
      name: "email",
      label: "Work email",
      type: "email",
      placeholder: "you@company.com",
      autoComplete: "email",
      hint: "We'll route you to your org automatically.",
    },
    extra: [{ name: "company", label: "Company", placeholder: "Acme Inc.", autoComplete: "organization" }],
    signup: {
      title: (
        <>
          Set up <em className="text-headline-accent italic">your team.</em>
        </>
      ),
      lead: "AI Skills Sprints, shared challenges and leaderboards for your whole org.",
      submit: "Set up your team",
    },
    signin: {
      title: (
        <>
          Welcome back to <em className="text-headline-accent italic">Teams.</em>
        </>
      ),
      lead: "Sign in with your work email to see your org's fluency.",
    },
    showcase: {
      eyebrow: "Workforce AI fluency",
      title: (
        <>
          Watch your team <em className="text-headline-accent italic">level up.</em>
        </>
      ),
      visual: <FluencyCard />,
    },
  },
};

/* ---------- Showcase visuals ---------- */

function Card({ children }: { children: ReactNode }) {
  return <div className="w-full max-w-[400px] rounded-[20px] bg-white p-6 text-left shadow-[0_30px_60px_-36px_rgba(6,36,24,0.5)] ring-1 ring-black/[0.05]">{children}</div>;
}

function AuraCard() {
  const dims = [
    ["Prompting", 7.7],
    ["AI Collaboration", 7.1],
    ["Product Thinking", 5.8],
    ["Design Sense", 5.7],
    ["You vs AI", 6.8],
  ] as const;
  return (
    <Card>
      <div className="flex items-end justify-between">
        <p className="font-heading text-[44px] leading-none text-headline-accent italic">
          7.4<span className="font-body text-[15px] not-italic text-black/40">/10</span>
        </p>
        <div className="text-right">
          <span className="rounded-full bg-brand-green-50 px-2.5 py-1 font-body text-[12px] font-medium text-brand-green ring-1 ring-brand-green/15">Strong</span>
          <p className="mt-2 font-display text-[14px] font-semibold text-ink-900">AI Steerer</p>
        </div>
      </div>
      <ul className="mt-5 space-y-3">
        {dims.map(([l, v], i) => (
          <li key={l}>
            <div className="flex justify-between font-body text-[13px]">
              <span className="text-black/55">{l}</span>
              <span className="font-mono text-ink-900">{v}</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
              <div className="pc-grow h-full rounded-full bg-brand-green" style={{ width: `${v * 10}%`, animationDelay: `${300 + i * 100}ms` }} />
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function BoardCard() {
  const rows = [
    ["AgileBuilder_4b12", "8.2"],
    ["SharpBuilder_3985", "8.2"],
    ["LunarBuilder_e454", "7.9"],
    ["AgileBuilder_27de", "7.9"],
  ];
  return (
    <Card>
      <p className="flex items-center gap-2 font-display text-[14px] font-semibold text-ink-900">
        <span className="size-2 animate-pulse rounded-full bg-brand-green" />
        Campus Vibeathon · Live
      </p>
      <ol className="mt-4 space-y-2">
        {rows.map(([n, s], i) => (
          <li key={n} className="pc-rise flex items-center gap-3 rounded-[12px] bg-[#f8f8f7] px-3 py-2.5" style={{ animationDelay: `${300 + i * 110}ms` }}>
            <span className={`flex size-7 items-center justify-center rounded-full font-body text-[11.5px] font-semibold ${i === 0 ? "bg-brand-green text-white" : "bg-brand-green-50 text-brand-green"}`}>
              #{i + 1}
            </span>
            <span className="flex-1 font-body text-[13.5px] text-ink-900">{n}</span>
            <span className="font-mono text-[13px] text-brand-green">{s}</span>
          </li>
        ))}
      </ol>
    </Card>
  );
}

function FluencyCard() {
  // Level 5 "Expert org" mix from the adoption curve.
  const mix = [
    ["Developing", 20, "bg-brand-green/45"],
    ["Capable", 50, "bg-brand-green/75"],
    ["Advanced", 30, "bg-brand-green"],
  ] as const;
  return (
    <Card>
      <p className="font-body text-[11.5px] font-medium uppercase tracking-[0.14em] text-brand-green">Level 5 · Expert org</p>
      <p className="mt-2 font-heading text-[22px] leading-[1.2] text-black">AI-native workforce</p>
      <div className="pc-grow mt-5 flex h-3 overflow-hidden rounded-full" style={{ animationDelay: "300ms" }}>
        {mix.map(([l, v, c]) => (
          <span key={l} className={c} style={{ width: `${v}%` }} />
        ))}
      </div>
      <ul className="mt-4 space-y-2">
        {mix.map(([l, v, c]) => (
          <li key={l} className="flex items-center justify-between font-body text-[13.5px] text-black/60">
            <span className="flex items-center gap-2">
              <span className={`size-2.5 rounded-sm ${c}`} />
              {l}
            </span>
            <span className="font-mono text-ink-900">{v}%</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ---------- Page ---------- */

/** A product's own log-in / sign-up page: form on the left, the product on our gradient on the right. */
export default function ProductAuth({ product, mode }: { product: AuthProduct; mode: Mode }) {
  const c = CONFIG[product];
  const copy = mode === "signup" ? c.signup : c.signin;
  const fields = mode === "signup" ? [...NAME, c.email, ...(c.extra ?? []), PASSWORD(mode)] : [c.email, PASSWORD(mode)];
  const other = mode === "signup" ? { q: "Already have an account?", label: "Log in", href: `/${product}/signin` } : { q: `New to ${c.label}?`, label: "Create an account", href: `/${product}/signup` };
  const nav =
    product === "aura"
      ? { primary: { label: "Discover Aura free", href: "/aura/signup" }, signin: "/aura/signin" }
      : { primary: { label: "Book a call", href: "/request-demo" }, signin: `/${product}/signin` };

  return (
    <PageShell fields={false} nav={nav}>
      <div className="mx-auto grid max-w-[1280px] items-stretch gap-12 px-5 pb-20 pt-10 sm:px-8 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-12 lg:pb-28">
        {/* Product panel: left on desktop, as tall as the form, and pinned while the form scrolls. */}
        <div className="order-last lg:order-first">
          <div
            className="relative isolate flex h-full min-h-[480px] flex-col items-center justify-center overflow-hidden rounded-[28px] px-6 py-14 text-center ring-1 ring-black/[0.05] sm:px-12 lg:sticky lg:top-[96px] lg:max-h-[calc(100dvh-120px)]"
            style={{ backgroundImage: GRADIENT }}
          >
            <div aria-hidden="true" className="absolute inset-0 -z-10">
              <ScreeningPixels />
            </div>
            <p className="hero-rise font-body text-[12px] font-medium uppercase tracking-[0.16em] text-brand-green">{c.showcase.eyebrow}</p>
            <h2 className="hero-rise mt-3 max-w-[420px] text-balance font-heading text-[28px] leading-[1.15] font-medium tracking-[-0.6px] text-black sm:text-[32px]">
              {c.showcase.title}
            </h2>
            <div className="hero-rise mt-8 flex w-full justify-center" style={{ animationDelay: "200ms" }}>
              {c.showcase.visual}
            </div>
          </div>
        </div>
        <div className="hero-rise flex justify-center lg:justify-start lg:pl-4">
          <div className="w-full max-w-[440px]">
            <Link
              href={c.page}
              className="inline-flex items-center gap-2 rounded-full bg-brand-green-50 px-3 py-1.5 font-body text-[12px] font-medium uppercase tracking-[0.16em] text-brand-green ring-1 ring-brand-green/15 transition-colors hover:bg-brand-green hover:text-white"
            >
              <PixelIcon name={c.icon} className="size-3.5" />
              VibeLevel {c.label}
            </Link>
            <h1 className="mt-6 text-balance font-heading text-[34px] leading-[1.1] font-medium tracking-[-1px] text-ink md:text-[40px]">{copy.title}</h1>
            <p className="mt-3 text-pretty font-body text-[16px] leading-[1.55] text-black/55">{copy.lead}</p>
            <div className="mt-7">
              <ProductAuthForm fields={fields} submit={mode === "signup" ? c.signup.submit : "Log in"} />
            </div>
            <p className="mt-6 text-center font-body text-[14px] text-black/55">
              {other.q}{" "}
              <Link href={other.href} className="font-medium text-brand-green underline-offset-4 hover:underline">
                {other.label}
              </Link>
            </p>
            <p className="mt-2 text-center font-body text-[13px] text-black/40">
              Not using {c.label}?{" "}
              <Link href="/signin" className="underline-offset-4 hover:text-brand-green hover:underline">
                Choose another product
              </Link>
            </p>
          </div>
        </div>

      </div>
    </PageShell>
  );
}

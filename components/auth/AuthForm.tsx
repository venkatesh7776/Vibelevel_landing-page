"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import PixelIcon from "@/components/ui/PixelIcon";
import { audience } from "./audiences";

const INPUT =
  "h-12 w-full rounded-[12px] bg-white px-4 font-body text-[15px] text-ink-900 ring-1 ring-black/[0.12] transition-shadow duration-200 placeholder:text-black/35 hover:ring-black/25 focus:outline-none focus:ring-2 focus:ring-brand-green";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-body text-[14px] font-medium text-black/70">{label}</span>
      {children}
    </label>
  );
}

function LinkedInMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
      <rect width="24" height="24" rx="4" fill="#0A66C2" />
      <path
        fill="#fff"
        d="M7.1 9.5h2.4v7.8H7.1V9.5Zm1.2-3.9a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8Zm2.7 3.9h2.3v1.1c.3-.6 1.1-1.3 2.3-1.3 2.5 0 2.9 1.6 2.9 3.7v4.3h-2.4v-3.8c0-.9 0-2.1-1.3-2.1s-1.5 1-1.5 2v3.9H11V9.5Z"
      />
    </svg>
  );
}

/**
 * Sign-up / log-in card. The audience (?product=aura|hiring|campus|teams) sets the copy; ?mode=login
 * opens on Log In. Accounts aren't connected to this site yet, so submitting explains that and
 * points to a demo instead of pretending to create an account.
 */
export default function AuthForm() {
  const params = useSearchParams();
  const a = audience(params.get("product"));
  const [mode, setMode] = useState<"signup" | "login">(params.get("mode") === "login" ? "login" : "signup");
  const [notice, setNotice] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setNotice(true);
  };

  return (
    <div className="w-full max-w-[460px]">
      <span className="inline-flex items-center gap-2 rounded-full bg-brand-green-50 px-3 py-1.5 font-body text-[12px] font-medium uppercase tracking-[0.16em] text-brand-green ring-1 ring-brand-green/15">
        <PixelIcon name={a.icon} className="size-3.5" />
        {a.label}
      </span>

      <h1 className="mt-6 text-balance font-heading text-[38px] leading-[1.08] font-medium tracking-[-1.2px] text-black sm:text-[46px]">
        {mode === "signup" ? (
          a.signupTitle
        ) : (
          <>
            Welcome <em className="text-headline-accent italic">back.</em>
          </>
        )}
      </h1>
      <p className="mt-3 text-pretty font-body text-[16px] leading-[1.55] text-black/55">{a.signupLead}</p>

      {/* Log In / Sign Up toggle */}
      <div role="tablist" aria-label="Account" className="relative mt-7 grid grid-cols-2 rounded-full bg-black/[0.04] p-1 ring-1 ring-black/[0.05]">
        <span
          aria-hidden="true"
          className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-white shadow-[0_4px_12px_-6px_rgba(6,36,24,0.35)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mode === "signup" ? "translate-x-full" : ""
          }`}
        />
        {(["login", "signup"] as const).map((m) => (
          <button
            key={m}
            role="tab"
            type="button"
            aria-selected={mode === m}
            onClick={() => {
              setMode(m);
              setNotice(false);
            }}
            className={`relative py-2.5 font-body text-[15px] font-medium transition-colors ${mode === m ? "text-ink-900" : "text-black/50"}`}
          >
            {m === "login" ? "Log In" : "Sign Up"}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setNotice(true)}
        className="mt-5 flex h-12 w-full items-center justify-center gap-3 rounded-[12px] bg-white font-body text-[15px] font-medium text-ink-900 ring-1 ring-black/[0.12] transition-[box-shadow,background-color] hover:bg-black/[0.02] hover:ring-black/25"
      >
        <LinkedInMark />
        Continue with LinkedIn
      </button>

      <div className="my-5 flex items-center gap-4 font-body text-[13px] uppercase tracking-[0.14em] text-black/35">
        <span className="h-px flex-1 bg-black/10" />
        or
        <span className="h-px flex-1 bg-black/10" />
      </div>

      <form onSubmit={submit} className="space-y-4">
        {mode === "signup" && (
          <div className="grid grid-cols-2 gap-3">
            <Field label="First Name">
              <input required name="first" autoComplete="given-name" placeholder="Jane" className={INPUT} />
            </Field>
            <Field label="Last Name">
              <input required name="last" autoComplete="family-name" placeholder="Doe" className={INPUT} />
            </Field>
          </div>
        )}
        {mode === "signup" && a.company && (
          <Field label="Company Name">
            <input required name="company" autoComplete="organization" placeholder="Acme Inc." className={INPUT} />
          </Field>
        )}
        <Field label="Email">
          <input required type="email" name="email" autoComplete="email" placeholder="you@company.com" className={INPUT} />
        </Field>
        <Field label="Password">
          <input
            required
            type="password"
            name="password"
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            minLength={8}
            placeholder="••••••••"
            className={INPUT}
          />
        </Field>
        <button
          type="submit"
          className="group/btn relative isolate mt-2 flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-ink-900 font-body text-[16px] font-medium text-white shadow-btn-sheen transition-transform active:scale-[0.99]"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-[-110%] -right-[60%] -z-10 w-[220%] translate-x-[75%] rounded-[50%] bg-cta transition-transform duration-[650ms] ease-[cubic-bezier(0.33,0,0.2,1)] group-hover/btn:translate-x-0"
          />
          {mode === "signup" ? "Create Account" : "Log In"}
        </button>
      </form>

      {notice && (
        <p role="status" className="pc-rise mt-4 rounded-[12px] bg-brand-green-50 px-4 py-3 font-body text-[14px] leading-[1.5] text-black/70 ring-1 ring-brand-green/15">
          Accounts aren&rsquo;t open on this site yet.{" "}
          <Link href="/request-demo" className="font-medium text-brand-green underline-offset-4 hover:underline">
            Book a demo
          </Link>{" "}
          and we&rsquo;ll set you up.
        </p>
      )}

      <p className="mt-6 text-center font-body text-[14px] text-black/55">
        {mode === "signup" ? "Already have an account? " : "New to VibeLevel? "}
        <button
          type="button"
          onClick={() => setMode(mode === "signup" ? "login" : "signup")}
          className="font-medium text-brand-green underline-offset-4 hover:underline"
        >
          {mode === "signup" ? "Log in" : "Create an account"}
        </button>
      </p>
    </div>
  );
}

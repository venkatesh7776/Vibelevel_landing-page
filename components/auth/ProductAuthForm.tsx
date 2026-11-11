"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

const INPUT =
  "h-12 w-full rounded-[12px] bg-white px-4 font-body text-[15px] text-ink-900 ring-1 ring-black/[0.12] transition-shadow duration-200 placeholder:text-black/35 hover:ring-black/25 focus:outline-none focus:ring-2 focus:ring-brand-green";

export type AuthField = { name: string; label: string; type?: string; placeholder: string; autoComplete: string; hint?: string; half?: boolean };

/**
 * Email/password form for a product's log-in or sign-up page. Accounts aren't connected to this
 * site yet, so submitting explains that instead of pretending to sign in.
 */
export default function ProductAuthForm({ fields, submit }: { fields: AuthField[]; submit: string }) {
  const [notice, setNotice] = useState(false);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setNotice(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setNotice(true)}
        className="flex h-12 w-full items-center justify-center gap-3 rounded-[12px] bg-white font-body text-[15px] font-medium text-ink-900 ring-1 ring-black/[0.12] transition-[box-shadow,background-color] hover:bg-black/[0.02] hover:ring-black/25"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
          <rect width="24" height="24" rx="4" fill="#0A66C2" />
          <path
            fill="#fff"
            d="M7.1 9.5h2.4v7.8H7.1V9.5Zm1.2-3.9a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8Zm2.7 3.9h2.3v1.1c.3-.6 1.1-1.3 2.3-1.3 2.5 0 2.9 1.6 2.9 3.7v4.3h-2.4v-3.8c0-.9 0-2.1-1.3-2.1s-1.5 1-1.5 2v3.9H11V9.5Z"
          />
        </svg>
        Continue with LinkedIn
      </button>

      <div className="my-5 flex items-center gap-4 font-body text-[13px] uppercase tracking-[0.14em] text-black/35">
        <span className="h-px flex-1 bg-black/10" />
        or
        <span className="h-px flex-1 bg-black/10" />
      </div>

      <form onSubmit={onSubmit} className="grid grid-cols-2 gap-x-3 gap-y-4">
        {fields.map((f) => (
          <label key={f.name} className={`block ${f.half ? "col-span-1" : "col-span-2"}`}>
            <span className="mb-1.5 block font-body text-[14px] font-medium text-black/70">{f.label}</span>
            <input
              required
              name={f.name}
              type={f.type ?? "text"}
              placeholder={f.placeholder}
              autoComplete={f.autoComplete}
              minLength={f.type === "password" ? 8 : undefined}
              className={INPUT}
            />
            {f.hint && <span className="mt-1.5 block font-body text-[12.5px] text-black/45">{f.hint}</span>}
          </label>
        ))}
        <button
          type="submit"
          className="group/btn relative isolate col-span-2 mt-1 flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-ink-900 font-body text-[16px] font-medium text-white shadow-btn-sheen transition-transform active:scale-[0.99]"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-[-110%] -right-[60%] -z-10 w-[220%] translate-x-[75%] rounded-[50%] bg-cta transition-transform duration-[650ms] ease-[cubic-bezier(0.33,0,0.2,1)] group-hover/btn:translate-x-0"
          />
          {submit}
        </button>
      </form>

      {notice && (
        <p role="status" className="pc-rise mt-4 rounded-[12px] bg-brand-green-50 px-4 py-3 font-body text-[14px] leading-[1.5] text-black/70 ring-1 ring-brand-green/15">
          Accounts aren&rsquo;t open on this site yet.{" "}
          <Link href="/request-demo" className="font-medium text-brand-green underline-offset-4 hover:underline">
            Book a call
          </Link>{" "}
          and we&rsquo;ll set you up.
        </p>
      )}
    </>
  );
}

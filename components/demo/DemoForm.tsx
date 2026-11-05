"use client";

import { useState, type FormEvent, type ReactNode } from "react";

const CONTACT = "contact@vibelevel.ai";

const INPUT =
  "w-full rounded-[12px] bg-white px-4 font-body text-[15px] text-ink-900 ring-1 ring-black/[0.12] transition-shadow duration-200 placeholder:text-black/35 hover:ring-black/25 focus:outline-none focus:ring-2 focus:ring-brand-green";

function Field({ label, required, optional, children }: { label: string; required?: boolean; optional?: boolean; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-body text-[14px] font-medium text-black/70">
        {label}
        {required && <span className="text-brand-green"> *</span>}
        {optional && <span className="font-normal text-black/40"> (optional)</span>}
      </span>
      {children}
    </label>
  );
}

/** A select with our chevron in place of the native arrow. */
function Chevroned({ children }: { children: ReactNode }) {
  return (
    <span className="relative block">
      {children}
      <svg aria-hidden="true" viewBox="0 0 16 16" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-black/45">
        <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

const SIZES = ["1–10", "11–50", "51–200", "201–1,000", "1,000+"];
const PRODUCTS = ["Multiple / Not sure yet", "Hiring", "Aura", "Teams", "Campus"];

/**
 * Demo request. There's no form backend on this site yet, so sending opens the visitor's email
 * app with the details filled in, addressed to the team.
 */
export default function DemoForm() {
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const body = [
      `Name: ${get("name")}`,
      `Work email: ${get("email")}`,
      `Company: ${get("company")}`,
      `Role: ${get("role") || "—"}`,
      `Team size: ${get("size") || "—"}`,
      `Product interest: ${get("product")}`,
      "",
      get("message"),
    ].join("\n");
    window.location.href = `mailto:${CONTACT}?subject=${encodeURIComponent(`Demo request — ${get("company")}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" required>
          <input required name="name" autoComplete="name" placeholder="Your full name" className={`${INPUT} h-12`} />
        </Field>
        <Field label="Work Email" required>
          <input required type="email" name="email" autoComplete="email" placeholder="you@company.com" className={`${INPUT} h-12`} />
        </Field>
      </div>
      <Field label="Company" required>
        <input required name="company" autoComplete="organization" placeholder="Your company name" className={`${INPUT} h-12`} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Role">
          <input name="role" autoComplete="organization-title" placeholder="e.g., Your role" className={`${INPUT} h-12`} />
        </Field>
        <Field label="Team Size">
          <Chevroned>
          <select name="size" defaultValue="" className={`${INPUT} h-12 appearance-none pr-10`}>
            <option value="" disabled>
              Select size
            </option>
            {SIZES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          </Chevroned>
        </Field>
      </div>
      <Field label="Product Interest">
        <Chevroned>
        <select name="product" defaultValue={PRODUCTS[0]} className={`${INPUT} h-12 appearance-none pr-10`}>
          {PRODUCTS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        </Chevroned>
      </Field>
      <Field label="Message" optional>
        <textarea name="message" rows={5} placeholder="Tell us what you’re looking for…" className={`${INPUT} resize-y py-3`} />
      </Field>

      <button
        type="submit"
        className="group/btn relative isolate inline-flex h-12 items-center justify-center gap-2.5 overflow-hidden rounded-full bg-ink-900 px-7 font-body text-[16px] font-medium text-white shadow-btn-sheen transition-transform active:scale-[0.98]"
      >
        <span
          aria-hidden="true"
          className="absolute inset-y-[-110%] -right-[60%] -z-10 w-[220%] translate-x-[75%] rounded-[50%] bg-cta transition-transform duration-[650ms] ease-[cubic-bezier(0.33,0,0.2,1)] group-hover/btn:translate-x-0"
        />
        Request Demo
        <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 transition-transform duration-200 group-hover/btn:translate-x-1">
          <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {sent && (
        <p role="status" className="pc-rise rounded-[12px] bg-brand-green-50 px-4 py-3 font-body text-[14px] leading-[1.5] text-black/70 ring-1 ring-brand-green/15">
          Your email app should open with your request to {CONTACT}. Send it and we&rsquo;ll reach out within 24 hours.
        </p>
      )}
    </form>
  );
}

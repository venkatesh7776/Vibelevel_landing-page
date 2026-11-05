import type { Metadata } from "next";
import Link from "next/link";
import { AUDIENCES } from "@/components/auth/audiences";
import PrimaryButton from "@/components/hero/PrimaryButton";
import PageShell, { PageIntro } from "@/components/site/PageShell";
import { IconTile } from "@/components/ui/PixelIcon";

export const metadata: Metadata = {
  title: "Sign in – VibeLevel",
  description: "Choose how you use VibeLevel: Aura, Hiring, Campus or Teams.",
};

export default function SigninPage() {
  return (
    <PageShell>
      <PageIntro
        title={
          <>
            How will you use <em className="text-headline-accent italic">VibeLevel?</em>
          </>
        }
      />

      <div className="mx-auto mt-12 max-w-[1280px] px-4 sm:mt-16 sm:px-8">
        <ul className="grid overflow-hidden rounded-[28px] bg-white ring-1 ring-black/[0.07] sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map((a, i) => (
            <li
              key={a.id}
              className={`group pc-rise relative flex flex-col items-center px-7 py-12 text-center transition-colors duration-500 hover:bg-brand-green-50/50 sm:py-14 ${
                i ? "border-t border-dashed border-black/10 sm:border-t-0" : ""
              } ${i % 2 ? "sm:border-l sm:border-dashed sm:border-black/10" : ""} ${i >= 2 ? "sm:border-t sm:border-dashed sm:border-black/10 lg:border-t-0" : ""} ${
                i === 2 ? "lg:border-l lg:border-dashed lg:border-black/10" : ""
              }`}
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
                <IconTile name={a.icon} />
              </span>
              <p className="mt-5 font-body text-[12px] font-medium uppercase tracking-[0.18em] text-brand-green">{a.label}</p>
              <h2 className="mt-3 text-balance font-heading text-[26px] leading-[1.15] font-medium tracking-[-0.6px] text-black">
                {a.title}
              </h2>
              <p className="mt-3 max-w-[260px] flex-1 text-pretty font-body text-[15px] leading-[1.55] text-black/55">{a.description}</p>

              <PrimaryButton href={`/signup?product=${a.id}&mode=login`} size="sm" className="mt-8">
                Log in
              </PrimaryButton>
              <p className="mt-6 font-body text-[14px] text-black/50">Don&rsquo;t have an account?</p>
              <Link
                href={`/signup?product=${a.id}`}
                className="group/cta mt-1 inline-flex items-center gap-1.5 font-body text-[15px] font-medium text-brand-green"
              >
                {a.cta}
                <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1">
                  <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-10 max-w-[820px] pb-20 text-center font-body text-[15px] leading-[1.6] text-black/50 sm:pb-28">
          Practice challenges are now part of <span className="font-medium text-brand-green">Aura</span> — Individual, Teams,
          and Campus accounts include Aura &amp; Practice. Hiring accounts are focused on assessments and candidate evaluation.
        </p>
      </div>
    </PageShell>
  );
}

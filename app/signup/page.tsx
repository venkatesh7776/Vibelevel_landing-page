import type { Metadata } from "next";
import { Suspense } from "react";
import AuthForm from "@/components/auth/AuthForm";
import ScreeningShowcase from "@/components/auth/ScreeningShowcase";
import PageShell from "@/components/site/PageShell";

export const metadata: Metadata = {
  title: "Start your free trial – VibeLevel",
  description: "Create your VibeLevel account.",
};

export default function SignupPage() {
  return (
    <PageShell fields={false}>
      <div className="mx-auto grid max-w-[1280px] items-stretch gap-12 px-5 pb-20 pt-10 sm:px-8 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-12 lg:pb-28">
        <div className="hero-rise flex justify-center lg:justify-end lg:pr-8">
          {/* The form reads ?product and ?mode from the URL, so it renders on the client. */}
          <Suspense fallback={<div className="h-[680px] w-full max-w-[460px]" />}>
            <AuthForm />
          </Suspense>
        </div>
        {/* Showcase on the left from lg up; below that the form comes first. */}
        <div className="h-full lg:order-first">
          <ScreeningShowcase />
        </div>
      </div>
    </PageShell>
  );
}

import type { Metadata } from "next";
import ProductAuth from "@/components/auth/ProductAuth";

export const metadata: Metadata = { title: "Log in – VibeLevel Aura" };

export default function Page() {
  return <ProductAuth product="aura" mode="signin" />;
}

import type { Metadata } from "next";
import ProductAuth from "@/components/auth/ProductAuth";

export const metadata: Metadata = { title: "Sign up – VibeLevel Aura" };

export default function Page() {
  return <ProductAuth product="aura" mode="signup" />;
}

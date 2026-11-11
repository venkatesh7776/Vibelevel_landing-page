import type { Metadata } from "next";
import ProductAuth from "@/components/auth/ProductAuth";

export const metadata: Metadata = { title: "Sign up – VibeLevel Campus" };

export default function Page() {
  return <ProductAuth product="campus" mode="signup" />;
}

import type { Metadata } from "next";
import ProductAuth from "@/components/auth/ProductAuth";

export const metadata: Metadata = { title: "Log in – VibeLevel Campus" };

export default function Page() {
  return <ProductAuth product="campus" mode="signin" />;
}

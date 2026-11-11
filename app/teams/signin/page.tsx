import type { Metadata } from "next";
import ProductAuth from "@/components/auth/ProductAuth";

export const metadata: Metadata = { title: "Log in – VibeLevel Teams" };

export default function Page() {
  return <ProductAuth product="teams" mode="signin" />;
}

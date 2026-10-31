import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import localFont from "next/font/local";
import ClickPixels from "@/components/ClickPixels";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const satoshi = localFont({
  variable: "--font-satoshi",
  src: [
    { path: "./fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "VibeLevel – Evaluate real engineering skills",
  description:
    "Move beyond coding puzzles. Evaluate real engineering skills, AI collaboration, and problem-solving through practical assessments through VibeLevel.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${satoshi.variable} ${lora.variable} antialiased`}>
      <body>
        <SmoothScroll />
        <ClickPixels />
        {children}
      </body>
    </html>
  );
}

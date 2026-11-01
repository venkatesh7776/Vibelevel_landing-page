"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import mountains from "@/public/images/screening-mountains.jpg";
import FullLogo from "../FullLogo";
import ScreeningPixels from "../screening/ScreeningPixels";
import PixelPortrait, { type PortraitSpec } from "./PixelPortrait";

type Role = PortraitSpec & { name: string; /** AI-first version of the role, shown with a green "AI" prefix. */ ai?: boolean };

const ROLES: Role[] = [
  { name: "Software Engineer", ai: true, head: "short", skin: "#c98d63", hair: "#1b1410", clothes: "#0c1210" },
  { name: "Product Manager", ai: true, head: "long", skin: "#f1c7a1", hair: "#5a3420", clothes: "#008a43" },
  { name: "Marketing Manager", ai: true, head: "curly", skin: "#e8b48a", hair: "#2b1d14", clothes: "#00a852" },
  { name: "Customer Support", head: "headset", skin: "#a8704a", hair: "#1f1a17", clothes: "#1dc804" },
  { name: "GTM Engineer", head: "side", skin: "#f5d2b4", hair: "#a8642f", clothes: "#006e36" },
  { name: "Product Designer", ai: true, head: "bun", skin: "#8d5a3b", hair: "#121212", clothes: "#4cfb6c" },
];

// Desktop: six points evenly spaced (every 60°) on an oval around the centred logo, starting top-left
// and going clockwise. Mobile: three above the logo and three below.
const DESKTOP = ROLES.map((_, i) => {
  const a = ((-120 + i * 60) * Math.PI) / 180;
  return { x: 50 + 36 * Math.cos(a), y: 50 + 33 * Math.sin(a) };
});
const MOBILE = [
  { x: 26, y: 13 },
  { x: 74, y: 13 },
  { x: 73, y: 87 },
  { x: 50, y: 70 },
  { x: 27, y: 87 },
  { x: 50, y: 30 },
];

const GRADIENT = "linear-gradient(135deg in oklab, #d4f1dd 0%, #eef6df 50%, #fdf1c7 100%)";
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

/**
 * Section 5's landscape: the VibeLevel logo in the centre and the six roles spread evenly around it.
 * When it scrolls into view the roles come out of the logo to their places, one after another.
 * Hovering a role lifts the person in it.
 */
export default function RoleLandscape() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-shown={shown}
      className="group/scene relative h-[680px] overflow-hidden rounded-[24px] ring-1 ring-black/[0.06] md:h-[560px]"
    >
      <Image
        src={mountains}
        alt=""
        fill
        placeholder="blur"
        sizes="(min-width: 1280px) 1100px, 100vw"
        className="object-cover object-[50%_75%]"
      />
      <ScreeningPixels />

      {/* Logo, centred */}
      <div
        className={`absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-[16px] bg-white px-5 py-4 shadow-[0_18px_40px_-24px_rgba(6,36,24,0.5)] transition-[opacity,scale] duration-700 ${EASE} motion-reduce:transition-none ${
          shown ? "scale-100 opacity-100" : "scale-90 opacity-0"
        } motion-reduce:scale-100 motion-reduce:opacity-100`}
      >
        <FullLogo className="w-[150px] md:w-[190px]" />
      </div>

      <ul>
        {ROLES.map((r, i) => (
          <li
            key={r.name}
            // Before the reveal every role sits behind the logo; then it travels out to its place.
            className={`absolute -translate-x-1/2 -translate-y-1/2 transition-[left,top,opacity,scale] duration-[1100ms] ${EASE} motion-reduce:transition-none ${
              shown
                ? "left-[var(--mx)] top-[var(--my)] scale-100 opacity-100 md:left-[var(--x)] md:top-[var(--y)]"
                : "left-1/2 top-1/2 scale-50 opacity-0 motion-reduce:left-[var(--mx)] motion-reduce:top-[var(--my)] motion-reduce:scale-100 motion-reduce:opacity-100 md:motion-reduce:left-[var(--x)] md:motion-reduce:top-[var(--y)]"
            }`}
            style={
              {
                "--x": `${DESKTOP[i].x}%`,
                "--y": `${DESKTOP[i].y}%`,
                "--mx": `${MOBILE[i].x}%`,
                "--my": `${MOBILE[i].y}%`,
                transitionDelay: `${250 + i * 110}ms`,
              } as CSSProperties
            }
          >
            <div className="role-float group/role flex flex-col items-center gap-2.5">
              <span
                className={`flex size-[68px] items-end justify-center overflow-hidden rounded-full border-[3px] border-white shadow-[0_12px_28px_-14px_rgba(6,36,24,0.5)] transition-shadow duration-300 group-hover/role:shadow-[0_18px_34px_-14px_rgba(6,36,24,0.55)] md:size-[76px]`}
                style={{ backgroundImage: GRADIENT }}
              >
                {/* The person lifts a little on hover */}
                <span className={`block size-[48px] translate-y-[3px] transition-transform duration-300 ${EASE} group-hover/role:-translate-y-[3px] md:size-[54px]`}>
                  <PixelPortrait {...r} />
                </span>
              </span>
              <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-2.5 py-1.5 font-display text-[12px] sm:px-3 leading-none font-medium text-ink-900 shadow-[0_6px_16px_-10px_rgba(6,36,24,0.4)] md:text-[13px]">
                <span className="hidden size-[5px] bg-brand-green sm:block" />
                {r.ai && <span className="text-brand-green">AI</span>}
                {r.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

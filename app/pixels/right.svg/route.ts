import { RIGHT_DOTS } from "@/components/hero/pixel-data-right";
import { fieldSvg, RIGHT_TIMING } from "@/components/hero/pixel-svg";

// Static image of the right hero pixel field, prerendered at build time (no runtime data).
export function GET() {
  return new Response(fieldSvg(RIGHT_DOTS, RIGHT_TIMING), {
    headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=31536000, immutable" },
  });
}

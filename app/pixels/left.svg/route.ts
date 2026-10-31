import { LEFT_DOTS } from "@/components/hero/pixel-data-left";
import { fieldSvg, LEFT_TIMING } from "@/components/hero/pixel-svg";

// Static image of the left hero pixel field, prerendered at build time (no runtime data).
export function GET() {
  return new Response(fieldSvg(LEFT_DOTS, LEFT_TIMING), {
    headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=31536000, immutable" },
  });
}

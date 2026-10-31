"use client";

import PixelField from "./PixelField";
import { RIGHT_DOTS } from "./pixel-data-right";
import { RIGHT_TIMING } from "./pixel-svg";

export default function RightPixelField() {
  return <PixelField dots={RIGHT_DOTS} timing={RIGHT_TIMING} src="/pixels/right.svg" />;
}

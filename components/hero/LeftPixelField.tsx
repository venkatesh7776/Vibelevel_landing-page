"use client";

import PixelField from "./PixelField";
import { LEFT_DOTS } from "./pixel-data-left";
import { LEFT_TIMING } from "./pixel-svg";

export default function LeftPixelField() {
  return <PixelField dots={LEFT_DOTS} timing={LEFT_TIMING} src="/pixels/left.svg" />;
}

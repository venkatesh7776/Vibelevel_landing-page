"use client";

import PixelField from "./PixelField";
import { RIGHT_DOTS } from "./pixel-data-right";

export default function RightPixelField() {
  return (
    <PixelField
      dots={RIGHT_DOTS}
      timing={{ cycle: 6.5, seed: 53 }}
    />
  );
}

"use client";

import PixelField from "./PixelField";
import { LEFT_DOTS } from "./pixel-data-left";

export default function LeftPixelField() {
  return (
    <PixelField
      dots={LEFT_DOTS}
      timing={{ cycle: 5.5, seed: 17 }}
    />
  );
}

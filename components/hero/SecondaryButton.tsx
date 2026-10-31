import type { ComponentProps } from "react";
import { PillButton } from "./PillButton";

export default function SecondaryButton(props: Omit<ComponentProps<typeof PillButton>, "variant">) {
  return <PillButton variant="secondary" {...props} />;
}

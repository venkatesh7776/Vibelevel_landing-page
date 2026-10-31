import type { ComponentProps } from "react";
import { PillButton } from "./PillButton";

export default function PrimaryButton(props: Omit<ComponentProps<typeof PillButton>, "variant">) {
  return <PillButton variant="primary" {...props} />;
}

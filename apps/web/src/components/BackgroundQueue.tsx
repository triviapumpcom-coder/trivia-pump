import React from "react";
import { useBackgroundStore } from "../store/background";
import { useFlashStore } from "../store/flash";

export function BackgroundQueue(): JSX.Element {
  // Production mode - no debug UI
  return <></>;
}

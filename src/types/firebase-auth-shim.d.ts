// The Firebase JS SDK's published type definitions don't yet include
// getReactNativePersistence, even though it exists and works at runtime.
// This augments the module's types so TypeScript (and VS Code) stop
// flagging it as missing.

import type { Persistence } from "firebase/auth";

declare module "firebase/auth" {
  export function getReactNativePersistence(storage: unknown): Persistence;
}
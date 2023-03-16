// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

export { type Middleware } from "https://deno.land/x/http_middleware@1.0.0/mod.ts";
export {
  isNonNegativeInteger,
  isString,
} from "https://deno.land/x/isx@1.0.0-beta.24/mod.ts";

export const enum SecurityHeaders {
  StrictTransportSecurity = "strict-transport-security",
}

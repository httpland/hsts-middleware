// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

export {
  type Handler,
  type Middleware,
} from "https://deno.land/x/http_middleware@1.0.0/mod.ts";
export {
  type StrictTransportSecurity,
  stringify,
} from "https://deno.land/x/hsts_parser@1.0.0-beta.1/mod.ts";

export const enum SecurityHeaders {
  StrictTransportSecurity = "strict-transport-security",
}

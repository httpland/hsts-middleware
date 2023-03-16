// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { type Middleware, SecurityHeaders } from "./deps.ts";
import { StrictTransportSecurity, stringify } from "./sts.ts";

/**
 * @example
 * ```http
 * Strict-Transport-Security: max-age=15552000; includeSubDomains
 * ```
 */
const DefaultSts: StrictTransportSecurity = {
  maxAge: 60 * 60 * 24 * 180, // half-year,
  includeSubDomains: true,
};

/** Create `Strict-Transport-Security` header field value middleware.
 *
 * @example
 * ```ts
 * import { hsts } from "https://deno.land/x/hsts_middleware@$VERSION/mod.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const request: Request;
 * const middleware = hsts();
 * const response = await middleware(
 *   request,
 *   (request: Request) => new Response(),
 * );
 *
 * assertEquals(
 *   response.headers.get(
 *     "strict-transport-security",
 *   ),
 *   "max-age=15552000; includeSubDomains",
 * );
 * ```
 *
 * @throws {TypeError} If the {@link StrictTransportSecurity.maxAge} is not non-negative integer.
 */
export function hsts(
  strictTransportSecurity?: StrictTransportSecurity,
): Middleware {
  const sts = strictTransportSecurity ?? DefaultSts;
  const stsValue = stringify(sts);

  return async (request, next) => {
    const response = await next(request);

    return withSts(response, stsValue);
  };
}

export function withSts(response: Response, fieldValue: string): Response {
  response = response.clone();

  if (!response.headers.has(SecurityHeaders.StrictTransportSecurity)) {
    response.headers.set(SecurityHeaders.StrictTransportSecurity, fieldValue);
  }

  return response;
}

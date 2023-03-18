// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { StrictTransportSecurity } from "./deps.ts";

/** Recommended {@link StrictTransportSecurity}.
 * The following hosts are recommended.
 * - [OWASP](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html)
 * - [mozilla](https://infosec.mozilla.org/guidelines/web_security#http-strict-transport-security)
 *
 * @example
 * ```http
 * Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
 * ```
 */
export const STS: StrictTransportSecurity = {
  maxAge: 60 * 60 * 24 * 365 * 2,
  includeSubDomains: true,
  preload: true,
};

// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { isNonNegativeInteger } from "./deps.ts";

/** HTTP `Strict-Transport-Security` header field. */
export interface StrictTransportSecurity {
  /** The number of seconds, after the reception of the STS header field, during which the UA regards the host. */
  readonly maxAge: number;

  /** Whether the rule applies to all subdomains or not. */
  readonly includeSubDomains?: boolean;

  /** Whether the domain do preload or not.
   * @see https://hstspreload.org/
   */
  readonly preload?: boolean;
}
const enum Directive {
  maxAge = "max-age",
  includeSubDomains = "includeSubDomains",
  preload = "preload",
}

/** Serialize {@link StrictTransportSecurity} into string.
 * @throws {TypeError} If the {@link StrictTransportSecurity.maxAge} is not non-negative integer.
 */
export function stringify(sts: StrictTransportSecurity): string {
  assertValidSts(sts);

  const maxAge = `${Directive.maxAge}=${sts.maxAge}`;
  const includeSubDomains = sts.includeSubDomains
    ? Directive.includeSubDomains
    : undefined;
  const preload = sts.preload ? Directive.preload : undefined;
  const directives: string[] = [
    maxAge,
    includeSubDomains,
    preload,
  ].filter(Boolean) as string[];

  return directives.join("; ");
}

enum Msg {
  InvalidMaxAge = "maxAge must be non-negative integer.",
}

function assertValidSts(sts: StrictTransportSecurity): asserts sts {
  if (!isNonNegativeInteger(sts.maxAge)) {
    throw TypeError(Msg.InvalidMaxAge);
  }
}

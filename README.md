# hsts-middleware

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/hsts_middleware)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/hsts_middleware/mod.ts)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/httpland/hsts-middleware)](https://github.com/httpland/hsts-middleware/releases)
[![codecov](https://codecov.io/github/httpland/hsts-middleware/branch/main/graph/badge.svg)](https://codecov.io/gh/httpland/hsts-middleware)
[![GitHub](https://img.shields.io/github/license/httpland/hsts-middleware)](https://github.com/httpland/hsts-middleware/blob/main/LICENSE)

[![test](https://github.com/httpland/hsts-middleware/actions/workflows/test.yaml/badge.svg)](https://github.com/httpland/hsts-middleware/actions/workflows/test.yaml)
[![NPM](https://nodei.co/npm/@httpland/hsts-middleware.png?mini=true)](https://nodei.co/npm/@httpland/hsts-middleware/)

HTTP Strict Transport Security(HSTS) middleware.

Compliant with
[RFC 6797, HTTP Strict Transport Security(HSTS)](https://www.rfc-editor.org/rfc/rfc6797).

## Middleware

For a definition of Universal HTTP middleware, see the
[http-middleware](https://github.com/httpland/http-middleware) project.

## Usage

Middleware adds the `Strict-Transport-Security` header to the response.

```ts
import { hsts } from "https://deno.land/x/hsts_middleware@$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

declare const request: Request;
const middleware = hsts();
const response = await middleware(
  request,
  (request: Request) => new Response(),
);

assertEquals(
  response.headers.get(
    "strict-transport-security",
  ),
  "max-age=15552000; includeSubDomains",
);
```

Default is to add the following header to the response.

```http
Strict-Transport-Security: max-age=15552000; includeSubDomains
```

## Strict Transport Security

`StrictTransportSecurity` is a structured object of the
`Strict-Transport-Security` Header.

| Name              | Type      |      Required      | Description                                                                                               |
| ----------------- | --------- | :----------------: | --------------------------------------------------------------------------------------------------------- |
| maxAge            | `number`  | :white_check_mark: | The number of seconds, after the reception of the STS header field, during which the UA regards the host. |
| includeSubDomains | `boolean` |         -          | Whether the rule applies to all subdomains or not.                                                        |
| preload           | `boolean` |         -          | Whether the domain do preload or not.                                                                     |

To enable HSTS preload, you will need to register
[HSTS look-ahead service](https://hstspreload.org/).

```ts
import {
  hsts,
  type StrictTransportSecurity,
} from "https://deno.land/x/hsts_middleware@$VERSION/mod.ts";

const sts: StrictTransportSecurity = {
  maxAge: 60 * 60 * 24 * 365 * 2, // 2year,
  includeSubDomains: true,
  preload: true,
};
const middleware = hsts(sts);
```

yield:

```http
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

## Throwing error

[Strict Transport Security](#strict-transport-security) is an invalid value, it
throws `TypeError`.

An invalid value is obtained in the following cases:

- If `maxAge` is not a non-negative integer

```ts
import { hsts } from "https://deno.land/x/hsts_middleware@$VERSION/mod.ts";
import { assertThrows } from "https://deno.land/std/testing/asserts.ts";

assertThrows(() => hsts({ maxAge: NaN }));
```

## Effects

Middleware may make changes to the following elements of the HTTP message.

- HTTP Headers
  - Strict-Transport-Security

## Conditions

Middleware is executed if all of the following conditions are met

- `Strict-Transport-Security` header does not exists in response

## License

Copyright © 2023-present [httpland](https://github.com/httpland).

Released under the [MIT](./LICENSE) license

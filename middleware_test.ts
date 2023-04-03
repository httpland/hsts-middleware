import { hsts } from "./middleware.ts";
import {
  assert,
  assertThrows,
  describe,
  equalsResponse,
  it,
} from "./_dev_deps.ts";

describe("hsts", () => {
  it("should include sts header", async () => {
    const middleware = hsts();

    const response = await middleware(
      new Request("test:"),
      () => new Response(),
    );

    assert(
      await equalsResponse(
        response,
        new Response(null, {
          headers: {
            "strict-transport-security": "max-age=15552000; includeSubDomains",
          },
        }),
        true,
      ),
    );
  });

  it("should change sts header", async () => {
    const middleware = hsts({
      maxAge: 100,
      includeSubDomains: true,
      preload: true,
    });

    const response = await middleware(
      new Request("test:"),
      () => new Response(),
    );

    assert(
      await equalsResponse(
        response,
        new Response(null, {
          headers: {
            "strict-transport-security":
              "max-age=100; includeSubDomains; preload",
          },
        }),
        true,
      ),
    );
  });

  it("should throw error if the sts is invalid", () => {
    assertThrows(() => hsts({ maxAge: NaN }));
  });
});

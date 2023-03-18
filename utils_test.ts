import { STS } from "./utils.ts";
import { assertEquals, describe, it } from "./_dev_deps.ts";

describe("STS", () => {
  it("should return true", () => {
    assertEquals(STS, {
      maxAge: 63072000,
      preload: true,
      includeSubDomains: true,
    });
  });
});

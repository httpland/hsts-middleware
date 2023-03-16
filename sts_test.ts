import { assertEquals, assertThrows, describe, it } from "./_dev_deps.ts";
import { type StrictTransportSecurity, stringify } from "./sts.ts";

describe("stringify", () => {
  it("should return string if the input is valid StrictTransportSecurity", () => {
    const table: [StrictTransportSecurity, string][] = [
      [{ maxAge: 0 }, "max-age=0"],
      [{ maxAge: 100 }, "max-age=100"],
      [
        { maxAge: 100, includeSubDomains: true },
        "max-age=100; includeSubDomains",
      ],
      [
        { maxAge: 100, includeSubDomains: true, preload: true },
        "max-age=100; includeSubDomains; preload",
      ],
      [
        { maxAge: 100, includeSubDomains: false, preload: false },
        "max-age=100",
      ],
    ];

    table.forEach(([sts, expected]) => {
      assertEquals(stringify(sts), expected);
    });
  });

  it("should throw error if the input is invalid StrictTransportSecurity", () => {
    const table: StrictTransportSecurity[] = [
      { maxAge: NaN },
      { maxAge: 1.1 },
      { maxAge: -1 },
      { maxAge: Infinity },
    ];

    table.forEach((sts) => {
      assertThrows(() => stringify(sts));
    });
  });
});

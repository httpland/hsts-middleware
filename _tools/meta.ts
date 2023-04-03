import { BuildOptions } from "https://deno.land/x/dnt@0.33.1/mod.ts";

export const makeOptions = (version: string): BuildOptions => ({
  test: false,
  shims: {},
  compilerOptions: {
    lib: ["dom", "dom.iterable", "esnext"],
  },
  typeCheck: true,
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  package: {
    name: "@httpland/hsts-middleware",
    version,
    description: "HTTP Strict Transport Security(HSTS) middleware",
    keywords: [
      "http",
      "middleware",
      "header",
      "sts",
      "hsts",
      "strict-transport-security",
      "fetch-api",
    ],
    license: "MIT",
    homepage: "https://github.com/httpland/hsts-middleware",
    repository: {
      type: "git",
      url: "git+https://github.com/httpland/hsts-middleware.git",
    },
    bugs: {
      url: "https://github.com/httpland/hsts-middleware/issues",
    },
    sideEffects: false,
    type: "module",
    publishConfig: {
      access: "public",
    },
  },
  packageManager: "pnpm",
  mappings: {
    "https://deno.land/x/http_middleware@1.0.0/mod.ts": {
      name: "@httpland/http-middleware",
      version: "1.0.0",
    },
    "https://deno.land/x/hsts_parser@1.0.0-beta.1/mod.ts": {
      name: "@httpland/hsts-parser",
      version: "1.0.0-beta.1",
    },
    "https://deno.land/x/http_utils@1.0.0/message.ts": {
      name: "@httpland/http-utils",
      version: "1.0.0",
      subPath: "message.js",
    },
  },
});

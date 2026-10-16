import { describe, expect, it } from "vitest";

import { KohostHTTPClient } from "./httpClient.js";

const makeClient = () =>
  new KohostHTTPClient({
    url: "https://api.test/v3/",
    organizationId: "org-a",
    propertyId: "prop-a",
  });

describe("createRequest header overrides", () => {
  it("replaces an ambient header with the per-request value", () => {
    const request = makeClient().createRequest({
      url: "tickets",
      headers: { "X-Organization-Id": "org-b" },
    });
    expect(request.headers.get("X-Organization-Id")).toBe("org-b");
  });
});

describe("createRequest empty header overrides", () => {
  it("lets a per-request empty string override a non-empty ambient header", () => {
    const request = makeClient().createRequest({
      url: "tickets",
      headers: { "X-Organization-Id": "org-b", "X-Property-Id": "" },
    });
    expect(request.headers.get("X-Organization-Id")).toBe("org-b");
    expect(request.headers.get("X-Property-Id")).toBe("");
  });
});

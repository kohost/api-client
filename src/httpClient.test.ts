import { describe, expect, it } from "vitest";

import { KohostHTTPClient } from "./httpClient.js";

const makeClient = () =>
  new KohostHTTPClient({
    url: "https://api.test/v3/",
    organizationId: "org-a",
    propertyId: "prop-a",
  });

describe("createRequest header overrides", () => {
  it("uses the ambient headers when a request passes none", () => {
    const request = makeClient().createRequest({ url: "tickets" });
    expect(request.headers.get("X-Organization-Id")).toBe("org-a");
    expect(request.headers.get("X-Property-Id")).toBe("prop-a");
  });

  it("replaces an ambient header with the per-request value", () => {
    const request = makeClient().createRequest({
      url: "tickets",
      headers: { "X-Organization-Id": "org-b" },
    });
    expect(request.headers.get("X-Organization-Id")).toBe("org-b");
  });

  it("deletes an ambient header when the override is empty", () => {
    const request = makeClient().createRequest({
      url: "tickets",
      headers: { "X-Organization-Id": "org-b", "X-Property-Id": "" },
    });
    expect(request.headers.get("X-Organization-Id")).toBe("org-b");
    expect(request.headers.has("X-Property-Id")).toBe(false);
  });

  it("deletes an ambient header when the override is nullish", () => {
    const request = makeClient().createRequest({
      url: "tickets",
      headers: { "X-Property-Id": null },
    });
    expect(request.headers.has("X-Property-Id")).toBe(false);
  });
});

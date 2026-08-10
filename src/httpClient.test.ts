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
});

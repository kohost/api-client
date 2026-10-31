import { afterEach, describe, expect, it, vi } from "vitest";

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

const stubFetch = (response: Response) =>
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response));

const command = { config: { url: "concierge/tickets", method: "get" } };

describe("send error responses without a structured error body", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("rejects an empty-statusText 502 with an error naming the status", async () => {
    stubFetch(new Response("<html>Bad Gateway</html>", { status: 502 }));
    const error = await makeClient()
      .send(command as never)
      .catch((e: unknown) => e);
    expect(error).toBeInstanceOf(Error);
    expect(error).toMatchObject({
      message: "Request failed with status 502",
      status: 502,
      statusCode: 502,
    });
  });

  it("rejects a non-JSON 401 with status 401", async () => {
    stubFetch(
      new Response("Unauthorized", {
        status: 401,
        headers: { "Content-Type": "text/plain" },
      }),
    );
    const error = await makeClient()
      .send(command as never)
      .catch((e: unknown) => e);
    expect(error).toMatchObject({
      message: "Request failed with status 401",
      status: 401,
      statusCode: 401,
    });
  });

  it("uses a non-empty statusText as the message", async () => {
    stubFetch(new Response(null, { status: 503, statusText: "Unavailable" }));
    const error = await makeClient()
      .send(command as never)
      .catch((e: unknown) => e);
    expect(error).toMatchObject({ message: "Unavailable", status: 503 });
  });

  it("rejects a JSON body without an error field with the status", async () => {
    stubFetch(Response.json({ data: null }, { status: 403 }));
    const error = await makeClient()
      .send(command as never)
      .catch((e: unknown) => e);
    expect(error).toMatchObject({
      message: "Request failed with status 403",
      status: 403,
    });
  });
  it("rejects a JSON-typed empty 401 body with status 401", async () => {
    stubFetch(
      new Response("", {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }),
    );
    const error = await makeClient()
      .send(command as never)
      .catch((e: unknown) => e);
    expect(error).toMatchObject({
      message: "Request failed with status 401",
      status: 401,
    });
  });
});

describe("send structured error responses", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("rejects with the API's error object unchanged", async () => {
    const apiError = { type: "NotFoundError", message: "Ticket not found" };
    stubFetch(Response.json({ error: apiError }, { status: 404 }));
    const error = await makeClient()
      .send(command as never)
      .catch((e: unknown) => e);
    expect(error).toEqual(apiError);
  });

  it("emits LoginRequired for a Login Required error", async () => {
    const apiError = { type: "AuthenticationError", message: "Login Required" };
    stubFetch(Response.json({ error: apiError }, { status: 401 }));
    const client = makeClient();
    const onLoginRequired = vi.fn();
    client.on("LoginRequired", onLoginRequired);
    const error = await client.send(command as never).catch((e: unknown) => e);
    expect(onLoginRequired).toHaveBeenCalledOnce();
    expect(error).toEqual(apiError);
  });
});

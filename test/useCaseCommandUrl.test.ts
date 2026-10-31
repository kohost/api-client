import { describe, it, expect } from "vitest";
import { DescribeDeviceConfigCommand } from "../.generated/useCases/describeDeviceConfig.js";

describe("generated use-case command url", () => {
  it("encodes path params that contain reserved characters", () => {
    const command = new DescribeDeviceConfigCommand({
      data: { id: "dev1", spaceId: "democlub:fmgyiXoe" },
    });

    expect(command.url).toBe("/spaces/democlub%3AfmgyiXoe/devices/dev1/config");
    expect(command.config.url).toBe(command.url);
  });

  it("throws for a declared path param missing from data", () => {
    expect(
      () =>
        new DescribeDeviceConfigCommand({
          data: { spaceId: "space1" } as unknown as {
            spaceId: string;
            id: string;
          },
        }),
    ).toThrow("Missing parameters: id");
  });

  it("throws for every path param when data is absent", () => {
    expect(() => new DescribeDeviceConfigCommand({})).toThrow(
      "Missing parameters: spaceId, id",
    );
  });
});

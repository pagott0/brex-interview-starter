import { describe, expect, it } from "vitest";
import { createItemSchema } from "../src/schemas/item.schema.js";

describe("createItemSchema", () => {
  it("accepts a valid payload", () => {
    const result = createItemSchema.safeParse({
      title: "Slack",
      description: "Team chat",
      status: "active",
    });

    expect(result.success).toBe(true);
  });

  it("rejects payload without title", () => {
    const result = createItemSchema.safeParse({
      description: "Missing title",
      status: "active",
    });

    expect(result.success).toBe(false);
  });
});

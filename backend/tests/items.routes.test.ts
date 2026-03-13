import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Request, Response } from "express";
import {
  createItemHandler,
  getItemsHandler,
} from "../src/routes/items.routes.js";
import { prisma } from "../src/db/prisma.js";

vi.mock("../src/db/prisma", () => ({
  prisma: {
    item: {
      findMany: vi.fn(),
      create: vi.fn(),
    },
  },
}));

function createMockResponse() {
  const res = {} as Response;
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("items routes handlers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("GET should return items ordered by createdAt desc", async () => {
    const items = [
      {
        id: "1",
        title: "Slack",
        description: null,
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    vi.mocked(prisma.item.findMany).mockResolvedValue(items);

    const res = createMockResponse();
    await getItemsHandler({} as Request, res);

    expect(prisma.item.findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: "desc" },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(items);
  });

  it("GET should return 500 on unexpected errors", async () => {
    vi.mocked(prisma.item.findMany).mockRejectedValue(new Error("db down"));

    const res = createMockResponse();
    await getItemsHandler({} as Request, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });

  it("POST should trim title/description and default status to active", async () => {
    const created = {
      id: "1",
      title: "Hello",
      description: "World",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    vi.mocked(prisma.item.create).mockResolvedValue(created);

    const req = {
      body: {
        title: "  Hello  ",
        description: "  World  ",
      },
    } as Request;
    const res = createMockResponse();

    await createItemHandler(req, res);

    expect(prisma.item.create).toHaveBeenCalledWith({
      data: {
        title: "Hello",
        description: "World",
        status: "active",
      },
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(created);
  });

  it("POST should return 400 for invalid payload", async () => {
    const req = {
      body: {
        description: "missing title",
      },
    } as Request;
    const res = createMockResponse();

    await createItemHandler(req, res);

    expect(prisma.item.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: "Invalid payload" }),
    );
  });

  it("POST should return 500 on unexpected errors", async () => {
    vi.mocked(prisma.item.create).mockRejectedValue(new Error("insert failed"));

    const req = {
      body: {
        title: "Hello",
      },
    } as Request;
    const res = createMockResponse();

    await createItemHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});

import { describe, expect, it, vi, beforeEach } from "vitest";
import { itemsService } from "../src/services/items.service.js";
import { itemsRepository } from "../src/repositories/items.repository.js";

vi.mock("../src/repositories/items.repository", () => ({
  itemsRepository: {
    findAll: vi.fn(),
    create: vi.fn(),
  },
}));

describe("itemsService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should trim title and description before creating", async () => {
    vi.mocked(itemsRepository.create).mockResolvedValue({
      id: "1",
      title: "Hello",
      description: "World",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await itemsService.createItem({
      title: "  Hello  ",
      description: "  World  ",
      status: "active",
    });

    expect(itemsRepository.create).toHaveBeenCalledWith({
      title: "Hello",
      description: "World",
      status: "active",
    });
  });
});
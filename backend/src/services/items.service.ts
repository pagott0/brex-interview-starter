import { itemsRepository } from "../repositories/items.repository.js";
import type { CreateItemInput } from "../types/item.types.js";

export const itemsService = {
  async getItems() {
    return itemsRepository.findAll();
  },

  async createItem(input: CreateItemInput) {
    return itemsRepository.create({
      title: input.title.trim(),
      description: input.description?.trim(),
      status: input.status ?? "active",
    });
  },
};
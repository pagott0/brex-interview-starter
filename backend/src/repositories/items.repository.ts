import { prisma } from "../db/prisma.js";

export const itemsRepository = {
  async findAll() {
    return prisma.item.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  async create(data: {
    title: string;
    description?: string;
    status?: string;
  }) {
    return prisma.item.create({
      data,
    });
  },
};
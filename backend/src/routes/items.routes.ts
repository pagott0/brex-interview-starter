import { Router, Request, Response } from "express";
import { createItemSchema } from "../schemas/item.schema.js";
import { prisma } from "../db/prisma.js";

export const itemsRouter = Router();

export async function getItemsHandler(_req: Request, res: Response) {
  try {
    const items = await prisma.item.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error("Failed to fetch items:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function createItemHandler(req: Request, res: Response) {
  const parsed = createItemSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid payload",
      details: parsed.error.flatten(),
    });
  }

  try {
    const item = await prisma.item.create({
      data: {
        title: parsed.data.title.trim(),
        description: parsed.data.description?.trim(),
        status: parsed.data.status ?? "active",
      },
    });

    return res.status(201).json(item);
  } catch (error) {
    console.error("Failed to create item:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

itemsRouter.get("/", getItemsHandler);
itemsRouter.post("/", createItemHandler);

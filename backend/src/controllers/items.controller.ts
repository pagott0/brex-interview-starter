import type { Response, Request } from "express";
import { createItemSchema } from "../schemas/item.schema.js";
import { itemsService } from "../services/items.service.js";

export async function getItemsHandler(_req: Request, res: Response) {
  const items = await itemsService.getItems();
  return res.status(200).json(items);
}

export async function createItemHandler(req: Request, res: Response) {
  const parsed = createItemSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid payload",
      details: parsed.error.flatten(),
    });
  }

  const item = await itemsService.createItem(parsed.data);
  return res.status(201).json(item);
}
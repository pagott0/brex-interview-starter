import { z } from "zod";
import type { createItemSchema } from "../schemas/item.schema.js";

export type CreateItemInput = z.infer<typeof createItemSchema>;
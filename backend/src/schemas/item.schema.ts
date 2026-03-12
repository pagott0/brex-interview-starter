import { z } from "zod";

export const createItemSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().max(500).optional(),
  status: z.string().min(1).max(40).optional(),
});
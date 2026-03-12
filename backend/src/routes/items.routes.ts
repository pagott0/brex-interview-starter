import { Router } from "express";
import {
  getItemsHandler,
  createItemHandler,
} from "../controllers/items.controller.js";

export const itemsRouter = Router();

itemsRouter.get("/", getItemsHandler);
itemsRouter.post("/", createItemHandler);
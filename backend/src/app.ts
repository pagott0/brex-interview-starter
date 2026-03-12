import express from "express";
import cors from "cors";
import { itemsRouter } from "./routes/items.routes.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/items", itemsRouter);
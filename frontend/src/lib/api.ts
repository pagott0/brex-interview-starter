import { CreateItemPayload, Item } from "./types";

const API_BASE_URL = "http://localhost:8080/api";

export async function getItems(): Promise<Item[]> {
  const response = await fetch(`${API_BASE_URL}/items`);
  if (!response.ok) throw new Error("Failed to fetch items");
  return response.json();
}

export async function createItem(payload: CreateItemPayload): Promise<Item> {
  const response = await fetch(`${API_BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error("Failed to create item");
  return response.json();
}
"use client";

import { useEffect, useState } from "react";
import { getItems } from "../lib/api";
import { Item } from "../lib/types";

export function ItemList() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItems()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="rounded border p-4">
          <div className="font-medium">{item.title}</div>
          {item.description ? (
            <div className="text-sm text-gray-600">{item.description}</div>
          ) : null}
          <div className="mt-2 text-xs text-gray-500">Status: {item.status}</div>
        </div>
      ))}
    </div>
  );
}
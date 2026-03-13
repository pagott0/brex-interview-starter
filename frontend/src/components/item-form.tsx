"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createItem } from "../lib/api";

export function ItemForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const queryClient = useQueryClient();

  const createItemMutation = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      setTitle("");
      setDescription("");
      setSuccessMessage("Item created successfully.");
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccessMessage("");
    await createItemMutation.mutateAsync({ title, description });
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Create Item</h2>

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full rounded-md border border-gray-300 px-3 py-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full rounded-md border border-gray-300 px-3 py-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          type="submit"
          disabled={createItemMutation.isPending}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {createItemMutation.isPending ? "Creating..." : "Create item"}
        </button>
      </form>

      {successMessage ? (
        <div className="mt-4 p-4 rounded-md bg-green-100 border border-green-400 text-green-700">
          {successMessage}
        </div>
      ) : null}

      {createItemMutation.isError ? (
        <div className="mt-4 p-4 rounded-md bg-red-100 border border-red-400 text-red-700">
          Failed to create item.
        </div>
      ) : null}
    </div>
  );
}

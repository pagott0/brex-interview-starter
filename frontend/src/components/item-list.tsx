"use client";

import { useQuery } from "@tanstack/react-query";
import { getItems } from "../lib/api";

export function ItemList() {
  const { data: items = [], isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

  if (isLoading) {
    return <div className="flex justify-center items-center py-10">Loading...</div>;
  }

  if (isError)
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 rounded-md p-4 mb-6">
        <p className="mb-2">Failed to load items.</p>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => refetch()}
        >
          Try again
        </button>
      </div>
    );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Items</h3>

      {isFetching ? (
        <div className="text-xs text-gray-500 mb-3">Refreshing...</div>
      ) : null}

      {!items.length ? (
        <p className="text-gray-500 text-center py-8">No items yet</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900">{item.title}</p>
                {item.description ? (
                  <p className="text-sm text-gray-600">{item.description}</p>
                ) : null}
                <p className="text-sm text-gray-500">Status: {item.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

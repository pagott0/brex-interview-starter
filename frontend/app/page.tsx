import { ItemForm } from "@/src/components/item-form";
import { ItemList } from "@/src/components/item-list";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-2xl p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Items</h1>
        <p className="text-sm text-gray-600">
          Simple MVP for interview practice.
        </p>
      </div>

      <ItemForm />
      <ItemList />
    </main>
  );
}
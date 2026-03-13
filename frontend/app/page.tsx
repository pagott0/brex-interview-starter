import { ItemForm } from "@/src/components/item-form";
import { ItemList } from "@/src/components/item-list";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Items Dashboard</h1>
          <p className="text-gray-600">Simple Brex interview playground scaffold, lets start hacking!</p>
        </div>

        <ItemForm />
        <ItemList />
      </div>
    </div>
  );
}

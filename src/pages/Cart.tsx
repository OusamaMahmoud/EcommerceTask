import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useCartStore, CartItem } from "../store/useCartStore";
import { useEffect, useMemo, useState } from "react";
import SortableCartItem from "../components/cart/SortableCartItem";

const Cart = () => {
  const { items, clearCart } = useCartStore();
  const [orderedItems, setOrderedItems] = useState(
    items.map((item) => item.id)
  );

  useEffect(() => {
    setOrderedItems(items.map((item) => item.id));
  }, [items]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = orderedItems.indexOf(active.id);
      const newIndex = orderedItems.indexOf(over.id);
      const newOrder = arrayMove(orderedItems, oldIndex, newIndex);
      setOrderedItems(newOrder);
    }
  };

  const sortedItems = useMemo(
    () =>
      orderedItems
        .map((id) => items.find((item) => item.id === id))
        .filter(Boolean) as CartItem[],
    [orderedItems, items]
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Cart</h1>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Cart
          </button>
        )}
      </div>
      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={orderedItems}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {sortedItems.map((item) => (
                <SortableCartItem key={item.id} product={item} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

export default Cart;

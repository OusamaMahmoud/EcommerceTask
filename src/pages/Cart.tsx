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
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useCartStore, CartItem } from "../store/useCartStore";
import { useEffect, useState } from "react";

// ✅ Sortable Item Component
// const SortableCartItem = ({ product }: { product: CartItem }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: product.id });

//   const removeFromCart = useCartStore((state) => state.removeFromCart);

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const {  increaseQuantity, decreaseQuantity, items } =
//     useCartStore();
//   const inCart = items.find((item) => item.id === product.id);
//   const quantity = inCart?.quantity || 0;

//   useEffect(() => {
//     if (quantity === 0) {
//       removeFromCart(product.id);
//     }
//   }, [quantity, product.id, removeFromCart]);
//   return (
//     <div className="relative">
//       <div
//         ref={setNodeRef}
//         style={style}
//         {...attributes}
//         {...listeners}
//         className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center justify-between gap-4 cursor-grab"
//       >
//         <div className="flex items-center gap-4">
//           <img
//             src={product.image}
//             alt={product.title}
//             className="w-16 h-16 object-contain"
//           />
//           <div>
//             <h2 className="font-medium">{product.title}</h2>
//             <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
//             <p className="text-sm text-gray-500">${product.price}</p>
//           </div>
//         </div>
//       </div>
//       <div className=" flex justify-between items-center mt-2">
//         <div className="flex items-center gap-2 mt-4">
//           {quantity > 0 && (
//             <>
//               <button
//                 className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
//                 onClick={() => decreaseQuantity(product.id)}
//               >
//                 −
//               </button>
//               <span>{quantity}</span>
//               <button
//                 className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
//                 onClick={() => increaseQuantity(product.id)}
//               >
//                 +
//               </button>
//             </>
//           )}
//         </div>
//         <button
//           onClick={(e) => {
//             // Stop propagation to prevent conflict with drag handlers
//             e.stopPropagation();
//             console.log(product.id);
//             removeFromCart(product.id);
//           }}
//           className="text-red-500 hover:text-red-700  bg-red-100 p-2 rounded-xl"
//         >
//           Remove
//         </button>
//       </div>
//     </div>
//   );
// };
const SortableCartItem = ({ product }: { product: CartItem }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: product.id });
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const { increaseQuantity, decreaseQuantity, items } = useCartStore();
  const inCart = items.find((item) => item.id === product.id);
  const quantity = inCart?.quantity || 0;

  useEffect(() => {
    if (quantity === 0) {
      removeFromCart(product.id);
    }
  }, [quantity, product.id, removeFromCart]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative"
    >
      <div
        {...attributes}
        {...listeners}
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center justify-between gap-4 cursor-grab"
      >
        <div className="flex items-center gap-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-16 h-16 object-contain"
          />
          <div>
            <h2 className="font-medium">{product.title}</h2>
            <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
            <p className="text-sm text-gray-500">${product.price}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-2 mt-4">
          {quantity > 0 && (
            <>
              <button
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                onClick={(e) => {
                  e.stopPropagation();
                  decreaseQuantity(product.id);
                }}
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                onClick={(e) => {
                  e.stopPropagation();
                  increaseQuantity(product.id);
                }}
              >
                +
              </button>
            </>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log(product.id);
            removeFromCart(product.id);
          }}
          className="text-red-500 hover:text-red-700 bg-red-100 p-2 rounded-xl"
        >
          Remove
        </button>
      </div>
    </div>
  );
};
// ✅ Cart Page
const Cart = () => {
  const { items, clearCart } = useCartStore();
  const [orderedItems, setOrderedItems] = useState(
    items.map((item) => item.id)
  );
  // 👇 sync when items change
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

  // Maintain order based on drag-and-drop
  const sortedItems = orderedItems
    .map((id) => items.find((item) => item.id === id))
    .filter(Boolean) as CartItem[];

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

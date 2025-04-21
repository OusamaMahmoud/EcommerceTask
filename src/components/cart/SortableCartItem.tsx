import { CSS } from "@dnd-kit/utilities";
import { CartItem, useCartStore } from "../../store/useCartStore";
import { useSortable } from "@dnd-kit/sortable";
import { useEffect } from "react";

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
    <div ref={setNodeRef} style={style} className="relative shadow-lg p-4 rounded-lg">
      <div
        {...attributes}
        {...listeners}
        className="bg-white dark:bg-gray-800 rounded-lg  p-4 flex items-center justify-between gap-4 cursor-grab"
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
export default SortableCartItem;

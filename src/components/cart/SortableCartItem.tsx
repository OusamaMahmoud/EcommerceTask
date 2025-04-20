import { useSortable } from "@dnd-kit/sortable";
import { CartItem, useCartStore } from "../../store/useCartStore";
import { CSS } from "@dnd-kit/utilities";

const SortableCartItem = ({ product }: { product: CartItem }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: product.id });

  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
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
      <button
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          removeFromCart(product.id);
        }}
        className="px-3 py-1 bg-red-100 text-red-500 hover:bg-red-200 rounded-md"
      >
        Remove
      </button>
    </div>
  );
};
export default SortableCartItem;

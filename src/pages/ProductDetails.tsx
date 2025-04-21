import { useParams } from "react-router";
import ErrorMessage from "../components/common/ErrorMessage";
import { useCartStore } from "../store/useCartStore";
import { useProductDetails } from "../hooks/react-query/products/useProductDetails";
import { useEffect, useMemo } from "react";
import Skeleton from "../components/common/Skeleton";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useProductDetails(id as string);

  const { addToCart, increaseQuantity, decreaseQuantity, items } =
    useCartStore();

  const inCart = useMemo(
    () => items.find((item) => item.id === parseInt(id as string)),
    [items, id]
  );

  const quantity = inCart?.quantity || 0;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(data);
    toast.success("Item added to cart!");
  };
  if (isLoading)
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Skeleton height="80px" width="100%" />
        <Skeleton height="20px" width="80%" className="mt-4" />
        <Skeleton height="60px" width="40%" className="mt-4" />
        <Skeleton height="200px" width="100%" className="mt-4" />
      </div>
    );

  if (error) return <ErrorMessage message="Failed to load product details." />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-80 object-contain bg-white p-4 rounded-lg shadow"
        />
        <div>
          <h2 className="text-2xl font-bold mb-4">{data.title}</h2>
          <p className="text-gray-600 mb-2 text-sm">{data.category}</p>
          <p className="text-lg font-semibold text-green-600 mb-4">
            ${data.price}
          </p>
          <p className="text-gray-700 mb-4">{data.description}</p>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-500 font-semibold">
              ⭐ {data.rating.rate}
            </span>
            <span className="text-sm text-gray-500">
              ({data.rating.count} reviews)
            </span>
          </div>
          <div className="flex items-center gap-2 mt-4">
            {quantity > 0 ? (
              <>
                <button
                  aria-label="Decrease quantity"
                  disabled={quantity == 0}
                  className="px-3 py-1 bg-gray-300 rounded  hover:bg-gray-400 "
                  onClick={() => decreaseQuantity(parseInt(id as string))}
                >
                  −
                </button>
                <span>{quantity}</span>
                <button
                  aria-label="Increase quantity"
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => increaseQuantity(parseInt(id as string))}
                >
                  +
                </button>
              </>
            ) : (
              <button
                aria-label="Add to cart"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

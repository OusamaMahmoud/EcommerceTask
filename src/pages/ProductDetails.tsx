import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router";
import ErrorMessage from "../components/common/ErrorMessage";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useCartStore } from "../store/useCartStore";

const fetchProductDetails = async (id: string) => {
  const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return res.data;
};

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["product-details", id],
    queryFn: () => fetchProductDetails(id as string),
    enabled: !!id,
  });

  const { addToCart, increaseQuantity, decreaseQuantity, items } =
    useCartStore();

  const inCart = items.find((item) => item.id === parseInt(id as string));
  const quantity = inCart?.quantity || 0;

  if (isLoading) return <LoadingSpinner />;
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
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => decreaseQuantity(parseInt(id as string))}
                >
                  −
                </button>
                <span>{quantity}</span>
                <button
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => increaseQuantity(parseInt(id as string))}
                >
                  +
                </button>
              </>
            ) : (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => addToCart(data)}
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

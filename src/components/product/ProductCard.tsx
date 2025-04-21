import { FaStar } from "react-icons/fa";
import { Product } from "../../types/product/product";
import { Link } from "react-router";
import { memo } from "react";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div
      className="bg-white rounded-xl shadow-md p-4 flex gap-4 dark:bg-gray-800 overflow-x-clip 
    hover:rotate-1 transition-transform duration-300 ease-in-out hover:scale-105 "
    >
      <img
        src={product.image}
        alt={product.title}
        loading="lazy"
        className="w-24 h-24 object-contain"
      />
      <div className="flex-1 max-w-36">
        <Link to={`/products/${product.id}`} className="block mb-2">
          <h3 className="font-semibold text-lg ">{product.title}</h3>
        </Link>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-primary font-bold">${product.price}</span>
          <span className="flex items-center gap-1 text-yellow-500 text-sm">
            <FaStar /> {product.rating.rate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);

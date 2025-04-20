import { useProductsByCategory } from "../../hooks/react-query/products/useProductsByCategory";
import Skeleton from "../common/Skeleton";
import ErrorMessage from "../common/ErrorMessage";
import { ProductCard } from "./ProductCard";

const ProductsList = ({ category }: { category: string }) => {
  const { data, isLoading, error } = useProductsByCategory(category);

  return (
    <div>
      {isLoading && <Skeleton />}
      {error && <ErrorMessage message="Failed to load products." />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;

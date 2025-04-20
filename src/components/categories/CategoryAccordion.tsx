import { motion, AnimatePresence } from "framer-motion";
import { useProductsByCategory } from "../../hooks/react-query/products/useProductsByCategory";
import { ProductCard } from "../product/ProductCard";
import Skeleton from "../common/Skeleton";
import ErrorMessage from "../common/ErrorMessage";

interface Props {
  category: string;
  isActive: boolean;
  onClick: () => void;
}

export const CategoryAccordion = ({ category, isActive, onClick }: Props) => {
  const { data, isLoading, error } = useProductsByCategory(category);

  return (
    <div className="border rounded-xl overflow-hidden mb-4">
      <button
        onClick={onClick}
        className="w-full text-left px-4 py-3 font-semibold bg-gray-100 dark:bg-gray-700 dark:text-white"
      >
        {category}
      </button>
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 py-3 bg-gray-50 dark:bg-gray-800"
          >
            {isLoading && <Skeleton />}
            {error && <ErrorMessage message="Failed to load products." />}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import { motion, AnimatePresence } from "framer-motion";
import ProductsList from "../product/ProductsList";
import { memo } from "react";

interface Props {
  category: string;
  isActive: boolean;
  onClick: () => void;
}

const CategoryAccordion = ({ category, isActive, onClick }: Props) => {
  return (
    <div className="border rounded-xl overflow-hidden mb-4">
      <button
        onClick={onClick}
        className={`${
          isActive && "bg-primary"
        } w-full text-left px-4 py-3 font-semibold bg-gray-100 dark:bg-gray-700 dark:text-white`}
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
            <ProductsList category={category} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(CategoryAccordion);

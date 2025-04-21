const ProductCardSkeleton = () => {
  return (
    <div className="p-4 border rounded-lg shadow animate-pulse bg-white dark:bg-gray-800">
      <div className="h-40 bg-gray-200 dark:bg-gray-700 mb-4 rounded"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 mb-2 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 mb-2 rounded w-1/2"></div>
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-full mt-4"></div>
    </div>
  );
};

export default ProductCardSkeleton;

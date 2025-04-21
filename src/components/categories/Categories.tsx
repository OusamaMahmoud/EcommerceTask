import { useCallback, useState } from "react";
import { useCategories } from "../../hooks/react-query/products/useCategories";
import ErrorMessage from "../common/ErrorMessage";
import CategoryAccordionSkeleton from "./CategoryAccordionSkeleton";
import CategoryAccordion from "./CategoryAccordion";

const Categories = () => {
  const { data: categories, isLoading, error, refetch } = useCategories();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleToggle = useCallback((category: string) => {
    setActiveCategory((prev) => (prev === category ? null : category));
  }, []);

  if (isLoading)
    return (
      <>
        <h1 className="text-2xl font-bold mb-6">Product Categories</h1>
        {Array.from({ length: 4 }).map((_, idx) => (
          <CategoryAccordionSkeleton key={idx} />
        ))}
      </>
    );

  if (error)
    return (
      <ErrorMessage
        message=" Error loading categories."
        onRetry={() => refetch()}
      />
    );

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Product Categories</h1>
      {categories?.map((cat: any) => (
        <CategoryAccordion
          key={cat}
          category={cat}
          isActive={activeCategory === cat}
          onClick={() => handleToggle(cat)}
        />
      ))}
    </>
  );
};

export default Categories;

import { useState } from "react";
import { CategoryAccordion } from "./CategoryAccordion";
import { useCategories } from "../../hooks/react-query/products/useCategories";
import Skeleton from "../common/Skeleton";
import ErrorMessage from "../common/ErrorMessage";

const Categories = () => {
  const { data: categories, isLoading, error, refetch } = useCategories();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  if (isLoading) return <Skeleton />;
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
          onClick={() =>
            setActiveCategory((prev) => (prev === cat ? null : cat))
          }
        />
      ))}
    </>
  );
};

export default Categories;

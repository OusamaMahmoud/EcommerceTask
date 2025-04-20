// src/pages/Home.tsx
import { useState } from "react";
import { CategoryAccordion } from "../components/product/CategoryAccordion";
import { useCategories } from "../hooks/react-query/products/useCategories";
import Skeleton from "../components/common/Skeleton";

const Home = () => {
  const { data: categories, isLoading, error } = useCategories();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  if (isLoading) return <Skeleton />;
  if (error)
    return (
      <p className="text-red-500 text-center mt-10">
        Error loading categories.
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
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
    </div>
  );
};

export default Home;

// src/hooks/queries/useProductsByCategory.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ["products", category],
    queryFn: async (): Promise<Product[]> => {
      const res = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`
      );
      return res.data;
    },
    enabled: !!category, // only fetch when category is defined
    staleTime: 1000 * 60 * 5,
  });
};

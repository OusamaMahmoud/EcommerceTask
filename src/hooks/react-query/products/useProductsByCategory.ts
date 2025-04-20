import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "../../../types/product/product";

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

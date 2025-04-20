import { useQuery } from "@tanstack/react-query";
import { Product } from "../../../types/product/product";
import apiClient from "../../../services/apiClient";

const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const res = await apiClient.get(`/products/category/${category}`);
  return res.data;
};

export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ["products", category],
    queryFn: () => getProductsByCategory(category),
    enabled: !!category, // only fetch when category is defined
    staleTime: 1000 * 60 * 5,
  });
};

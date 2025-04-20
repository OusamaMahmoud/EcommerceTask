import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../services/apiClient";

const PRODUCT_CATEGORIES_URL = "/products/categories";

export const useCategories = () => {
  return useQuery({
    queryKey: ["productCategories"],
    queryFn: async (): Promise<string[]> => {
      const response = await apiClient.get<string[]>(PRODUCT_CATEGORIES_URL);
      console.log("Product Categories:", response.data);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    retry: 2, // retry on failure 2 times
    refetchOnWindowFocus: false,
  });
};

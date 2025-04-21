import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../services/apiClient";

const PRODUCT_CATEGORIES_URL = "/products/categories";

const getProductCategories = async (): Promise<string[]> => {
  const response = await apiClient.get<string[]>(PRODUCT_CATEGORIES_URL);
  return response.data;
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["productCategories"],
    queryFn: getProductCategories,
    staleTime: 1000 * 60 * 5, 
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

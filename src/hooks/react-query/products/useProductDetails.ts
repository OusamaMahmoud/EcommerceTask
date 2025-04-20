import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../services/apiClient";

const fetchProductDetails = async (id: string) => {
  const res = await apiClient.get(`/products/${id}`);
  return res.data;
};

export const useProductDetails = (productId: string) => {
  return useQuery({
    queryKey: ["product-details", productId],
    queryFn: () => fetchProductDetails(productId),
    enabled: !!productId,
  });
};

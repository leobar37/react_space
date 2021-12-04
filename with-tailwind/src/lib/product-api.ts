import axios from "axios";
import { useQuery } from "react-query";
import { Product } from "@app/common";
const shopApi = axios.create({
  baseURL: "http://localhost:8000/api/",
});

const fetchProducts = async () => {
  const { data } = await shopApi.get("products/");
  return data;
};

export const useProducts = () => {
  const { data } = useQuery<Product[]>("products", () => fetchProducts());
  return {
    products: data,
  };
};

export const useProduct = (id: number) => {
  const { data: product, ...rest } = useQuery<Product>(
    ["product", id],
    async () => {
      const { data } = await shopApi.get("products/" + id);
      return data;
    }
  );
  return {
    product,
    ...rest,
  };
};

export const useSimilarProducts = (id: number) => {
  const { data: products, ...rest } = useQuery<Product[]>(
    ["products", id],
    async () => {
      const { data } = await shopApi.get("products/recommend_products/", {
        params: {
          poductid: id,
          count: 4,
        },
      });
      return data;
    }
  );
  return {
    products,
    ...rest,
  };
};

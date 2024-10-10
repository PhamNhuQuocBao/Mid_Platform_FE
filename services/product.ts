import { Product, ProductResponse } from "@/types";
import { APIs } from ".";

export const getAllProduct = async () => {
  try {
    const res = await APIs.get("/product");

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductById = async (id: string) => {
  try {
    const res = await APIs.get(`/product/${id}`);

    return res;
  } catch (error) {
    console.error(error);
  }
};

export const createProduct = async (product: Product) => {
  try {
    const res = await APIs.post(`/product`, product);

    return res;
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = async (id: string, product: ProductResponse) => {
  try {
    const { _id, __v, ...productNotId } = product;

    const res = await APIs.put(`/product/${id}`, productNotId);

    return res;
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const res = await APIs.delete(`/product/${id}`);

    return res;
  } catch (error) {
    console.error(error);
  }
};

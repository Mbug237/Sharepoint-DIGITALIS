import axios from "axios";

const API_BASE_URL = "http://192.168.100.236:8080/api/categories";

export const getAllCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data; // ← sécurise ici
};



export const createCategory = async (name: string) => {
  const response = await axios.post(`${API_BASE_URL}`, { name });
  return response.data;
};

export const deleteCategory = async (categoryId: number) => {
  await axios.delete(`${API_BASE_URL}/${categoryId}`);
};

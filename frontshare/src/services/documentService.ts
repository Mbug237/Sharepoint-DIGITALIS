import axios from "axios";

const API_BASE_URL = "http://192.168.100.236:8080/api/documents";

export const getDocumentsByCategory = async (categoryId: number) => {
  const response = await axios.get(`${API_BASE_URL}/category/${categoryId}`);
  return response.data;
};

export const deleteDocument = async (documentId: number) => {
  await axios.delete(`${API_BASE_URL}/${documentId}`);
};

export const downloadDocument = async (documentId: number) => {
  const response = await axios.get(`${API_BASE_URL}/${documentId}/download`, {
    responseType: "blob",
  });
  return response.data;
};

export const uploadDocument = async (
  categoryId: number,
  formData: FormData
) => {
  formData.append("categoryId", categoryId.toString());

  const response = await axios.post(`${API_BASE_URL}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
export const updateDocumentTitle = async (documentId: number, title: string) => {
  const response = await axios.put(`${API_BASE_URL}/${documentId}`, { title });
  return response.data;
};

export const uploadMultipleDocuments = async (
  categoryId: number,
  formData: FormData
) => {
  const response = await axios.post(
    "http://localhost:8080/api/documents/multiple",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};


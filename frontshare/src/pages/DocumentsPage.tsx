import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CategoryList from "../components/CategoryList";
import CategoryForm from "../components/CategoryForm";
import { getAllCategories } from "../services/categoryService";

interface Document {
  id: number;
  title: string;
  filename: string;
  contentType: string;
}

interface Category {
  id: number;
  name: string;
  documents?: Document[];
}


const DocumentsPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);


  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error);
      setCategories([]); // éviter crash
    }
  };


  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Gestion des documents</h2>
        <CategoryForm onSuccess={fetchCategories} />
        <CategoryList categories={categories} onDelete={fetchCategories} />
      </div>
    </div>
  );
};

export default DocumentsPage;

import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { deleteCategory } from "../services/categoryService";
import "./CategoryList.css";

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


const CategoryList = ({
  categories,
  onDelete,
}: {
  categories: Category[] | undefined;
  onDelete: () => void;
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (id: number) => {
    if (window.confirm("Confirmer la suppression de cette catégorie ?")) {
      try {
        await deleteCategory(id);
        onDelete(); // recharge la liste dans DocumentsPage
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  };

  const filteredCategories = useMemo(() => {
    if (!Array.isArray(categories)) return [];
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  return (
    <div className="category-container">
      <h3 className="category-title">Catégories disponibles</h3>

      <input
        type="text"
        placeholder="Rechercher une catégorie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem",
          width: "20%",
          borderRadius: "6px",
          border: "1px solid #ccc",
          height: "20px",
        }}
      />

      <div className="category-grid">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat) => (
            <div key={cat.id} className="category-card">
              <span
                onClick={() => navigate(`/documents/${cat.id}`)}
                style={{ cursor: "pointer", flex: 1 }}
              >
                {cat.name}
              </span>
              <button
                onClick={() => handleDelete(cat.id)}
                style={{
                  marginLeft: "1rem",
                  backgroundColor: "#e74c3c",
                  color: "white",
                  border: "none",
                  padding: "0.3rem 0.6rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                x
              </button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#888" }}>
            Aucune catégorie trouvée.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryList;

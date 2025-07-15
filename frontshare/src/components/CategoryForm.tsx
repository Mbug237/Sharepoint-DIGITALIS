import { useState } from "react";
import { createCategory } from "../services/categoryService";
import "./CategoryForm.css";

interface CategoryFormProps {
  onSuccess: () => void;
}

const CategoryForm = ({ onSuccess }: CategoryFormProps) => {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await createCategory(name.trim());
      setName("");
      setSuccess(true);
      onSuccess(); // MAJ des catégories
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Erreur lors de la création :", error);
    }
  };

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nom de la nouvelle catégorie"
        required
      />
      <button type="submit">Ajouter</button>
      {success && <p className="success-msg">Catégorie ajoutée avec succès !</p>}
    </form>
  );
};

export default CategoryForm;

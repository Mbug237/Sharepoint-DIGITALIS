import { useState } from "react";
import { uploadMultipleDocuments } from "../services/documentService";
import "./DocumentUploadForm.css";

const DocumentUploadForm = ({
  categoryId,
  onSuccess,
}: {
  categoryId: number;
  onSuccess: () => void;
}) => {
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files || files.length === 0) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file); // attention au même nom: "files"
    });
    formData.append("categoryId", categoryId.toString());

    try {
      await uploadMultipleDocuments(categoryId, formData);
      setFiles(null);
      onSuccess();
    } catch (error) {
      console.error("Erreur d’upload multiple :", error);
    }
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => setFiles(e.target.files)}
        multiple
        required
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default DocumentUploadForm;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getDocumentsByCategory,
  deleteDocument,
  downloadDocument,
} from "../services/documentService";
import Navbar from "../components/Navbar";
import DocumentUploadForm from "../components/DocumentUploadForm";
import "./CategoryView.css";

interface Document {
  id: number;
  title: string;
  filename: string;
  contentType: string;
}

const CategoryView = () => {
  const { categoryId } = useParams();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchDocuments = async () => {
    if (!categoryId) return;
    const data = await getDocumentsByCategory(Number(categoryId));
    setDocuments(data);
    setFilteredDocuments(data);
  };

  useEffect(() => {
    fetchDocuments();
  }, [categoryId]);

  useEffect(() => {
    setFilteredDocuments(
      documents.filter((doc) =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, documents]);

  const handleDelete = async (id: number) => {
    await deleteDocument(id);
    fetchDocuments();
  };

  const handleDownload = async (id: number, filename: string) => {
    const blob = await downloadDocument(id);
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handlePreview = async (id: number) => {
    try {
      const blob = await downloadDocument(id);
      const fileType = blob.type;

      const supportedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "text/plain"
      ];

      if (supportedTypes.includes(fileType)) {
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url); // ➜ s'affichera dans <iframe>
      } else {
        // Télécharger automatiquement les types non supportés
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "document";
        link.click();
        URL.revokeObjectURL(url);
        alert("Ce type de document n'est pas prévisualisable. Il a été téléchargé.");
      }
    } catch (error) {
      console.error("Erreur lors de la lecture du document :", error);
      alert("Impossible d'afficher ce document.");
    }
  };



  return (
    <div>
      <Navbar />
      <div className="category-documents">
        <h2>Documents de la catégorie</h2>

        <input
          type="text"
          placeholder="Rechercher un document..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "0.5rem",
            width: "20%",
            marginBottom: "1rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
            height: "20px",
          }}
        />

        <div className="upload-section">
          <h3>Ajouter un document</h3>
          <DocumentUploadForm
            categoryId={Number(categoryId)}
            onSuccess={fetchDocuments}
          />
        </div>

        <div className="documents-list">
          {filteredDocuments.length === 0 ? (
            <p style={{ textAlign: "center", color: "#888" }}>
              Aucun document pour cette catégorie.
            </p>
          ) : (
            filteredDocuments.map((doc) => (
              <div key={doc.id} className="document-card">
                <div className="doc-header">
                  {editId === doc.id ? (
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  ) : (
                    <h4>{doc.title}</h4>
                  )}
                </div>
                <div className="doc-actions">
                  <button className="read" onClick={() => handlePreview(doc.id)}>Lire</button>
                  {editId === doc.id ? (
                    <button className="register"
                      onClick={async () => {
                        const res = await fetch(
                          `http://localhost:8080/api/documents/${doc.id}`,
                          {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/x-www-form-urlencoded",
                            },
                            body: `title=${encodeURIComponent(editTitle)}`,
                          }
                        );
                        if (res.ok) {
                          setEditId(null);
                          fetchDocuments();
                        }
                      }}
                    >
                      Enregistrer
                    </button>
                  ) : (
                    <button className="edit"
                      onClick={() => {
                        setEditId(doc.id);
                        setEditTitle(doc.title);
                      }}
                    >
                      Modifier
                    </button>
                  )}
                  <button className="download" onClick={() => handleDownload(doc.id, doc.filename)}>
                    Télécharger
                  </button>
                  <button
                    className="delete"
                    onClick={() => {
                      if (window.confirm("Confirmer la suppression de ce document ?")) {
                        handleDelete(doc.id);
                      }
                    }}
                  >
                    Supprimer
                </button>

                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {previewUrl && (
        <div className="preview-modal" onClick={() => setPreviewUrl(null)}>
          <div className="preview-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setPreviewUrl(null)}>
              ✕
            </button>
            <iframe
              src={previewUrl}
              title="Aperçu"
              width="100%"
              height="500px"
              style={{ border: "none" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryView;

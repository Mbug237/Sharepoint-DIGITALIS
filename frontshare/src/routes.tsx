// src/routes.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DocumentsPage from "./pages/DocumentsPage";
import CategoryView from "./pages/CategoryView";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/documents/:categoryId" element={<CategoryView />} />
      </Routes>
    </BrowserRouter>
  );
}

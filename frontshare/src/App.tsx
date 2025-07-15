import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DocumentPage from "./pages/DocumentsPage";
import CategoryView from "./pages/CategoryView";



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/documents" element={<DocumentPage />} />
      <Route path="/documents/:categoryId" element={<CategoryView />} />


    </Routes>
  );
};

export default App;

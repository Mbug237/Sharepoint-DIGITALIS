// src/pages/Dashboard.tsx
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const blocks = [
    { label: "RH", color: "#f87171", path: "/" },
    { label: "Dir Tech", color: "#60a5fa", path: "/" },
    { label: "Dir Com", color: "#34d399", path: "/" },
    { label: "Adminst", color: "#fbbf24", path: "/" },
    { label: "Documents", color: "#a78bfa", path: "/documents" },

  ];
 
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">SHAREPOINT</h1>
      <div className="dashboard-grid">
        {blocks.map((block, index) => (
          <div
            key={index}
            className="dashboard-block"
            style={{ backgroundColor: block.color }}
            onClick={() => navigate(block.path)}
          >
            {block.label}
          </div>
        ))}
      </div>
      <h1 className="dashboard-title cc">A propos du SHAREPOINT</h1>
    </div>
  );
};

export default Dashboard;

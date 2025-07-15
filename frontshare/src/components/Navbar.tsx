// src/components/Navbar.tsx
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const links = [
    { label: "Dashboard", path: "/" },
    { label: "RH", path: "/" },
    { label: "Dir Tech", path: "/" },
    { label: "Dir Com", path: "/" },
    { label: "Adminst", path: "/" },
    { label: "Documents", path: "/documents" },


  ];

  return (
    <nav className="navbar">
      <div className="navbar-links">
        {links.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;

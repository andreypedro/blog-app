import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const currentUser = document
      .querySelector('meta[name="current-user"]')
      .getAttribute("content");
    setIsAuthenticated(currentUser === "true");
  }, []);

  function handleLogout(e) {
    e.preventDefault();

    fetch("/users/sign_out", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
          .content,
      },
      credentials: "same-origin",
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "/";
        } else {
          console.error("Logout failed");
        }
      })
      .catch((error) => console.error("Network error:", error));
  }

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Home
          </Link>
        </li>
        {isAuthenticated && (
          <li className="navbar-item">
            <Link to="/create" className="navbar-link">
              New post
            </Link>
          </li>
        )}
        {isAuthenticated ? (
          <li className="navbar-item">
            <a
              href="/users/sign_out"
              className="navbar-link"
              onClick={handleLogout}
            >
              Logout
            </a>
          </li>
        ) : (
          <li className="navbar-item">
            <a href="/users/sign_in" className="navbar-link">
              Login
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

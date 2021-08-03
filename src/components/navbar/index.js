import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AuthNav from "../auth/authnav";
import "./index.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const { isAuthenticated, user, isLoading } = useAuth0();

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            SOLO
            <i className="fas fa-code"></i>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/artist"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Artist
              </NavLink>
            </li>
            <li className="nav-item">
              <a href="/#genres" className="nav-links">
                Genre
              </a>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/about"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                About
              </NavLink>
            </li>
            {user && user.email === "admin@solo.com" && isLoading === false ? (
              <>
                <NavLink
                  exact
                  to="/admin"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Admin
                </NavLink>
              </>
            ) : null}
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <span className="nav-links" onClick={handleClick}>
                    Logged in as <b>{user.email}</b>
                  </span>
                </li>
              </>
            ) : null}
            <li className="nav-item">
              <AuthNav />
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

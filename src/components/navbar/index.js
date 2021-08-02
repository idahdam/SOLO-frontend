import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

function Navbar() {
  const [click, setClick] = useState(false);

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
              {/* <NavLink
                exact
                to="/genre"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Genre
              </NavLink> */}
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
            <li className="nav-item">
              <NavLink
                exact
                to="/login"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Login
              </NavLink>
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

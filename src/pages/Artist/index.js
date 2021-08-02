import React from "react";
import "./index.css";
import niki from "../../assets/artist/niki.png";
import { Link } from "react-router-dom";

const Artist = () => {
  return (
    <>
      <div className="artist-container">
        <div className="artist-hero">
          <div className="artist-hero-text">ARTIST YOU LOVE</div>
        </div>
        <div className="artist-list-container">
          <div className="artist-list-row">
            <div className="artist-list-column">
              <Link to="/artist/id">
                <img src={niki} alt="artist" className="artist-each-image" />
              </Link>
              <div className="artist-each-name">Niki</div>
            </div>
            <div className="artist-list-column">
              <Link to="/artist/id">
                <img src={niki} alt="artist" className="artist-each-image" />
              </Link>
              <div className="artist-each-name">Niki</div>
            </div>
            <div className="artist-list-column">
              <Link to="/artist/id">
                <img src={niki} alt="artist" className="artist-each-image" />
              </Link>
              <div className="artist-each-name">Niki</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Artist;

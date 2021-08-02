import React from "react";
import "./index.css";
import niki from "../../assets/artist/niki.png";
import { useParams } from "react-router-dom";

const GenreId = () => {
  let { type } = useParams();
  return (
    <>
      <div className="genre-container">
        <div className="genre-hero">
          <div className="genre-hero-text">{type.toUpperCase()} SONG</div>
        </div>
        <div className="genre-list-container">
          <div className="genre-list-row">
            <div className="genre-list-column">
              <img src={niki} alt="genre" className="genre-each-image" />
              <div className="genre-each-name">Niki</div>
            </div>
            <div className="genre-list-column">
              <img src={niki} alt="genre" className="genre-each-image" />
              <div className="genre-each-name">Niki</div>
            </div>
            <div className="genre-list-column">
              <img src={niki} alt="genre" className="genre-each-image" />
              <div className="genre-each-name">Niki</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenreId;

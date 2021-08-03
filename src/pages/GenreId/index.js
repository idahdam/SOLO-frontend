import React from "react";
import "./index.css";
import lowkey from "../../assets/genre/lowkey.png";
import { Link, useParams } from "react-router-dom";

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
              <Link to="/song/id">
                <img src={lowkey} alt="genre" className="genre-each-image" />
              </Link>
              <div className="genre-each-name">Niki</div>
            </div>
            <div className="genre-list-column">
              <Link to="/song/id">
                <img src={lowkey} alt="genre" className="genre-each-image" />
              </Link>
              <div className="genre-each-name">Niki</div>
            </div>
            <div className="genre-list-column">
              <Link to="/song/id">
                <img src={lowkey} alt="genre" className="genre-each-image" />
              </Link>
              <div className="genre-each-name">Niki</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenreId;

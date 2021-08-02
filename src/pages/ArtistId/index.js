import React from "react";
import "./index.css";
import niki from "../../assets/artist/niki.png";

const ArtistId = () => {
  return (
    <>
      <div className="artistid-container">
        <div className="artistid-hero">
          <div className="artistid-hero-row">
            <div className="artistid-hero-column artistid-hero-left">
              <div className="artistid-hero-image-container">
                <img
                  src={niki}
                  alt="artistId"
                  className="artistid-hero-image"
                />
              </div>
            </div>
            <div className="artistid-hero-column artistid-hero-right">
              <div className="artistid-hero-text">NIKI</div>
              <div className="artistid-hero-description">
                Here are list of songs by NIKI. Click the song to see its
                reviews!
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistId;

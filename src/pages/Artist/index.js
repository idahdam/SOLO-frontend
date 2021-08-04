import React, { useState, useEffect } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { artistService } from "../../services/artistService";

const Artist = () => {
  const [artist, setArtist] = useState([]);

  useEffect(() => {
    const fetchArtist = async () => {
      const response = await artistService.getAllArtist();
      setArtist(response.data);
    };

    fetchArtist();
  }, []);

  return (
    <>
      <div className="artist-container">
        <div className="artist-hero">
          <div className="artist-hero-text">ARTIST YOU LOVE</div>
        </div>
        <div className="artist-list-container">
          <div className="artist-list-row">
            {artist.length === 0 ? (
              <>Loading</>
            ) : (
              <>
                {artist.map((item, index) => {
                  return (
                    <div className="artist-list-column" key={index}>
                      <Link to={`/artist/${item.artist_id}`}>
                        <img
                          src={item.artist_picture}
                          alt="artist"
                          className="artist-each-image"
                        />
                      </Link>
                      <div className="artist-each-name">{item.artist_name}</div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Artist;

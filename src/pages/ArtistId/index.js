import React, { useState, useEffect } from "react";
import "./index.css";
import niki from "../../assets/artist/niki.png";
import lowkey from "../../assets/genre/lowkey.png";
import { Link, useParams } from "react-router-dom";
import { artistService } from "../../services/artistService";

const ArtistId = () => {
  const [artistId, setArtistId] = useState([]);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchArtistByid = async (id) => {
      const response = await artistService.getAllArtistWithSongs(id);
      setArtistId(response.data);
      console.log(response.data);
    };

    fetchArtistByid(id);
  }, [id]);

  if (artistId.length === 0) return null;
  return (
    <>
      <div className="artistid-container">
        <div className="artistid-hero">
          <div className="artistid-hero-row">
            <div className="artistid-hero-column artistid-hero-left">
              <div className="artistid-hero-image-container">
                <img
                  src={artistId[0].artist_picture}
                  alt="artistId"
                  className="artistid-hero-image"
                />
              </div>
            </div>
            <div className="artistid-hero-column artistid-hero-right">
              <div className="artistid-hero-text">
                {artistId[0].artist_name}
              </div>
              <div className="artistid-hero-description">
                Here are list of songs by {artistId[0].artist_name}. Click the
                song to see its reviews!
              </div>
            </div>
          </div>
        </div>
        <div className="artistid-songlist-container">
          <div className="artistid-songlist-title">Song List</div>
          <div className="artistid-songlist-row">
            <div className="artistid-songlist-column">
              <div className="artistid-songlist-each-row">
                <div className="artistid-songlist-each-column artistid-songlist-each-left">
                  <Link to="/song/id">
                    <img
                      src={lowkey}
                      alt="song"
                      className="artistid-songlist-image"
                    />
                  </Link>
                </div>
                <div className="artistid-songlist-each-column artistid-songlist-each-right">
                  <div className="artistid-songlist-text">Lowkey</div>
                </div>
              </div>
            </div>
            <div className="artistid-songlist-column">
              <div className="artistid-songlist-each-row">
                <div className="artistid-songlist-each-column artistid-songlist-each-left">
                  <Link to="/song/id">
                    <img
                      src={lowkey}
                      alt="song"
                      className="artistid-songlist-image"
                    />
                  </Link>
                </div>
                <div className="artistid-songlist-each-column artistid-songlist-each-right">
                  <div className="artistid-songlist-text">Lowkey</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistId;

import React, { useState, useEffect } from "react";
import "./index.css";
import { Link, useParams } from "react-router-dom";
import { artistService } from "../../services/artistService";

const ArtistId = () => {
  const [artistId, setArtistId] = useState([]);
  const [artistSongs, setArtistSongs] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchArtistByidWithSongs = async (id) => {
      const response = await artistService.getAllArtistWithSongs(id);
      if (response.data.length > 0) {
        setArtistSongs(response.data);
      }
      console.log(response.data);
    };

    const fectchArtistById = async (id) => {
      const response = await artistService.getArtistById(id);
      setArtistId(response.data);
    };

    fectchArtistById(id);
    fetchArtistByidWithSongs(id);
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
            {artistSongs.length === 0 ? (
              <>No songs for this artist at the moment</>
            ) : (
              <>
                {artistSongs.map((data, index) => {
                  return (
                    <>
                      <div className="artistid-songlist-column">
                        <Link to={`/song/${data.song_id}-${data.song_title}`}>
                          <img
                            src={data.song_picture}
                            alt="song"
                            className="artistid-songlist-image"
                          />
                        </Link>
                        <div className="artistid-songlist-text">
                          {data.song_title}
                        </div>
                      </div>
                    </>
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

export default ArtistId;

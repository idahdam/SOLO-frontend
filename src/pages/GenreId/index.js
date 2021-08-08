import React, { useEffect, useState } from "react";
import "./index.css";
import { Link, useParams } from "react-router-dom";
import { songService } from "../../services/songService";

const GenreId = () => {
  const [songs, setSongs] = useState([]);
  // const [typeId, setTypeId] = useState();
  let { type } = useParams();

  useEffect(() => {
    const fetchSongs = async (type) => {
      const response = await songService.getSongByGenre(type);
      setSongs(response.data.data);
    };
    fetchSongs(type);
  }, [type]);

  return (
    <>
      <div className="genre-container">
        <div className="genre-hero">
          <div className="genre-hero-text">{type.toUpperCase()} SONG</div>
        </div>
        <div className="genre-list-container">
          <div className="genre-list-row">
            {songs.length === 0 ? (
              <>No songs yet.</>
            ) : (
              <>
                {songs.map((data, index) => {
                  return (
                    <>
                      <div className="genre-list-column" key={index + 1}>
                        <Link
                          to={`/song/${data.song_id}-${data.song_title
                            .replaceAll(" ", "-")
                            .toLowerCase()}`}
                        >
                          <img
                            src={data.song_picture}
                            alt="genre"
                            className="genre-each-image"
                          />
                        </Link>
                        <div className="genre-each-name">{data.song_title}</div>
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

export default GenreId;

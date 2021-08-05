import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import "./index.css";
import { Link, useParams } from "react-router-dom";
import { artistService } from "../../services/artistService";
import { adminService } from "../../services/adminService";

const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
const ArtistId = () => {
  const { isAuthenticated, user } = useAuth0();
  const [artistId, setArtistId] = useState([]);
  const [artistSongs, setArtistSongs] = useState([]);
  const { name, id } = useParams();
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

  const handleDeleteArtist = () => {
    Swal.fire({
      title: `About to delete artist. Are you sure?`,
      showDenyButton: true,
      confirmButtonText: `Yes`,
      showCancelButton: `Yes`,
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        onDeleteArtist(id);
      } else if (result.isDenied) {
        Swal.fire("Operation canceled.", "", "info");
      }
    });
  };
  const onDeleteArtist = async (id) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await adminService
        .deleteArtistById(id)
        .then(Swal.fire(`Artist is deleted.`))
        .then((window.location.href = "/"));
    } catch (error) {
      Swal.fire("error " + error);
    }
  };

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
                {artistId[0].artist_name}{" "}
              </div>
              <div className="artistid-hero-description">
                Here are list of songs by {artistId[0].artist_name}. Click the
                song to see its reviews!
              </div>
              {isAuthenticated && user.email === adminEmail ? (
                <>
                  <button type="button" className="admin-only-button">
                    <Link to={`/artist/${id}-${name}/edit`}>Edit</Link>
                  </button>{" "}
                  <button
                    type="button"
                    className="admin-only-button"
                    onClick={() => handleDeleteArtist()}
                  >
                    Delete
                  </button>
                </>
              ) : null}
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
                        <Link
                          to={`/song/${data.song_id}-${data.song_title
                            .replaceAll(" ", "-")
                            .toLowerCase()}`}
                        >
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

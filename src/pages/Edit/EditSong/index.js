import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";
import { genreService } from "../../../services/genreService";
import { adminService } from "../../../services/adminService";
import { songService } from "../../../services/songService";
import { artistService } from "../../../services/artistService";
import "./index.css";

const { REACT_APP_PRESET_NAME, REACT_APP_CLOUD_URL, REACT_APP_ADMIN_EMAIL } =
  process.env;
const url = REACT_APP_CLOUD_URL;
const preset = REACT_APP_PRESET_NAME;
const adminEmail = REACT_APP_ADMIN_EMAIL;
const EditSong = () => {
  const { isAuthenticated, user } = useAuth0();
  const [genres, setGenres] = useState([]);
  const [artist, setArtist] = useState([]);
  const [song, setSong] = useState([]);
  const [songImage, setSongImage] = useState(null);
  const [songTitle, setSongTitle] = useState(null);
  const [imageLink, setImageLink] = useState();
  const [genreId, setGenreId] = useState(null);
  const [artistId, setArtistId] = useState(null);
  const { id } = useParams();

  const onSelectFileSong = (e) => {
    setSongImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleEditSong = () => {
    if (artistId === null || genreId === null) {
      Swal.fire("Please insert them all");
      return;
    }
    Swal.fire({
      title: `About to update a song. Are you sure?`,
      showDenyButton: true,
      confirmButtonText: `Yes`,
      showCancelButton: `Yes`,
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        onSubmitEdit();
      } else if (result.isDenied) {
        Swal.fire("Operation canceled.", "", "info");
      }
    });
  };

  const onSubmitEdit = async () => {
    if (songImage !== null) {
      const formData = new FormData();
      formData.append("file", songImage);
      formData.append("upload_preset", preset);
      try {
        const photoUpload = await axios.post(url, formData);
        const imageUrl = await photoUpload.data.secure_url;
        // eslint-disable-next-line no-unused-vars
        const addArtist = await adminService
          .updateSongById(id, {
            picture: imageUrl,
            title: songTitle,
            artistId: artistId,
            genreId: genreId,
          })
          .then(Swal.fire("Song updated"));
      } catch (error) {
        Swal.fire("error " + error);
      }
    } else {
      try {
        // eslint-disable-next-line no-unused-vars
        const addArtist = await adminService
          .updateSongById(id, {
            picture: imageLink,
            title: songTitle,
            artistId: artistId,
            genreId: genreId,
          })
          .then(Swal.fire("Song updated"));
      } catch (error) {
        Swal.fire("error " + error);
      }
    }
  };

  useEffect(() => {
    const fetchGenre = async () => {
      const response = await genreService.getAllGenres();
      //   console.log(response.data);
      setGenres(response.data);
    };

    const fetchArtist = async () => {
      const response = await artistService.getAllArtist();
      //   console.log(response.data);
      setArtist(response.data);
    };

    const fetchSongById = async (id) => {
      const response = await songService.getSongById(id);
      setSong(response.data.data);
      setSongTitle(response.data.data[0].song_title);
      setImageLink(response.data.data[0].song_picture);
    };

    fetchGenre();
    fetchArtist();
    fetchSongById(id);
  }, [id]);

  if (song.length === 0) return null;
  return (
    <>
      {isAuthenticated && user.email === adminEmail ? (
        <div className="edit-container">
          <div className="add-container-title">Edit Song</div>
          <div className="add-song">
            <label className="add-label">Song title</label>
            <br />
            <input
              type="text"
              className="add-input"
              onChange={(e) => setSongTitle(e.target.value)}
              defaultValue={song[0].song_title}
            />
            <br />
            <label className="add-label">Song Picture</label>
            <br />
            <input
              type="file"
              className="add-input"
              onChange={onSelectFileSong}
            />
            <br />
            <br />
            <label className="add-label">Artist</label>
            <br />
            <div className="selection-contianer">
              <select onChange={(e) => setArtistId(e.target.value)}>
                <option value="" className="add-input">
                  Choose one
                </option>
                {artist.map((data, index) => {
                  return (
                    <option
                      value={`${data.artist_id}`}
                      className="add-input"
                      key={index}
                    >
                      {data.artist_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <br />
            <label className="add-label">Genre</label>
            <br />
            <div className="selection-contianer">
              <select onChange={(e) => setGenreId(e.target.value)}>
                <option value="" className="add-input">
                  Choose one
                </option>
                {genres.map((data, index) => {
                  return (
                    <option
                      value={`${data.genre_id}`}
                      className="add-input"
                      key={index}
                    >
                      {data.genre_type}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              type="button"
              className="submit-add"
              onClick={() => handleEditSong()}
            >
              Add Song
            </button>
          </div>
        </div>
      ) : (
        <>
          <Redirect to="/" />
        </>
      )}
    </>
  );
};

export default EditSong;

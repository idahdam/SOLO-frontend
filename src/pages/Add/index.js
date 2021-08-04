import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import { genreService } from "../../services/genreService";
import { songService } from "../../services/songService";
import { artistService } from "../../services/artistService";

const { REACT_APP_PRESET_NAME, REACT_APP_CLOUD_URL } = process.env;
const url = REACT_APP_CLOUD_URL;
const preset = REACT_APP_PRESET_NAME;
const Add = () => {
  console.log(process.env);
  const { isAuthenticated, isLoading } = useAuth0();
  const [image, setImage] = useState(null);
  const [songImage, setSongImage] = useState(null);

  //   fetched data
  const [genres, setGenres] = useState([]);
  const [artist, setArtist] = useState([]);

  // artist
  const [artistName, setArtistName] = useState(null);

  // song
  const [songTitle, setSongTitle] = useState(null);
  const [genreId, setGenreId] = useState(null);
  const [artistId, setArtistId] = useState(null);

  useEffect(() => {
    const fetchGenre = async () => {
      const response = await genreService.getAllGenres();
      console.log(response.data);
      setGenres(response.data);
    };

    const fetchArtist = async () => {
      const response = await artistService.getAllArtist();
      console.log(response.data);
      setArtist(response.data);
    };

    fetchGenre();
    fetchArtist();
  }, []);

  const handleAddSong = () => {
    if (
      songTitle === null ||
      genreId === null ||
      genreId === "" ||
      artistId === null ||
      artistId === "" ||
      songImage === null
    ) {
      Swal.fire("Please fill all.");
      return;
    }
    Swal.fire({
      title: `About to add a new song. Are you sure?`,
      showDenyButton: true,
      confirmButtonText: `Yes`,
      showCancelButton: `Yes`,
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        onSubmitSong();
      } else if (result.isDenied) {
        Swal.fire("Operation canceled.", "", "info");
      }
    });
  };

  const handleAddArtist = () => {
    if (artistName === null || image === null) {
      Swal.fire("Please fill all!");
      return;
    }
    Swal.fire({
      title: `About to add a new artist. Are you sure?`,
      showDenyButton: true,
      confirmButtonText: `Yes`,
      showCancelButton: `Yes`,
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        onSubmitArtist();
      } else if (result.isDenied) {
        Swal.fire("Operation canceled.", "", "info");
      }
    });
  };

  const onSubmitArtist = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", preset);
    try {
      const photoUpload = await axios.post(url, formData);
      const imageUrl = await photoUpload.data.secure_url;
      // eslint-disable-next-line no-unused-vars
      const addArtist = await artistService
        .postArtist({
          picture: imageUrl,
          name: artistName,
        })
        .then(Swal.fire("Artist submit"));
    } catch (error) {
      Swal.fire("error");
      console.log(error);
    }
  };

  const onSubmitSong = async () => {
    const formData = new FormData();
    formData.append("file", songImage);
    formData.append("upload_preset", preset);
    try {
      const photoUpload = await axios.post(url, formData);
      const imageUrl = await photoUpload.data.secure_url;
      // eslint-disable-next-line no-unused-vars
      const addSong = await songService
        .postSong({
          picture: imageUrl,
          title: songTitle,
          name: artistName,
          artistId,
          genreId,
        })
        .then(Swal.fire("Song submitted"));
    } catch (error) {}
  };

  const onSelectFile = (e) => {
    // I've kept this example simple by using the first image instead of multiple

    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const onSelectFileSong = (e) => {
    // I've kept this example simple by using the first image instead of multiple
    setSongImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  if (isLoading && genres.length === 0 && artist.length === 0)
    return (
      <>
        <div className="add-container">
          <div className="add-container-title">Loading...</div>
        </div>
      </>
    );
  return (
    <>
      {isAuthenticated ? (
        <>
          <div className="add-container">
            <div className="add-container-title">Add artist or song here.</div>
            <div className="add-container-title">Artist</div>
            <div className="add-artist">
              <label className="add-label">Artist Name</label>
              <br />
              <input
                type="text"
                className="add-input"
                onChange={(e) => setArtistName(e.target.value)}
              />
              <br />
              <label className="add-label">Artist Picture</label>
              <br />
              <input
                type="file"
                className="add-input"
                onChange={onSelectFile}
              />
              <br />
              <button type="button" onClick={() => handleAddArtist()}>
                Add Artist
              </button>
            </div>
            <div className="add-container-title">Song</div>
            <div className="add-song">
              <label className="add-label">Song title</label>
              <br />
              <input
                type="text"
                className="add-input"
                onChange={(e) => setSongTitle(e.target.value)}
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
              <br />
              <label className="add-label">Genre</label>
              <br />
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
              <br />
              <button type="button" onClick={() => handleAddSong()}>
                Add Song
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="add-container">
            <div className="add-container-title">
              Login first before adding.
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Add;

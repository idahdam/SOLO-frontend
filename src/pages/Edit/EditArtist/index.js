import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { adminService } from "../../../services/adminService";
import { artistService } from "../../../services/artistService";

const { REACT_APP_PRESET_NAME, REACT_APP_CLOUD_URL, REACT_APP_ADMIN_EMAIL } =
  process.env;
const url = REACT_APP_CLOUD_URL;
const preset = REACT_APP_PRESET_NAME;
const adminEmail = REACT_APP_ADMIN_EMAIL;
const EditArtist = () => {
  const { id } = useParams();
  const [artistName, setArtistName] = useState();
  const [image, setImage] = useState(null);
  const [artist, setArtist] = useState([]);
  const [imageLink, setImageLink] = useState();
  const { isAuthenticated, user } = useAuth0();
  const onSelectFile = (e) => {
    // I've kept this example simple by using the first image instead of multiple
    setImage(e.target.files[0]);
  };

  const handleAddArtist = () => {
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
    if (image !== null) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", preset);
      try {
        const photoUpload = await axios.post(url, formData);
        const imageUrl = await photoUpload.data.secure_url;
        // eslint-disable-next-line no-unused-vars
        const editArtist = await adminService
          .updateArtistById(id, {
            picture: imageUrl,
            name: artistName,
          })
          .then(Swal.fire("Artist updated"));
      } catch (error) {}
    } else {
      try {
        try {
          // eslint-disable-next-line no-unused-vars
          const editArtist = await adminService
            .updateArtistById(id, {
              picture: imageLink,
              name: artistName,
            })
            .then(Swal.fire("Artist updated"));
        } catch (error) {
          Swal.fire("error " + error);
        }
      } catch (error) {
        Swal.fire("error " + error);
      }
    }
  };

  useEffect(() => {
    const fetchArtist = async () => {
      const response = await artistService.getArtistById(id);
      console.log(response.data);
      setArtist(response.data);
      setImageLink(response.data[0].artist_picture);
    };

    fetchArtist(id);
  }, [id]);

  if (artist.length === 0) return null;
  return (
    <>
      {isAuthenticated && user.email === adminEmail ? (
        <div className="edit-container">
          <div className="add-container-title">Edit Artist</div>
          <div className="add-artist">
            <label className="add-label">Artist Name</label>
            <br />
            <input
              type="text"
              className="add-input"
              onChange={(e) => setArtistName(e.target.value)}
              defaultValue={artist[0].artist_name}
            />
            <br />
            <label className="add-label">Artist Picture</label>
            <br />
            <input type="file" className="add-input" onChange={onSelectFile} />
            <br />
            <button
              type="button"
              className="submit-add"
              onClick={() => handleAddArtist()}
            >
              Edit Artist
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

export default EditArtist;

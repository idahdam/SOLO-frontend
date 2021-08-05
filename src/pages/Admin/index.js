import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";
import { artistService } from "../../services/artistService";
import { songService } from "../../services/songService";
import { reviewService } from "../../services/reviewService";
import "./index.css";

const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
const Admin = () => {
  const [artistToggle, setArtistToggle] = useState(false);
  const [songToggle, setSongToggle] = useState(false);
  const [reviewsToggle, setReviewsToggle] = useState(false);
  const [artist, setArtist] = useState([]);
  const [songs, setSongs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { isAuthenticated, user } = useAuth0();
  useEffect(() => {
    const fetchArtist = async () => {
      const response = await artistService.getAllArtist();
      // console.log(response.data);
      setArtist(response.data);
    };
    const fetchSongs = async () => {
      const response = await songService.getAllSong();
      setSongs(response.data);
    };
    const fetchReviews = async () => {
      const response = await reviewService.getAllReviews();
      console.log(response.data);
      setReviews(response.data);
    };
    fetchArtist();
    fetchSongs();
    fetchReviews();
  }, []);
  return (
    <>
      {isAuthenticated && user.email === adminEmail ? (
        <div className="admin-container">
          <div className="admin-container-title">Admin Page</div>
          <div className="admin-container-title">
            Artist - Total: {artist.length}{" "}
            <button
              type="button"
              className="admin-toggle"
              onClick={() => setArtistToggle(!artistToggle)}
            >
              {artistToggle ? "Close" : "Show"}
            </button>
          </div>
          {artistToggle ? (
            <div>
              <table className="admin-container-table">
                <tr>
                  <th>ID</th>
                  <th>Artist Name</th>
                  <th>Artist Picture</th>
                </tr>
                {artist.length === 0 ? null : (
                  <>
                    {artist.map((data, index) => {
                      return (
                        <tr>
                          <td>{data.artist_id}</td>
                          <td>{data.artist_name}</td>
                          <td>
                            <img
                              src={data.artist_picture}
                              alt={`${data.artist_name}`}
                              className="admin-image"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </table>
            </div>
          ) : null}
          <div className="admin-container-title">
            Song - Total: {songs.length}{" "}
            <button
              type="button"
              className="admin-toggle"
              onClick={() => setSongToggle(!songToggle)}
            >
              {songToggle ? "Close" : "Show"}
            </button>
          </div>
          {songToggle ? (
            <>
              <table className="admin-container-table">
                <tr>
                  <th>ID</th>
                  <th>Song Title</th>
                  <th>Genre ID</th>
                  <th>Artist ID</th>
                  <th>Song Picture</th>
                </tr>
                {songs.length === 0 ? null : (
                  <>
                    {songs.map((data, index) => {
                      return (
                        <tr>
                          <td>{data.song_id}</td>
                          <td>{data.song_title}</td>
                          <td>{data.genre_id}</td>
                          <td>{data.artist_id}</td>
                          <td>
                            <img
                              src={data.song_picture}
                              alt={`${data.artist_id}`}
                              className="admin-image"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </table>
            </>
          ) : null}
          <div className="admin-container-title">
            Reviews - Total: {reviews.length}{" "}
            <button
              type="button"
              className="admin-toggle"
              onClick={() => setReviewsToggle(!reviewsToggle)}
            >
              {reviewsToggle ? "Close" : "Show"}
            </button>
          </div>
          {reviewsToggle ? (
            <>
              <table className="admin-container-table">
                <tr>
                  <th>ID</th>
                  <th>Reviewer</th>
                  <th>Content</th>
                  <th>Song ID</th>
                  <th>Rating</th>
                </tr>
                {reviews.length === 0 ? null : (
                  <>
                    {reviews.map((data, index) => {
                      return (
                        <tr>
                          <td>{data.review_id}</td>
                          <td>{data.review_reviewer}</td>
                          <td>{data.review_content}</td>
                          <td>{data.song_id}</td>
                          <td>{data.review_rating}</td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </table>
            </>
          ) : null}
        </div>
      ) : (
        <>
          <Redirect to="/" />
        </>
      )}
    </>
  );
};

export default Admin;

import React, { useEffect, useState } from "react";
import "./index.css";
import Swal from "sweetalert2";
import Masonry from "react-masonry-css";
import { Link, useParams } from "react-router-dom";
import { songService } from "../../services/songService";
import { useAuth0 } from "@auth0/auth0-react";
import { reviewService } from "../../services/reviewService";
import { adminService } from "../../services/adminService";

const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
const SongId = () => {
  const { isAuthenticated, user } = useAuth0();
  const [songId, setSongId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [avg, setAvg] = useState(0);
  const { name, id } = useParams();

  // input
  const [reviewContent, setReviewContent] = useState();
  const [rating, setRating] = useState();

  const handleAddReview = () => {
    if (rating < 0 || rating > 5) {
      Swal.fire("Error. Rating out of range. (0-5)");
      return;
    }
    Swal.fire({
      title: `About to add a new review. Are you sure?`,
      showDenyButton: true,
      confirmButtonText: `Yes`,
      showCancelButton: `Yes`,
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        onSubmitReview();
      } else if (result.isDenied) {
        Swal.fire("Operation canceled.", "", "info");
      }
    });
  };
  const onSubmitReview = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const addArtist = await reviewService
        .postReview(id, {
          reviewer: user.nickname,
          content: reviewContent,
          rating: rating,
        })
        .then(Swal.fire("Review added"));
    } catch (error) {
      Swal.fire("error");
      console.log(error);
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: `About to delete '${songId.song_title}' song. Are you sure?`,
      showDenyButton: true,
      confirmButtonText: `Yes`,
      showCancelButton: `Yes`,
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        onDeleteSong(id);
      } else if (result.isDenied) {
        Swal.fire("Operation canceled.", "", "info");
      }
    });
  };

  const onDeleteSong = async (id) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await adminService
        .deleteSongById(id)
        .then(Swal.fire(`${songId.song_title} is deleted.`))
        .then((window.location.href = "/"));
    } catch (error) {
      Swal.fire("error " + error);
    }
  };

  const handleDeleteComment = async (id) => {
    Swal.fire({
      title: `About to delete one of the reviews. Are you sure?`,
      showDenyButton: true,
      confirmButtonText: `Yes`,
      showCancelButton: `Yes`,
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        // eslint-disable-next-line no-unused-vars
        const response = await adminService
          .deleteReviewById(id)
          .then(Swal.fire("Deleted."));
      } else if (result.isDenied) {
        Swal.fire("Operation canceled.", "", "info");
      }
    });
  };

  useEffect(() => {
    const fetchSongId = async () => {
      const response = await songService.getSongById(id);
      // console.log(response.data.data[0]);
      setSongId(response.data.data[0]);
    };

    const countAvg = () => {
      if (reviews.length !== 0) {
        var rating = 0;
        for (var item of reviews) {
          rating += item.review_rating;
        }
        rating /= reviews.length;
        setAvg(rating);
        return;
      } else {
        return;
      }
    };

    const fetchSongReviews = async (id) => {
      const response = await songService.getReviewsSongById(id);
      setReviews(response.data.data);
      countAvg();
    };

    fetchSongId();
    fetchSongReviews(id);
    setLoading(true);
  }, [id, reviews.length, reviews.rating, reviews]);

  if (loading === false) return null;
  return (
    <>
      <div className="songid-container">
        <div className="songid-hero">
          <div className="songid-hero-row">
            <div className="songid-hero-column songid-hero-left">
              <div className="songid-hero-image-container">
                <img
                  src={songId.song_picture}
                  alt="songId"
                  className="songid-hero-image"
                />
              </div>
            </div>
            <div className="songid-hero-column songid-hero-right">
              <div className="songid-hero-text">
                {songId.song_title} - {avg}/5 rating
              </div>
              <div className="songid-hero-description">
                Here is a song by {songId.artist_name}. Scroll to see its
                reviews!
              </div>
            </div>
            {isAuthenticated && user.email === adminEmail ? (
              <>
                <button type="button" className="admin-only-button">
                  <Link to={`/song/${id}-${name}/edit`}>Edit</Link>
                </button>{" "}
                <button
                  type="button"
                  className="admin-only-button"
                  onClick={() => handleDelete()}
                >
                  Delete
                </button>
              </>
            ) : null}
          </div>
        </div>
        <div className="songid-reviews">
          <div className="songid-reviews-title">Add Review</div>
          <div className="songid-reviews-container">
            {isAuthenticated && user ? (
              <>
                <div className="songid-reviews-input-title">
                  Add Your Reviews Here as <b>{user.nickname}</b>
                </div>
                <div className="songid-reviews-input-area">
                  <input
                    type="text"
                    className="songid-reviews-input"
                    onChange={(e) => setReviewContent(e.target.value)}
                  />
                </div>
                <div className="songid-reviews-input-title">
                  Add Your Rating Here
                </div>
                <div className="songid-reviews-input-area">
                  <input
                    type="number"
                    min="0.0"
                    max="5.0"
                    className="songid-reviews-rating"
                    onChange={(e) => setRating(e.target.value)}
                  />
                </div>
                <br />
                <div>
                  <button
                    type="button"
                    className="songid-reviews-submit"
                    onClick={() => handleAddReview()}
                  >
                    Submit Reviews
                  </button>
                </div>
              </>
            ) : (
              <>Login to add Reviews!</>
            )}
          </div>
          <div className="songid-reviews-title">Reviews</div>
          <div className="songid-reviews-container">
            <Masonry
              breakpointCols={2}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {reviews.length === 0 && loading === true ? (
                <>No reviews currently available</>
              ) : (
                <>
                  {reviews.map((data, index) => {
                    return (
                      <div className="songid-reviews-each" key={index}>
                        <div className="songid-reviews-each-review">
                          "{data.review_content}"
                        </div>
                        <div className="songid-reviews-each-name-rating">
                          {data.review_reviewer} - {data.review_rating}{" "}
                          {isAuthenticated && user.email === adminEmail ? (
                            <>
                              <button
                                type="button"
                                className="admin-only-button"
                                onClick={() =>
                                  handleDeleteComment(data.review_id)
                                }
                              >
                                Delete
                              </button>
                            </>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </Masonry>
          </div>
        </div>
      </div>
    </>
  );
};

export default SongId;

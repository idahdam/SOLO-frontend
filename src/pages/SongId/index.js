import React, { useEffect, useState } from "react";
import "./index.css";
import Masonry from "react-masonry-css";
import { useParams } from "react-router-dom";
import { songService } from "../../services/songService";
import { useAuth0 } from "@auth0/auth0-react";

const SongId = () => {
  const [songId, setSongId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const { isAuthenticated } = useAuth0();
  // console.log(id);

  useEffect(() => {
    const fetchSongId = async () => {
      const response = await songService.getSongById(id);
      // console.log(response.data.data[0]);
      setSongId(response.data.data[0]);
    };

    const fetchSongReviews = async (id) => {
      const response = await songService.getReviewsSongById(id);
      console.log(response.data.data);
      setReviews(response.data.data);
    };

    fetchSongId();
    fetchSongReviews(id);
    setLoading(true);
  }, [id]);

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
              <div className="songid-hero-text">{songId.song_title}</div>
              <div className="songid-hero-description">
                Here is a song by {songId.artist_name}. Scroll to see its
                reviews!
              </div>
            </div>
          </div>
        </div>
        <div className="songid-reviews">
          <div className="songid-reviews-title">Add Review</div>
          <div className="songid-reviews-container">
            {isAuthenticated ? (
              <>
                <div className="songid-reviews-input-title">
                  Add Your Reviews Here
                </div>
                <div className="songid-reviews-input-area">
                  <input type="text" className="songid-reviews-input" />
                </div>
                <div className="songid-reviews-input-title">
                  Add Your Rating Here
                </div>
                <div className="songid-reviews-input-area">
                  <input type="number" className="songid-reviews-rating" />
                </div>
                <br />
                <div>
                  <button type="button" className="songid-reviews-submit">
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
                      <>
                        <div className="songid-reviews-each">
                          <div className="songid-reviews-each-review">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur.
                          </div>
                          <div className="songid-reviews-each-name-rating">
                            Muhammad Hadi - 4.5
                          </div>
                        </div>
                      </>
                    );
                  })}
                </>
              )}
              {/* <div className="songid-reviews-each">
                <div className="songid-reviews-each-review">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam
                </div>
                <div className="songid-reviews-each-name-rating">
                  Muhammad Hadi - 4.5
                </div>
              </div>
              <div className="songid-reviews-each">
                <div className="songid-reviews-each-review">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </div>
                <div className="songid-reviews-each-name-rating">
                  Muhammad Hadi - 4.5
                </div>
              </div>
              <div className="songid-reviews-each">
                <div className="songid-reviews-each-review">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </div>
                <div className="songid-reviews-each-name-rating">
                  Muhammad Hadi - 4.5
                </div>
              </div> */}
            </Masonry>
          </div>
        </div>
      </div>
    </>
  );
};

export default SongId;

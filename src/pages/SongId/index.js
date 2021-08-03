import React from "react";
import "./index.css";
import lowkey from "../../assets/genre/lowkey.png";
import Masonry from "react-masonry-css";

const SongId = () => {
  return (
    <>
      <div className="songid-container">
        <div className="songid-hero">
          <div className="songid-hero-row">
            <div className="songid-hero-column songid-hero-left">
              <div className="songid-hero-image-container">
                <img src={lowkey} alt="songId" className="songid-hero-image" />
              </div>
            </div>
            <div className="songid-hero-column songid-hero-right">
              <div className="songid-hero-text">Lowkey</div>
              <div className="songid-hero-description">
                Here is a song by NIKI. Scroll to see its reviews!
              </div>
            </div>
          </div>
        </div>
        <div className="songid-reviews">
          <div className="songid-reviews-title">Reviews</div>
          <div className="songid-reviews-container">
            <Masonry
              breakpointCols={2}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              <div className="songid-reviews-each">
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
              </div>
            </Masonry>
          </div>
        </div>
      </div>
    </>
  );
};

export default SongId;

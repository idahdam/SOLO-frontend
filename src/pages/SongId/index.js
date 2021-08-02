import React from "react";
import "./index.css";
import lowkey from "../../assets/genre/lowkey.png";

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
            <div className="songid-reviews-row">
              <div className="songid-reviews-column">
                <div className="songid-reviews-content-container">
                  <div className="songid-reviews-content-review">
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque et augue sit amet augue dignissim imperdiet. Ut
                    vel elementum mauris. Etiam nec elementum odio, ac malesuada
                    felis. Etiam euismod a risus imperdiet eleifend. Fusce
                    accumsan tellus rhoncus, rhoncus massa non, dapibus risus.
                    Cras facilisis vitae sem vel consequat. Maecenas semper
                    lobortis arcu, at semper libero ultricies sed. Nulla maximus
                    pulvinar orci ut varius. Integer placerat consectetur magna
                    sed commodo. “
                  </div>
                  <div className="songid-reviews-content-reviewer">
                    Muhammad Hadi - 4.5
                  </div>
                </div>
              </div>
              <div className="songid-reviews-column">
                <div className="songid-reviews-content-container">
                  <div className="songid-reviews-content-review">
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque et augue sit amet augue dignissim imperdiet. Ut
                    vel elementum mauris. Etiam nec elementum odio, ac malesuada
                    felis. Etiam euismod a risus imperdiet eleifend. “
                  </div>
                  <div className="songid-reviews-content-reviewer">
                    Muhammad Hadi - 4.5
                  </div>
                </div>
              </div>
            </div>
            <div className="songid-reviews-row">
              <div className="songid-reviews-column">
                <div className="songid-reviews-content-container">
                  <div className="songid-reviews-content-review">
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque et augue sit amet augue dignissim imperdiet. Ut
                    vel elementum mauris. Etiam nec elementum odio, ac malesuada
                    felis. Etiam euismod a risus imperdiet eleifend. “
                  </div>
                  <div className="songid-reviews-content-reviewer">
                    Muhammad Hadi - 4.5
                  </div>
                </div>
              </div>
              <div className="songid-reviews-column">
                <div className="songid-reviews-content-container">
                  <div className="songid-reviews-content-review">
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque et augue sit amet augue dignissim imperdiet. Ut
                    vel elementum mauris. Etiam nec elementum odio, ac malesuada
                    felis. Etiam euismod a risus imperdiet eleifend. Fusce
                    accumsan tellus rhoncus, rhoncus massa non, dapibus risus.
                    Cras facilisis vitae sem vel consequat. Maecenas semper
                    lobortis arcu, at semper libero ultricies sed. “
                  </div>
                  <div className="songid-reviews-content-reviewer">
                    Muhammad Hadi - 4.5
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SongId;

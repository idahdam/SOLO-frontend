import React, { useEffect, useState } from "react";
import "./index.css";
import hero from "../../assets/home/hero.png";
import pop from "../../assets/home/pop.png";
import rock from "../../assets/home/rock.png";
import classic from "../../assets/home/classic.png";
import rap from "../../assets/home/rap.png";
import edm from "../../assets/home/edm.png";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";
import { artistService } from "../../services/artistService";
import { reviewService } from "../../services/reviewService";

const Home = () => {
  const [artist, setArtist] = useState([]);
  const [latestReviews, setLatestReviews] = useState([]);
  useEffect(() => {
    const fetchArtist = async () => {
      const response = await artistService.getAllArtist();
      setArtist(response.data);
    };
    const fetchReviews = async () => {
      const response = await reviewService.getAllReviews();
      setLatestReviews(response.data);
    };
    fetchArtist();
    fetchReviews();
  }, []);

  return (
    <>
      <div className="home-container">
        <div className="home-hero-container">
          <div className="home-hero-row">
            <div className="home-hero-column home-hero-left">
              <img src={hero} alt="hero" className="home-hero-image" />
            </div>
            <div className="home-hero-column home-hero-right">
              <div className="home-hero-text">
                FOR ALL THE MUSIC LOVER OUT THERE
              </div>
            </div>
          </div>
          <div className="home-list-container">
            <div className="home-list-name">List Artist</div>
            <div className="home-list-artist-row">
              <div className="home-list-artist-column artist-left">
                <div className="home-list-artist-each-row">
                  {artist.length === 0 ? (
                    <>Loading</>
                  ) : (
                    <>
                      {artist.map((item, index) => {
                        return (
                          <>
                            {index <= 2 ? (
                              <div
                                className="home-list-artist-each-column"
                                key={index}
                              >
                                <Link
                                  to={`/artist/${
                                    item.artist_id
                                  }-${item.artist_name
                                    .replace(" ", "-")
                                    .toLowerCase()}`}
                                >
                                  <img
                                    src={item.artist_picture}
                                    alt="artist"
                                    className="home-list-artist-each-image"
                                  />
                                </Link>
                                <div className="home-list-artist-each-text">
                                  {item.artist_name}
                                </div>
                              </div>
                            ) : null}
                          </>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
              <div className="home-list-artist-column artist-right">
                <div className="home-list-artist-viewmore">
                  <Link to="/artist"> View More {">"}</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="home-list-container">
            <div className="home-list-name" id="genres">
              List Genres
            </div>
            <div className="home-list-genres-row">
              <div className="home-list-genres-column">
                <Link to="/genre/pop">
                  <img
                    src={pop}
                    alt="pop"
                    className="home-list-genre-each-image"
                  />
                </Link>
                <div className="home-list-genre-each-text">Pop</div>
              </div>
              <div className="home-list-genres-column">
                <Link to="/genre/rock">
                  <img
                    src={rock}
                    alt="pop"
                    className="home-list-genre-each-image"
                  />
                </Link>
                <div className="home-list-genre-each-text">Rock</div>
              </div>
              <div className="home-list-genres-column">
                <Link to="/genre/classic">
                  <img
                    src={classic}
                    alt="pop"
                    className="home-list-genre-each-image"
                  />
                </Link>
                <div className="home-list-genre-each-text">Classic</div>
              </div>
              <div className="home-list-genres-column">
                <Link to="/genre/rap">
                  <img
                    src={rap}
                    alt="pop"
                    className="home-list-genre-each-image"
                  />
                </Link>
                <div className="home-list-genre-each-text">Rap</div>
              </div>
              <div className="home-list-genres-column">
                <Link to="/genre/edm">
                  <img
                    src={edm}
                    alt="pop"
                    className="home-list-genre-each-image"
                  />
                </Link>
                <div className="home-list-genre-each-text">EDM</div>
              </div>
            </div>
          </div>
          <div className="home-list-container">
            <div className="home-list-name" id="genres">
              Latest Reviews
            </div>
            <Masonry
              breakpointCols={2}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {latestReviews.length > 0 ? (
                <>
                  {latestReviews.map((data, index) => {
                    return (
                      <>
                        {index < 5 ? (
                          <div className="songid-reviews-each" key={index}>
                            <div className="songid-reviews-each-review">
                              "{data.review_content}"
                            </div>
                            <div className="songid-reviews-each-name-rating">
                              {data.review_reviewer} - {data.review_rating} on{" "}
                              <Link to={`song/${data.song_id}`}>
                                {data.song_title}
                              </Link>{" "}
                              by{" "}
                              <Link to={`artist/${data.artist_id}`}>
                                {data.artist_name}
                              </Link>
                            </div>
                          </div>
                        ) : null}
                      </>
                    );
                  })}
                </>
              ) : (
                <>No reviews yet.</>
              )}
            </Masonry>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

import React from "react";
import "./index.css";

const About = () => {
  return (
    <>
      <div className="about-container">
        <div className="about-title">About Page</div>
        <div className="about-content">
          <div className="about-content-comp">
            SOLO or Song Logger is a web applicaiton made to review songs.
            Seeing how most websites related to reviews are doing book reviews,
            film reviews, cooking reviews etc, creating a song review website
            does make alot of sense.
          </div>
          <div className="about-content-comp">
            The idea itself is not originally mine, it's from Valerie Olive, a
            friend of mine.
          </div>
          <div className="about-content-comp">
            Morever, this web application is made to fulfill one of the
            requirements of laboratory assistant selection of Network
            Laboratory.
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

import React from "react";
import { Link } from "react-router-dom";

const Acknowledgements = () => {
  return (
    <div className="acknowledgements ">
      <h3>Thank You!</h3>
      <div className="onboarding-text-container">
        <p>
          We would like to thank the following for making this app possible:
        </p>
        <br/>
        <p>
        &bull; &nbsp; <a href="https://solarsystem.nasa.gov/resources/">
              NASA</a> for providing us with factual information and 3D models
        </p>
        <p>
        &bull; &nbsp; <a href="https://www.freepik.com">
              Freepik</a> for providing many of the graphics used across the app
        </p>
        </div>
        <Link to="/mission-control">
          <button className="button" id="acknowledgement-back-button">
                Go Back
          </button>
        </Link>
      </div>
  );
};

export default Acknowledgements;

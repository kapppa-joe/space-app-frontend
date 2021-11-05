import React from "react";
import { Link } from "react-router-dom";

const Acknowledgements = () => {
  return (
    <div>
      <p>We would like to thank the following for making this app possible:</p>
      <ul>
        <li>
          <a href="https://solarsystem.nasa.gov/resources/">
            Nasa from providing us with factual information and 3D models.
          </a>
          <a href="https://www.freepik.com">
            freepik for providing us with images and icons.
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Acknowledgements;

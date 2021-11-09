import React from "react";

const Acknowledgements = () => {
  return (
    <div className="acknowledgements">
      <div className="message-card">
        <p>
          We would like to thank the following for making this app possible:
        </p>
        <ul>
          <li>
            <a href="https://solarsystem.nasa.gov/resources/">
              Nasa from providing us with factual information and 3D models.
            </a>
            <br />
            <a href="https://www.freepik.com">
              Freepik for providing us with images and icons.
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Acknowledgements;

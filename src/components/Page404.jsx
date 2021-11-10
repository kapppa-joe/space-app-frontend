import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div id="not-found">
      <h2 className="title is-size-3 has-text-white">
        404: Houston, we have a problem!
      </h2>
      <p>It looks like this page doesn't exist</p>
      <img
        className="error-img"
        alt="missing astronaut"
        src="/assets/2d-images/lost_in_space.png"
      />
      <br/>
      <Link to="/">
        <button className="button" id="error-button">
              Go Back
        </button>
      </Link>
    </div>
  );
};

export default Page404;

import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import Robot1 from "../assets/avatars/Robot1.png";
import CustomARMarker from "../assets/images/ar-pattern-rocket.png";
import CustomMarkerPDF from "../assets/images/custom-AR-marker.pdf";
import getUserProgressByPlanet from "../db";

const Onboarding = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  const testDB = () => {
    getUserProgressByPlanet("earth").then((progress) => {
      console.log(progress);
    });
  };

  const signOutUser = () => {
    auth
      .signOut()
      .then(() => {
        setLoggedIn(false);
      })
      .catch((error) => alert(error.message));
  };

  if (!loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <button onClick={signOutUser}>Sign Out</button>
      <img className="avatar_img" src={Robot1} alt="user avatar" />
      <h2>Mission preparation</h2>
      <p>Step 1</p>
      <p>
        Print the marker
        <a href={CustomMarkerPDF} target="__blank">
          <img
            className="ar_marker_img"
            src={CustomARMarker}
            alt="ar marker image"
          />
        </a>
      </p>
      <p>Step 2</p>
      <p>Onboarding stuff</p>
      <p>
        <button>My mission</button>
      </p>
      <button onClick={testDB}>DB test</button>
    </div>
  );
};

export default Onboarding;

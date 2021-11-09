import React from "react";
import Demo from "./Demo";
import Sidebar from "./Sidebar";
import Iframe from "react-iframe";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Page404 from "./Page404";

const Planets = () => {
  const { space_object } = useParams();
  const [isAr, setIsAr] = useState(false);

  const objArray = [
    "sun",
    "mercury",
    "venus",
    "earth",
    "iss",
    "hubble",
    "moon",
    "mars",
    "curiosity_rover",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
    "pluto",
    "voyager",
  ];

  const switchAR = () => {
    setIsAr((currState) => {
      return !currState;
    });
  };

  if (!objArray.includes(space_object)) {
    return <Page404 />;
  }

  return (
    <div id="ar_page">
      <span className="back-button-wrapper">
        <Link to="/mission-control">
          <button className="button back-button">avatar</button>
        </Link>
      </span>
      <div id="ar_view">
        <Iframe
          id="iframe"
          src={`../${isAr ? "ar" : "3d"}-scene.html?model=${space_object}`}
        ></Iframe>

        <div className="ar-toggle-switch-wrapper">
          <label for="ar-switch">3D</label>
          <label className="ar-toggle-switch" for="ar-switch">
            <input
              type="checkbox"
              id="ar-switch"
              checked={isAr}
              onChange={switchAR}
            />
            <span className="slider"></span>
          </label>
          <label for="ar-switch">AR</label>
        </div>

        {/* <button id="ar_switch" onClick={switchAR}>
          AR on/off
        </button>
         */}
        <Demo />
        <Sidebar id="contents" content="facts" space_object={space_object} />
        <Sidebar id="contents" content="quiz" space_object={space_object} />
      </div>
      <div id="ar_list">
        {objArray.map((object) => {
          return (
            <Link key={object} to={`/space/${object}`}>
              <img src={`/assets/2d-images/${object}2D.png`} alt="" />
              {object}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Planets;

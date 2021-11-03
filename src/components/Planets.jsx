import React from "react";
import Iframe from "react-iframe";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";

const Planets = () => {
  const { space_object } = useParams();
  const [isAr, setIsAr] = useState(false);
  const objArray = [
    "sun",
    "mercury",
    "venus",
    "earth",
    "moon",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
    "pluto",
    "curiosity_rover",
    "hubble",
    "iss",
    "voyager",
  ];

  const switchAR = () => {
    setIsAr((currState) => {
      return !currState;
    });
  };

  return (
    <div id="ar_page">
      <div id="ar_view">
        <Iframe
          id="iframe"
          src={`../${isAr ? "ar" : "3d"}-scene.html?model=${space_object}`}
        ></Iframe>
        <button id="ar_switch" onClick={switchAR}>
          AR on/off
        </button>
      </div>
      <div id="ar_list">
        {objArray.map((object) => {
          return (
            <Link key={object} to={`/space/${object}`}>
              {object}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Planets;

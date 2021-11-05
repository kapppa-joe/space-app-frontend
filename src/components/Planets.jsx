import React from "react";
import Demo from "./Demo"; 
import Sidebar from "./Sidebar";
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
        <Demo />
        <Sidebar content="facts" space_object={space_object} />
        <Sidebar content="quiz" space_object={space_object}/>
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

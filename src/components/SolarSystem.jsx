import React from "react";
import { Link } from "react-router-dom";

const SolarSystem = () => {
  const spaceObjects = [
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

  return (
    <div>
      {spaceObjects.map((object, index) => {
        return (
          <div key={index} className="card-image">
            <Link to={`space/${object}`}>
              <img
                className="two-d"
                src={`/assets/2d-images/${object}2D.png`}
                alt={object}
              ></img>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default SolarSystem;

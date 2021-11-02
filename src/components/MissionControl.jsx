import React from "react";
import { useEffect, useState } from "react";
import { getUserProgress, setUserProgress } from "../db";

const MissionControl = () => {
  const [progress, setProgress] = useState({
    sun: [],
    mercury: [],
    venus: [],
    earth: [],
    mars: [],
    jupiter: [],
    saturn: [],
    uranus: [],
    neptune: [],
    iss: [],
    curiosityRover: [],
    voyager: [],
  });

  useEffect(() => {
    getUserProgress().then((progress) => {
      if (progress) {
        setProgress(progress);
      } else {
        setUserProgress(progress);
      }
    }, []);
  });

  const testDB = () => {
    //   getUserProgressByPlanet("earth").then((progress) => {
    //     console.log(progress);
    //   });
  };

  return (
    <div>
      <button onClick={testDB}>DB test</button>
    </div>
  );
};

export default MissionControl;

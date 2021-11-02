import React from "react";
import { useEffect, useState } from "react";
import { getUserProgress, setUserProgress, updateUserProgress } from "../db";

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

  //   useEffect(() => {
  //     getUserProgress().then((progress) => {
  //       if (progress) {
  //         setProgress(progress);
  //       } else {
  //         setUserProgress(progress);
  //       }
  //     }, []);
  //   });

  const testDB = () => {
    updateUserProgress({ sun: [1] });
  };

  return (
    <div>
      <button onClick={testDB}>DB test</button>
      <p>Sun {progress.sun.length}/10</p>
    </div>
  );
};

export default MissionControl;

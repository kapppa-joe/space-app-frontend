import React from "react";
import {
  removeUserProgress,
  setUserProgress,
  updateUserProgress,
  getUserProgress,
  getUserProgressByPlanet,
} from "../db";

const Onboarding = () => {
  //please do not touch for testing purposes !!!
  const testDB = () => {
    getUserProgressByPlanet("earth").then((progress) => {
      console.log(progress);
    });
  };

  return (
    <div>
      <button onClick={testDB}>DB test</button>
    </div>
  );
};

export default Onboarding;

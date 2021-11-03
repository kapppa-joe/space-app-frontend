import React from "react";
import { useEffect, useState } from "react";
import {
  getUserAvatar,
  getUserNickname,
  getUserProgress,
  removeUserProgress,
  updateUserProgress,
} from "../db";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const MissionControl = () => {
  const [user, loading, error] = useAuthState(auth);
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState("Robot1");

  const spaceObjects = [
    "sun",
    "mercury",
    "venus",
    "earth",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
    "iss",
    "curiosity_rover",
    "voyager",
  ];

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
    if (user) {
      getUserAvatar().then((dbAvatar) => {
        setAvatar(dbAvatar);
      });
      getUserNickname().then((dbNickname) => {
        setNickname(dbNickname);
      });
      getUserProgress().then((dbProgress) => {
        setProgress(dbProgress);
      });
    }
  }, [user, avatar]);

  const resetProgress = () => {
    removeUserProgress();
  };

  const testDB = () => {
    updateUserProgress({ sun: [1, 2, 3], earth: [1, 2] });
  };

  if (loading) {
    return <div>Initialising User...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (user) {
    return (
      <div>
        <h2>{nickname}</h2>
        <img
          className="avatar_img"
          src={`/assets/avatars/${avatar}.png`}
          alt="user avatar"
        />
        <button onClick={testDB}>DB test</button>
        <button onClick={resetProgress}>Reset</button>

        {spaceObjects.map((object, index) => {
          return (
            <div key={index}>
              <img
                className="two-d"
                src={`/assets/2d-images/${object}2D.png`}
                alt={object}
              ></img>
              <img
                className="badge"
                src={`/assets/badges/badge-${object}.png`}
                alt={object}
              ></img>
              <p>
                {object} {object in progress ? progress[object].length : 0}/10
              </p>
            </div>
          );
        })}
      </div>
    );
  }
};

export default MissionControl;

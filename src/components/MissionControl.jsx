import React from "react";
import { useEffect, useState } from "react";
import {
  getUserAvatar,
  getUserNickname,
  getUserProgress,
  removeUserProgress,
} from "../db";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const MissionControl = () => {
  const [user, loading, error] = useAuthState(auth);
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState("Robot1");
  const [loadingContent, setLoadingContent] = useState(true);
  const avatarList = [
    "Robot1",
    "Robot2",
    "Robot3",
    "Robot4",
    "Robot5",
    "Robot6",
  ];


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


  const [progress, setProgress] = useState({
    solar_system:[],
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
  const spaceObjects = [
    "solar-system",
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


  useEffect(  () => {
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
      setLoadingContent(false)
    }
    
  }, [user, avatar]);

  const resetProgress = () => {
    removeUserProgress();
  };

  /**
   * Testing function, remove later
   */
  // const testDB = () => {
  //   updateUserProgress({ sun: [1, 2, 3], earth: [1, 2] });
  // };

  if (loading) {
    return <div>Initialising User...</div>;
  }

  if(!progress && loadingContent){
    return <h2>Loading</h2>
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
        <button onClick={resetProgress}>Reset</button>
        <h2>{nickname}</h2>

        <img
          className="avatar_img"
          src={`/assets/avatars/${avatarList[avatar]}.png`}
          alt="user avatar"
        />

        <Link to="/solar-system">
          <button>Play</button>
        </Link>

        {/* Testing button, remove later */}
        {/* <button onClick={testDB}>DB test</button> */}
        {spaceObjects.map((object, index) => {
            console.log(progress[object], '<<<',object)
          return (
            <div key={index}>
              <Link to={`space/${object}`}>
                <img
                  className="two-d"
                  src={`/assets/2d-images/${object}2D.png`}
                  alt={object}
                ></img>
              </Link>

              {/* Do not touch, it will break */}
              {object in progress ? (
                progress[object].length > 6 ? (
                  <img
                    className="badge"
                    src={`/assets/badges/badge-${object}.png`}
                    alt={object}
                  ></img>
                ) : (
                  <img
                    className="badge"
                    src={`/assets/badges/badge-default1.png`}
                    alt={object}
                  ></img>
                )
              ) : (
                <img
                  className="badge"
                  src={`/assets/badges/badge-default1.png`}
                  alt={object}
                ></img>
              )}

              <p>
                {object} {object in progress ? progress[object].length : 0}/10
                <progress
                  className="progress is-large {object in progress ? progress[object].length < 7 ? is-warning : is-success : null}"
                  value={object in progress ? progress[object].length : 0}
                  max="7"
                ></progress>

                {object === "solar-system"
                  ? "Solar System"
                  : object[0].toUpperCase() + object.slice(1)}{" "}
                {object in progress ? progress[object].length : 0}/10

              </p>
            </div>
          );
        })}
      </div>
    );
  }
};

export default MissionControl;

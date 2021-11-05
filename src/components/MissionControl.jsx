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
  const [reload, setReload] = useState(false);

  const avatarList = [
    "Robot1",
    "Robot2",
    "Robot3",
    "Robot4",
    "Robot5",
    "Robot6",
  ];

  const [progress, setProgress] = useState({
    solar_system: [],
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
      setLoadingContent(false);
    }
  }, [user, avatar, reload]);

  const resetProgress = () => {
    let result = window.confirm("Are you sure you want to reset progress");
    if (result) {
      setReload((reload) => {
        return !reload;
      });
      removeUserProgress();
    } else {
    }
  };

  if (loading) {
    return <div>Initialising User...</div>;
  }

  if (!progress && loadingContent) {
    return <h2>Loading</h2>;
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
        <Link to="/space/solar-system">
          <button>Play Game</button>
        </Link>
        <Link to="/onboarding">
          <button>Back To Mission Prep</button>
        </Link>
        <button onClick={resetProgress}>Reset Game</button>
        <h2>{nickname}</h2>
        <img
          className="avatar_img"
          src={`/assets/avatars/${avatarList[avatar]}.png`}
          alt="user avatar"
        />

        {/* Testing button, remove later */}
        {/* <button onClick={testDB}>DB test</button> */}
        {spaceObjects.map((object, index) => {
          return (
            <div key={index} className="content flex ml-6 mr-6">
              <div className="card mb-3">
                <p>
                  {object === "solar-system"
                    ? "Solar System"
                    : object[0].toUpperCase() + object.slice(1)}{" "}
                  {object in progress ? progress[object].length : 0}/10
                </p>
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
                    <>
                      <img
                        className="badge"
                        src={`/assets/badges/badge-${object}.png`}
                        alt={object}
                      ></img>
                      <progress
                        className="progress is-medium is-success"
                        value={object in progress ? progress[object].length : 0}
                        max="10"
                      ></progress>
                    </>
                  ) : (
                    <>
                      <img
                        className="badge"
                        src={`/assets/badges/badge-default1.png`}
                        alt={object}
                      ></img>
                      <progress
                        className="progress is-medium is-danger"
                        value={object in progress ? progress[object].length : 0}
                        max="10"
                      ></progress>
                    </>
                  )
                ) : (
                  <>
                    <img
                      className="badge"
                      src={`/assets/badges/badge-default1.png`}
                      alt={object}
                    ></img>
                    <progress
                      className="progress is-medium"
                      value="0"
                      max="7"
                    ></progress>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default MissionControl;

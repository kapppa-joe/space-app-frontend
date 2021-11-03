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
        <img
          className="badge"
          src="/assets/badges/badge-sun.png"
          alt="sun badge"
        ></img>
        <p>Sun {"sun" in progress ? progress.sun.length : 0}/10</p>
        <img
          className="badge"
          src="/assets/badges/badge-mercury.png"
          alt="mercury badge"
        ></img>
        <p>Mercury {"mercury" in progress ? progress.mercury.length : 0}/10</p>
        <img
          className="badge"
          src="/assets/badges/badge-mercury.png"
          alt="venus badge"
        ></img>
        <p>Venus {"venus" in progress ? progress.venus.length : 0}/10</p>
        <img
          className="badge"
          src="/assets/badges/badge-earth.png"
          alt="earth badge"
        ></img>
        <p>Earth {"earth" in progress ? progress.earth.length : 0}/10</p>
        <img
          className="badge"
          src="/assets/badges/badge-mars.png"
          alt="mars badge"
        ></img>
        <p>Mars {"mars" in progress ? progress.mars.length : 0}/10</p>
        <img
          className="badge"
          src="/assets/badges/badge-jupiter.png"
          alt="jupiter badge"
        ></img>
        <p>Jupiter {"jupiter" in progress ? progress.jupiter.length : 0}/10</p>
        <img
          className="badge"
          src="/assets/badges/badge-saturn.png"
          alt="saturn badge"
        ></img>
        <p>Saturn {"saturn" in progress ? progress.saturn.length : 0}/10</p>
        <img
          className="badge"
          src="/assets/badges/badge-uranus.png"
          alt="uranus badge"
        ></img>
        <p>Uranus {"uranus" in progress ? progress.uranus.length : 0}/10</p>
        <img
          className="badge"
          src="/assets/badges/badge-neptune.png"
          alt="neptune badge"
        ></img>
        <p>Neptune {"neptune" in progress ? progress.neptune.length : 0}/10</p>
        <img
          className="badge"
          src="/assets/badges/badge-spaceStation.png"
          alt="iss badge"
        ></img>
        <p>ISS {"iss" in progress ? progress.iss.length : 0}/10</p>
        <img
          className="badge"
          src="/assets/badges/badge-marsRover.png"
          alt="curiosity rover badge"
        ></img>
        <p>
          Curiosity Rover{" "}
          {"CuriosityRover" in progress ? progress.curiosityRover.length : 0}/10
        </p>
        <img
          className="badge"
          src="/assets/badges/badge-voyager.png"
          alt="voyager badge"
        ></img>
        <p>Voyager {"voyager" in progress ? progress.voyager.length : 0}/10</p>
      </div>
    );
  }
};

export default MissionControl;

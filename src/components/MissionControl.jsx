import React from "react";
import { useEffect, useState } from "react";
import {
  getUserAvatar,
  getUserNickname,
  getUserProgress,
  setUserAvatar,
  setUserProgress,
  updateUserProgress,
} from "../db";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const MissionControl = () => {
  const [user, loading, error] = useAuthState(auth);
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState("Robot1");
  const avatarList = [
    "Robot1",
    "Robot2",
    "Robot3",
    "Robot4",
    "Robot5",
    "Robot6",
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
        setUserAvatar(dbAvatar);
      });
      getUserNickname().then((dbNickname) => {
        setNickname(dbNickname);
      });
      getUserProgress().then((dbProgress) => {
        setProgress(dbProgress);
      });
    }
  }, [user, avatar]);

  const testDB = () => {
    updateUserProgress({ mercury: [1, 2, 3], earth: [1, 2] });
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
    console.log(avatar);
    return (
      <div>
        <h2>{nickname}</h2>
        <img
          className="avatar_img"
          src={`/assets/avatars/${avatar}.png`}
          alt="user avatar"
        />
        <button onClick={testDB}>DB test</button>
        <p>Mercury {"mercury" in progress ? progress.mercury.length : 0}/10</p>
        <p>Venus {"venus" in progress ? progress.venus.length : 0}/10</p>
        <p>Earth {"earth" in progress ? progress.earth.length : 0}/10</p>
        <p>Mars {"mars" in progress ? progress.mars.length : 0}/10</p>
        <p>Jupiter {"jupiter" in progress ? progress.jupiter.length : 0}/10</p>
        <p>Saturn {"saturn" in progress ? progress.saturn.length : 0}/10</p>
        <p>Uranus {"uranus" in progress ? progress.uranus.length : 0}/10</p>
        <p>Neptune {"neptune" in progress ? progress.neptune.length : 0}/10</p>
        <p>ISS {"iss" in progress ? progress.iss.length : 0}/10</p>
        <p>
          Curiosity Rover{" "}
          {"CuriosityRover" in progress ? progress.curiosityRover.length : 0}/10
        </p>
        <p>Voyager {"voyager" in progress ? progress.voyager.length : 0}/10</p>
      </div>
    );
  }
};

export default MissionControl;

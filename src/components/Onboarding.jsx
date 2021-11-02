import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import CustomARMarker from "../assets/images/ar-pattern-rocket.png";
import CustomMarkerPDF from "../assets/images/custom-AR-marker.pdf";

import { setUserNickname, getUserNickname, setUserAvatar,  getUserProgressByPlanet, setUserProgress } from "../db";

const Onboarding = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [inputName, setInputName] = useState("")
  const [avatar, setAvatar] = useState(0)
  const avatarList = ["Robot1", "Robot2", "Robot3", "Robot4", "Robot5", "Robot6",]

  // useEffect(() => {
  //   getUserNickname().then((nickname) => {
  //     if(!nickname) {
  //       setInputName("")
  //     } else {
  //       setInputName(nickname);
  //     }
  //   }).catch((err) => {
  //     setInputName("");
  //   })
  // }, [])



  const testDB = () => {
    setUserProgress({ earth: [1, 2, 3, 4], venus: [1, 2, 3, 4] });
  };

  const signOutUser = () => {
    auth
      .signOut()
      .then(() => {
        setLoggedIn(false);
      })
      .catch((error) => alert(error.message));
  };

  const submitNickname = () => {
    setUserNickname(inputName).then(() => {
      setInputName("");
    })
  }

  const changeAvatarButtons = (number) => {
    if (avatar === 0 && number === -1) {
      setAvatar(5)
    } else if ((avatar === 5 && number === 1)) {
       setAvatar(0)
    } else {
      setAvatar(avatar + number)
    }
    
  }

  if (!loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <button onClick={signOutUser}>Sign Out</button>
      <h2>Mission preparation</h2>
      <p>Welcome to the space port! Before you launch off
         into the stars, you will need to complete the following steps:</p>
      <h3>Step 1: Enter your character name!</h3>
      <input
        type="text"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
      ></input>
      <button onClick={submitNickname}>Set Character Name</button>
      <h3>Step 2: Choose your character!</h3>
      <button onClick={() => {changeAvatarButtons(-1)}}>{'<---'}</button>
      <img className="avatar_img" src={`/assets/avatars/${avatarList[avatar]}.png`} alt="user avatar" />
      <button onClick={() => {changeAvatarButtons(1)}}>{'--->'}</button>

      <a href={CustomMarkerPDF} target="__blank">
        <img
          className="ar_marker_img"
          src={CustomARMarker}
          alt="ar marker image"
        />
      </a>

      <p>
        <button>My mission</button>
      </p>
      <button onClick={testDB}>DB test</button>
    </div>
  );
};

export default Onboarding;

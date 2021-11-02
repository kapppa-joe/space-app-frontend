import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import CustomARMarker from "../assets/images/ar-pattern-rocket.png";
import CustomMarkerPDF from "../assets/images/custom-AR-marker.pdf";
import { setUserNickname, getUserNickname, setUserAvatar } from "../db";

const Onboarding = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [inputName, setInputName] = useState("")
  const [avatar, setAvatar] = useState("Robot1")

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
      
      <img className="avatar_img" src={`/assets/avatars/${avatar}.png`} alt="user avatar" />


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
    </div>
  );
};

export default Onboarding;

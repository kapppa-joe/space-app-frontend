import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import CustomARMarker from "../assets/images/ar-pattern-rocket.png";
import CustomMarkerPDF from "../assets/images/custom-AR-marker.pdf";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  setUserNickname,
  getUserNickname,
  setUserAvatar,
  getUserAvatar,
} from "../db";

const Onboarding = () => {
  const [inputName, setInputName] = useState("");
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState(0);
  const avatarList = [
    "Robot1",
    "Robot2",
    "Robot3",
    "Robot4",
    "Robot5",
    "Robot6",
  ];
  const [user, loading, error] = useAuthState(auth);
  const [reload, setReload] = useState(false);
  const [displayInputBox, setDisplayInputBox] = useState(false);

  useEffect(() => {
    if (user) {
      getUserNickname()
        .then((res) => {
          if (!res) {
            setNickname("");
            setDisplayInputBox(true);
          } else {
            setNickname(res);
          }
        })
        .then(getUserAvatar)
        .then((res) => {
          const avatarNum = parseInt(res);
          setAvatar(avatarNum);
        })
        .catch((err) => {
          console.dir(err);
        });
    }
  }, [loading, reload, user]);

  const signOutUser = () => {
    auth.signOut().catch((error) => alert(error.message));
  };

  const submitNickname = () => {
    setNickname(inputName);
    setDisplayInputBox(false);
    setUserNickname(inputName)
      .then(() => {
        setInputName("");
        setReload(true);
      })
      .catch((err) => {
        console.dir(err);
      });
  };

  const changeNickname = () => {
    setNickname("");
    setDisplayInputBox(true);
    setReload(true);
  };

  const changeAvatarButtons = (number) => {
    if (avatar === 0 && number === -1) {
      setAvatar(5);
      setUserAvatar(5);
    } else if (avatar === 5 && number === 1) {
      setAvatar(0);
      setUserAvatar(0);
    } else {
      setAvatar(avatar + number);
      setUserAvatar(avatar + number);
    }
  };

  if (loading) {
    return <p>Page Loading</p>;
  }

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <button onClick={signOutUser}>Sign Out</button>
      <h2>Mission Preparation</h2>
      <p>
        Welcome to the Spaceport! <br />
        Before you launch off into the stars, you will need to complete the
        following steps:
      </p>
      <h3>Step 1: Enter your name:</h3>
      {!displayInputBox ? (
        <div>
          <p>Hello {nickname}!</p>
          <button onClick={changeNickname}>Change name</button>{" "}
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          ></input>
          <button
            disabled={inputName.trim() ? false : true}
            onClick={submitNickname}
          >
            &#10003;
          </button>
        </div>
      )}
      <h3>Step 2: Choose your character:</h3>
      <button
        onClick={() => {
          changeAvatarButtons(-1);
        }}
      >
        {"<---"}
      </button>
      <img
        className="avatar_img"
        src={`/assets/avatars/${avatarList[avatar]}.png`}
        alt="user avatar"
      />
      <button
        onClick={() => {
          changeAvatarButtons(1);
        }}
      >
        {"--->"}
      </button>
      <h3>Step 3: Print your marker:</h3>
      <p>
        To explore space in 3D you will need a marker. You can access a
        printable marker by clicking on the rocket below. Alternatively, you can
        display this marker on another device such as a spare phone
      </p>
      <a href={CustomMarkerPDF} target="__blank">
        <img className="ar_marker_img" src={CustomARMarker} alt="ar marker" />
      </a>

      <p>
        {!nickname && (
          <button
            onClick={() => {
              alert("Please enter your name before you enter mission control");
            }}
          >
            Mission Control -&gt;
          </button>
        )}
        {nickname && (
          <Link to="/mission-control">
            <button>Mission Control -&gt;</button>
          </Link>
        )}
      </p>
    </div>
  );
};

export default Onboarding;

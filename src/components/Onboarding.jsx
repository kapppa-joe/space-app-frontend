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
import Loading from "./Loading";

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
  const [err, setErr] = useState(false);
  const [contentsLoading, setContentsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setContentsLoading(true);
      setErr(false);
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
          setErr(true);
        })
        .finally(() => {
          setContentsLoading(false);
        });
    }
  }, [loading, reload, user]);

  const signOutUser = () => {
    auth.signOut().catch((error) => alert(error.message));
  };

  const submitNickname = () => {
    setErr(false);
    setNickname(inputName);
    setDisplayInputBox(false);
    setUserNickname(inputName)
      .then(() => {
        setInputName("");
        setReload(true);
      })
      .catch((err) => {
        setErr(true);
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

  if (loading || contentsLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Redirect to="/" />;
  }

  if (error || err) {
    return (
      <div>
        <p>Something went wrong... Please try refreshing the page</p>
      </div>
    );
  }

  return (
    <div className="Onboarding">
      <button id="sign-out-btn" className="button" onClick={signOutUser}>
        Sign Out
      </button>
      <h2>Mission Preparation</h2>
      <div className="onboarding-text-container">
        <p>
          Welcome to the Spaceport! <br />
          Before you launch off into the stars, you will need to complete the
          following steps:
        </p>
      </div>
      <h3>Step 1: Enter your name:</h3>
      {!displayInputBox ? (
        <div>
          <p id="welcome-msg">Hello {nickname}!</p>
          <button className="button onboarding-btn" onClick={changeNickname}>
            Change name
          </button>{" "}
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          ></input>
          <button
            id="tick-btn"
            disabled={inputName.trim() ? false : true}
            onClick={submitNickname}
          >
            &#10003;
          </button>
        </div>
      )}
      <h3>Step 2: Choose your character:</h3>
      <button
        className="button avatar-btn"
        onClick={() => {
          changeAvatarButtons(-1);
        }}
      >
        <i class="fas fa-angle-double-left"></i>
      </button>
      <img
        className="avatar_img"
        src={`/assets/avatars/${avatarList[avatar]}.png`}
        alt="user avatar"
      />
      <button
        className="button avatar-btn"
        onClick={() => {
          changeAvatarButtons(1);
        }}
      >
        <i class="fas fa-angle-double-right"></i>
      </button>
      <h3>Step 3: Print your marker:</h3>
      <div className="onboarding-text-container">
        <p>
          To explore space in 3D you will need a marker. You can access a
          printable marker by clicking on the rocket below. Alternatively, you
          can display this marker on another device such as a spare phone
        </p>
      </div>
      <a href={CustomMarkerPDF} target="__blank">
        <img className="ar_marker_img" src={CustomARMarker} alt="ar marker" />
      </a>

      <p>
        {!nickname && (
          <button
            className="button onboarding-btn"
            onClick={() => {
              alert("Please enter your name before heading to mission control");
            }}
          >
            To Mission Control;
          </button>
        )}
        {nickname && (
          <Link to="/mission-control">
            <button className="button onboarding-btn">
              To Mission Control!
            </button>
          </Link>
        )}
      </p>
    </div>
  );
};

export default Onboarding;

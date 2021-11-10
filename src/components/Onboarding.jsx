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
  }, [loading, reload, user, nickname]);

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
    setUserNickname("");
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
      <div className="sign-out-container">
        <button id="sign-out-btn" className="button" onClick={signOutUser}>
          Sign Out
        </button>
      </div>
      <h2>Mission Preparation</h2>
      
        <p id="prep-description">
          Welcome to the Spaceport! <br /><br/>
          Before you launch off into the stars, you will need to complete the
          following steps:
        </p>
        <div className="onboarding-text-container">
      <h3><span className="step-bold">Step 1:&nbsp;</span> Enter your name:</h3>
      {!displayInputBox ? (
        <div>
          <p id="welcome-msg">Hello {nickname}</p>
          <button className="button" id="onboarding-btn" onClick={changeNickname}>
            Edit Name
          </button>{" "}
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          ></input>
          <br/>
          <button
            id="tick-btn"
            disabled={inputName.trim() ? false : true}
            onClick={submitNickname}
          >
            <svg id={`${inputName.trim() ? "tick-icon" : "grey-icon"}`} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-check" className="svg-inline--fa fa-circle-check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"></path></svg>
          </button>
        </div>
      )}
      </div>
      <div className="onboarding-text-container">
      <h3><span className="step-bold">Step 2: &nbsp;</span> Choose your character:</h3>
      <button
        className="button avatar-btn"
        onClick={() => {
          changeAvatarButtons(-1);
        }}
      >
        <i className="fas fa-angle-double-left"></i>
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
        <i className="fas fa-angle-double-right"></i>
      </button>
      </div>
      <div className="onboarding-text-container">
      <h3><span className="step-bold">Step 3:&nbsp; </span> Print your marker:</h3>
        <p>
          To explore space in 3D you will need a marker <br/>
          Click on the rocket icon to print one out</p>
          <a href={CustomMarkerPDF} target="__blank">
           <img className="ar_marker_img" src={CustomARMarker} alt="ar marker" />
          </a>
            <p>Alternatively, you
          can display this marker on another device such as a spare phone
        </p>
        <p>
        {!nickname ? (
          <button
            className="button" id="mc-btn"
            onClick={() => {
              alert("Please enter your name before heading to mission control");
            }}
          >
            To Mission Control&nbsp;&nbsp;
            <i className="fas fa-angle-double-right"></i>
          </button>
        ) :  (
          <Link to="/mission-control">
            <button className="button" id="mc-btn">
              To Mission Control&nbsp;&nbsp;
              <i className="fas fa-angle-double-right"></i>
            </button>
          </Link>
        )}
      </p>
      </div>
    </div>
  );
};

export default Onboarding;

import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import CustomARMarker from "../assets/images/ar-pattern-rocket.png";
import CustomMarkerPDF from "../assets/images/custom-AR-marker.pdf";
import { useAuthState } from "react-firebase-hooks/auth";
import { setUserNickname, getUserNickname, setUserAvatar, getUserAvatar} from "../db";

const Onboarding = () => {
  const [inputName, setInputName] = useState("")
  const [nickname, setNickname] = useState("")
  const [avatar, setAvatar] = useState(0)
  const avatarList = ["Robot1", "Robot2", "Robot3", "Robot4", "Robot5", "Robot6",]
  const [user, loading, error] = useAuthState(auth);
  const [reload, setReload] = useState(false);
  const [displayInputBox, setDisplayInputBox] = useState(false);

  useEffect(() => {
    if (user) {
      getUserNickname().then((res) => {
        if(!res) {
          setNickname("")
          setDisplayInputBox(true)
        } else {
          setNickname(res);
        }
      }).then( 
        getUserAvatar
      ).then((res) => {
        const avatarNum = parseInt(res)
        setAvatar(avatarNum)
      })
      .catch((err) => {
        console.dir(err)
      })}
  }, [loading, reload, user])

  const signOutUser = () => {
    auth
      .signOut()
      .catch((error) => alert(error.message));
  };

  const submitNickname = () => {
    setNickname(inputName);
    setDisplayInputBox(false);
    setUserNickname(inputName).then(() => {
      setInputName("");
      setReload(true);
    }).catch((err) => {
      console.dir(err)
    })
  }

  const changeNickname = () => {
    setNickname("");
    setDisplayInputBox(true);
    setReload(true);
  }

  const changeAvatarButtons = (number) => {
    if (avatar === 0 && number === -1) {
      setAvatar(5)
      setUserAvatar(5)
    } else if ((avatar === 5 && number === 1)) {
       setAvatar(0)
       setUserAvatar(0)
    } else {
      setAvatar(avatar + number)
      setUserAvatar(avatar + number)
    }
    
  }

  if (loading) {
    return <p>Page Loading</p>
  }

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <button onClick={signOutUser}>Sign Out</button>
      <h2>Mission preparation</h2>
      <p>Welcome to the space port! Before you launch off
         into the stars, you will need to complete the following steps:</p>
      <h3>Step 1: Set your character name!</h3>
      {(!displayInputBox) ? <div><p>Your character name is currently: {nickname}</p><button onClick={changeNickname}>Change Nickname</button> </div>: 
        <div>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          ></input>
          <button onClick={submitNickname}>Set Character Name</button>
        </div>
      }
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
        <Link to="/mission-control"><button>My mission</button></Link>
      </p>
    </div>
  );
};

export default Onboarding;

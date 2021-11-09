import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { getUserAvatar } from "../db";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const avatarList = ["Robot1", "Robot2", "Robot3", "Robot4", "Robot5", "Robot6"];

const Avatar = () => {
  const [user, loading, error] = useAuthState(auth);
  const [avatar, setAvatar] = useState("Robot1");
  useEffect(() => {
    if (user) {
      getUserAvatar()
        .then((dbAvatar) => setAvatar(dbAvatar))
        .catch((err) => console.log(err));
    }
  }, [user, loading]);

  if (loading) {
    return null;
  }

  if (!user) {
    return <Redirect to="/" />;
  }

  if (error) {
    return null;
  }

  return (
    <div className="avatar-container">
      <img
        className="avatar_img"
        src={`/assets/avatars/${avatarList[avatar]}.png`}
        alt="user avatar"
      />
    </div>
  );
};

export default Avatar;

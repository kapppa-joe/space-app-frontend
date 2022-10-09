import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserAvatar } from "../db";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const avatarList = ["Robot1", "Robot2", "Robot3", "Robot4", "Robot5", "Robot6"];

const Avatar = () => {
  const [user, loading, error] = useAuthState(auth);
  const [avatar, setAvatar] = useState("Robot1");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (user) {
      getUserAvatar()
        .then((dbAvatar) => setAvatar(dbAvatar))
        .catch((err) => console.log(err));
    } else {
      navigate("/");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="avatar-loading-placeholder">Loading your avatar...</div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Something went wrong... Please try refreshing the page</p>
      </div>
    );
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

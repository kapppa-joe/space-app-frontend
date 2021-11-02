import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { auth } from "../firebase";

const Onboarding = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  const signOutUser = () => {
    auth
      .signOut()
      .then(() => {
        setLoggedIn(false);
      })
      .catch((error) => alert(error.message));
  };

  if (!loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <button onClick={signOutUser}>Sign Out</button>
    </div>
  );
};

export default Onboarding;

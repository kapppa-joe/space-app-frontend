import { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { app, auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  removeUserProgress,
  setDefaults,
  setUserProgress,
  updateUserProgress,
} from "../db";

export default function UserAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("Guest");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.email);
        setLoggedIn(true);
        resetForm();
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  const useGoogle = (event) => {
    event.preventDefault();
    const p = new GoogleAuthProvider();
    signInWithPopup(auth, p)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUsername(user.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        setLoggedIn(true);
        setUsername(auth.user.email);
        resetForm();
      })
      .catch((error) => alert(error.message));
  };

  const register = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        setLoggedIn(true);
        setUsername(auth.user.email);
        resetForm();
        setDefaults();
      })
      .catch((error) => alert(error.message));
  };

  // const signOutUser = () => {
  //   auth
  //     .signOut()
  //     .then(() => {
  //       setMessage("Hello there!");
  //       setUsername("Guest");
  //       setLoggedIn(false);
  //     })
  //     .catch((error) => alert(error.message));
  // };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  // // Test function , for later use in Planet.jsx
  // const testDB = () => {
  //   // Placeholders for useState
  //   let trivia;
  //   let answers;
  //   let correct;
  //   let question;
  //   getObjectByName("sun").then((planetData) => {
  //     //Array of trivia
  //     trivia = planetData.trivia;
  //     //array of answers
  //     answers = planetData.questions.answers;
  //     correct = planetData.questions.correct;
  //     question = planetData.questions.question;
  //   });
  // };

  if (loggedIn) {
    return <Redirect to="/onboarding" />;
  }

  return (
    <div className="Login">
      <h1>Out of Orbit</h1>
      <h4>An augmented reality space experience</h4>

      <p>Login or register to begin your voyage into outer space</p>

      {!loggedIn ? (
        <div className="login__container">
          <form>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              id="label"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              className="login_signInButton"
              onClick={signIn}
              type="submit"
            >
              Sign In
            </button>
            <button className="login_registerButton" onClick={register}>
              Create your account
            </button>

            <button className="login_registerButton" onClick={useGoogle}>
              Sign in with Google
            </button>
          </form>
        </div>
      ) : (
        <>{/* <button onClick={signOutUser}>Sign Out</button> */}</>
      )}
    </div>
  );
}

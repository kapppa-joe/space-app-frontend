import { useState, useEffect } from "react";
import { app, auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getObjectByName } from "../db";

export default function UserAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("Guest");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        setMessage("Welcome back!");
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
        setMessage("You have successfully logged in!");
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
        setMessage("Your account has been created successfully!");
        setLoggedIn(true);
        setUsername(auth.user.email);
        resetForm();
      })
      .catch((error) => alert(error.message));
  };

  const signOutUser = () => {
    auth
      .signOut()
      .then(() => {
        setMessage("Hello there!");
        setUsername("Guest");
        setLoggedIn(false);
      })
      .catch((error) => alert(error.message));
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const testDB = () => {
    getObjectByName("planet1").then((planetData) => {
      planetData.trivia.forEach((planet_trivia) => {
        console.log(planet_trivia);
      });

      planetData.questions.forEach((planet_questions, index) => {
        console.log("Question number ", index, ":");
        for (const key in planet_questions) {
          if (Object.hasOwnProperty.call(planet_questions, key)) {
            const element = planet_questions[key];
            console.log("\t", key, element);
          }
        }
      });
    });
  };

  return (
    <div className="App">
      <h1>Hello {username}</h1>

      {!loggedIn ? (
        <div className="login__container">
          <h1>Sign-in</h1>
          <form>
            <h5>E-mail</h5>
            <input
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <h5>Password</h5>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              className="login_singInButton"
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
        <>
          <h1>{message}</h1>
          <button onClick={signOutUser}>Sign Out</button>
          <button onClick={testDB}>DB test</button>
        </>
      )}
    </div>
  );
}

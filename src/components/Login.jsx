import { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { app, auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setDefaults } from "../db";
import { useAuthState } from "react-firebase-hooks/auth";

export default function UserAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("Guest");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setUsername(user.email);

      resetForm();
    }
  }, []);

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

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  if (user) {
    return <Redirect to="/onboarding" />;
  }
  if (loading) return <h1>loading....</h1>;
  return (
    <div className="Login">
      <h1>Out of Orbit</h1>
      <h4>An augmented reality space experience</h4>
      <p>Login or register to begin your voyage into outer space</p>
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
          <button className="login_signInButton" onClick={signIn} type="submit">
            Sign In
          </button>
          <button className="login_registerButton" onClick={register}>
            Create your account
          </button>
        </form>
      </div>
    </div>
  );
}

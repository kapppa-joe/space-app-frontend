import { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { auth } from "../firebase";
import { setDefaults } from "../db";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./Loading";

export default function UserAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      resetForm();
    }
    // added user to deps to prevent react scream error.
  }, [user]);

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        resetForm();
      })
      .catch((error) => alert(error.message));
  };

  const register = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        resetForm();
        setDefaults();
      })
      .catch((error) => alert(error.message));
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  if (error) {
    return <h2>Something went wrong...Please try again</h2>;
  }

  if (user) {
    return <Redirect to="/onboarding" />;
  }
  if (loading) return <Loading />;
  return (
    <div>
      <div className="Login">
        <h1 className="main-heading">Out of Orbit</h1>
        <h4 id="tagline">An augmented reality space experience</h4>
        <p>Login or register to begin your voyage into outer space</p>
        <form>
          <div className="form-grid">
            <label id="email" htmlFor="email">
              E-mail
            </label>
            <input
              id="email-input"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <br />
            <label id="password" htmlFor="password">
              Password
            </label>
            <input
              id="password-input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <br />
          </div>
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

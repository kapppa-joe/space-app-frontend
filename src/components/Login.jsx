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
  if (loading) return (
    <Loading />
  );
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

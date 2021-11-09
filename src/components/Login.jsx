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
      <div className="Login">
        <h1 className="main-heading">Out of Orbit</h1>
        <h4 id="tagline">An augmented reality space experience</h4>
        <section className="login-container">
        <p id="login-form-text">Login or register to begin your voyage into outer space</p>
        <form>
          <div className="form-grid">
            <label id="email" htmlFor="email">
              E-mail:
            </label>
            <input
              id="email-input"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <br />
            <label id="password" htmlFor="password">
              Password:
            </label>
            <input
              id="password-input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <br />
          </div>
          <button className="button" onClick={signIn} type="submit">
          <svg id="login-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="right-to-bracket" class="svg-inline--fa fa-right-to-bracket" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M344.7 238.5l-144.1-136C193.7 95.97 183.4 94.17 174.6 97.95C165.8 101.8 160.1 110.4 160.1 120V192H32.02C14.33 192 0 206.3 0 224v64c0 17.68 14.33 32 32.02 32h128.1v72c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C354.3 264.4 354.3 247.6 344.7 238.5zM416 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c17.67 0 32 14.33 32 32v256c0 17.67-14.33 32-32 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c53.02 0 96-42.98 96-96V128C512 74.98 469 32 416 32z"></path></svg>
          <p className="button-text">Login</p>
          </button>
          <br/>
          <button className="button" onClick={register}>
          <svg id="register-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-plus" class="svg-inline--fa fa-user-plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM616 200h-48v-48C568 138.8 557.3 128 544 128s-24 10.75-24 24v48h-48C458.8 200 448 210.8 448 224s10.75 24 24 24h48v48C520 309.3 530.8 320 544 320s24-10.75 24-24v-48h48C629.3 248 640 237.3 640 224S629.3 200 616 200z"></path></svg>
            <p className="button-text">Create a new account</p>
          </button>
        </form>
        </section>
      </div>
  );
}

import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { getTrivia } from "../db";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Loading from "./Loading";
import SpaceStation from "./SpaceStation";
import "bulma-pageloader";

const Facts = ({ space_object }) => {
  const [trivia, setTrivia] = useState(null);
  const [err, setErr] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [isLocationActive, setIsLocationActive] = useState(false);

  useEffect(() => {
    setErr(false);
    getTrivia(space_object.toLowerCase())
      .then((dbTrivia) => {
        setTrivia(dbTrivia);
      })
      .catch((err) => {
        setErr(true);
      });
  }, [space_object]);

  if (error) {
    return (
      <div>
        <p>
          <p>
            Sorry we can't find any facts at the minute. Please try again later.{" "}
          </p>
        </p>
      </div>
    );
  }

  if (!user && !loading) {
    return <Redirect to="/" />;
  } else if (err) {
    return (
      <p>
        Sorry we can't find any facts at the minute. Please try again later.{" "}
      </p>
    );
  } else if (!trivia) {
    return <Loading />;
  } else {
    return (
      <div className="trivia_body">
        <h2>Trivia</h2>
        {space_object === "iss" && (
          <>
            <button
              className="button"
              onClick={() => {
                setIsLocationActive(true);
              }}
            >
              Click here to see where the ISS is now!
            </button>
            <div
              className={`pageloader ${isLocationActive ? "is-active" : ""}`}
            >
              <SpaceStation />
              <button
                className="modal-close is-large"
                aria-label="close"
                onClick={() => {
                  setIsLocationActive(false);
                }}
              ></button>
            </div>
          </>
        )}
        <ul className="trivia_list">
          {trivia.map((fact, index) => {
            return (
              <li key={index} className="fact">
                <p>{fact}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};

export default Facts;

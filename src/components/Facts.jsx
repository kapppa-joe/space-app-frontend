import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { getTrivia } from "../db";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Loading from "./Loading";

const Facts = ({ space_object }) => {
  const [trivia, setTrivia] = useState(null);
  const [err, setErr] = useState(false);
  const [user, loading, error] = useAuthState(auth);

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

  if (!user && !loading) {
    return <Redirect to="/" />;
  } else if (err) {
    return <p>Sorry we can't find any facts at the minute. Please try again later. </p>;
  } else if (!trivia) {
    return (
      <Loading />
    );
  } else {
    return (
      <div>
        <h3>Trivia</h3>
        <ul>
          {trivia.map((fact, index) => {
            return (
              <li key={index} className="card">
                {fact}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};

export default Facts;

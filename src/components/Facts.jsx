import React, { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import { getTrivia } from "../db";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Facts = () => {
  const { planet_id } = useParams();
  const [trivia, setTrivia] = useState(null);
  const [err, setErr] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    setErr(false);
    getTrivia(planet_id.toLowerCase())
      .then((dbTrivia) => {
        console.log(dbTrivia);
        setTrivia(dbTrivia);
      })
      .catch((err) => {
        setErr(true);
      });
  }, []);

   if (error) {
     return (
       <div>
         <p>Error: {error}</p>
       </div>
     );
   }

  if (!user && !loading) {
    return <Redirect to="/" />;
  } else if (err) {
    return <p>Sorry this planet does not exist please try again</p>;
  } else if (!trivia) {
    return <p>Loading....</p>;
  } else {
    return (
      <div>
        <ul>
          {trivia.map((fact, index) => {
            return <li key={index}>{fact}</li>;
          })}
        </ul>
      </div>
    );
  }
};

export default Facts;

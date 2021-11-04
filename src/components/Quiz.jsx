import React, { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import {
  getQuestions,
  updateUserProgress,
  getUserProgressByPlanet,
} from "../db";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
const Quiz = () => {
  const { planet_id } = useParams();

  const [user, loading, error] = useAuthState(auth);

  const [quiz, setQuiz] = useState(null);

  const [err, setErr] = useState(false);
  const [progress, setProgress] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  useEffect(() => {
    setErr(false);
    getQuestions(planet_id.toLowerCase())
      .then((dbQuiz) => {
        setQuiz(dbQuiz);
      })
      .then(() => {
        getUserProgressByPlanet(planet_id)
          .then((dbProgress) => {
            setProgress(dbProgress);
          })
          .catch((err) => {
            setErr(true);
            console.log(err);
          });
      })
      .catch((err) => {
        setErr(true);
        console.log(err);
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
    return <h1>Planet does not exists, try again.</h1>;
  } else if (!quiz) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <h1>Quiz:</h1>
        <ul>
          <li>
            <p>Question: {quiz[currentQuestion].question}</p>
            <div>
              {quiz[currentQuestion].answers.map((answer) => {
                return <button>{answer}</button>;
              })}
            </div>
            <p>Correct: {quiz[currentQuestion].correct}</p>
          </li>
          <button
            onClick={() => {
              setCurrentQuestion((curr) => curr - 1);
            }}
            disabled={currentQuestion == 1}
          >
            Previous
          </button>

          <button
            onClick={() => {
              setCurrentQuestion((curr) => curr + 1);
            }}
            disabled={currentQuestion == 10}
          >
            Next question
          </button>

          {/* {quiz.map((topic, index) => {
            return (
              <li key={index}>
                <p>Question: {topic.question}</p>
                <div>
                  {topic.answers.map((answer) => {
                    return <button>{answer}</button>;
                  })}
                </div>
                <p>Correct: {topic.correct}</p>
              </li>
            );
          })} */}
        </ul>
      </div>
    );
  }
};

export default Quiz;

import React, { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import { getQuestions } from "../db";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
const Quiz = () => {
  const { planet_id } = useParams();

  const [user, loading, error] = useAuthState(auth);

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [correct, setCorrect] = useState(-1);
  const [err, setErr] = useState(false);

  useEffect(() => {
    setErr(false);
    getQuestions(planet_id.toLowerCase())
      .then((dbQuiz) => {
        setQuiz(dbQuiz);
      })
      .catch((err) => {
        setErr(true);
        console.log(err);
      });
  }, []);

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
          {quiz.map((topic, index) => {
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
          })}
        </ul>
      </div>
    );
  }
};

export default Quiz;

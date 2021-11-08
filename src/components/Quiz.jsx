import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  getQuestions,
  updateUserProgress,
  getUserProgressByPlanet,
} from "../db";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Quiz_Modal from "./Quiz_Modal";
import FinishedQuizModal from "./Finished_quiz_modal";
const Quiz = ({ space_object }) => {
  const [user, loading, error] = useAuthState(auth);
  const [quiz, setQuiz] = useState(null);
  const [err, setErr] = useState(false);
  const [progress, setProgress] = useState([]);
  const [incorrect, setIncorrect] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [hasWonBadge, setHasWonBadge] = useState(false);
  const [hasFinishedQuiz, setHasFinishedQuiz] = useState(false);
  const [hasFinishedBadge, setHasFinishedBadge] = useState(false);

  useEffect(() => {
    setCurrentQuestion(1);
    setErr(false);
    getQuestions(space_object.toLowerCase())
      .then((dbQuiz) => {
        setQuiz(dbQuiz);
      })
      .then(() => {
        getUserProgressByPlanet(space_object)
          .then((dbProgress) => {
            if (dbProgress === "" || dbProgress === undefined) {
              setProgress([]);
            } else {
              setProgress(dbProgress);
            }
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
  }, [space_object]);

  const checkAnswer = (e) => {
    e.preventDefault();
    if (e.target.value === quiz[currentQuestion].correct) {
      setProgress((curr) => {
        const newProgress = [...curr];
        newProgress.push(currentQuestion);

        const p = { [space_object]: newProgress };
        updateUserProgress(p);
        if (newProgress.length === 7) setHasWonBadge(true);
        if (newProgress.length === 7) setHasFinishedBadge(true);
        return newProgress;
      });
    } else {
      setIncorrect((curr) => {
        const newIncorrect = [...curr];
        newIncorrect.push(currentQuestion);
        return newIncorrect;
      });
    }
    if (currentQuestion === 10) setHasFinishedQuiz(true);
  };

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
  } else if (quiz.length === 9) {
    return <p>ONLY 8 QUESTIONS</p>;
  } else {
    return (
      <div>
        <Quiz_Modal
          hasWonBadge={hasWonBadge}
          setHasWonBadge={setHasWonBadge}
          space_object={space_object}
        />
        <FinishedQuizModal
          hasFinishedBadge={hasFinishedBadge}
          hasFinishedQuiz={hasFinishedQuiz}
          setHasFinishedQuiz={setHasFinishedQuiz}
          space_object={space_object}
        />
        <h1>Quiz:</h1>
        <ul>
          <li>
            <p>Question: {quiz[currentQuestion].question}</p>
            <div>
              {quiz[currentQuestion].answers.map((answer) => {
                return (
                  <button
                    key={answer}
                    disabled={
                      progress.includes(currentQuestion) ||
                      incorrect.includes(currentQuestion)
                    }
                    value={answer}
                    onClick={checkAnswer}
                  >
                    {answer}
                  </button>
                );
              })}
            </div>

            {progress.includes(currentQuestion) ? <p>Correct</p> : null}
            {incorrect.includes(currentQuestion) ? <p>Incorrect</p> : null}

            <p>Correct: {quiz[currentQuestion].correct}</p>
          </li>
          <button
            onClick={() => {
              setCurrentQuestion((curr) => curr - 1);
            }}
            disabled={currentQuestion === 1}
          >
            Previous
          </button>

          <button
            onClick={() => {
              setCurrentQuestion((curr) => curr + 1);
            }}
            disabled={currentQuestion === 10}
          >
            Next question
          </button>
        </ul>
      </div>
    );
  }
};

export default Quiz;

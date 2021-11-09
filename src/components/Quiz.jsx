import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  getQuestions,
  updateUserProgress,
  getUserProgressByPlanet,
} from "../db";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import QuizModal from "./QuizModal";
import FinishedQuizModal from "./FinishedQuizModal";
import Loading from "./Loading";

const CheckMark = () => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="circle-check"
      class="icon check-mark svg-inline--fa fa-circle-check"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="currentColor"
        d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"
      ></path>
    </svg>
  );
};

const XMark = () => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="circle-xmark"
      className="icon x-mark svg-inline--fa fa-circle-xmark"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="currentColor"
        d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256C397.4 512 512 397.4 512 256S397.4 0 256 0zM336.1 303c9.375 9.375 9.375 24.56 0 33.94c-9.381 9.381-24.56 9.373-33.94 0L256 289.9l-47.03 47.03c-9.381 9.381-24.56 9.373-33.94 0c-9.375-9.375-9.375-24.56 0-33.94l47.03-47.03L175 208.1c-9.375-9.375-9.375-24.56 0-33.94s24.56-9.375 33.94 0L256 222.1l47.03-47.03c9.375-9.375 24.56-9.375 33.94 0s9.375 24.56 0 33.94l-47.03 47.03L336.1 303z"
      ></path>
    </svg>
  );
};

const Quiz = ({ space_object }) => {
  const [user, loading, error] = useAuthState(auth);
  const [quiz, setQuiz] = useState(null);
  const [err, setErr] = useState(false);
  const [progress, setProgress] = useState([]);
  const [incorrect, setIncorrect] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [contentLoading, setContentLoading] = useState(true);
  const [hasWonBadge, setHasWonBadge] = useState(false);
  const [openWonBadgeModal, setOpenWonBadgeModal] = useState(false);

  useEffect(() => {
    setCurrentQuestion(1);
    setIncorrect([]);
    setErr(false);
    setContentLoading(true);

    getQuestions(space_object.toLowerCase())
      .then((dbQuiz) => {
        setQuiz(dbQuiz);
      })
      .then(() => {
        return getUserProgressByPlanet(space_object);
      })
      .then((dbProgress) => {
        if (dbProgress === "" || dbProgress === undefined) {
          setProgress([]);
        } else {
          setProgress(dbProgress);
        }
      })
      .catch((err) => {
        setErr(true);
      })
      .finally(() => {
        setContentLoading(false);
      });
  }, [space_object]);

  const checkAnswer = (e) => {
    e.preventDefault();
    if (e.target.value === quiz[currentQuestion].correct) {
      // already got 6 correct + got a new one correct => got 7 correct.
      if (progress.length === 6) {
        setHasWonBadge(true);
        setOpenWonBadgeModal(true);
      }
      setProgress((curr) => {
        const newProgress = [...curr];
        newProgress.push(currentQuestion);

        const p = { [space_object]: newProgress };
        updateUserProgress(p);
        return newProgress;
      });
    } else {
      setIncorrect((curr) => {
        const newIncorrect = [...curr];
        newIncorrect.push(currentQuestion);
        return newIncorrect;
      });
    }
  };

  // html display logic starts here.

  if (error || err || !quiz) {
    return (
      <div>
        <p>
          Sorry we cant find any questions at the minute. Please try again
          later.
        </p>
      </div>
    );
  }

  if (!user && !loading) {
    return <Redirect to="/" />;
  } else if (contentLoading) {
    return <Loading />;
  } else {
    return (
      <div className="quiz-modal">
        <QuizModal
          openWonBadgeModal={openWonBadgeModal}
          setOpenWonBadgeModal={setOpenWonBadgeModal}
          space_object={space_object}
        />
        <h2 className="quiz-title">Quiz</h2>
        <section
          className={`quiz-box ${
            progress.includes(currentQuestion)
              ? "correct"
              : incorrect.includes(currentQuestion)
              ? "incorrect"
              : ""
          }`}
        >
          <ul>
            <li>
              <p className="question">
                Question: {quiz[currentQuestion].question}
              </p>
              <div className="quiz-button-container">
                {quiz[currentQuestion].answers.map((answer) => {
                  return (
                    <button
                      className="button quiz-button"
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

              {/* <p>Correct: {quiz[currentQuestion].correct}</p> */}
            </li>

            <button
              className="button quiz-button"
              onClick={() => {
                setCurrentQuestion((curr) => curr - 1);
              }}
              disabled={currentQuestion === 1}
            >
              Previous
            </button>

            {/* hide the next question button when it is the last question */}
            {currentQuestion !== quiz.length - 1 && (
              <button
                className="button quiz-button"
                onClick={() => {
                  setCurrentQuestion((curr) => curr + 1);
                }}
                disabled={currentQuestion === quiz.length - 1}
              >
                Next question
              </button>
            )}
            {/* add the "Finish" button when it is 10th question and the 10th question got answered. */}
            {currentQuestion === quiz.length - 1 &&
            (progress.includes(quiz.length - 1) ||
              incorrect.includes(quiz.length - 1)) ? (
              <FinishedQuizModal
                progress={progress}
                hasWonBadge={hasWonBadge}
                space_object={space_object}
              />
            ) : null}

            {progress.includes(currentQuestion) ? (
              <div className="quiz-message-container">
                <CheckMark />
                <p className="quiz-message">
                  That's correct, Well done! Please move on to the next
                  question!
                </p>
              </div>
            ) : null}
            {incorrect.includes(currentQuestion) ? (
              <div className="quiz-message-container">
                <XMark />
                <p className="quiz-message">
                  Unlucky, that's not the right answer. Try the next question!
                </p>
              </div>
            ) : null}
          </ul>
        </section>
      </div>
    );
  }
};

export default Quiz;

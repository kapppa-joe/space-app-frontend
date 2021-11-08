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
      })
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
          Sorry we cant find any questions at the minute. Please try again later.
        </p>
      </div>
    );
  }

  if (!user && !loading) {
    return <Redirect to="/" />;
  } else if (contentLoading) {
    return (
      <Loading />
    )
  } else {
    return (
      <div id="quiz-modal">
        <QuizModal
          openWonBadgeModal={openWonBadgeModal}
          setOpenWonBadgeModal={setOpenWonBadgeModal}
          space_object={space_object}
        />
        <h1>Quiz:</h1>
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
              <p id="quiz-question">
                Question: {quiz[currentQuestion].question}
              </p>
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

              {/* <p>Correct: {quiz[currentQuestion].correct}</p> */}
            </li>
            <button
              onClick={() => {
                setCurrentQuestion((curr) => curr - 1);
              }}
              disabled={currentQuestion === 1}
            >
              Previous
            </button>
            {progress.includes(currentQuestion) ? (
              <p>
                That's correct, Well done! Please move to the next question!
              </p>
            ) : null}
            {incorrect.includes(currentQuestion) ? (
              <p>
                Unlucky, that's not the right answer. Try the next question!
              </p>
            ) : null}

            {/* hide the next question button when it is the last question */}
            {currentQuestion !== quiz.length - 1 && (
              <button
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
          </ul>
        </section>
      </div>
    );
  }
};

export default Quiz;

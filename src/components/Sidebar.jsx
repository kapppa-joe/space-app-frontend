import React, { useState } from "react";
import "bulma-pageloader";
import Trivia from "./Trivia";
import Quiz from "./Quiz";

const Sidebar = ({ content, space_object }) => {
  const [isFactsActive, setIsFactsActive] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(false);

  if (content === "facts") {
    return (
      <>
        <button
          className="button sidebar-button sidebar-button-left"
          onClick={() => {
            setIsFactsActive(true);
          }}
        >
          <span className="vertical-text">TRIVIA</span>
        </button>
        <div
          className={`pageloader is-left-to-right ${
            isFactsActive ? "is-active" : ""
          }`}
        >
          <Trivia space_object={space_object} />
          <button
            class="modal-close is-large"
            aria-label="close"
            onClick={() => {
              setIsFactsActive(false);
            }}
          ></button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <button
          className="button sidebar-button sidebar-button-right"
          onClick={() => {
            setIsQuizActive(true);
          }}
        >
          <span className="vertical-text">QUIZ</span>
        </button>
        <div
          className={`pageloader is-right-to-left ${
            isQuizActive ? "is-active" : ""
          }`}
        >
          <Quiz space_object={space_object} />
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => {
              setIsQuizActive(false);
            }}
          ></button>
        </div>
      </>
    );
  }
};

export default Sidebar;

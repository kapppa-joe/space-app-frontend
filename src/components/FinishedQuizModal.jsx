import React, { useState } from "react";
import { Link } from "react-router-dom";

// variables to store the text to display in box
const hasBadgeTitle = "You've completed the quiz!";
const noBadgeTitle = "Nice Try!";

const ReloadButton = () => {
  return (
    <button className="button" onClick={() => window.location.reload()}>
      Back to the planets!
    </button>
  );
};

const newlyWonBadgeBody = (space_object) => (
  <>
    <img
      className="badge"
      src={`/assets/badges/badge-${space_object}.png`}
      alt={space_object}
    ></img>
    <p>Congratulations! You have completed the quiz and earned a badge!</p>
    <p>If you would like to see your new shiny badge click on the link below</p>
    <Link to="/mission-control">Mission Control</Link>
    <br />
    <br />

    <p>Or you can return to the planet viewer to continue your mission!</p>
    <ReloadButton />
  </>
);

const alreadyGotBadgeBody = (
  <>
    <p>Congratulations! You have completed the quiz and you did really well!</p>
    <p>If you would like to see the badge you won click on the link below</p>
    <Link to="/mission-control">Mission Control</Link>
    <br />
    <br />
    <p>Or you can return to the planet viewer to continue your mission!</p>
    <ReloadButton />
  </>
);

const noBadgeBody = (
  <>
    <p>Unfortunately, you haven't got a badge this time</p>
    <p>
      Not to worry! Click on the link below, look at the facts, and you can
      answer the questions again!
    </p>
    <ReloadButton />
  </>
);

// component starts here
//
const FinishedQuizModal = ({ progress, hasWonBadge, space_object }) => {
  const gotBadge = progress.length >= 7;
  const [isActive, setIsActive] = useState(false);

  /* determine model box body base on conditions:
   * if won a badge in this time: newlyWonBadgeBody
   * if already won a badge before: alreadyGotBadgeBody
   * if didn't got a badge: noBadgeBody
   */

  let modalBoxBody = "";
  if (hasWonBadge) {
    modalBoxBody = newlyWonBadgeBody(space_object);
  } else if (gotBadge) {
    modalBoxBody = alreadyGotBadgeBody;
  } else {
    modalBoxBody = noBadgeBody;
  }

  return (
    <>
      <button className="button quiz-button" onClick={() => setIsActive(true)}>
        Finish
      </button>

      <div class={`modal ${isActive ? "is-active" : ""}`}>
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">
              {gotBadge ? hasBadgeTitle : noBadgeTitle}
            </p>
            <button
              class="delete"
              aria-label="close"
              onClick={() => setIsActive(false)}
            ></button>
          </header>
          <section class="modal-card-body">{modalBoxBody}</section>
        </div>
      </div>
    </>
  );
};

export default FinishedQuizModal;

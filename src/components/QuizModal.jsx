import React from "react";
import { Link } from "react-router-dom";

const Quiz_Modal = ({
  openWonBadgeModal,
  setOpenWonBadgeModal,
  space_object,
}) => {
  return (
    <div class={`modal ${openWonBadgeModal ? "is-active" : ""}`}>
      <div
        class="modal-background"
        onClick={() => {
          setOpenWonBadgeModal(false);
        }}
      ></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">You've won a badge! </p>
          <button
            class="delete"
            aria-label="close"
            onClick={() => {
              setOpenWonBadgeModal(false);
            }}
          ></button>
        </header>
        <section class="modal-card-body">
          <img
            className="badge"
            src={`/assets/badges/badge-${space_object}.png`}
            alt={space_object}
          ></img>
          <p>
            If you would like to see your new shiny badge click on the link
            below
          </p>
          <Link to="/mission-control">Mission Control</Link>
          <br />
          <br />
          <p>
            Or you can return to the planet viewer to continue your mission!
          </p>
          <button className="button" onClick={() => window.location.reload()}>
            Back to the planets!
          </button>
        </section>
        <footer className="modal-card-foot">
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => {
              setOpenWonBadgeModal(false);
            }}
          ></button>
        </footer>
      </div>
    </div>
  );
};

export default Quiz_Modal;

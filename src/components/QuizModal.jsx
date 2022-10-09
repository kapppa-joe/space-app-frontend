import React from "react";
import { Link } from "react-router-dom";

const Quiz_Modal = ({
  openWonBadgeModal,
  setOpenWonBadgeModal,
  space_object,
}) => {
  return (
    <div className={`modal ${openWonBadgeModal ? "is-active" : ""}`}>
      <div
        className="modal-background"
        onClick={() => {
          setOpenWonBadgeModal(false);
        }}
      ></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">You've won a badge! </p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => {
              setOpenWonBadgeModal(false);
            }}
          ></button>
        </header>
        <section className="modal-card-body">
          <img
            className="badge"
            src={`/assets/badges/badge-${space_object}.png`}
            alt={space_object}
          ></img>
          <p>
            If you would like to see your new shiny badge click on the link
            below
          </p>
          <Link to="/mission-control">
            <button className="button reload-button">Mission Control</button>
          </Link>
          <br />
          <br />
          <p>Or you can close this window and continue the quiz</p>
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

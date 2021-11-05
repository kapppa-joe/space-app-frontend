import React from "react";

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
        </header>
        <section class="modal-card-body">
          <img
            className="badge"
            src={`/assets/badges/badge-${space_object}.png`}
            alt={space_object}
          ></img>
        </section>
        <footer className="modal-card-foot">
          <button
            className="button"
            onClick={() => {
              setOpenWonBadgeModal(false);
            }}
          >
            Close
          </button>
        </footer>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={() => {
            setOpenWonBadgeModal(false);
          }}
        ></button>
      </div>
    </div>
  );
};

export default Quiz_Modal;

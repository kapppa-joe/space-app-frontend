import React, { useState } from "react";
import CustomARMarker from "../assets/images/ar-pattern-rocket.png";
import CustomMarkerPDF from "../assets/images/custom-AR-marker.pdf";

const Demo = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <button
        className="button ar-demo-button"
        id="ar_demo"
        onClick={() => {
          setIsActive(true);
        }}
      >
        See an AR Demo
      </button>
      <div
        id="ar-demo-modal-box"
        className={`modal ${isActive ? "is-active" : ""}`}
      >
        <div
          className="modal-background"
          onClick={() => {
            setIsActive(false);
          }}
        ></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              Follow the steps below to start your interstellar experience in
              augmented reality{" "}
            </p>
          </header>
          <section className="modal-card-body">
            <p>Step 1: Make sure you've printed off your marker</p>

            <a href={CustomMarkerPDF} target="__blank">
              <img
                className="ar_marker_img"
                src={CustomARMarker}
                alt="ar marker"
              />
            </a>

            <p>
              {" "}
              If you can't print your marker out, you can use another device to
              display the marker. Make sure you turn your screen brightness
              down!{" "}
            </p>

            <p>
              Step 2: Place your printed marker on a flat surface. It's best to
              put your marker on a surface with a plain background such as a
              dining table.
            </p>

            <p>
              Step 3: When you switch to AR view, your app will ask for
              permission to use the camera on your phone or computer.{" "}
            </p>

            <p>
              Step 4: Point your camera at the marker and hold it steady as
              shown in the example below. After a few seconds, you should see
              the images come to life in 3D.{" "}
            </p>

            <p>
              Step 5: If you're using your phone camera, you can use your
              fingers to rotate the image or zoom in and out.
            </p>
          </section>
          <footer className="modal-card-foot">
            <button
              className="button"
              onClick={() => {
                setIsActive(false);
              }}
            >
              Close
            </button>
          </footer>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => {
              setIsActive(false);
            }}
          ></button>
        </div>
      </div>
    </>
  );
};

export default Demo;

import React, { useState } from "react";
import CustomARMarker from "../assets/images/ar-pattern-rocket.png";
import CustomMarkerPDF from "../assets/images/custom-AR-marker.pdf";

const CircleQuestion = () => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="circle-question"
      className="icon svg-inline--fa fa-circle-question"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="currentColor"
        d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 400c-18 0-32-14-32-32s13.1-32 32-32c17.1 0 32 14 32 32S273.1 400 256 400zM325.1 258L280 286V288c0 13-11 24-24 24S232 301 232 288V272c0-8 4-16 12-21l57-34C308 213 312 206 312 198C312 186 301.1 176 289.1 176h-51.1C225.1 176 216 186 216 198c0 13-11 24-24 24s-24-11-24-24C168 159 199 128 237.1 128h51.1C329 128 360 159 360 198C360 222 347 245 325.1 258z"
      ></path>
    </svg>
  );
};

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
        <CircleQuestion />
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
              Follow the steps below to view this model in
              augmented reality{" "}
            </p>
          </header>
          <section className="modal-card-body">
            
            <p><span className="step-bold">Step 1:</span> Grab your marker or print out a new one by clicking the icon below</p>

            <a href={CustomMarkerPDF} target="__blank">
              <img
                className="ar_marker_img"
                src={CustomARMarker}
                alt="ar marker"
              />
            </a>

            <p>
              You can use another device, such as a phone, to
              display the marker. <br/> Make sure you turn your screen brightness
              down!
            </p>

            <p className="step">
              <span className="step-bold">Step 2:</span> Place your printed marker on a flat surface. <br/><br/></p>

            <p className="step">It's best to put your marker on a surface with a plain background. <br />
              This dark, patterned carpet is not a good choice!
            </p>

            <p className="step">
              <span className="step-bold">Step 3:</span> When you switch to AR view, your app will ask you for
              permission to use the camera on your phone or computer.
            </p>

            <p className="step">
              <span className="step-bold">Step 4:</span> Point your camera at the marker and hold it steady as
              shown in the example below. <br/> After a few seconds, you should see
              the images come to life in 3D!{" "}
            </p>

            <img src="/assets/Demo3.jpg" alt="Holding phone towards marker" />

            <p className="step">
              Move your camera around slowly to see all sides of the modal.<br/>
              If you're using a camera on your phone, you can also use your
              fingers to rotate the model or to zoom in and out.
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

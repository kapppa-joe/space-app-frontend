import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { getUserNickname, getUserProgress, removeUserProgress } from "../db";
import { auth } from "../firebase";
import "bulma-accordion/dist/css/bulma-accordion.min.css";
import Loading from "./Loading";
import Avatar from "./Avatar";
import { formatSpaceObject } from "../utils/helperFunctions";

const MissionControl = () => {
  const [user, loading, error] = useAuthState(auth);
  const [nickname, setNickname] = useState("");
  const [loadingContent, setLoadingContent] = useState(true);
  const [reload, setReload] = useState(false);
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const [progress, setProgress] = useState({
    solar_system: [],
    sun: [],
    mercury: [],
    venus: [],
    earth: [],
    mars: [],
    jupiter: [],
    saturn: [],
    uranus: [],
    neptune: [],
    iss: [],
    curiosityRover: [],
    voyager: [],
  });

  const spaceObjects = [
    "solar-system",
    "sun",
    "mercury",
    "venus",
    "earth",
    "iss",
    "hubble",
    "moon",
    "mars",
    "curiosity_rover",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
    "pluto",
    "voyager",
  ];

  useEffect(() => {
    if (user) {
      const promises = [getUserNickname(), getUserProgress()];
      setLoadingContent(true);
      setErr(false);
      Promise.all(promises)
        .then((result) => {
          setNickname(result[0]);
          setProgress(result[1]);
        })
        .catch((err) => {
          setErr(true);
        })
        .finally(() => {
          setLoadingContent(false);
        });
    }
  }, [user, error, reload]);

  const resetProgress = () => {
    let result = window.confirm(
      "Are you sure you want to reset all of your progress so far?"
    );
    if (result) {
      setReload((reload) => {
        return !reload;
      });
      removeUserProgress();
    } else {
    }
  };

  const toggleAccordion = () => {
    setOpen(!open);
  };

  const toggleNav = () => {
    setIsNavOpen((currState) => !currState);
  };

  const signOutUser = () => {
    auth.signOut().catch((error) => alert(error.message));
  };

  if (loading || loadingContent) {
    return <Loading />;
  }

  if (!user) {
    return <Redirect to="/" />;
  }

  if (error || err) {
    return (
      <div>
        <p>Something went wrong... Please try refreshing the page</p>
      </div>
    );
  }

  if (user) {
    return (
      <div id="mission-control">
        <nav
          className="custom-nav"
          role="navigation"
          aria-label="main navigation"
        >
          <span
            role="button"
            className={`navbar-burger ${isNavOpen && "is-active"}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={toggleNav}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </span>
          <div className={`custom-nav-menu ${isNavOpen && "is-active"}`}>
            <div className="nav-buttons-wrapper">
              <Link className="" to="/space/solar-system">
                <button className="button">Launch Mission</button>
              </Link>
              <button className="button" onClick={resetProgress}>
                Reset Progress
              </button>
              <Link className="" to="/onboarding">
                <button className="button">Back To Mission Prep</button>
              </Link>
              <button className="button" onClick={signOutUser}>
                Sign Out
              </button>
            </div>
          </div>
        </nav>

        <div className="welcome-message message-card">
          <span>
            <p>
              Welcome <span id="space-cadet-name">Space Cadet {nickname}</span>{" "}
              to mission control.
            </p>
            <p>
              Here you can find details of your mission and check on your
              progress as you travel through the Cosmos.{" "}
            </p>
          </span>
          <Avatar />
        </div>
        <section className="accordions">
          <article className={`accordion ${open ? "is-active" : ""}`}>
            <div onClick={toggleAccordion} className="accordion-header">
              <p>View Mission Details</p>
              <button
                className="accordion-button toggle"
                aria-label="toggle"
              ></button>
            </div>
            <div className="accordion-body">
              <div className="accordion-content">
                Visit the various planets and spacecraft in our Solar System and
                learn about them as you go. At each destination take the quiz to
                unlock the badges below. You only need to get 7 out of 10
                questions right to unlock your badge!
              </div>
            </div>
          </article>
        </section>
        <p className="message-card">
          Click on the items below to launch into space and begin your mission!
        </p>

        {/* Testing button, remove later */}
        {/* <button onClick={testDB}>DB test</button> */}
        <div className="planet-card-container">
          {spaceObjects.map((object, index) => {
            return (
              <Link key={index} className="planet-card" to={`space/${object}`}>
                <div>
                  <p>
                    {formatSpaceObject(object)}{" "}
                    {object in progress ? progress[object].length : 0}/10
                  </p>
                  <img
                    className="two-d"
                    src={`/assets/2d-images/${object}2D.png`}
                    alt={object}
                  ></img>

                  {/* Do not touch, it will break */}
                  {object in progress ? (
                    progress[object].length > 6 ? (
                      <>
                        <img
                          className="badge"
                          src={`/assets/badges/badge-${object}.png`}
                          alt={object}
                        ></img>
                        <progress
                          className="progress is-medium is-success"
                          value={
                            object in progress ? progress[object].length : 0
                          }
                          max="10"
                        ></progress>
                      </>
                    ) : (
                      <>
                        <img
                          className="badge"
                          src={`/assets/badges/badge-default1.png`}
                          alt={object}
                        ></img>
                        <progress
                          className="progress is-medium is-danger"
                          value={
                            object in progress ? progress[object].length : 0
                          }
                          max="10"
                        ></progress>
                      </>
                    )
                  ) : (
                    <>
                      <img
                        className="badge"
                        src={`/assets/badges/badge-default1.png`}
                        alt={object}
                      ></img>
                      <progress
                        className="progress is-medium"
                        value="0"
                        max="7"
                      ></progress>
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
        {/* <button onClick={signOutUser}>Sign Out</button> */}
        <div className="acknowledgement-button-div">
          <Link to="/acknowledgements">
            <button className="button">Acknowledgements</button>
          </Link>
        </div>
      </div>
    );
  }
};

export default MissionControl;

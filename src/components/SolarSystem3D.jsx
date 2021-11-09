import React from "react";
import "aframe";
import "../utils/aframe-star-system";
import "../utils/aframe-orbit-controls-component";
import "../utils/aframe-init-position";
import { Entity, Scene } from "aframe-react";

import Models from "../utils/aframe-models";

// Define planet data

const solarSystemPlanetsData = {
  mercury: {
    siderealYears: 0.2408467,
    selfRotationPeriod: 0.16,
    radius: 2439,
    distanceFromCenter: 57909227,
    color: "#CCC",
  },
  venus: {
    siderealYears: 0.61519726,
    selfRotationPeriod: 0.6658,
    radius: 6051,
    distanceFromCenter: 108209475,
    color: "#FF9",
  },
  earth: {
    siderealYears: 1.0000174,
    radius: 6371,
    selfRotationPeriod: 0.0027,
    distanceFromCenter: 149598262,
    color: "#66F",
  },
  mars: {
    siderealYears: 1.8808476,
    radius: 3389,
    selfRotationPeriod: 0.0027,
    distanceFromCenter: 227943824,
    color: "#F33",
  },
  jupiter: {
    siderealYears: 11.862615,
    radius: 69911,
    selfRotationPeriod: 0.001132,
    distanceFromCenter: 778340821,
    color: "#3F3",
  },
  saturn: {
    siderealYears: 29.447498,
    radius: 58232,
    selfRotationPeriod: 0.001205,
    distanceFromCenter: 1426666422,
    color: "#FF3",
  },
  uranus: {
    siderealYears: 84.016846,
    radius: 25362,
    selfRotationPeriod: 0.001968,
    distanceFromCenter: 2870658186,
    color: "#CCF",
  },
  neptune: {
    siderealYears: 164.79132,
    radius: 24622,
    selfRotationPeriod: 0.001839,
    distanceFromCenter: 4498396441,
    color: "#33F",
  },
  pluto: {
    siderealYears: 248.5,
    radius: 1188.3,
    selfRotationPeriod: 0.017499,
    distanceFromCenter: 5906380000,
    color: "#999",
  },
};
const nonPlanets = {
  sun: {
    siderealYears: 0,
    radius: 695508,
    distanceFromCenter: 0,
  },
  moon: {
    siderealYears: 0.07397,
    radius: 1371,
    selfRotationPeriod: 0.07397,
    distanceFromCenter: 384400,
    color: "#F4F1C9",
  },
};

// util functions for calculation

const roundToDecimalPlace = (value, n) => {
  if (n < 0) {
    return 0;
  }
  return Math.round(value * 10 ** n) / 10 ** n;
};

const speedRatio = 16000;
const sizeScaleFunc = (radius) =>
  roundToDecimalPlace((Math.log(radius) - 7) * 0.08 + 0.1, 2);

const distanceScaleFunc = (dis) =>
  (Math.round(dis / 57909200 + Math.log(dis) * 5) - 82) * 1.2;

const calculateModelMovements = (planetData) => {
  const { siderealYears, radius, distanceFromCenter, selfRotationPeriod } =
    planetData;

  return {
    duration: speedRatio * siderealYears,
    selfRotationDuration: speedRatio * selfRotationPeriod,
    scale: sizeScaleFunc(radius),
    position: distanceScaleFunc(distanceFromCenter),
  };
};

// get 3d model path from name
const getModelFilePath = (model_name) => {
  return Models[model_name].path;
};

// Component declaration starts here
//
const PlanetAndLocus = (props) => {
  const { model_name, color, duration, selfRotationDuration, scale, position } =
    props;

  let locusRotation = {
    from: "0 0 360",
    to: "0 0 0",
  };

  if (model_name === "moon") {
    locusRotation = { from: "90 -5 360", to: "90 -5 0" };
  }

  return (
    <Entity
      id={model_name + "-locus"}
      key={model_name}
      className="locus"
      geometry={{
        arc: 90,
        primitive: "torus",
        radius: position,
        radiusTubular: 0.03,
        segmentsTubular: 50,
      }}
      position="0 0 0"
      material={{ shader: "flat", color: color, opacity: 0.6 }}
      animation={{
        property: "rotation",
        from: locusRotation.from,
        to: locusRotation.to,
        dur: duration,
        easing: "linear",
        loop: "true",
      }}
    >
      <Entity
        className="locus-gray"
        geometry={{
          primitive: "ring",
          radiusInner: position - 0.03,
          radiusOuter: position,
          segmentsTheta: 50,
        }}
        material={{
          side: "double",
          color: "#CCC",
        }}
      ></Entity>
      <Entity
        id={model_name + "-self-tilt"}
        position={`${position} 0 0`}
        rotation="-67 0 0" // -67 0 0
      >
        <Entity
          id={model_name}
          gltf-model={getModelFilePath(model_name)}
          scale={`${scale} ${scale} ${scale}`}
          className="planet"
          animation={{
            property: "rotation",
            from: "0 0 0",
            to: "0 360 0",
            dur: selfRotationDuration * 365,
            easing: "linear",
            loop: "true",
          }}
        >
          {model_name === "earth" && <Moon />}
          <Entity
            id={model_name + "-highlight"}
            className="highlight"
            geometry={{ primitive: "sphere", radius: 12 }}
            material={{ color: color, opacity: 0.5 }}
            visible={false}
          />
        </Entity>
      </Entity>
    </Entity>
  );
};

// special case for earth's moon

function Moon(props) {
  let { duration, scale, position, selfRotationDuration } =
    calculateModelMovements(nonPlanets.moon);
  position = position * 0.4;
  scale *= 2;
  return (
    <PlanetAndLocus
      model_name={"moon"}
      color={nonPlanets.moon.color}
      duration={duration}
      scale={scale}
      position={position}
      selfRotationDuration={selfRotationDuration}
    />
  );
}

const SolarSystem3D = () => {
  return (
    <>
      <Scene
        vr-mode-ui="enabled: false"
        renderer="colorManagement: true;"
        embedded
        className="a-scene"
      >
        <Entity
          id="camera"
          camera={{ active: true }}
          init-position={{ position: "0 -20 -20" }}
          orbit-controls={{
            target: "#sun",
            enableDamping: true,
            dampingFactor: 0.25,
            autoRotate: false,
            rotateSpeed: 0.16,
            minDistance: 10,
            maxDistance: 250,
            minPolarAngle: -90,
            maxPolarAngle: 90,
          }}
        >
          <a-light
            type="ambient"
            position="0 0 0"
            color="#fff"
            intensity="0.15"
          ></a-light>
        </Entity>

        <Entity id="mouseCursor" cursor={{ rayOrigin: "mouse" }} />

        <a-light
          id="center-lighting"
          type="point"
          position="0 0 0"
          color="#fff"
          intensity="2"
        ></a-light>

        <Entity id="camera-center" position="0 0 0" visible="false" />
        <Entity
          id="sun"
          gltf-model={Models["sun"].path}
          position="0 0 0"
          scale="1 1 1"
        ></Entity>

        {Object.keys(Models).map((model_name) => {
          if (model_name in solarSystemPlanetsData) {
            const { duration, scale, position, selfRotationDuration } =
              calculateModelMovements(solarSystemPlanetsData[model_name]);

            const color = solarSystemPlanetsData[model_name].color;

            return (
              <PlanetAndLocus
                model_name={model_name}
                color={color}
                duration={duration}
                selfRotationDuration={selfRotationDuration}
                scale={scale}
                position={position}
              />
            );
          }
        })}

        <a-sky color="#000000"></a-sky>
        <Entity
          star-system={{
            count: 2000,
            radius: 250,
            depth: 0,
            size: 0.5,
          }}
        ></Entity>
      </Scene>
    </>
  );
};

export default SolarSystem3D;
